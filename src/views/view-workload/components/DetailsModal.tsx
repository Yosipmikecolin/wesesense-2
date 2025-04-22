import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface Props {
  workLoad?: {
    id: number;
    name: string;
    openCases: number;
    closedCases: number;
    laborLoad: number;
  };
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ workLoad, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="mb-2">Detalles del trabajador</DialogTitle>
          <hr />
        </DialogHeader>
        <div className="grid gap-4 mt-3">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Nombre completo:</span>
            <span>{workLoad?.name}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Casos abiertos:</span>
            <span>{workLoad?.openCases}</span>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Casos cerrados:</span>
            <span>{workLoad?.closedCases}</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={workLoad?.laborLoad} className="w-full" />
            <span className="text-sm font-medium">{workLoad?.laborLoad}%</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
