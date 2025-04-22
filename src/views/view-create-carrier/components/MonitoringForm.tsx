import type React from "react";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepProps3 } from "../interfaces";

const MonitoringForm = ({
  formData,
  setFormData,
  setCompleteForm,
}: StepProps3) => {
  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="areas">Área de inclusión y exclusión</Label>
        <Textarea
          id="areas"
          name="areas"
          value={formData.areas}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="durationMeasurement">
          Duración de la medida o pena, abonos y periodo de control
        </Label>
        <Input
          id="durationMeasurement"
          name="durationMeasurement"
          value={formData.durationMeasurement}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="controlSchedule">Horario de control</Label>
        <Input
          id="controlSchedule"
          name="controlSchedule"
          value={formData.controlSchedule}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="effectivePeriod">Periodo efectivo de control</Label>
        <Input
          id="effectivePeriod"
          name="effectivePeriod"
          value={formData.effectivePeriod}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="requestsFeasibility">
          Solicitudes de Factibilidad Técnica
        </Label>
        <Textarea
          id="requestsFeasibility"
          name="requestsFeasibility"
          value={formData.requestsFeasibility}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="judgment">
          Sentencia ingresada o resolución judicial
        </Label>
        <Textarea
          id="judgment"
          name="judgment"
          value={formData.judgment}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="programmingInstallation">
          Programaciones de Instalación
        </Label>
        <Input
          id="programmingInstallation"
          name="programmingInstallation"
          value={formData.programmingInstallation}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="installationsDone">Instalaciones realizadas</Label>
        <Input
          id="installationsDone"
          name="installationsDone"
          value={formData.installationsDone}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="modificationResolution">
          Resoluciones judiciales que modifican medida de control
        </Label>
        <Textarea
          id="modificationResolution"
          name="modificationResolution"
          value={formData.modificationResolution}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="technicalSupports">Soportes Técnicos Realizados</Label>
        <Input
          id="technicalSupports"
          name="technicalSupports"
          value={formData.technicalSupports}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="nonReports">Informes de incumplimiento</Label>
        <Textarea
          id="nonReports"
          name="nonReports"
          value={formData.nonReports}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="daysControl">
          Días efectivos de control y los días que se Incumplió el control
        </Label>
        <Input
          id="daysControl"
          name="daysControl"
          value={formData.daysControl}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="uninstallations">
          Desinstalaciones realizadas - indicando motivo de la desinstalación
        </Label>
        <Textarea
          id="uninstallations"
          name="uninstallations"
          value={formData.uninstallations}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default MonitoringForm;
