import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Requester } from "@/db/requester";
import toast from "react-hot-toast";
import { updatedRequester } from "@/api/request";

interface Props {
  requester?: Requester;
  open: boolean;
  onClose: VoidFunction;
  refetch: VoidFunction;
}

const UpdatedRequesterModal = ({
  requester,
  open,
  onClose,
  refetch,
}: Props) => {
  const [error, setError] = useState(false);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    lastName: "",
    middleName: "",
    email: "",
    run: "",
    phone: "",
    userType: "",
    institution: "",
    identificationNumber: "",
    region: "",
    address: "",
    accessAreas: "",
    identityVerification: "",
    securityQuestion: "",
    observations: "",
  });

  useEffect(() => {
    if (requester) {
      setFormData(requester);
    }
  }, [requester]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      setError(true);
    } else {
      setLoading(true);
      try {
        await updatedRequester({
          ...formData,
          registrationDate: requester?.registrationDate || "",
          run: "",
        });
        refetch();
        toast.success("Requirente actualizado");
        setError(false);
        onClose();
        setFormData({
          _id: "",
          fullName: "",
          lastName: "",
          middleName: "",
          email: "",
          run: "",
          phone: "",
          userType: "",
          institution: "",
          identificationNumber: "",
          region: "",
          address: "",
          accessAreas: "",
          identityVerification: "",
          securityQuestion: "",
          observations: "",
        });
      } catch (error) {
        toast.success("Error al actualizar el requirente");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="mb-2">Detalles del requirente</DialogTitle>
          <hr />
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jose"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alfonso@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido paterno</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Alfonso"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Apellido Materno</Label>
              <Input
                id="middleName"
                type="text"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Mingo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ruc">RUN</Label>
              <Input
                id="run"
                type="number"
                value={formData.run}
                onChange={handleChange}
                placeholder="34234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="94636234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de usuario</Label>
              <Select
                value={formData.userType}
                onValueChange={(value) => handleSelectChange("userType", value)}
              >
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Seleccione el tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Defensor">Defensor</SelectItem>
                  <SelectItem value="Abogado particular">
                    Abogado particular
                  </SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institución</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Unisanguil"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="identificationNumber">
                Número de Identificación
              </Label>
              <Input
                id="identificationNumber"
                type="number"
                value={formData.identificationNumber}
                onChange={handleChange}
                placeholder="3782901"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Región</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="Santiago"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Cra 312 # 43"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessAreas">Áreas de Acceso</Label>
              <Input
                id="accessAreas"
                value={formData.accessAreas}
                onChange={handleChange}
                placeholder="Hospital"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationDate">Fecha de Registro</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    classNames={{
                      day_selected:
                        "bg-green-500 text-white hover:bg-green-500",
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="identityVerification">
                Verificación de Identidad
              </Label>
              <Select
                value={formData.identityVerification}
                onValueChange={(value) =>
                  handleSelectChange("identityVerification", value)
                }
              >
                <SelectTrigger id="identityVerification">
                  <SelectValue placeholder="Seleccione el tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cédula de ciudadanía">
                    Cédula de ciudadanía
                  </SelectItem>
                  <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                  <SelectItem value="Tarjeta de identidad">
                    Tarjeta de identidad
                  </SelectItem>
                  <SelectItem value="Licencia profesional">
                    Licencia profesional
                  </SelectItem>
                  <SelectItem value="Certificación técnica">
                    Certificación técnica
                  </SelectItem>
                  <SelectItem value="Tarjeta profesional">
                    Tarjeta profesional
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityQuestion">Pregunta de Seguridad</Label>
              <Input
                id="securityQuestion"
                placeholder="¿Cómo se llama tu madre?"
                value={formData.securityQuestion}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="observations">Observaciones</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={handleChange}
              placeholder="Es bajo y agresivo"
            />
          </div>
          {error && (
            <span className="text-xs text-red-600 block">
              Por favor, complete todos los campos
            </span>
          )}
          <Button
            variant={"primary"}
            className="w-1/2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <span>Actualizando requirente</span>
                <div className="loader-button" />
              </div>
            ) : (
              "Actualizar requirente"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatedRequesterModal;
