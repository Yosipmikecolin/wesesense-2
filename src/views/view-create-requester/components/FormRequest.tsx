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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { generateUUID, getDate } from "@/functions";
import toast from "react-hot-toast";
import { addRequester } from "@/api/request";

const FormRequest = () => {
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    middleName: "",
    email: "",
    run: "",
    phone: "",
    userType: "",
    institution: "",
    identificationNumber: "",
    region: "",
    address: "",
    accessAreas: "",
    identityVerification: "",
    securityQuestion: "",
    observations: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "") || !date) {
      setError(true);
    } else {
      setLoading(true);
      try {
        await addRequester({
          registrationDate: getDate(),
          ...formData,
        });
        toast.success("Requirente creado exitosamente");
        setError(false);
        setFormData({
          fullName: "",
          lastName: "",
          middleName: "",
          email: "",
          run: "",
          phone: "",
          userType: "",
          institution: "",
          identificationNumber: "",
          region: "",
          address: "",
          accessAreas: "",
          identityVerification: "",
          securityQuestion: "",
          observations: "",
        });
      } catch (error) {
        toast.success("Error al crear el requirente");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-5">
      <CardHeader>
        <CardTitle className="text-3xl mb-3">Crear requirente</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jose"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alfonso@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido paterno</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Alfonso"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Apellido Materno</Label>
              <Input
                id="middleName"
                type="text"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Mingo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="run">RUN</Label>
              <Input
                id="run"
                type="number"
                value={formData.run}
                onChange={handleChange}
                placeholder="34234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="94636234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de usuario</Label>
              <Select
                onValueChange={(value) => handleSelectChange("userType", value)}
              >
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Seleccione el tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Defensor">Defensor</SelectItem>
                  <SelectItem value="Abogado">Abogado</SelectItem>
                  <SelectItem value="Particular">Particular</SelectItem>
                  <SelectItem value="Otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institución</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Unisanguil"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="identificationNumber">
                Número de Identificación
              </Label>
              <Input
                id="identificationNumber"
                type="number"
                value={formData.identificationNumber}
                onChange={handleChange}
                placeholder="3782901"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Región</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="Santiago"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Cra 312 # 43"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessAreas">Áreas de Acceso</Label>
              <Input
                id="accessAreas"
                value={formData.accessAreas}
                onChange={handleChange}
                placeholder="Hospital"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationDate">Fecha de Registro</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    classNames={{
                      day_selected:
                        "bg-green-500 text-white hover:bg-green-500",
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="identityVerification">
                Verificación de Identidad
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("identityVerification", value)
                }
              >
                <SelectTrigger id="identityVerification">
                  <SelectValue placeholder="Seleccione el tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cedula">Cédula de ciudadanía</SelectItem>
                  <SelectItem value="pasaporte">Pasaporte</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta de identidad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityQuestion">Pregunta de Seguridad</Label>
              <Input
                id="securityQuestion"
                placeholder="¿Cómo se llama tu madre?"
                value={formData.securityQuestion}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="observations">Observaciones</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={handleChange}
              placeholder="Es bajo y agresivo"
            />
          </div>
          {error && (
            <span className="text-xs text-red-600 block">
              Por favor, complete todos los campos
            </span>
          )}
          <Button
            variant={"primary"}
            className="w-1/2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <span>Creando requirente</span>
                <div className="loader-button" />
              </div>
            ) : (
              "Crear requirente"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormRequest;
