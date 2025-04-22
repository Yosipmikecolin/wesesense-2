"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { EventType, UserType } from "./EventTable";

interface Props {
  event: EventType | null;
}

export default function EventForm({ event }: Props) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    note: "",
    user: "",
  });

  useLayoutEffect(() => {
    if (event) {
      setFormData({
        date: event.date.split("T")[0],
        note: event.note,
        type: event.type,
        user: event.user,
      });
      setIsUpdate(true);
    }
  }, [event]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const save = async () => {
    try {
      const response = await axios.post(`/api/awardee`, formData);
      setFormData({
        type: "",
        date: "",
        note: "",
        user: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const update = async () => {
    try {
      const data = {
        ...event,
        ...formData,
      };
      const response = await axios.put(`/api/awardee`, data);
      setIsUpdate(false);
      setFormData({
        type: "",
        date: "",
        note: "",
        user: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      update();
    } else {
      save();
    }
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Creación de eventos e incidencias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de evento</Label>
            <Input
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Fecha de incidencia</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Nota</Label>
            <Textarea
              value={formData.note}
              id="note"
              name="note"
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">Usuario</Label>
            <Select
              name="user"
              value={formData.user}
              onValueChange={(value) =>
                setFormData({ ...formData, user: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un usuario" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user._id} value={user._id.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant={"primary"}>
            {isUpdate ? "Editar Incidencia" : "Crear Incidencia"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
