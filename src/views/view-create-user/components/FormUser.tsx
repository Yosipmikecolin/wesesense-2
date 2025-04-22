"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { generateUUID, getDate } from "@/functions";
import { addUser } from "@/api/request";

const FormUser = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    perfil: "",
    status: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      setError(true);
    } else {
      setLoading(true);
      await addUser({
        ...formData,
        creation_date: getDate(),
      });
      setTimeout(() => {
        toast.success("Usuario creado exitosamente");
        setError(false);
        setLoading(false);
        setFormData({
          name: "",
          nit: "",
          perfil: "",
          status: "",
          email: "",
          phone: "",
        });
      }, 500);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-5">
      <CardHeader>
        <CardTitle className="text-3xl">Registro de usuario</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Juan"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              name="nit"
              value={formData.nit}
              onChange={handleInputChange}
              placeholder="538473882"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="juan@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="9 1234 5678"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile">Perfil</Label>
            <Select
              name="perfil"
              value={formData.perfil}
              onValueChange={(value) => handleSelectChange("perfil", value)}
            >
              <SelectTrigger id="perfil">
                <SelectValue placeholder="Seleccione un perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Requirente">Requirente</SelectItem>
                <SelectItem value="Coordinador">Coordinador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <span className="text-xs text-red-600">
              Por favor, complete todos los campos
            </span>
          )}
          <Button
            variant={"primary"}
            className="w-full mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? <div className="loader-button" /> : "Crear usuario"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormUser;
