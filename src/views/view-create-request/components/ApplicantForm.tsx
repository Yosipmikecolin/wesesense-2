import { useEffect, useState } from "react";
import { UploadButtonWithModal } from "@/components/upload-file/upload-button-with-modal";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormDataRequest } from "../interfaces";

interface Props {
  setCompleteForm: (complete: boolean) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataRequest>>;
}

const ApplicantForm = ({ setCompleteForm, setFormData }: Props) => {
  const [law, setLaw] = useState("");
  useEffect(() => {
    if (law) {
      setCompleteForm(false);
      setFormData((prev) => ({ ...prev, law }));
    }
  }, [law]);

  return (
    <div>
      <div className="mb-5 space-y-2">
        <Label>Ley que se aplica</Label>
        <Select value={law} onValueChange={(value) => setLaw(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una ley" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="21.378">21.378</SelectItem>
            <SelectItem value="18.216">18.216</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <div className="bg-gray-100 rounded-sm font-bold p-3 text-lg border-gray-300">
          Información del solicitante
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Tipo de requirente:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span className="bg-green-400 text-white py-1 px-2 rounded-md">
                Abogado
              </span>
            </div>
          </div>
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Nombre del requirente:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span>Jose Alfredo Mendoza</span>
            </div>
          </div>
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Ciudad:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span>Santiago de Chile</span>
            </div>
          </div>
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Dirección:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span>Calle 32 # 53-43</span>
            </div>
          </div>
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Télefono:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span>94635727</span>
            </div>
          </div>
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Institución:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span>Primer Juzgado Santiago</span>
            </div>
          </div>
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Número de identificación:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span>34276323</span>
            </div>
          </div>
        </div>
        <div className="p-2 border-t text-sm border-b-0 flex items-center justify-between relative top-3">
          <div className="font-semibold flex">Email:</div>
          <div className="text-end">
            <div className="flex items-center gap-2">
              <span>jose.alfredo@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 mt-5 rounded-sm font-bold p-3 text-lg border-gray-300">
        Cargar archivo
      </div>
      <UploadButtonWithModal />
    </div>
  );
};

export default ApplicantForm;
