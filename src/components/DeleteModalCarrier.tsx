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

interface Props {
  id?: string;
  open: boolean;
  refetch: VoidFunction;
  onClose: VoidFunction;
}

const DeleteModalCarrier = ({ id, open, onClose, refetch }: Props) => {
  const { setToken, token } = useBuddieStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (id) {
      try {
        setLoading(true);
        // await deleteCarrier(id);
        const wearer_id = id;
        const response_delete = await axios.post("/api/buddie", {
          method: "setup.wearer.delete",
          token,
          wearer_id,
        });
        setToken(response_delete.data.csrf_token);
        console.log("DELETE: ", response_delete.data);
        toast.success("Eliminado exitosamente");
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
          <DialogTitle className="text-xl font-semibold text-center">
            Eliminar portador
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-center">
            Estas seguro que deseas eliminar el portador
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
            {loading ? <div className="loader-button-2" /> : "Eliminar usuario"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModalCarrier;
