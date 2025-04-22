import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Requester } from "@/db/requester";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { BriefcaseBusiness, Gavel, UserCheck } from "lucide-react";

interface Props {
  requester?: Requester;
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ requester, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detalles del requirente
          </DialogTitle>
          <hr />
        </DialogHeader>
        <div className="grid gap-4 mt-3">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Nombre completo:</span>
            <span>{requester?.fullName}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Tipo:</span>
            <div className="w-28 flex items-center justify-between gap-2 bg-green-400 text-white py-1 px-2 font-bold rounded-md">
              {requester?.userType === "Abogado particular"
                ? "Abogado"
                : requester?.userType}

              {requester?.userType === "Defensor" && <Gavel size={15} />}

              {requester?.userType === "Abogado particular" && (
                <BriefcaseBusiness size={15} />
              )}

              {requester?.userType === "Otro" && <UserCheck size={15} />}
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Telefono:</span>
            <span className="flex gap-2">{requester?.phone}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Fecha de registro:</span>
            <span>{requester?.registrationDate}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Institución:</span>
            <span>{requester?.institution}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Número de identificación:</span>
            <span>{requester?.identificationNumber}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">RUN:</span>
            <span>{requester?.run}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Ciudad:</span>
            <span>{requester?.region}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Dirección:</span>
            <span>{requester?.address}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Áreas de acceso:</span>
            <span>{requester?.accessAreas}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Verificación de identidad:</span>
            <span>{requester?.identityVerification}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Pregunta de seguridad:</span>
            <span>{requester?.securityQuestion}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Observaciones:</span>
            <span>{requester?.observations}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
