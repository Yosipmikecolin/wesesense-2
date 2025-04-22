import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step1Data, StepProps1 } from "../interfaces";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Switch } from "@/components/ui/switch";

const DataForm = ({ formData, setCompleteForm, setFormData }: StepProps1) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (formData.dateBirth && !date) {
      const [day, month, year] = formData.dateBirth.split("-");
      const parsedDate = new Date(+year, +month - 1, +day);
      setDate(parsedDate);
    }
  }, []);

  useEffect(() => {
    const isComplete = Object.values(formData).every(
      (value) => value !== "" && date
    );
    setCompleteForm(!isComplete);
  }, [formData, setFormData, date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  const handleSelectChange = (name: keyof Step1Data, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setFormData(updated);
  };

  const handleSwitchChange = (checked: boolean) => {
    const updated = { ...formData, foreigner: checked };
    setFormData(updated);
    setFormData(updated);
  };

  function convertDate(date: string) {
    const [anio, mes, dia] = date.split("-").map(Number);
    return new Date(anio, mes - 1, dia); // mes - 1 porque los meses van de 0 a 11
  }

  const formStarDate = (date: Date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0"); // +1 porque los meses van de 0 a 11
    const anio = date.getFullYear();
    return `${anio}-${mes}-${dia}`;
  };

  const setTimeEnd = (days: number) => {
    const result = new Date(formData.start_tagging_time);
    result.setDate(result.getDate() + days);
    const updated = { ...formData, end_tagging_time: result, days };
    setFormData(updated);
  };

  const setTimeEnd2 = (days: number, start_tagging_time: Date) => {
    const result = new Date(start_tagging_time);
    result.setDate(result.getDate() + days);
    return result;
  };

  useEffect(() => {
    if (date) {
      const formatted = format(date, "dd-MM-yyyy");
      const updated = { ...formData, dateBirth: formatted };
      setFormData(updated);
    }
  }, [date]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Nombre Completo</Label>
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="socialName">Nombre Social</Label>
        <Input
          name="socialName"
          value={formData.socialName}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="paternalSurname">Apellido Paterno</Label>
        <Input
          name="paternalSurname"
          value={formData.paternalSurname}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="motherSurname">Apellido Materno</Label>
        <Input
          name="motherSurname"
          value={formData.motherSurname}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="run">RUN</Label>
        <Input
          name="run"
          type="number"
          value={formData.run || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Tipo de persona sujeta a control</Label>
        <Select
          value={formData.type_current}
          onValueChange={(value) => handleSelectChange("type_current", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">Personas condenada</SelectItem>
            <SelectItem value="20">Personas sujeta a control</SelectItem>
            {/* <SelectItem value="Persona en libertad condicional">
              Persona en libertad condicional
            </SelectItem>
            <SelectItem value="Persona con arresto domiciliario">
              Persona con arresto domiciliario
            </SelectItem>
            <SelectItem value="Persona con suspensión condicional de la pena">
              Persona con suspensión condicional de la pena
            </SelectItem>
            <SelectItem value="Persona con libertad vigilada">
              Persona con libertad vigilada
            </SelectItem>
            <SelectItem value="Persona con régimen de semi-libertad">
              Persona con régimen de semi-libertad
            </SelectItem>
            <SelectItem value="Persona con monitorización electrónica">
              Persona con monitorización electrónica
            </SelectItem>
            <SelectItem value="Persona con régimen de salidas controladas">
              Persona con régimen de salidas controladas
            </SelectItem>
            <SelectItem value="Persona con permiso de trabajo externo">
              Persona con permiso de trabajo externo
            </SelectItem> */}
            <SelectItem value="21">Víctima</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Género</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => handleSelectChange("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Masculino">Masculino</SelectItem>
            <SelectItem value="Femenino">Femenino</SelectItem>
            <SelectItem value="Otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sex">Sexo</Label>
        <Input
          id="sex"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Fecha de Nacimiento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: es })
              ) : (
                <span>Seleccionar fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Estado Civil</Label>
        <Select
          value={formData.maritalStatus}
          onValueChange={(value) => handleSelectChange("maritalStatus", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione estado civil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Soltero/a">Soltero/a</SelectItem>
            <SelectItem value="Casado/a">Casado/a</SelectItem>
            <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
            <SelectItem value="Viudo/a">Viudo/a</SelectItem>
            <SelectItem value="Unión libre">Unión libre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="phone">Número teléfono celular</Label>
        <Input
          name="phone"
          type="number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-end gap-5">
        <div>
          <Label htmlFor="start_tagging_time">Fecha de inicio</Label>
          <Input
            name="start_tagging_time"
            type="date"
            value={formStarDate(formData.start_tagging_time)}
            onChange={(e) => {
              const updated = {
                ...formData,
                start_tagging_time: convertDate(e.target.value),
                end_tagging_time: setTimeEnd2(
                  formData.days,
                  convertDate(e.target.value)
                ),
              };
              setFormData(updated);
            }}
          />
        </div>

        <div>
          <Label htmlFor="days">Número de días de monitoreo</Label>
          <Input
            name="days"
            min={1}
            type="number"
            onChange={(e) => {
              const value = Number(e.target.value);
              setTimeEnd(value < 1 ? 1 : value);
            }}
          />
        </div>
      </div>
      <div>
        <Label>Nacionalidad</Label>
        <Select
          onValueChange={(value) => handleSelectChange("nationality", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un país" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Chile">Chile</SelectItem>
            <SelectItem value="Colombia">Colombia</SelectItem>
            <SelectItem value="Brasil">Brasil</SelectItem>
            <SelectItem value="Argentina">Argentina</SelectItem>
            <SelectItem value="Perú">Perú</SelectItem>
            <SelectItem value="México">México</SelectItem>
            <SelectItem value="Uruguay">Uruguay</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm">¿Es extranjero?</label>
        <Switch
          id="extranjero"
          checked={formData.foreigner}
          onCheckedChange={handleSwitchChange}
        />
      </div>
    </div>
  );
};

export default DataForm;
