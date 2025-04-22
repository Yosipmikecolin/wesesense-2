"use client";

import { useState } from "react";
import { PlusCircle, Eye } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { DropdownFilter } from "@/components";

interface Training {
  id: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  topic: string;
  attendeeCount: number;
  city: string;
  location: string;
  responsiblePerson: string;
  notes: string;
}

const filters = [
  { id: 1, name: "Fecha" },
  { id: 2, name: "Tema" },
  { id: 3, name: "Ciudad" },
];

export default function TrainingView() {
  const [idFilter, setIdFilter] = useState(1);
  const [trainings, setTrainings] = useState<Training[]>(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: (i + 1).toString(),
      startDate: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000),
      startTime: `${8 + i}:00`,
      endTime: `${12 + i}:00`,
      topic: `Capacitación en ${
        [
          "Seguridad",
          "Primeros Auxilios",
          "Protocolos",
          "Sistemas",
          "Procedimientos",
        ][i]
      }`,
      attendeeCount: 10 + i * 5,
      city: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"][i],
      location: `Sede ${["Principal", "Norte", "Sur", "Este", "Oeste"][i]}`,
      responsiblePerson: `Instructor ${i + 1}`,
      notes: `Notas para la capacitación ${
        i + 1
      }. Esta capacitación se enfoca en ${
        [
          "seguridad",
          "primeros auxilios",
          "protocolos",
          "sistemas",
          "procedimientos",
        ][i]
      }.`,
    }));
  });

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsTraining, setDetailsTraining] = useState<Training | null>(null);

  const [newTraining, setNewTraining] = useState<Partial<Training>>({
    startDate: new Date(),
    startTime: "09:00",
    endTime: "12:00",
  });
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const handleCreateTraining = () => {
    if (
      !newTraining.startDate ||
      !newTraining.startTime ||
      !newTraining.endTime ||
      !newTraining.topic ||
      !newTraining.attendeeCount ||
      !newTraining.city ||
      !newTraining.location ||
      !newTraining.responsiblePerson
    ) {
      return;
    }

    const training: Training = {
      id: Date.now().toString(),
      startDate: newTraining.startDate,
      startTime: newTraining.startTime,
      endTime: newTraining.endTime,
      topic: newTraining.topic,
      attendeeCount: Number(newTraining.attendeeCount),
      city: newTraining.city,
      location: newTraining.location,
      responsiblePerson: newTraining.responsiblePerson,
      notes: newTraining.notes || "",
    };

    setTrainings([...trainings, training]);
    setNewTraining({
      startDate: new Date(),
      startTime: "09:00",
      endTime: "12:00",
    });
    setOpenNewDialog(false);
  };

  const handleOpenDetailsDialog = (training: Training) => {
    setDetailsTraining(training);
    setOpenDetailsDialog(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Capacitaciones desarrolladas
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
                Crear capacitación
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nueva capacitación</DialogTitle>
                <DialogDescription>
                  Complete los detalles para registrar una nueva capacitación.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">
                    Fecha de inicio de capacitación
                  </Label>
                  <DatePicker
                    date={newTraining.startDate}
                    setDate={(date) =>
                      setNewTraining({ ...newTraining, startDate: date })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Hora de inicio</Label>
                    <TimePicker
                      time={newTraining.startTime || ""}
                      setTime={(time) =>
                        setNewTraining({ ...newTraining, startTime: time })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">Hora final</Label>
                    <TimePicker
                      time={newTraining.endTime || ""}
                      setTime={(time) =>
                        setNewTraining({ ...newTraining, endTime: time })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Tema de la capacitación</Label>
                  <Input
                    id="topic"
                    value={newTraining.topic || ""}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, topic: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attendeeCount">Cantidad de personas</Label>
                  <Input
                    id="attendeeCount"
                    type="number"
                    min="1"
                    value={newTraining.attendeeCount || ""}
                    onChange={(e) =>
                      setNewTraining({
                        ...newTraining,
                        attendeeCount: +e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={newTraining.city || ""}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, city: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Locación</Label>
                  <Input
                    id="location"
                    value={newTraining.location || ""}
                    onChange={(e) =>
                      setNewTraining({
                        ...newTraining,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsiblePerson">
                    Persona encargada de la capacitación
                  </Label>
                  <Input
                    id="responsiblePerson"
                    value={newTraining.responsiblePerson || ""}
                    onChange={(e) =>
                      setNewTraining({
                        ...newTraining,
                        responsiblePerson: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Nota</Label>
                  <Textarea
                    id="notes"
                    value={newTraining.notes || ""}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, notes: e.target.value })
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
                <Button onClick={handleCreateTraining}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tema</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Locación</TableHead>
                  <TableHead>Asistentes</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainings.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      No hay capacitaciones registradas
                    </TableCell>
                  </TableRow>
                ) : (
                  trainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell>
                        {format(training.startDate, "dd/MM/yyyy", {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell>{training.topic}</TableCell>
                      <TableCell>{training.city}</TableCell>
                      <TableCell>{training.location}</TableCell>
                      <TableCell>{training.attendeeCount}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetailsDialog(training)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <DetailsDialog
            open={openDetailsDialog}
            onOpenChange={setOpenDetailsDialog}
            training={detailsTraining}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  training: Training | null;
}

function DetailsDialog({ open, onOpenChange, training }: DetailsDialogProps) {
  if (!training) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles de la capacitación</DialogTitle>
          <DialogDescription>
            Información completa de la capacitación seleccionada.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Fecha de inicio:</h3>
              <p>{format(training.startDate, "dd/MM/yyyy", { locale: es })}</p>
            </div>
            <div>
              <h3 className="font-medium">Horario:</h3>
              <p>
                {training.startTime} - {training.endTime}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Tema de la capacitación:</h3>
            <p>{training.topic}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Ciudad:</h3>
              <p>{training.city}</p>
            </div>
            <div>
              <h3 className="font-medium">Locación:</h3>
              <p>{training.location}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Cantidad de personas:</h3>
            <p>{training.attendeeCount}</p>
          </div>

          <div>
            <h3 className="font-medium">Persona encargada:</h3>
            <p>{training.responsiblePerson}</p>
          </div>

          <div>
            <h3 className="font-medium">Notas:</h3>
            <p className="whitespace-pre-wrap">{training.notes}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
