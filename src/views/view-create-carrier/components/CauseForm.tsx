import type React from "react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepProps2 } from "../interfaces";

const CauseForm = ({ formData, setFormData, setCompleteForm }: StepProps2) => {
  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  const handleSelectChange = (name: string, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="courtRegion">Tipo de pena</Label>
        <Select
          value={formData.penatype}
          onValueChange={(value) => handleSelectChange("penatype", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un tipo de pena" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Reclusión parcial">Reclusión parcial</SelectItem>
            <SelectItem value="Reclusión total">Reclusión total</SelectItem>
            <SelectItem value="Reclusión intensiva">
              Reclusión intensiva
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="crs">CRS donde se controla</Label>
        <Input
          id="crs"
          name="crs"
          value={formData.crs}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="crime">Delito</Label>
        <Input
          id="crime"
          name="crime"
          value={formData.crime}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="courtAppeals">Corte de Apelaciones</Label>
        <Input
          id="courtAppeals"
          name="courtAppeals"
          value={formData.courtAppeals}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="courtRegion">Región del Tribunal</Label>
        <Select
          value={formData.courtRegion}
          onValueChange={(value) => handleSelectChange("courtRegion", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione región" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Metropolitana">Metropolitana</SelectItem>
            <SelectItem value="Valparaíso">Valparaíso</SelectItem>
            <SelectItem value="Biobío">Biobío</SelectItem>
            <SelectItem value="Villanueva">Villanueva</SelectItem>
            <SelectItem value="Armenia">Armenia</SelectItem>
            <SelectItem value="Santander">Santander</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="court">Tribunal/Juzgado</Label>
        <Input
          id="court"
          name="court"
          value={formData.court}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="ruc">RUC</Label>
        <Input
          id="ruc"
          name="ruc"
          type="number"
          value={formData.ruc}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="rit">RIT</Label>
        <Input
          id="rit"
          name="rit"
          type="number"
          value={formData.rit}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="rol">ROL</Label>
        <Input
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CauseForm;
