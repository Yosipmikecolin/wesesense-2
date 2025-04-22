import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getDate } from "@/functions";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User } from "@/db/user";
import { updatedUser } from "@/api/request";

interface Props {
  user?: User;
  open: boolean;
  onClose: VoidFunction;
  refetch: VoidFunction;
}

const UpdatedUserModal = ({ user, open, onClose, refetch }: Props) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    nit: "",
    perfil: "",
    status: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (Object.values(formData).some((value) => value === "")) {
        setError(true);
      } else {
        await updatedUser({
          ...formData,
          creation_date: user?.creation_date || "",
        });
        toast.success("Usuario actualizado");
        refetch();
        setError(false);

        onClose();
        setFormData({
          _id: "",
          name: "",
          nit: "",
          perfil: "",
          status: "",
          email: "",
          phone: "",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Editar usuario
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Juan"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit">NIT</Label>
            <Input
              id="nit"
              name="nit"
              value={formData.nit}
              onChange={handleInputChange}
              placeholder="538473882"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nit">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="juan@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="9 1234 5678"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile">Perfil</Label>
            <Select
              name="perfil"
              value={formData.perfil}
              onValueChange={(value) => handleSelectChange("perfil", value)}
            >
              <SelectTrigger id="perfil">
                <SelectValue placeholder="Seleccione un perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Requirente">Requirente</SelectItem>
                <SelectItem value="Coordinador">Coordinador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <span className="text-xs text-red-600">
              Por favor, complete todos los campos
            </span>
          )}
          <Button
            variant={"primary"}
            className="w-full mt-2"
            type="submit"
            disabled={loading}
          >
            {loading ? <div className="loader-button" /> : "Crear usuario"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatedUserModal;
