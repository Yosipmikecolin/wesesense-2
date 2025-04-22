"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DeviceForm from "@/components/devices/Device";
import axios from "axios";

// export interface CreationSupportType {
//   _id: string;
//   type_law: string;
//   rit: string;
//   ruc: string;
//   run: string;
//   document: string;
//   date_limit: string;
//   type_resolution: string;
// }

interface Props {
  onClose: () => void;
  refetch: () => void;
}

const CreationSupport = ({ onClose, refetch }: Props) => {
  const [formData, setFormData] = useState({
    adress: "",
    type_support: "",
    priority: "",
    start_date: "",
    finish_date: "",
    user_assigned: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save();

    console.log("Datos del formulario:", formData);
  };

  const save = async () => {
    const response = await axios.post(`/api/awardee/support`, formData);
    console.log("RESPONSE: ", response.data);
    refetch();
    setFormData({
      adress: "",
      type_support: "",
      priority: "",
      start_date: "",
      finish_date: "",
      user_assigned: "",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Creación del soporte</DialogTitle>
      </DialogHeader>

      <div>
        <Label htmlFor="adress">Dirección</Label>
        <Input
          id="adress"
          name="adress"
          value={formData.adress}
          onChange={handleChange}
          placeholder="Ej: Av Jimenez # 10 - 55"
        />
      </div>

      <div>
        <Label htmlFor="type_support">Tipo</Label>
        <Select
          onValueChange={(value) => handleSelectChange("type_support", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ej: Soporte técnico o Instalación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Soporte técnico">Soporte técnico</SelectItem>
            <SelectItem value="Instalación">Instalación</SelectItem>
            <SelectItem value="IFT">IFT</SelectItem>
            <SelectItem value="Desinstalación">Desinstalación</SelectItem>
            <SelectItem value="Entrega y retiro de dispositivo de víctima">
              Entrega y retiro de dispositivo de víctima
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="priority">Prioridad</Label>
        <Select
          onValueChange={(value) => handleSelectChange("priority", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ej: Alta o Estandar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Estandar">Estandar</SelectItem>
            {/* <SelectItem value="Ley 18.216">Ley 18.216</SelectItem> */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="start_date">Comienzo más temprano</Label>
        <Input
          id="start_date"
          name="start_date"
          //   value={formData.start_date}
          onChange={handleChange}
          type="datetime-local"
        />
      </div>
      <div>
        <Label htmlFor="finish_date">Último acabado</Label>
        <Input
          id="finish_date"
          name="finish_date"
          type="datetime-local"
          value={formData.finish_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="user_assigned">Cesionario</Label>
        <Select
          onValueChange={(value) => handleSelectChange("user_assigned", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ej: John Doe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yosip Parrado">Yosip Parrado</SelectItem>
            <SelectItem value="Alejandro Herrera">Alejandro Herrera</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant={"primary"}>
          Registrar Soporte
        </Button>
      </div>
    </form>
  );
};

export default CreationSupport;
