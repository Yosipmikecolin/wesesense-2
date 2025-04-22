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

import { Loader2 } from "lucide-react";
import { FormDataCarrier, FormDataCarrierPost } from "@/views/view-create-carrier/interfaces";
import { initialFormData } from "@/views/view-create-carrier/data/initialFormData";
import { carriers } from "@/utils";
import { generateUUID } from "@/functions";

interface Props {
  formData: FormDataCarrierPost;
  setFormData: (data: FormDataCarrier) => void;
  setCompleteForm: (complete: boolean) => void;
}

const typeCrime = [
  {
    value: "Lesiones personales",
    text: "Lesiones personales",
  },
  {
    value: "Violencia intrafamiliar",
    text: "Violencia intrafamiliar",
  },
  {
    value: "Hurto agravado",
    text: "Hurto agravado",
  },
  {
    value: "Conducción bajo los efectos del alcohol",
    text: "Conducción bajo los efectos del alcohol",
  },
  {
    value: "Fraude financiero",
    text: "Fraude financiero",
  },
  {
    value: "Estafa",
    text: "Estafa",
  },
  {
    value: "Robo con violencia",
    text: "Robo con violencia",
  },
  {
    value: "Evasión tributaria",
    text: "Evasión tributaria",
  },
  {
    value: "Posesión de sustancias",
    text: "Posesión de sustancias",
  },
  {
    value: "Abuso de confianza",
    text: "Abuso de confianza",
  },
];

const BearerForm = ({ formData, setFormData, setCompleteForm }: Props) => {
  const [requesterType, setRequesterType] = useState<string>("");
  const [selectedCarrier, setSelectedCarrier] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isComplete = Object.values(formData).every((value) => value !== "");
    setCompleteForm(isComplete);
  }, [formData, setCompleteForm]);

  useEffect(() => {
    if (requesterType) {
      setLoading(true);
      setSelectedCarrier("");
      setFormData(initialFormData);

      setTimeout(async () => {
        setLoading(false);
      }, 600);
    }
  }, [requesterType]);

/*   const selectCarrier = (value: string) => {
    setSelectedCarrier(value);
    const selectRequirent = carriers.find(
      (i) =>
        i.personalData.fullName === value && i.cause.crime === requesterType
    );
    if (selectRequirent) {
      setFormData({
        ...selectRequirent,
        _id: generateUUID(),
        wearer: {
          
          surname: "",
          id: "",
          first_name: "",
          email: "",
        },
      });
    }
  }; */

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-5">
        <div className="space-y-2 w-full">
          <Label htmlFor="requesterType">Tipo de Delito</Label>
          <Select value={requesterType} onValueChange={setRequesterType}>
            <SelectTrigger id="requesterType" className="w-full">
              <SelectValue placeholder="Seleccione un tipo de delito" />
            </SelectTrigger>
            <SelectContent>
              {typeCrime.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requester">Portador</Label>
        <Select
          value={selectedCarrier}
          //onValueChange={selectCarrier}
          disabled={!requesterType || loading}
        >
          <SelectTrigger id="requester" className="w-full">
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Cargando requirientes...</span>
              </div>
            ) : (
              <SelectValue placeholder="Seleccione un portador" />
            )}
          </SelectTrigger>
          <SelectContent>
            {carriers
              .filter((i) => i.cause.crime === requesterType)
              .map((carrier, index) => (
                <SelectItem key={index} value={carrier.personalData.fullName}>
                  {carrier.personalData.fullName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="region">Nombre completo</Label>
          <Input
            id="region"
            value={formData.personalData.fullName}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tribunal">Nacionalidad</Label>
          <Input
            id="tribunal"
            value={formData.personalData.nationality}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ruc">Estado Civil</Label>
          <Input
            id="ruc"
            value={formData.personalData.maritalStatus}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rit">Género</Label>
          <Input
            id="rit"
            value={formData.personalData.gender}
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rol">Tipo de pena</Label>
          <Input
            id="rol"
            value={formData.personalData.type_current}
            readOnly
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default BearerForm;
