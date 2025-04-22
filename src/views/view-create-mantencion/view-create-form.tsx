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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewMantencionForm: React.FC = () => {
  const [form, setForm] = useState({
    crs: "",
    ubicacion: "",
    equipo: "",
    codigoEquipo: "",
    tipoEquipo: "",
    tipoMantencion: "Preventiva",
    descripcion: "",
    periodicidad: "Mensual",
    prioridad: "Media",
    fechaProgramada: "",
    horaProgramada: "",
    fechaEjecucion: "",
    estado: "Pendiente",
    tecnico: "",
    unidadResponsable: "",
    contacto: "",
    observaciones: "",
    hallazgos: "",
    accionesCorrectivas: "",
    requiereSeguimiento: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Aquí puedes enviar el formulario a tu API
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Programación de las mantenciones
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <form onSubmit={handleSubmit} className="max-w-6xl mx-auto h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna izquierda */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Información General</h2>
                <Input
                  placeholder="Nombre del CRS"
                  value={form.crs}
                  onChange={(e) => handleChange("crs", e.target.value)}
                />
                <Input
                  placeholder="Ubicación"
                  value={form.ubicacion}
                  onChange={(e) => handleChange("ubicacion", e.target.value)}
                />
                <Input
                  placeholder="Nombre del equipo"
                  value={form.equipo}
                  onChange={(e) => handleChange("equipo", e.target.value)}
                />
                <Input
                  placeholder="Código del equipo"
                  value={form.codigoEquipo}
                  onChange={(e) => handleChange("codigoEquipo", e.target.value)}
                />
                <Input
                  placeholder="Tipo de equipo"
                  value={form.tipoEquipo}
                  onChange={(e) => handleChange("tipoEquipo", e.target.value)}
                />

                <h2 className="text-xl font-semibold">Responsable</h2>
                <Input
                  placeholder="Técnico asignado"
                  value={form.tecnico}
                  onChange={(e) => handleChange("tecnico", e.target.value)}
                />
                <Input
                  placeholder="Unidad responsable"
                  value={form.unidadResponsable}
                  onChange={(e) =>
                    handleChange("unidadResponsable", e.target.value)
                  }
                />
                <Input
                  placeholder="Contacto"
                  value={form.contacto}
                  onChange={(e) => handleChange("contacto", e.target.value)}
                />
              </div>

              {/* Columna derecha */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  Detalles de la Mantención
                </h2>
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
                  </SelectContent>
                </Select>

                <Select
                  value={form.prioridad}
                  onValueChange={(value) => handleChange("prioridad", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={form.periodicidad}
                  onValueChange={(value) => handleChange("periodicidad", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Periodicidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensual">Mensual</SelectItem>
                    <SelectItem value="Trimestral">Trimestral</SelectItem>
                    <SelectItem value="Semestral">Semestral</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Descripción del trabajo / falla"
                  value={form.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                />

                <h2 className="text-xl font-semibold">Fechas y Estado</h2>
                <Input
                  type="date"
                  value={form.fechaProgramada}
                  onChange={(e) =>
                    handleChange("fechaProgramada", e.target.value)
                  }
                />
                <Input
                  type="time"
                  value={form.horaProgramada}
                  onChange={(e) =>
                    handleChange("horaProgramada", e.target.value)
                  }
                />
                <Input
                  type="date"
                  value={form.fechaEjecucion}
                  onChange={(e) =>
                    handleChange("fechaEjecucion", e.target.value)
                  }
                />
                <Select
                  value={form.estado}
                  onValueChange={(value) => handleChange("estado", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Reprogramado">Reprogramado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sección Observaciones - en una sola columna debajo */}
            <div className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold">
                Resultados y Observaciones
              </h2>
              <Textarea
                placeholder="Observaciones"
                value={form.observaciones}
                onChange={(e) => handleChange("observaciones", e.target.value)}
              />
              <Textarea
                placeholder="Hallazgos"
                value={form.hallazgos}
                onChange={(e) => handleChange("hallazgos", e.target.value)}
              />
              <Textarea
                placeholder="Acciones correctivas tomadas"
                value={form.accionesCorrectivas}
                onChange={(e) =>
                  handleChange("accionesCorrectivas", e.target.value)
                }
              />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="seguimiento"
                  checked={form.requiereSeguimiento}
                  onCheckedChange={(checked) =>
                    handleChange("requiereSeguimiento", !!checked)
                  }
                />
                <Label htmlFor="seguimiento">¿Requiere seguimiento?</Label>
              </div>
            </div>

            <div className="mt-6">
              <Button type="submit">Guardar mantención</Button>
            </div>
            <br />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewMantencionForm;
