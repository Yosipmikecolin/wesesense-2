"use client";

import { useEffect, useRef, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ObligationType } from "@/views/view-obligations/components/TableObligations";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormObligations = () => {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [relation, setRelation] = useState("No");
  const [allObligations, setAllObligations] = useState<ObligationType[]>([]);
  const [formData, setFormData] = useState({
    contractual_obligation: "",
    file_url: "",
    file_name: "",
    notes: "",
    relation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const file = fileRef.current?.files?.[0];
    if (!file) return;

    const formDataFile = new FormData();
    formDataFile.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formDataFile,
    }).then();

    const data = await res.json();
    console.log("URL:", data.url);

    setFormData((prev) => ({
      ...prev,
      file_url: data.url,
      file_name: `${file.name}.${file.type}`,
    }));

    const data_form = {
      contractual_obligation: formData.contractual_obligation,
      notes: formData.notes,
      file_url: data.url,
      file_name: `${file.name}`,
      relation: formData.relation,
    };

    console.log("FORM: ", formData);
    const response = await axios.post(`/api/contract`, data_form);
    console.log("RESPONSE: ", response.data);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setFormData({
      contractual_obligation: "",
      file_url: "",
      file_name: "",
      notes: "",
      relation: "",
    });
  };

  const onRelation = (value: string) => {
    setRelation(value);
    if (value === "No") {
      setFormData((prev) => ({ ...prev, relation: "" }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-5">
      <CardHeader>
        <CardTitle className="text-3xl">Registrar obligacion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contractual_obligation">
              Obligación contractual
            </Label>
            <Input
              id="contractual_obligation"
              name="contractual_obligation"
              value={formData.contractual_obligation}
              onChange={handleInputChange}
              placeholder="Ingrese el nombre de la obligación"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="document">Adjuntar archivo</Label>
            <Input
              ref={fileRef}
              type="file"
              // value={formData.file_url}
              // onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>¿Está relacionado?</Label>
            <RadioGroup
              defaultValue="No"
              defaultChecked
              // value={visitCompleted}
              onValueChange={onRelation}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Si" id="visit-yes" />
                <Label htmlFor="visit-yes">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="visit-no" />
                <Label htmlFor="visit-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="srelation">Relación</Label>
            <Input
              id="relation"
              name="relation"
              type="number"
              disabled={relation === "No"}
              value={formData.relation}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, relation: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Observaciones</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
          </div>

          <Button
            variant={"primary"}
            disabled={
              formData.contractual_obligation === "" || formData.notes === ""
            }
            className="w-full mt-2"
            type="submit"
          >
            Crear obligación
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormObligations;
