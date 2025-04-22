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
import { DatePicker } from "../training/date-picker";
import { TimePicker } from "../training/time-picker";
import { DropdownFilter } from "@/components";

interface SatellitePhoneTest {
  id: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  testReason: string;
  deviceSerials: string;
  city: string;
  location: string;
  responsiblePerson: string;
  notes: string;
}

const filters = [
  { id: 1, name: "Fecha" },
  { id: 2, name: "Motivo" },
  { id: 3, name: "Ciudad" },
];

export default function SatellitePhoneTestView() {
  const [idFilter, setIdFilter] = useState(1);
  const [tests, setTests] = useState<SatellitePhoneTest[]>(() => {
    // Generate 5 sample test records
    return Array.from({ length: 5 }, (_, i) => ({
      id: (i + 1).toString(),
      startDate: new Date(Date.now() - i * 14 * 24 * 60 * 60 * 1000), // Each two weeks apart
      startTime: `${9 + i}:00`,
      endTime: `${10 + i}:30`,
      testReason: [
        "Mantenimiento preventivo",
        "Verificación de cobertura",
        "Prueba de batería",
        "Actualización de firmware",
        "Prueba de emergencia",
      ][i],
      deviceSerials: `SAT-${1000 + i * 100}, SAT-${1001 + i * 100}`,
      city: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"][i],
      location: `Zona ${["Norte", "Sur", "Este", "Oeste", "Central"][i]}`,
      responsiblePerson: `Técnico ${i + 1}`,
      notes: `Notas para la prueba ${
        i + 1
      }. Esta prueba se realizó para verificar ${
        [
          "la conectividad",
          "la duración de la batería",
          "la calidad de la señal",
          "el funcionamiento general",
          "la respuesta en emergencias",
        ][i]
      }.`,
    }));
  });

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsTest, setDetailsTest] = useState<SatellitePhoneTest | null>(
    null
  );

  const [newTest, setNewTest] = useState<Partial<SatellitePhoneTest>>({
    startDate: new Date(),
    startTime: "09:00",
    endTime: "10:30",
  });
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const handleCreateTest = () => {
    if (
      !newTest.startDate ||
      !newTest.startTime ||
      !newTest.endTime ||
      !newTest.testReason ||
      !newTest.deviceSerials ||
      !newTest.city ||
      !newTest.location ||
      !newTest.responsiblePerson
    ) {
      return;
    }

    const test: SatellitePhoneTest = {
      id: Date.now().toString(),
      startDate: newTest.startDate,
      startTime: newTest.startTime,
      endTime: newTest.endTime,
      testReason: newTest.testReason,
      deviceSerials: newTest.deviceSerials,
      city: newTest.city,
      location: newTest.location,
      responsiblePerson: newTest.responsiblePerson,
      notes: newTest.notes || "",
    };

    setTests([...tests, test]);
    setNewTest({
      startDate: new Date(),
      startTime: "09:00",
      endTime: "10:30",
    });
    setOpenNewDialog(false);
  };

  const handleOpenDetailsDialog = (test: SatellitePhoneTest) => {
    setDetailsTest(test);
    setOpenDetailsDialog(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Registro de pruebas de teléfonos satelitales
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
                Crear prueba
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nueva prueba de teléfono satelital</DialogTitle>
                <DialogDescription>
                  Complete los detalles para registrar una nueva prueba.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="testReason">Persona encargada</Label>
                  <Input
                    id="testReason"
                    onChange={(e) =>
                      setNewTest({ ...newTest, testReason: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="startDate">
                    Fecha de inicio de la prueba
                  </Label>
                  <DatePicker
                    date={newTest.startDate}
                    setDate={(date) =>
                      setNewTest({ ...newTest, startDate: date })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Hora de inicio</Label>
                    <TimePicker
                      time={newTest.startTime || ""}
                      setTime={(time) =>
                        setNewTest({ ...newTest, startTime: time })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">Hora final</Label>
                    <TimePicker
                      time={newTest.endTime || ""}
                      setTime={(time) =>
                        setNewTest({ ...newTest, endTime: time })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="testReason">Latitud</Label>
                  <Input
                    type="number"
                    id="testReason"
                    onChange={(e) =>
                      setNewTest({ ...newTest, testReason: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="testReason">Longitud</Label>
                  <Input
                    type="number"
                    id="testReason"
                    onChange={(e) =>
                      setNewTest({ ...newTest, testReason: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deviceSerials">
                    Seriales de los dispositivos
                  </Label>
                  <Textarea
                    id="deviceSerials"
                    value={newTest.deviceSerials || ""}
                    onChange={(e) =>
                      setNewTest({ ...newTest, deviceSerials: e.target.value })
                    }
                    placeholder="Ingrese los seriales separados por comas"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={newTest.city || ""}
                    onChange={(e) =>
                      setNewTest({ ...newTest, city: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Locación</Label>
                  <Input
                    id="location"
                    value={newTest.location || ""}
                    onChange={(e) =>
                      setNewTest({ ...newTest, location: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsiblePerson">
                    Persona encargada de la prueba
                  </Label>
                  <Input
                    id="responsiblePerson"
                    value={newTest.responsiblePerson || ""}
                    onChange={(e) =>
                      setNewTest({
                        ...newTest,
                        responsiblePerson: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Nota</Label>
                  <Textarea
                    id="notes"
                    value={newTest.notes || ""}
                    onChange={(e) =>
                      setNewTest({ ...newTest, notes: e.target.value })
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
                <Button onClick={handleCreateTest}>Guardar</Button>
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
                  <TableHead>Motivo</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Locación</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      No hay pruebas registradas
                    </TableCell>
                  </TableRow>
                ) : (
                  tests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>
                        {format(test.startDate, "dd/MM/yyyy", { locale: es })}
                      </TableCell>
                      <TableCell>{test.testReason}</TableCell>
                      <TableCell>{test.city}</TableCell>
                      <TableCell>{test.location}</TableCell>
                      <TableCell>{test.responsiblePerson}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetailsDialog(test)}
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
            test={detailsTest}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  test: SatellitePhoneTest | null;
}

function DetailsDialog({ open, onOpenChange, test }: DetailsDialogProps) {
  if (!test) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles de la prueba</DialogTitle>
          <DialogDescription>
            Información completa de la prueba de teléfono satelital
            seleccionada.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Fecha de inicio:</h3>
              <p>{format(test.startDate, "dd/MM/yyyy", { locale: es })}</p>
            </div>
            <div>
              <h3 className="font-medium">Horario:</h3>
              <p>
                {test.startTime} - {test.endTime}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Motivo de la prueba:</h3>
            <p>{test.testReason}</p>
          </div>

          <div>
            <h3 className="font-medium">Seriales de los dispositivos:</h3>
            <p className="whitespace-pre-wrap">{test.deviceSerials}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Ciudad:</h3>
              <p>{test.city}</p>
            </div>
            <div>
              <h3 className="font-medium">Locación:</h3>
              <p>{test.location}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Persona encargada:</h3>
            <p>{test.responsiblePerson}</p>
          </div>

          <div>
            <h3 className="font-medium">Notas:</h3>
            <p className="whitespace-pre-wrap">{test.notes}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
