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
import { UploadButtonWithModal } from "@/components/upload-file/upload-button-with-modal";
import axios from "axios";

export interface CreationType {
  _id: string;
  type_law: string;
  rit: string;
  ruc: string;
  run: string;
  document: string;
  date_limit: string;
  type_resolution: string;
}

interface Props {
  onClose: () => void;
  refetch: () => void;
}

const CreationProcess = ({ onClose, refetch }: Props) => {
  const [formData, setFormData] = useState({
    type_law: "",
    rit: "",
    ruc: "",
    run: "",
    document: "",
    date_limit: "",
    type_resolution: "",
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
    const response = await axios.post(`/api/awardee/process`, formData);
    await axios.post(`/api/awardee/process`, formData);
    refetch();
    setFormData({
      type_law: "",
      rit: "",
      ruc: "",
      run: "",
      document: "",
      date_limit: "",
      type_resolution: "",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Creación del proceso</DialogTitle>
      </DialogHeader>

      <div>
        <Label htmlFor="type_law">Tipo de ley</Label>
        <Select
          onValueChange={(value) => handleSelectChange("type_law", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de ley" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ley 21.378">Ley 21.378</SelectItem>
            <SelectItem value="Ley 18.216">Ley 18.216</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="rit">RIT</Label>
        <Input
          id="rit"
          name="rit"
          value={formData.rit}
          onChange={handleChange}
          placeholder="Ej: RIT-0000"
        />
      </div>
      <div>
        <Label htmlFor="ruc">RUC</Label>
        <Input
          id="ruc"
          name="ruc"
          value={formData.ruc}
          onChange={handleChange}
          placeholder="Ej: RUC-0000"
        />
      </div>
      <div>
        <Label htmlFor="run">RUN</Label>
        <Input
          id="run"
          name="run"
          value={formData.run}
          onChange={handleChange}
          placeholder="Ej: RUN-0000"
        />
      </div>
      <div>
        <Label htmlFor="document">Documento adjunto</Label>
        <UploadButtonWithModal />
      </div>
      <div>
        <Label htmlFor="date_limit">Fecha limite</Label>
        <Input
          id="date_limit"
          name="date_limit"
          type="date"
          value={formData.date_limit}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="type_resolution">Tipo de resolución</Label>
        <Select
          onValueChange={(value) =>
            handleSelectChange("type_resolution", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el tipo de resolución" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Instalación">Instalación</SelectItem>
            <SelectItem value="Prorroga / Extensión">
              Prorroga / Extensión
            </SelectItem>
            <SelectItem value="Cese de control">Cese de control</SelectItem>
            <SelectItem value="Cambio de domicilio">
              Cambio de domicilio
            </SelectItem>
            <SelectItem value="Solicita informe de control">
              Solicita informe de control
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant={"primary"}
          disabled={
            formData.date_limit === "" ||
            formData.rit === "" ||
            formData.ruc === "" ||
            formData.run === "" ||
            formData.type_law === "" ||
            formData.type_resolution === ""
          }
        >
          Registrar Proceso
        </Button>
      </div>
    </form>
  );
};

export default CreationProcess;
