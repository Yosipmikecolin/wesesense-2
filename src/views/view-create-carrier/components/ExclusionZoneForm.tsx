import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Step5Data, StepProps5 } from "../interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ExclusionZoneForm = ({
  formData,
  setFormData,
  setCompleteForm,
}: StepProps5) => {
  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  const handleSelectChange = (name: keyof Step5Data, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setFormData(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="street">Calle</Label>
        <Input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="number">Número</Label>
        <Input
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="additionalInformation">Block/Dpto/Casa</Label>
        <Input
          id="additionalInformation"
          name="additionalInformation"
          value={formData.additionalInformation}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="commune">Comuna</Label>
        <Input
          id="commune"
          name="commune"
          value={formData.commune}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="region">Región</Label>
        <Input
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="road">Carretera/Ruta/Kilómetro</Label>
        <Input
          id="road"
          name="road"
          value={formData.road}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="population">Población/Condominio/Villa</Label>
        <Input
          id="population"
          name="population"
          value={formData.population}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="zipCode">Código Postal</Label>
        <Input
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="geographicCoordinates">Coordenadas Geográficas</Label>
        <Input
          id="geographicCoordinates"
          name="geographicCoordinates"
          value={formData.geographicCoordinates}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="complianceSchedule">Horario de Cumplimiento</Label>
        {/* <Input
          id="complianceSchedule"
          name="complianceSchedule"
          value={formData.complianceSchedule}
          onChange={handleChange}
        /> */}
        <Select
          value={formData.complianceSchedule}
          onValueChange={(value) =>
            handleSelectChange("complianceSchedule", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione el horario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nocturna">Nocturna</SelectItem>
            <SelectItem value="Diurna">Diurna</SelectItem>
            <SelectItem value="Fin de semana">Fin de semana</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="radio">Radio</Label>
        <Input
          id="radio"
          name="radio"
          value={formData.radio}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="characteristics">Características del sector</Label>
        <Textarea
          id="characteristics"
          name="characteristics"
          placeholder="Describa las características del sector"
          value={formData.characteristics}
          onChange={handleChange}
        />
      </div>

      {/* Sección Datos Víctima(s) */}
      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold">Datos Víctima(s)</h2>
      </div>
      <div>
        <Label htmlFor="paternalSurname">Apellido Paterno</Label>
        <Input
          id="paternalSurname"
          name="paternalSurname"
          value={formData.paternalSurname}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="motherSurname">Apellido Materno</Label>
        <Input
          id="motherSurname"
          name="motherSurname"
          value={formData.motherSurname}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="names">Nombres</Label>
        <Input
          id="names"
          name="names"
          value={formData.names}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="rut">Rut</Label>
        <Input
          id="rut"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="victimEmail">Email Víctima</Label>
        <Input
          id="victimEmail"
          name="victimEmail"
          type="email"
          value={formData.victimEmail}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="homeTelephone">Teléfono Particular</Label>
        <Input
          id="homeTelephone"
          name="homeTelephone"
          type="tel"
          value={formData.homeTelephone}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="workplaceTelephone">Teléfono Lugar de Trabajo</Label>
        <Input
          id="workplaceTelephone"
          name="workplaceTelephone"
          type="tel"
          value={formData.workplaceTelephone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ExclusionZoneForm;
