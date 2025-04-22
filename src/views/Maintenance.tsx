"use client";

import { useState } from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateTimePicker } from "./date-time-picker";
import { DropdownFilter } from "@/components";

type MaintenanceType = "Preventivo" | "Correctivo";

interface Maintenance {
  id: string;
  dateTime: Date;
  type: MaintenanceType;
  centralName: string;
  equipmentSerials: string;
  notes: string;
  responsiblePerson: string;
  visitCompleted?: boolean;
  visitNotes?: string;
}

const filters = [
  { id: 1, name: "Fecha" },
  { id: 2, name: "Tipo" },
  { id: 3, name: "Central" },
];

export default function MaintenanceView() {
  // Replace the initial useState for maintenances with this to have 5 sample records
  const [maintenances, setMaintenances] = useState<Maintenance[]>(() => {
    // Generate 5 sample maintenance records
    return Array.from({ length: 5 }, (_, i) => ({
      id: (i + 1).toString(),
      dateTime: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Each a day apart
      type: i % 2 === 0 ? "Preventivo" : ("Correctivo" as MaintenanceType),
      centralName: `Central ${i + 1}`,
      equipmentSerials: `SN-${100 + i}, SN-${200 + i}`,
      notes: `Notas para el mantenimiento ${i + 1}. Este es un mantenimiento ${
        i % 2 === 0 ? "preventivo" : "correctivo"
      }.`,
      responsiblePerson: `Técnico ${i + 1}`,
      visitCompleted: i < 3 ? (i < 2 ? true : false) : undefined,
      visitNotes: i < 3 ? `Comentarios de la visita ${i + 1}` : undefined,
    }));
  });

  // Add a new state for the details dialog
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [idFilter, setIdFilter] = useState(1);
  const [detailsMaintenance, setDetailsMaintenance] =
    useState<Maintenance | null>(null);

  const [newMaintenance, setNewMaintenance] = useState<Partial<Maintenance>>({
    dateTime: new Date(),
    type: "Preventivo",
  });
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [openVisitDialog, setOpenVisitDialog] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<Maintenance | null>(null);

  const handleCreateMaintenance = () => {
    if (
      !newMaintenance.dateTime ||
      !newMaintenance.type ||
      !newMaintenance.centralName ||
      !newMaintenance.equipmentSerials ||
      !newMaintenance.notes ||
      !newMaintenance.responsiblePerson
    ) {
      return;
    }

    const maintenance: Maintenance = {
      id: Date.now().toString(),
      dateTime: newMaintenance.dateTime,
      type: newMaintenance.type as MaintenanceType,
      centralName: newMaintenance.centralName,
      equipmentSerials: newMaintenance.equipmentSerials,
      notes: newMaintenance.notes,
      responsiblePerson: newMaintenance.responsiblePerson,
    };

    setMaintenances([...maintenances, maintenance]);
    setNewMaintenance({
      dateTime: new Date(),
      type: "Preventivo",
    });
    setOpenNewDialog(false);
  };

  const handleOpenVisitDialog = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setOpenVisitDialog(true);
  };

  // Add a new function to handle opening the details dialog
  const handleOpenDetailsDialog = (maintenance: Maintenance) => {
    setDetailsMaintenance(maintenance);
    setOpenDetailsDialog(true);
  };

  const handleSaveVisit = (completed: boolean, notes: string) => {
    if (!selectedMaintenance) return;

    const updatedMaintenances = maintenances.map((m) =>
      m.id === selectedMaintenance.id
        ? { ...m, visitCompleted: completed, visitNotes: notes }
        : m
    );

    setMaintenances(updatedMaintenances);
    setOpenVisitDialog(false);
    setSelectedMaintenance(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Mantenimientos preventivos y correctivos
        </CardTitle>
        <div className="flex gap-2">
          <Input
            maxLength={30}
            placeholder={`Buscar por ${filters
              .find((i) => i.id === idFilter)
              ?.name.toLowerCase()}`}
          />
          <DropdownFilter
            filters={filters}
            idFilter={idFilter}
            setIdFilter={setIdFilter}
          />
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Dialog open={openNewDialog} onOpenChange={setOpenNewDialog}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Crear mantenimiento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nuevo mantenimiento</DialogTitle>
                <DialogDescription>
                  Complete los detalles para crear un nuevo mantenimiento.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Fecha y hora</Label>
                  <DateTimePicker
                    date={newMaintenance.dateTime}
                    setDate={(date) =>
                      setNewMaintenance({ ...newMaintenance, dateTime: date })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo de mantenimiento</Label>
                  <Select
                    value={newMaintenance.type}
                    onValueChange={(value) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        type: value as MaintenanceType,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Preventivo">Preventivo</SelectItem>
                      <SelectItem value="Correctivo">Correctivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="central">
                    Nombre de la Central de monitoreo
                  </Label>
                  <Input
                    id="central"
                    value={newMaintenance.centralName || ""}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        centralName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="serials">
                    Seriales de los equipos de cómputo
                  </Label>
                  <Textarea
                    id="serials"
                    value={newMaintenance.equipmentSerials || ""}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        equipmentSerials: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Nota del mantenimiento</Label>
                  <Textarea
                    id="notes"
                    value={newMaintenance.notes || ""}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsible">Nombre del responsable</Label>
                  <Input
                    id="responsible"
                    value={newMaintenance.responsiblePerson || ""}
                    onChange={(e) =>
                      setNewMaintenance({
                        ...newMaintenance,
                        responsiblePerson: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenNewDialog(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateMaintenance}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Central</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Estado de visita</TableHead>
                  <TableHead>Detalles</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenances.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      No hay mantenimientos registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  maintenances.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell>
                        {format(maintenance.dateTime, "dd/MM/yyyy HH:mm", {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell>{maintenance.type}</TableCell>
                      <TableCell>{maintenance.centralName}</TableCell>
                      <TableCell>{maintenance.responsiblePerson}</TableCell>
                      <TableCell>
                        {maintenance.visitCompleted === undefined
                          ? "Pendiente"
                          : maintenance.visitCompleted
                          ? "Completada"
                          : "No realizada"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetailsDialog(maintenance)}
                        >
                          Ver detalles
                        </Button>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleOpenVisitDialog(maintenance)}
                            >
                              Visita
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <VisitDialog
            open={openVisitDialog}
            onOpenChange={setOpenVisitDialog}
            onSave={handleSaveVisit}
            maintenance={selectedMaintenance}
          />
          <DetailsDialog
            open={openDetailsDialog}
            onOpenChange={setOpenDetailsDialog}
            maintenance={detailsMaintenance}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface VisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (completed: boolean, notes: string) => void;
  maintenance: Maintenance | null;
}

function VisitDialog({
  open,
  onOpenChange,
  onSave,
  maintenance,
}: VisitDialogProps) {
  const [visitCompleted, setVisitCompleted] = useState<string>("true");
  const [visitNotes, setVisitNotes] = useState("");

  if (!maintenance) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gestionar visita</DialogTitle>
          <DialogDescription>
            Actualice el estado de la visita para el mantenimiento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>¿Se realizó la visita?</Label>
            <RadioGroup
              value={visitCompleted}
              onValueChange={setVisitCompleted}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="visit-yes" />
                <Label htmlFor="visit-yes">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="visit-no" />
                <Label htmlFor="visit-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="visit-notes">Comentario</Label>
            <Textarea
              id="visit-notes"
              value={visitNotes}
              onChange={(e) => setVisitNotes(e.target.value)}
              placeholder="Ingrese un comentario sobre la visita"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(visitCompleted === "true", visitNotes)}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maintenance: Maintenance | null;
}

function DetailsDialog({
  open,
  onOpenChange,
  maintenance,
}: DetailsDialogProps) {
  if (!maintenance) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del mantenimiento</DialogTitle>
          <DialogDescription>
            Información completa del mantenimiento seleccionado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Fecha y hora:</h3>
              <p>
                {format(maintenance.dateTime, "dd/MM/yyyy HH:mm", {
                  locale: es,
                })}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Tipo:</h3>
              <p>{maintenance.type}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Central de monitoreo:</h3>
            <p>{maintenance.centralName}</p>
          </div>

          <div>
            <h3 className="font-medium">Seriales de equipos:</h3>
            <p className="whitespace-pre-wrap">
              {maintenance.equipmentSerials}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Notas del mantenimiento:</h3>
            <p className="whitespace-pre-wrap">{maintenance.notes}</p>
          </div>

          <div>
            <h3 className="font-medium">Responsable:</h3>
            <p>{maintenance.responsiblePerson}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium">Estado de la visita:</h3>
            <p>
              {maintenance.visitCompleted === undefined
                ? "Pendiente"
                : maintenance.visitCompleted
                ? "Completada"
                : "No realizada"}
            </p>
          </div>

          {maintenance.visitNotes && (
            <div>
              <h3 className="font-medium">Comentarios de la visita:</h3>
              <p className="whitespace-pre-wrap">{maintenance.visitNotes}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
