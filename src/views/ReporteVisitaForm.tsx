"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReporteVisitaForm: React.FC = () => {
  const [form, setForm] = useState({
    centro: "",
    ubicacion: "",
    fechaVisita: "",
    tecnico: "",
    tipoMantencion: "",
    resumenActividades: "",
    hallazgos: "",
    accionesTomadas: "",
    observaciones: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Aquí podrías enviar los datos a una API
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl">Reporte de Visita Mensual</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-8 ">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <Input
                  placeholder="Centro de Monitoreo"
                  value={form.centro}
                  onChange={(e) => handleChange("centro", e.target.value)}
                />
                <Input
                  placeholder="Ubicación"
                  value={form.ubicacion}
                  onChange={(e) => handleChange("ubicacion", e.target.value)}
                />
                <Input
                  type="date"
                  value={form.fechaVisita}
                  onChange={(e) => handleChange("fechaVisita", e.target.value)}
                />
                <Input
                  placeholder="Técnico responsable"
                  value={form.tecnico}
                  onChange={(e) => handleChange("tecnico", e.target.value)}
                />
                <Select
                  value={form.tipoMantencion}
                  onValueChange={(value) =>
                    handleChange("tipoMantencion", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de mantención" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preventiva">Preventiva</SelectItem>
                    <SelectItem value="Correctiva">Correctiva</SelectItem>
                    <SelectItem value="Mixta">Mixta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Textarea
                  placeholder="Resumen de actividades realizadas"
                  value={form.resumenActividades}
                  onChange={(e) =>
                    handleChange("resumenActividades", e.target.value)
                  }
                />
                <Textarea
                  placeholder="Hallazgos"
                  value={form.hallazgos}
                  onChange={(e) => handleChange("hallazgos", e.target.value)}
                />
                <Textarea
                  placeholder="Acciones tomadas"
                  value={form.accionesTomadas}
                  onChange={(e) =>
                    handleChange("accionesTomadas", e.target.value)
                  }
                />
                <Textarea
                  placeholder="Observaciones adicionales"
                  value={form.observaciones}
                  onChange={(e) =>
                    handleChange("observaciones", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit">Guardar reporte</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReporteVisitaForm;
