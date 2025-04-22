import { deleteRequester } from "@/api/request";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id?: string;
  open: boolean;
  refetch: VoidFunction;
  onClose: VoidFunction;
}

const DeleteModalRequester = ({ id, open, onClose, refetch }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        setLoading(true);
        await deleteRequester(id);
        refetch();
        toast.success("Eliminado exitosamente");
        onClose();
      } catch (error) {
        toast.error("Error al eliminar el requirente");
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
          <DialogTitle className="text-xl font-semibold text-center">
            Eliminar requirente
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-center">
            Estas seguro que deseas eliminar el requirente
          </p>
          <br />
          <Button
            variant={"destructive"}
            size={"lg"}
            className="w-full mt-2 text-md"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="loader-button-2" />
            ) : (
              "Eliminar requirente"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModalRequester;
