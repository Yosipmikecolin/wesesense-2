import { deleteCarrier } from "@/api/request";
import { Button } from "@/components/ui/button";
import { useBuddieStore } from "@/store/index";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
// import { ProcessType } from "../ViewProcessManagement";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { SupportType } from "../ViewSupportManagement";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadButtonWithModal } from "@/components/upload-file/upload-button-with-modal";
import { ObligationType } from "./TableObligations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  obligation?: ObligationType | null;
  onClose: VoidFunction;
  refetch: () => void;
}

const CreateObligationModal = ({
  onClose,
  obligation,
  open,
  refetch,
}: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [relation, setRelation] = useState("No");
  const [isUpdate, setIsUpdate] = useState(false);
  const [allObligations, setAllObligations] = useState<ObligationType[]>([]);
  const [formData, setFormData] = useState({
    contractual_obligation: "",
    file_url: "",
    file_name: "",
    notes: "",
    relation: "",
    status: "",
  });

  useEffect(() => {
    console.log("DATA: ", obligation);
    if (obligation) {
      setIsUpdate(true);
      setFormData(obligation);
    }
  }, [obligation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const file = fileRef.current?.files?.[0];
    if (isUpdate) {
      // if (!file) return;
      if (file) {
        const formDataFile = new FormData();
        formDataFile.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formDataFile,
        }).then();

        const data = await res.json();
        update(data, file);
      } else {
        update();
      }
    } else {
      if (file) {
        const formDataFile = new FormData();
        formDataFile.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formDataFile,
        }).then();

        const data = await res.json();
        save(data, file);
      } else {
        save();
      }
    }

    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setFormData({
      contractual_obligation: "",
      file_url: "",
      file_name: "",
      notes: "",
      relation: "",
      status: "",
    });
    setIsUpdate(false);
    refetch();
    onClose();
  };

  const save = async (data?: any, file?: File) => {
    const data_form = {
      contractual_obligation: formData.contractual_obligation,
      notes: formData.notes,
      file_url: data ? data.url : "",
      file_name: file ? file.name : "",
      relation: formData.relation,
      status: formData.status,
    };

    console.log("FORM 1: ", formData);
    const response = await axios.post(`/api/contract`, data_form);
    console.log("CREATE: ", response.data);
  };

  const update = async (data?: any, file?: File) => {
    const data_form = {
      _id: obligation?._id,
      contractual_obligation: formData.contractual_obligation,
      notes: formData.notes,
      file_url: data ? data.url : formData.file_url,
      file_name: file ? file.name : formData.file_name,
      relation: formData.relation,
      status: formData.status,
    };
    console.log("FORM 2: ", data_form);
    const response = await axios.put(`/api/contract`, data_form);
    console.log("UPDATE: ", response.data);
  };

  const onRelation = (value: string) => {
    setRelation(value);
    if (value === "No") {
      setFormData((prev) => ({ ...prev, relation: "" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Actualizar" : "Registrar"} obligación
          </DialogTitle>
        </DialogHeader>

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
            <Input ref={fileRef} type="file" />
          </div>

          <div>
            <Label htmlFor="type_support">Estado</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Ej: Activo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En progreso">En progreso</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <div className="grid gap-2">
            <Label>¿Está relacionado Si o No?</Label>
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
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="srelation">¿Está relacionado si o no?</Label>
            <Input
              id="relation"
              name="relation"
              type="number"
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

          <div className="flex justify-end">
            <Button
              variant={"primary"}
              disabled={
                formData.contractual_obligation === "" || formData.notes === ""
              }
              className=" mt-2"
              type="submit"
            >
              {isUpdate ? "Actualizar" : "Registrar"} obligación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateObligationModal;
