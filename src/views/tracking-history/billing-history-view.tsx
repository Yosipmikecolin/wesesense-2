"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Eye, Check, Clock, FileDown } from "lucide-react";
import { format, differenceInDays, isWithinInterval, addDays } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DatePicker } from "../training/date-picker";
import { DropdownFilter } from "@/components";

type BillingStatus = "Pagado" | "Pendiente";

interface Carrier {
  id: string;
  name: string;
  run: string;
  ruc: string;
  rit: string;
  rol: string;
  controlType: string;
  monitoringStartDate: Date;
  monitoringEndDate: Date;
  installationDate: Date;
  uninstallationDate: Date;
  monitoringDays: number;
  crs: string;
  activationDate: Date;
  deactivationDate: Date;
  folio: string;
  serialNumber: string;
  complianceSchedule: string;
  dailyRate: number;
}

interface BillingRecord {
  id: string;
  billingDate: Date;
  startDate: Date;
  endDate: Date;
  billingPeriod: number;
  billingAmount: number;
  deviceCount: number;
  status: BillingStatus;
  invoiceNumber: string;
  clientName: string;
  paymentMethod?: string;
  paymentDate?: Date;
  notes: string;
  carriers?: Carrier[];
  url: string;
}

// Simulated carriers data
const simulatedCarriers: Carrier[] = [
  {
    id: "1",
    name: "Juan Pérez",
    run: "12.345.678-9",
    ruc: "76.543.210-K",
    rit: "RT-12345",
    rol: "Conductor",
    controlType: "GPS",
    monitoringStartDate: new Date(2023, 0, 15),
    monitoringEndDate: new Date(2023, 11, 15),
    installationDate: new Date(2023, 0, 10),
    uninstallationDate: new Date(2023, 11, 20),
    monitoringDays: 335,
    crs: "CRS-001",
    activationDate: new Date(2023, 0, 15),
    deactivationDate: new Date(2023, 11, 15),
    folio: "F-001-2023",
    serialNumber: "SN-12345-A",
    complianceSchedule: "Lunes a Viernes, 8:00 - 18:00",
    dailyRate: 15000,
  },
  {
    id: "2",
    name: "María González",
    run: "11.222.333-4",
    ruc: "77.888.999-5",
    rit: "RT-23456",
    rol: "Operador",
    controlType: "Biométrico",
    monitoringStartDate: new Date(2023, 1, 1),
    monitoringEndDate: new Date(2023, 10, 30),
    installationDate: new Date(2023, 0, 25),
    uninstallationDate: new Date(2023, 11, 5),
    monitoringDays: 302,
    crs: "CRS-002",
    activationDate: new Date(2023, 1, 1),
    deactivationDate: new Date(2023, 10, 30),
    folio: "F-002-2023",
    serialNumber: "SN-23456-B",
    complianceSchedule: "Lunes a Domingo, 24 horas",
    dailyRate: 18000,
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    run: "9.876.543-2",
    ruc: "78.123.456-7",
    rit: "RT-34567",
    rol: "Supervisor",
    controlType: "RFID",
    monitoringStartDate: new Date(2023, 2, 15),
    monitoringEndDate: new Date(2024, 2, 15),
    installationDate: new Date(2023, 2, 10),
    uninstallationDate: new Date(2024, 2, 20),
    monitoringDays: 366,
    crs: "CRS-003",
    activationDate: new Date(2023, 2, 15),
    deactivationDate: new Date(2024, 2, 15),
    folio: "F-003-2023",
    serialNumber: "SN-34567-C",
    complianceSchedule: "Lunes a Sábado, 7:00 - 19:00",
    dailyRate: 20000,
  },
  {
    id: "4",
    name: "Ana Martínez",
    run: "14.789.632-5",
    ruc: "79.456.123-8",
    rit: "RT-45678",
    rol: "Técnico",
    controlType: "Huella digital",
    monitoringStartDate: new Date(2023, 3, 1),
    monitoringEndDate: new Date(2023, 8, 30),
    installationDate: new Date(2023, 2, 25),
    uninstallationDate: new Date(2023, 9, 5),
    monitoringDays: 183,
    crs: "CRS-004",
    activationDate: new Date(2023, 3, 1),
    deactivationDate: new Date(2023, 8, 30),
    folio: "F-004-2023",
    serialNumber: "SN-45678-D",
    complianceSchedule: "Martes a Sábado, 9:00 - 17:00",
    dailyRate: 16000,
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    run: "15.963.852-7",
    ruc: "80.789.456-1",
    rit: "RT-56789",
    rol: "Conductor",
    controlType: "GPS",
    monitoringStartDate: new Date(2023, 4, 15),
    monitoringEndDate: new Date(2024, 4, 15),
    installationDate: new Date(2023, 4, 10),
    uninstallationDate: new Date(2024, 4, 20),
    monitoringDays: 366,
    crs: "CRS-005",
    activationDate: new Date(2023, 4, 15),
    deactivationDate: new Date(2024, 4, 15),
    folio: "F-005-2023",
    serialNumber: "SN-56789-E",
    complianceSchedule: "Lunes a Viernes, 8:00 - 16:00",
    dailyRate: 17000,
  },
  {
    id: "6",
    name: "Laura Torres",
    run: "13.258.741-6",
    ruc: "81.123.789-2",
    rit: "RT-67890",
    rol: "Operador",
    controlType: "Biométrico",
    monitoringStartDate: new Date(2023, 5, 1),
    monitoringEndDate: new Date(2023, 11, 31),
    installationDate: new Date(2023, 4, 25),
    uninstallationDate: new Date(2024, 0, 5),
    monitoringDays: 214,
    crs: "CRS-006",
    activationDate: new Date(2023, 5, 1),
    deactivationDate: new Date(2023, 11, 31),
    folio: "F-006-2023",
    serialNumber: "SN-67890-F",
    complianceSchedule: "Lunes a Domingo, 6:00 - 22:00",
    dailyRate: 19000,
  },
  {
    id: "7",
    name: "Roberto Gómez",
    run: "10.369.258-1",
    ruc: "82.456.789-3",
    rit: "RT-78901",
    rol: "Supervisor",
    controlType: "RFID",
    monitoringStartDate: new Date(2023, 6, 15),
    monitoringEndDate: new Date(2024, 0, 15),
    installationDate: new Date(2023, 6, 10),
    uninstallationDate: new Date(2024, 0, 20),
    monitoringDays: 184,
    crs: "CRS-007",
    activationDate: new Date(2023, 6, 15),
    deactivationDate: new Date(2024, 0, 15),
    folio: "F-007-2023",
    serialNumber: "SN-78901-G",
    complianceSchedule: "Lunes a Viernes, 7:30 - 17:30",
    dailyRate: 21000,
  },
  {
    id: "8",
    name: "Carmen López",
    run: "16.753.159-8",
    ruc: "83.789.123-4",
    rit: "RT-89012",
    rol: "Técnico",
    controlType: "Huella digital",
    monitoringStartDate: new Date(2023, 7, 1),
    monitoringEndDate: new Date(2024, 1, 29),
    installationDate: new Date(2023, 6, 25),
    uninstallationDate: new Date(2024, 2, 5),
    monitoringDays: 213,
    crs: "CRS-008",
    activationDate: new Date(2023, 7, 1),
    deactivationDate: new Date(2024, 1, 29),
    folio: "F-008-2023",
    serialNumber: "SN-89012-H",
    complianceSchedule: "Miércoles a Domingo, 10:00 - 20:00",
    dailyRate: 16500,
  },
  {
    id: "9",
    name: "Fernando Díaz",
    run: "17.159.357-2",
    ruc: "84.123.456-5",
    rit: "RT-90123",
    rol: "Conductor",
    controlType: "GPS",
    monitoringStartDate: new Date(2023, 8, 15),
    monitoringEndDate: new Date(2024, 2, 15),
    installationDate: new Date(2023, 8, 10),
    uninstallationDate: new Date(2024, 2, 20),
    monitoringDays: 183,
    crs: "CRS-009",
    activationDate: new Date(2023, 8, 15),
    deactivationDate: new Date(2024, 2, 15),
    folio: "F-009-2023",
    serialNumber: "SN-90123-I",
    complianceSchedule: "Lunes a Sábado, 8:00 - 18:00",
    dailyRate: 17500,
  },
  {
    id: "10",
    name: "Sofía Ramírez",
    run: "18.456.789-3",
    ruc: "85.456.789-6",
    rit: "RT-01234",
    rol: "Operador",
    controlType: "Biométrico",
    monitoringStartDate: new Date(2023, 9, 1),
    monitoringEndDate: new Date(2024, 3, 30),
    installationDate: new Date(2023, 8, 25),
    uninstallationDate: new Date(2024, 4, 5),
    monitoringDays: 212,
    crs: "CRS-010",
    activationDate: new Date(2023, 9, 1),
    deactivationDate: new Date(2024, 3, 30),
    folio: "F-010-2023",
    serialNumber: "SN-01234-J",
    complianceSchedule: "Lunes a Domingo, 24 horas",
    dailyRate: 22000,
  },
];

export default function BillingHistoryView() {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>(() => {
    // Generate sample billing records
    return [

      {
        id: "1",
        billingDate: new Date(2025, 11, 15), // December 15, 2023
        startDate: new Date(2025, 0, 1), // September 1, 2023
        endDate: new Date(2025, 0, 30), // November 30, 2023
        billingPeriod: 3,
        billingAmount: 12500000,
        deviceCount: 50,
        status: "Pagado",
        invoiceNumber: "FAC-2023-001",
        clientName: "Empresa de Seguridad Nacional",
        paymentMethod: "Transferencia bancaria",
        paymentDate: new Date(2023, 11, 20), // December 20, 2023
        notes:
          "Facturación trimestral por servicio de monitoreo de 50 dispositivos.",
        url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FReporte_Facturacion_Enero_2025.xlsx&wdOrigin=BROWSELINK",
      },
      {
        id: "2",
        billingDate: new Date(2025, 11, 15), // December 15, 2023
        startDate: new Date(2025, 1, 1), // September 1, 2023
        endDate: new Date(2025, 1, 28), // November 30, 2023
        billingPeriod: 3,
        billingAmount: 12500000,
        deviceCount: 50,
        status: "Pagado",
        invoiceNumber: "FAC-2023-001",
        clientName: "Empresa de Seguridad Nacional",
        paymentMethod: "Transferencia bancaria",
        paymentDate: new Date(2023, 11, 20), // December 20, 2023
        notes:
          "Facturación trimestral por servicio de monitoreo de 50 dispositivos.",
        url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FReporte_Facturacion_Febrero_2025.xlsx&wdOrigin=BROWSELINK",
      },
      {
        id: "3",
        billingDate: new Date(2025, 11, 15), // December 15, 2023
        startDate: new Date(2025, 2, 1), // September 1, 2023
        endDate: new Date(2025, 2, 30), // November 30, 2023
        billingPeriod: 3,
        billingAmount: 12500000,
        deviceCount: 50,
        status: "Pagado",
        invoiceNumber: "FAC-2023-001",
        clientName: "Empresa de Seguridad Nacional",
        paymentMethod: "Transferencia bancaria",
        paymentDate: new Date(2023, 11, 20), // December 20, 2023
        notes:
          "Facturación trimestral por servicio de monitoreo de 50 dispositivos.",
        url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FReporte_Facturacion_Marzo_2025.xlsx&wdOrigin=BROWSELINK",
      },
      {
        id: "4",
        billingDate: new Date(2025, 11, 15), // December 15, 2023
        startDate: new Date(2025, 3, 1), // September 1, 2023
        endDate: new Date(2025, 3, 30), // November 30, 2023
        billingPeriod: 3,
        billingAmount: 12500000,
        deviceCount: 50,
        status: "Pagado",
        invoiceNumber: "FAC-2023-001",
        clientName: "Empresa de Seguridad Nacional",
        paymentMethod: "Transferencia bancaria",
        paymentDate: new Date(2023, 11, 20), // December 20, 2023
        notes:
          "Facturación trimestral por servicio de monitoreo de 50 dispositivos.",
        url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FReporte_Facturacion_Abril_2025.xlsx&wdOrigin=BROWSELINK",
      },
      {
        id: "5",
        billingDate: new Date(2025, 0, 10), // January 10, 2024
        startDate: new Date(2025, 10, 1), // December 1, 2023
        endDate: new Date(2025, 10, 30), // December 31, 2023
        billingPeriod: 1,
        billingAmount: 5000000,
        deviceCount: 20,
        status: "Pagado",
        invoiceNumber: "FAC-2024-001",
        clientName: "Protección Corporativa S.A.",
        paymentMethod: "Cheque",
        paymentDate: new Date(2024, 0, 25), // January 25, 2024
        notes:
          "Facturación mensual por servicio de monitoreo de 20 dispositivos.",
        url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FReporte_Facturacion_Noviembre_2024.xlsx&wdOrigin=BROWSELINK",
      },
      {
        id: "6",
        billingDate: new Date(2025, 1, 5), // February 5, 2024
        startDate: new Date(2025,11, 1), // July 1, 2023
        endDate: new Date(2025, 11, 31), // December 31, 2023
        billingPeriod: 6,
        billingAmount: 36000000,
        deviceCount: 60,
        status: "Pagado",
        invoiceNumber: "FAC-2024-002",
        clientName: "Seguridad Integral Ltda.",
        paymentMethod: "Transferencia bancaria",
        paymentDate: new Date(2024, 1, 15), // February 15, 2024
        notes:
          "Facturación semestral por servicio de monitoreo de 60 dispositivos.",
        url: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FReporte_Facturacion_Diciembre_2024.xlsx&wdOrigin=BROWSELINK",
      },

    ];
  });

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsBilling, setDetailsBilling] = useState<BillingRecord | null>(
    null
  );

  const [newBilling, setNewBilling] = useState<Partial<BillingRecord>>({
    billingDate: new Date(),
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    billingPeriod: 1,
    status: "Pendiente",
  });

  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}`
  );
  const [selectedCarriers, setSelectedCarriers] = useState<string[]>([]);
  const [selectedCarrierDetails, setSelectedCarrierDetails] =
    useState<Carrier | null>(null);
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0);

  const [openNewDialog, setOpenNewDialog] = useState(false);

  // Get available carriers for the selected month
  const getAvailableCarriers = () => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    return simulatedCarriers.filter(
      (carrier) =>
        isWithinInterval(startOfMonth, {
          start: carrier.monitoringStartDate,
          end: carrier.monitoringEndDate,
        }) ||
        isWithinInterval(endOfMonth, {
          start: carrier.monitoringStartDate,
          end: carrier.monitoringEndDate,
        }) ||
        (carrier.monitoringStartDate <= startOfMonth &&
          carrier.monitoringEndDate >= endOfMonth)
    );
  };

  // Calculate billing amount based on selected carriers and date range
  useEffect(() => {
    if (!newBilling.startDate || !newBilling.endDate) return;

    const selectedCarrierObjects = simulatedCarriers.filter((carrier) =>
      selectedCarriers.includes(carrier.id)
    );

    let totalAmount = 0;

    selectedCarrierObjects.forEach((carrier) => {
      // Calculate days within the billing period for this carrier
      const startDate = new Date(
        Math.max(
          carrier.monitoringStartDate.getTime(),
          newBilling.startDate!.getTime()
        )
      );

      const endDate = new Date(
        Math.min(
          carrier.monitoringEndDate.getTime(),
          newBilling.endDate!.getTime()
        )
      );

      // If the dates are valid (start is before end)
      if (startDate <= endDate) {
        const days = differenceInDays(endDate, startDate) + 1;
        totalAmount += days * carrier.dailyRate;
      }
    });

    setCalculatedAmount(totalAmount);
    setNewBilling((prev) => ({
      ...prev,
      billingAmount: totalAmount,
      deviceCount: selectedCarriers.length,
    }));
  }, [newBilling.startDate, newBilling.endDate, selectedCarriers]);

  const handleCreateBilling = () => {
    if (
      !newBilling.billingDate ||
      !newBilling.startDate ||
      !newBilling.endDate ||
      !newBilling.billingAmount ||
      !newBilling.deviceCount ||
      !newBilling.status ||
      !newBilling.invoiceNumber ||
      !newBilling.clientName ||
      selectedCarriers.length === 0
    ) {
      return;
    }

    const selectedCarrierObjects = simulatedCarriers.filter((carrier) =>
      selectedCarriers.includes(carrier.id)
    );

    const billing: BillingRecord = {
      id: Date.now().toString(),
      billingDate: newBilling.billingDate,
      startDate: newBilling.startDate,
      endDate: newBilling.endDate,
      billingPeriod:
        differenceInDays(newBilling.endDate, newBilling.startDate) / 30,
      billingAmount: Number(newBilling.billingAmount),
      deviceCount: Number(newBilling.deviceCount),
      status: newBilling.status as BillingStatus,
      invoiceNumber: newBilling.invoiceNumber,
      clientName: newBilling.clientName,
      paymentMethod: newBilling.paymentMethod,
      paymentDate: newBilling.paymentDate,
      notes: newBilling.notes || "",
      carriers: selectedCarrierObjects,
      url: "",
    };

    setBillingRecords([...billingRecords, billing]);
    setNewBilling({
      billingDate: new Date(),
      startDate: new Date(),
      endDate: addDays(new Date(), 30),
      billingPeriod: 1,
      status: "Pendiente",
    });
    setSelectedCarriers([]);
    setSelectedCarrierDetails(null);
    setOpenNewDialog(false);
  };

  const handleOpenDetailsDialog = (billing: BillingRecord) => {
    setDetailsBilling(billing);
    setOpenDetailsDialog(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filters = [
    { id: 1, name: "Dispositivo" },
    { id: 2, name: "Fecha" },
  ];
  const [idFilter, setIdFilter] = useState(1);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Historial de seguimiento de facturación
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
                Nueva factura
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nuevo registro de facturación</DialogTitle>
                <DialogDescription>
                  Complete los detalles para registrar una nueva factura.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="billingDate">Fecha de facturación</Label>
                  <DatePicker
                    date={newBilling.billingDate}
                    setDate={(date) =>
                      setNewBilling({ ...newBilling, billingDate: date })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="month">Seleccionar mes de portadores</Label>
                  <Input
                    id="month"
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      setSelectedCarriers([]);
                      setSelectedCarrierDetails(null);
                    }}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="carrier">Seleccionar portador</Label>
                  <Select
                    onValueChange={(value) => {
                      const carrier = simulatedCarriers.find(
                        (c) => c.id === value
                      );
                      setSelectedCarrierDetails(carrier || null);

                      // Toggle selection
                      if (selectedCarriers.includes(value)) {
                        setSelectedCarriers(
                          selectedCarriers.filter((id) => id !== value)
                        );
                      } else {
                        setSelectedCarriers([...selectedCarriers, value]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar portador" />
                    </SelectTrigger>
                    <SelectContent>
                      {simulatedCarriers.map((carrier) => (
                        <SelectItem key={carrier.id} value={carrier.id}>
                          {carrier.name} - {carrier.serialNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCarrierDetails && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Detalles del portador</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Nombre:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">RUN:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.run}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">RUC:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.ruc}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">RIT:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.rit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROL:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.rol}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tipo de medida:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.controlType}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Inicio monitoreo:
                        </p>
                        <p className="font-medium">
                          {format(
                            selectedCarrierDetails.monitoringStartDate,
                            "dd/MM/yyyy",
                            { locale: es }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fin monitoreo:</p>
                        <p className="font-medium">
                          {format(
                            selectedCarrierDetails.monitoringEndDate,
                            "dd/MM/yyyy",
                            { locale: es }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Fecha instalación:
                        </p>
                        <p className="font-medium">
                          {format(
                            selectedCarrierDetails.installationDate,
                            "dd/MM/yyyy",
                            { locale: es }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Fecha desinstalación:
                        </p>
                        <p className="font-medium">
                          {format(
                            selectedCarrierDetails.uninstallationDate,
                            "dd/MM/yyyy",
                            { locale: es }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Días de monitoreo:
                        </p>
                        <p className="font-medium">
                          {selectedCarrierDetails.monitoringDays}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CRS:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.crs}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Fecha activación:
                        </p>
                        <p className="font-medium">
                          {format(
                            selectedCarrierDetails.activationDate,
                            "dd/MM/yyyy",
                            { locale: es }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Fecha desactivación:
                        </p>
                        <p className="font-medium">
                          {format(
                            selectedCarrierDetails.deactivationDate,
                            "dd/MM/yyyy",
                            { locale: es }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Folio:</p>
                        <p className="font-medium">
                          {selectedCarrierDetails.folio}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          Número de serie:
                        </p>
                        <p className="font-medium">
                          {selectedCarrierDetails.serialNumber}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">
                          Horario de cumplimiento:
                        </p>
                        <p className="font-medium">
                          {selectedCarrierDetails.complianceSchedule}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCarriers.length > 0 && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">
                      Portadores seleccionados ({selectedCarriers.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedCarriers.map((carrierId) => {
                        const carrier = simulatedCarriers.find(
                          (c) => c.id === carrierId
                        );
                        return carrier ? (
                          <div
                            key={carrier.id}
                            className="flex justify-between items-center bg-muted p-2 rounded-md"
                          >
                            <span>
                              {carrier.name} - {carrier.serialNumber}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setSelectedCarriers(
                                  selectedCarriers.filter(
                                    (id) => id !== carrierId
                                  )
                                )
                              }
                            >
                              Quitar
                            </Button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">
                      Fecha inicial de facturación
                    </Label>
                    <DatePicker
                      date={newBilling.startDate}
                      setDate={(date) =>
                        setNewBilling({ ...newBilling, startDate: date })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Fecha final de facturación</Label>
                    <DatePicker
                      date={newBilling.endDate}
                      setDate={(date) =>
                        setNewBilling({ ...newBilling, endDate: date })
                      }
                    />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Valor calculado:</h3>
                    <p className="text-xl font-bold">$1500.000</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Basado en {selectedCarriers.length} portadores y{" "}
                    {newBilling.startDate && newBilling.endDate
                      ? differenceInDays(
                          newBilling.endDate,
                          newBilling.startDate
                        ) + 1
                      : 0}{" "}
                    días de monitoreo
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invoiceNumber">Número de factura</Label>
                    <Input
                      id="invoiceNumber"
                      value={newBilling.invoiceNumber || ""}
                      onChange={(e) =>
                        setNewBilling({
                          ...newBilling,
                          invoiceNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select
                      value={newBilling.status}
                      onValueChange={(value) =>
                        setNewBilling({
                          ...newBilling,
                          status: value as BillingStatus,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pagado">Pagado</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clientName">Nombre del cliente</Label>
                  <Input
                    id="clientName"
                    value={newBilling.clientName || ""}
                    onChange={(e) =>
                      setNewBilling({
                        ...newBilling,
                        clientName: e.target.value,
                      })
                    }
                  />
                </div>
                {newBilling.status === "Pagado" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="paymentMethod">Método de pago</Label>
                      <Input
                        id="paymentMethod"
                        value={newBilling.paymentMethod || ""}
                        onChange={(e) =>
                          setNewBilling({
                            ...newBilling,
                            paymentMethod: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="paymentDate">Fecha de pago</Label>
                      <DatePicker
                        date={newBilling.paymentDate}
                        setDate={(date) =>
                          setNewBilling({ ...newBilling, paymentDate: date })
                        }
                      />
                    </div>
                  </>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={newBilling.notes || ""}
                    onChange={(e) =>
                      setNewBilling({ ...newBilling, notes: e.target.value })
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
                <Button onClick={handleCreateBilling}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha de facturación</TableHead>
                  <TableHead>Periodo</TableHead>
                  <TableHead>Fecha inicial</TableHead>
                  <TableHead>Fecha final</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Dispositivos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingRecords.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground"
                    >
                      No hay registros de facturación disponibles
                    </TableCell>
                  </TableRow>
                ) : (
                  billingRecords.map((billing) => (
                    <TableRow key={billing.id}>
                      <TableCell>
                        {format(billing.billingDate, "dd/MM/yyyy", {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell>
                        {billing.billingPeriod.toFixed(1)} meses
                      </TableCell>
                      <TableCell>
                        {format(billing.startDate, "dd/MM/yyyy", {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell>
                        {format(billing.endDate, "dd/MM/yyyy", { locale: es })}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(billing.billingAmount)}
                      </TableCell>
                      <TableCell>{billing.deviceCount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            billing.status === "Pagado" ? "default" : "warning"
                          }
                          className="flex items-center gap-1"
                        >
                          {billing.status === "Pagado" ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          {billing.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-5 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetailsDialog(billing)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        <a
                          href={billing.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            <FileDown className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </a>
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
            billing={detailsBilling}
            formatCurrency={formatCurrency}
          />
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billing: BillingRecord | null;
  formatCurrency: (amount: number) => string;
}

function DetailsDialog({
  open,
  onOpenChange,
  billing,
  formatCurrency,
}: DetailsDialogProps) {
  if (!billing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles de facturación</DialogTitle>
          <DialogDescription>
            Información completa del registro de facturación.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="bg-muted p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">
                Factura #{billing.invoiceNumber}
              </h3>
              <Badge
                variant={billing.status === "Pagado" ? "default" : "warning"}
                className="flex items-center gap-1"
              >
                {billing.status === "Pagado" ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Clock className="h-3 w-3" />
                )}
                {billing.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Cliente:</p>
            <p className="font-medium mb-2">{billing.clientName}</p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Fecha de facturación:
                </p>
                <p className="font-medium">
                  {format(billing.billingDate, "dd/MM/yyyy", { locale: es })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha inicial:</p>
                <p className="font-medium">
                  {format(billing.startDate, "dd/MM/yyyy", { locale: es })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha final:</p>
                <p className="font-medium">
                  {format(billing.endDate, "dd/MM/yyyy", { locale: es })}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Valor de la facturación:</h3>
              <p className="text-xl font-bold">
                {formatCurrency(billing.billingAmount)}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Cantidad de dispositivos:</h3>
              <p className="text-xl font-bold">{billing.deviceCount}</p>
            </div>
          </div>

          {billing.carriers && billing.carriers.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="carriers">
                <AccordionTrigger>
                  Portadores ({billing.carriers.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {billing.carriers.map((carrier) => (
                      <div key={carrier.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{carrier.name}</h4>
                          <Badge>{carrier.controlType}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">
                              Número de serie:
                            </p>
                            <p>{carrier.serialNumber}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Periodo de monitoreo:
                            </p>
                            <p>
                              {format(
                                carrier.monitoringStartDate,
                                "dd/MM/yyyy",
                                { locale: es }
                              )}{" "}
                              -{" "}
                              {format(carrier.monitoringEndDate, "dd/MM/yyyy", {
                                locale: es,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {billing.status === "Pagado" && (
            <div className="border p-4 rounded-md">
              <h3 className="font-medium mb-2">Información de pago:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Método de pago:
                  </p>
                  <p>{billing.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Fecha de pago:
                  </p>
                  <p>
                    {billing.paymentDate
                      ? format(billing.paymentDate, "dd/MM/yyyy", {
                          locale: es,
                        })
                      : "No disponible"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium">Notas:</h3>
            <p className="whitespace-pre-wrap">{billing.notes}</p>
          </div>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Resumen:</h3>
            <p>
              Facturación por{" "}
              {differenceInDays(billing.endDate, billing.startDate) + 1} días de
              servicio para {billing.deviceCount} dispositivos.
            </p>
            <p className="mt-1">
              Periodo: {format(billing.startDate, "dd/MM/yyyy", { locale: es })}{" "}
              al {format(billing.endDate, "dd/MM/yyyy", { locale: es })}
            </p>
            <p className="mt-1">
              Valor promedio por dispositivo/día:{" "}
              {formatCurrency(
                billing.billingAmount /
                  (billing.deviceCount *
                    (differenceInDays(billing.endDate, billing.startDate) + 1))
              )}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
