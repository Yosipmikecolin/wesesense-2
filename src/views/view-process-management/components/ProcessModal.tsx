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

interface Props {
  open: boolean;
  process?: ProcessType;
  onClose: VoidFunction;
  type: string;
  refetch: () => void;
}

const ProcessModal = ({ onClose, process, open, type, refetch }: Props) => {
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (process) {
      try {
        setLoading(true);
        const response = await axios.put(`/api/awardee/process`, {
          _id: process._id,
          status: type === "1" ? "Aceptado" : "Devuelto",
          aproved: type === "1" ? nota : null,
          denied: type === "0" ? nota : null,
          method: "update.process",
        });
        console.log("RESPONSE: ", response.data);
        setNota("");
        refetch();
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
            {type === "1" ? "Aceptar Proceso" : "Devolución de proceso"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="note">Nota</Label>
            <Textarea
              id="note"
              name="note"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Escribe una nota corta..."
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant={"primary"} disabled={nota === ""}>
              {type === "1" ? "Aceptar" : "Devolver"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessModal;
