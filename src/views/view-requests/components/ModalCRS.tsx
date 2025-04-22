import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";

interface ReturnRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalCRS = ({ open, onClose }: ReturnRequestModalProps) => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    toast.success("Se cambio la resolución");
    onClose();
    setValue("");
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-3xl">Gestionar resolución</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full mt-3">
              <Label htmlFor="describe">Descripción</Label>
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button
          disabled={!value}
          variant={"primary"}
          size={"lg"}
          className="text-[16px]"
          onClick={handleSubmit}
        >
          Cambiar resolición
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCRS;
