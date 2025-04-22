import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/db/user";
import { Circle } from "lucide-react";

interface Props {
  user?: User;
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ user, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Detalles de usuario
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4">
              <span className="text-sm text-gray-500">Nombre</span>
              <span className="font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center pb-4">
              <span className="text-sm text-gray-500">NIT</span>
              <span className="font-mono">{user?.nit}</span>
            </div>
            <div className="flex justify-between items-center pb-4">
              <span className="text-sm text-gray-500">Perfil</span>
              <span className="font-medium">{user?.perfil}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Estado</span>
              <span
                className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                  user?.status === "Activo"
                    ? "bg-green-400 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user?.status === "Activo" ? (
                  "● Activo"
                ) : (
                  <div className="flex items-center gap-1">
                    <Circle size={7} /> Inactivo
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
