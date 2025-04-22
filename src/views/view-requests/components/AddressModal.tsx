import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhotoUpload from "./PhotoUpload";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Foto1 from "/public/foto-1.jpg";
import Foto2 from "/public/foto-2.jpg";
import Foto3 from "/public/foto-3.jpg";
import Foto4 from "/public/foto-4.jpg";
import dynamic from "next/dynamic";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { updatedRequest } from "@/api/request";
import toast from "react-hot-toast";
import { getDate } from "@/functions";
import { UploadButtonWithModal } from "@/components/upload-file/upload-button-with-modal";
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

interface AddressModalProps {
  request?: RequestTable;
  isOpen: boolean;
  onClose: () => void;
  refetch: VoidFunction;
}

const AddressModal = ({
  isOpen,
  onClose,
  request,
  refetch,
}: AddressModalProps) => {
  const [status, setStatus] = useState<string>("");
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });

  const [_images, setImages] = useState<File[]>([]);
  const [minimumCoverage, setMinimumCoverage] = useState<string>("");
  const [indicationAspects, setIndicationAspects] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cleanInputs = () => {
    setStatus("");
    setCoordinates({
      lat: "",
      lng: "",
    });
    setValue("");
    setIndicationAspects("");
    setMinimumCoverage("");
  };

  function getHour(): string {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    const segundos = ahora.getSeconds().toString().padStart(2, "0");

    return `${horas}:${minutos}:${segundos}`;
  }

  const handleSubmit = async () => {
    if (request) {
      setIsLoading(true);
      try {
        await updatedRequest({
          ...request,
          response_date: getDate() + " - " + getHour(),
          time_respond: "",
          answer: status,
          status: "answered",
          awardee_response: {
            status,
            length: coordinates.lng,
            latitude: coordinates.lat,
            minimum_coverage: minimumCoverage,
            indication_aspects: indicationAspects,
            photographic_evidence: [],
            value,
          },
        });
        refetch();
        toast.success("Solicitud gestionada");
        cleanInputs();
        onClose();
      } catch (error) {
        toast.error("Error al gestionar la solicitud");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl mb-3">
            Gestionar solicitud
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="calificacion">Estado</Label>
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger id="calificacion">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positivo</SelectItem>
                  <SelectItem value="negative">Negativo</SelectItem>
                  <SelectItem value="not-recommended">
                    No recomendable
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="cobertura">Cobertura mínima</Label>
              <Input
                id="cobertura"
                type="number"
                min="0"
                max="100"
                value={minimumCoverage}
                onChange={(e) => setMinimumCoverage(e.target.value)}
              />
            </div>
          </div>
          {status === "no-recomendable" && (
            <div className="flex flex-col gap-2 w-full">
              <Label>Motivos por los que no es recomendable</Label>
              <Textarea />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <Label>Ubicación</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={15} />
                  </TooltipTrigger>
                  <TooltipContent className="w-44">
                    Para obtener la ubicación exacta, por favor, introduce las
                    coordenadas de latitud y longitud
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex justify-between gap-2 mb-2">
              <Input
                type="text"
                placeholder="Latitud"
                value={coordinates.lat}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^-?\d*\.?\d*$/.test(value)) return;
                  if (value.length <= 30) {
                    setCoordinates((prev) => ({
                      ...prev,
                      lat: value,
                    }));
                  }
                }}
              />
              <Input
                type="text"
                placeholder="Longitud"
                value={coordinates.lng}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^-?\d*\.?\d*$/.test(value)) return;
                  if (value.length <= 30) {
                    setCoordinates((prev) => ({
                      ...prev,
                      lng: value,
                    }));
                  }
                }}
              />
            </div>
            <div className="animate-pulse bg-gray-200 rounded-md h-[200px] w-full overflow-hidden">
              <Map
                latitude={Number(coordinates.lat) || -33.46651382914682}
                longitude={Number(coordinates.lng) || -70.66412385948745}
              />
            </div>
          </div>

          {request?.status === "return" && (
            <div>
              <Label htmlFor="note">Observación respuesta de devolución</Label>
              <Textarea id="note" name="note" required />
            </div>
          )}

          <div className="flex justify-between items-center gap-2 mb-2">
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="calificacion">Indicación de aspectos</Label>
              <Select
                onValueChange={setIndicationAspects}
                value={indicationAspects}
              >
                <SelectTrigger id="options">
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geográficos">Geográficos</SelectItem>
                  <SelectItem value="habitacionales">Habitacionales</SelectItem>
                  <SelectItem value="infraestructura">
                    Infraestructura
                  </SelectItem>
                  <SelectItem value="conectividad">Conectividad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="value">Valor</Label>
              <Input
                placeholder="Valor"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        {status !== "positive" && (
          <div>
            <Label>Pruebas fotograficas</Label>
            <div className="flex gap-2 flex-wrap">
              <Image
                width={70}
                height={70}
                src={Foto1}
                alt="foto-1"
                className="rounded-md"
              />

              <Image
                width={70}
                height={70}
                src={Foto2}
                alt="foto-2"
                className="rounded-md"
              />

              <Image
                width={70}
                height={70}
                src={Foto3}
                alt="foto-3"
                className="rounded-md"
              />

              <Image
                width={70}
                height={70}
                src={Foto4}
                alt="foto-4"
                className="rounded-md"
              />
            </div>
          </div>
        )}

        <UploadButtonWithModal />

        <DialogFooter className="flex items-center justify-between">
          {status !== "positive" && (
            <PhotoUpload onPhotosSelected={setImages} />
          )}
          <Button
            disabled={
              isLoading ||
              status === "" ||
              minimumCoverage === "" ||
              indicationAspects === "" ||
              value === "" ||
              coordinates.lat === "" ||
              coordinates.lng === ""
            }
            variant={"primary"}
            onClick={handleSubmit}
          >
            {isLoading ? <div className="loader-button" /> : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
