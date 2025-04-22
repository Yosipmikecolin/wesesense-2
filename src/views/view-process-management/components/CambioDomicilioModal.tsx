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
import { useState } from "react";
import toast from "react-hot-toast";
import { ProcessType } from "../ViewProcessManagement";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  open: boolean;
  process?: ProcessType;
  onClose: VoidFunction;
  type: string;
}

const CambioDomicilioModal = ({ onClose, process, open, type }: Props) => {
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [radio, setRadio] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (process) {
      try {
        setLoading(true);
        const response = await axios.put(`/api/awardee/process`, {
          _id: process._id,
          method: "update.resolution",
          resolution: {
            region,
            comuna,
            domicilio,
            radio,
          },
        });
        let data = JSON.parse(JSON.stringify(process));
        delete data._id;
        const response2 = await axios.post(`/api/awardee/process-master`, {
          ...data,
          resolution: {
            region,
            comuna,
            domicilio,
            radio,
          },
        });
        // refetch();
        setRegion("");
        setRadio("");
        setComuna("");
        setDomicilio("");
        onClose();
      } catch (error) {
        toast.error("Ocurrio un error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle>
            {type === "1" ? "Zona de inclusión" : "Zona de exclusión"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-3">
            <Label htmlFor="region">Región</Label>
            <Input
              id="region"
              name="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="comuna">Comuna</Label>
            <Input
              id="comuna"
              name="comuna"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="domicilio">Domicilio</Label>
            <Input
              id="domicilio"
              name="domicilio"
              value={domicilio}
              onChange={(e) => setDomicilio(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="radio">Radio</Label>
            <Input
              id="radio"
              name="radio"
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant={"primary"}
              disabled={
                region === "" ||
                comuna === "" ||
                radio === "" ||
                domicilio === ""
              }
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CambioDomicilioModal;
