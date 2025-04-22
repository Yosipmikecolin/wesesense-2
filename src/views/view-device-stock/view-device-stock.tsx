"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Eye, Ellipsis, Send, Edit, Delete } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { DropdownFilter } from "@/components";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";

interface DeviceStock {
  _id: string;
  region: string;
  smart_tack: number;
  charger_obc: number;
  adapter_obd: number;
  beacon: number;
  victim_device: number;
  victim_charger: number;
  notes: string;
}

interface Stock {
  _id?: string;
  region: string;
  smart_tack: number;
  charger_obc: number;
  adapter_obd: number;
  beacon: number;
  victim_device: number;
  victim_charger: number;
  notes: string;
}

const filters = [{ id: 1, name: "Región" }];

export default function ViewDeviceStock() {
  const [idFilter, setIdFilter] = useState(1);
  const [isUpdateStock, setIsUpdateStock] = useState(false);
  const [stocks, setStocks] = useState<DeviceStock[]>([]);
  // const [currentStock, setCurrentStock] = useState<DeviceStock>();
  const [formData, setFormData] = useState<Stock>({
    _id: "",
    region: "",
    smart_tack: 0,
    charger_obc: 0,
    adapter_obd: 0,
    beacon: 0,
    victim_device: 0,
    victim_charger: 0,
    notes: "",
  });

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsStock, setDetailsStock] = useState<DeviceStock | null>(null);

  // const [newStock, setNewStock] = useState<Partial<DeviceStock>>({
  //   lastUpdated: new Date(),
  // });
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const handleCreateStock = () => {
    if (isUpdateStock) {
      update();
    } else {
      save();
    }
    setOpenNewDialog(false);
  };

  const handleOpenDetailsDialog = (stock: DeviceStock) => {
    setDetailsStock(stock);
    setOpenDetailsDialog(true);
  };

  // Function to determine stock status color
  const getStockStatusColor = (quantity: number) => {
    if (quantity <= 3) return "destructive";
    if (quantity <= 7) return "warning";
    return "default";
  };

  const getAllStocks = async () => {
    const response = await axios.get<DeviceStock[]>(`/api/contract/devices`);
    setStocks(response.data);
    return response.data;
  };

  const useQueryAll = () => {
    return useQuery({
      queryKey: ["all_stocks"],
      queryFn: () => getAllStocks(),
      // refetchInterval: 5000
    });
  };

  const { data, isLoading, refetch } = useQueryAll();

  const save = async () => {
    const response = await axios.post<DeviceStock[]>(
      `/api/contract/devices`,
      formData
    );
    refetch();
    console.log("SAVE: ", response.data);
    return response.data;
  };

  const update = async () => {
    const response = await axios.put<DeviceStock[]>(
      `/api/contract/devices`,
      formData
    );
    refetch();
    return response.data;
  };

  useEffect(() => {
    getAllStocks();
  }, []);

  const onUpdateStock = (stock: DeviceStock) => {
    setIsUpdateStock(true);
    setOpenNewDialog(true);
    setFormData(stock);
    // setCurrentStock(stock);
  };

  const onCreateStock = () => {
    setIsUpdateStock(false);
    setOpenNewDialog(true);
  };

  const onDeleteStock = async (stock: DeviceStock) => {
    const response = await axios.delete(`/api/contract/devices`, {
      params: {
        id: stock._id,
      },
    });
    refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Stock de Dispositivos por Región
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
            {/* <DialogTrigger asChild> */}
            <Button onClick={onCreateStock}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Crear Stock
            </Button>
            {/* </DialogTrigger> */}
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {isUpdateStock ? "Actualizar" : "Nuevo"} Registro de Stock
                </DialogTitle>
                <DialogDescription>
                  Complete los detalles para registrar el stock de dispositivos
                  para una región.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="region">Región</Label>
                  <Input
                    id="region"
                    value={formData.region || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        region: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="aggressorDevice">Dispositivo Agresor</Label>
                    <Input
                      id="aggressorDevice"
                      type="number"
                      min="0"
                      value={formData.smart_tack || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          smart_tack: +e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="obcCharger">Cargador OBC</Label>
                    <Input
                      id="obcCharger"
                      type="number"
                      min="0"
                      value={formData.charger_obc || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          charger_obc: +e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="obdAdapter">Adaptador OBD</Label>
                    <Input
                      id="obdAdapter"
                      type="number"
                      min="0"
                      value={formData.adapter_obd || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          adapter_obd: +e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="beacon">BEACON</Label>
                    <Input
                      id="beacon"
                      type="number"
                      min="0"
                      value={formData.beacon || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          beacon: +e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="victimDevice">Dispositivo Víctima</Label>
                    <Input
                      id="victimDevice"
                      type="number"
                      min="0"
                      value={formData.victim_device || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          victim_device: +e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="victimCharger">Cargador Víctima</Label>
                    <Input
                      id="victimCharger"
                      type="number"
                      min="0"
                      value={formData.victim_charger || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          victim_charger: +e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Observaciones sobre el stock"
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
                <Button onClick={handleCreateStock}>
                  {isUpdateStock ? "Actualizar" : "Guardar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Región</TableHead>
                  <TableHead>Smart Tag</TableHead>
                  <TableHead>Cargador OBC</TableHead>
                  <TableHead>Adaptador OBD</TableHead>
                  <TableHead>BEACON</TableHead>
                  <TableHead>Dispositivo Víctima</TableHead>
                  <TableHead>Cargador Víctima</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data.map((stock) => (
                    <TableRow key={stock._id}>
                      <TableCell className="font-medium">
                        {stock.region}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockStatusColor(stock.smart_tack)}>
                          {stock.smart_tack}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockStatusColor(stock.charger_obc)}>
                          {stock.charger_obc}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockStatusColor(stock.adapter_obd)}>
                          {stock.adapter_obd}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStockStatusColor(stock.beacon)}>
                          {stock.beacon}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStockStatusColor(stock.victim_device)}
                        >
                          {stock.victim_device}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStockStatusColor(stock.victim_charger)}
                        >
                          {stock.victim_charger}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDetailsDialog(stock)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                            <Ellipsis />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => handleOpenDetailsDialog(stock)}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Eye />
                                </Button>
                                <span>Ver detalles</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                onUpdateStock(stock);
                              }}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Edit />
                                </Button>
                                <span>Actualizar</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                onDeleteStock(stock);
                              }}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Delete />
                                </Button>
                                <span>Eliminar</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                {/* )} */}
              </TableBody>
            </Table>
          </div>

          <DetailsDialog
            open={openDetailsDialog}
            onOpenChange={setOpenDetailsDialog}
            stock={detailsStock}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stock: DeviceStock | null;
}

function DetailsDialog({ open, onOpenChange, stock }: DetailsDialogProps) {
  if (!stock) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Stock - Región {stock.region}</DialogTitle>
          <DialogDescription>
            Información completa del inventario de dispositivos en esta región.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium mb-2">Inventario de Dispositivos:</h3>
            <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">
                  Dispositivo Agresor:
                </p>
                <p className="font-medium text-lg">{stock.smart_tack}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cargador OBC:</p>
                <p className="font-medium text-lg">{stock.charger_obc}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Adaptador OBD:</p>
                <p className="font-medium text-lg">{stock.adapter_obd}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BEACON:</p>
                <p className="font-medium text-lg">{stock.beacon}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Dispositivo Víctima:
                </p>
                <p className="font-medium text-lg">{stock.victim_device}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Cargador Víctima:
                </p>
                <p className="font-medium text-lg">{stock.victim_charger}</p>
              </div>
            </div>
          </div>

          {/* <div>
            <h3 className="font-medium">Última actualización:</h3>
            <p>
              {format(stock.lastUpdated, "dd/MM/yyyy HH:mm", { locale: es })}
            </p>
          </div> */}

          <div>
            <h3 className="font-medium">Notas:</h3>
            <p className="whitespace-pre-wrap">{stock.notes}</p>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Estado del inventario:</h3>
            <div className="space-y-2">
              {stock.smart_tack <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Dispositivos Agresores
                </p>
              )}
              {stock.charger_obc <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Cargadores OBC
                </p>
              )}
              {stock.adapter_obd <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Adaptadores OBD
                </p>
              )}
              {stock.beacon <= 3 && (
                <p className="text-destructive">⚠️ Nivel crítico de BEACONs</p>
              )}
              {stock.victim_device <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Dispositivos Víctima
                </p>
              )}
              {stock.victim_charger <= 3 && (
                <p className="text-destructive">
                  ⚠️ Nivel crítico de Cargadores Víctima
                </p>
              )}
              {stock.smart_tack > 3 &&
                stock.charger_obc > 3 &&
                stock.adapter_obd > 3 &&
                stock.beacon > 3 &&
                stock.victim_device > 3 &&
                stock.victim_charger > 3 && (
                  <p className="text-success">
                    ✅ Niveles de inventario adecuados
                  </p>
                )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
