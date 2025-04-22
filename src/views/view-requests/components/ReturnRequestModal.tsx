import { updatedRequest } from "@/api/request";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { useState } from "react";
import toast from "react-hot-toast";

interface ReturnRequestModalProps {
  type: "requester" | "awardee";
  request?: RequestTable;
  refetch: VoidFunction;
  open: boolean;
  onClose: () => void;
}

const ReturnRequestModal = ({
  open,
  onClose,
  refetch,
  type,
  request,
}: ReturnRequestModalProps) => {
  const [value, setValue] = useState({
    reason: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    console.log("res", request);
    if (request) {
      setLoading(true);
      if (type === "requester") {
        try {
          await updatedRequest({
            ...request,
            status: "returned_to_requester",
            reason_revolution_requester: [
              ...request.reason_revolution_requester,
              {
                description_reason: value.description,
                reason_return: value.reason,
              },
            ],
          });
          clsoeModal();
          refetch();
          toast.success("Se regreso la solicitud");
        } catch (error) {
          toast.error("Error al devolver la solicitud");
        } finally {
          setLoading(false);
        }
      } else {
        try {
          await updatedRequest({
            ...request,
            status: "returned",
            time_respond: "12 horas",
            reason_revolution_awardee: [
              ...request.reason_revolution_awardee,
              {
                description_reason: value.description,
                reason_return: value.reason,
              },
            ],
          });
          clsoeModal();
          refetch();
          toast.success("Se regreso la solicitud");
        } catch (error) {
          toast.error("Error al devolver la solicitud");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const clsoeModal = () => {
    setValue({
      reason: "",
      description: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={clsoeModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-3xl mb-3">
            Devolver solicitud
          </DialogTitle>
        </DialogHeader>
        <div className="mt-3">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="reason">Motivo de la devolución</Label>
            <Select
              onValueChange={(data) => setValue({ ...value, reason: data })}
              value={value.reason}
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Faltan documentos">
                  Faltan documentos
                </SelectItem>
                <SelectItem value="Faltan pruebas">Faltan pruebas</SelectItem>
                <SelectItem value="Información errónea">
                  Información errónea
                </SelectItem>
                <SelectItem value="Datos incorrectos">
                  Datos incorrectos
                </SelectItem>
                <SelectItem value="Aclarar los resultados">
                  Aclarar los resultados
                </SelectItem>
                <SelectItem value="Otros">Otros</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col gap-2 w-full mt-3">
              <Label htmlFor="describe">Describe el motivo</Label>
              <Textarea
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <Button
          disabled={loading || !value.reason || !value.description}
          variant={"primary"}
          size={"lg"}
          className="text-[16px]"
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="loader-button"></div>
          ) : (
            "Devolver solicitud"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnRequestModal;
