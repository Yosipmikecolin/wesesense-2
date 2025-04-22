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

const ProrrogaModal = ({ onClose, process, open, type }: Props) => {
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (process) {
      try {
        setLoading(true);
        const response = await axios.put(`/api/awardee/process`, {
          _id: process._id,
          method: "update.resolution",
          resolution: {
            new_prorroga: date,
          },
        });
        let data = JSON.parse(JSON.stringify(process));
        delete data._id;
        const response2 = await axios.post(`/api/awardee/process-master`, {
          ...data,
          resolution: {
            new_prorroga: date,
          },
        });
        // refetch();
        setDate("");
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
          <DialogTitle>Nueva prórroga / extensión</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-3">
            <Label htmlFor="presentation_date">Fecha de termino</Label>
            <Input
              id="presentation_date"
              name="presentation_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            {type === "0" && (
              <Button type="submit" variant={"primary"} disabled={date === ""}>
                Enviar informe
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProrrogaModal;
