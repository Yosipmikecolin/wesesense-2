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
// import { ProcessType } from "../ViewProcessManagement";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SupportType } from "../ViewSupportManagement";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadButtonWithModal } from "@/components/upload-file/upload-button-with-modal";

interface Props {
  open: boolean;
  support?: SupportType;
  onClose: VoidFunction;
  type: string;
  refetch: () => void;
}

const SupportModal = ({ onClose, support, open, type, refetch }: Props) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (support) {
      try {
        setLoading(true);
        const response = await axios.put(`/api/awardee/support`, {
          _id: support._id,
        });
        console.log("RESPONSE: ", response.data);
        setDate("");
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
          <DialogTitle>Cerrar ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="note">Fecha de resolución</Label>
            <Input
              id="date"
              name="date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="note">Respuesta del soporte</Label>
            <UploadButtonWithModal />
          </div>

          <div>
            <Label htmlFor="presentation_date">Se presenta técnico?</Label>
            <RadioGroup
              defaultValue="r1"
              // onValueChange={(e) => setFirstVisit(e)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Si" id="r1" />
                <Label htmlFor="r1">Si</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="r2" />
                <Label htmlFor="r2">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant={"primary"} disabled={date === ""}>
              Cerrar Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;
