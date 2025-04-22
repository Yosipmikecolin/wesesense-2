"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Ellipsis, Eye, Check, Delete, PlusCircle } from "lucide-react";
// import InstallationProcess from "./components/CreationProcess";

import { Input } from "@/components/ui/input";
import { DropdownFilter } from "@/components";

import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyOptions } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Card, CardContent } from "@/components/ui/card";
// import CreationProcess from "./components/CreationProcess";
import axios from "axios";
import * as XLSX from "xlsx";

// import { InputText } from "primereact/inputtext";
// import { IconField } from "primereact/iconfield";
// import { InputIcon } from "primereact/inputicon";
// import ProcessModal from "./components/ProcessModal";
// import TableInstallation from "./components/TableInstallation";
// import TableProrroga from "./components/TableProrroga";
// import TableCeseControl from "./components/TableCeseControl";
// import TableCambioDomicilio from "./components/TableCambioDomicilio";
// import TableInforme from "./components/TableInforme";

import { useQuery } from "@tanstack/react-query";

interface ResolutionType {
  presentation_date?: string;
  first_visit?: string;
  second_visit?: string;
  note?: string;
  answer?: string;
  region?: string;
  comuna?: string;
  domicilio?: string;
  radio?: string;
  new_prorroga?: string;
}

export interface ProcessType {
  _id: string;
  createdAt: string;
  type_law: string;
  rit: string;
  ruc: string;
  run: string;
  document: string;
  date_limit: string;
  type_resolution: string;
  status: string;
  resolution: ResolutionType;
}

const ViewHistory = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [currentProcess, setCurrentProcess] = useState<ProcessType>();
  const [isShowModal, setIsShowModal] = useState(false);

  const [modal, setModal] = useState(false);

  const refTable = useRef<DataTable<any> | null>(null);

  const [typeModal, setTypeModal] = useState("0");

  const [products, setProducts] = useState<ProcessType[]>([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type_law: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    rit: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ruc: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    run: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    type_resolution: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const closeDialog = () => {
    setIsShowModal(false);
  };

  const onChangeModal = (e: boolean) => {
    setIsShowModal(e);
  };

  const show = () => {
    setIsShowModal(true);
  };

  const getAllProcess = async () => {
    const response = await axios.get(`/api/awardee/process-master`);
    return response.data;
    // setProducts(response.data);
  };

  const useQueryAllProcess = () => {
    return useQuery({
      queryKey: ["all_process"],
      queryFn: () => getAllProcess(),
      refetchInterval: 5000,
    });
  };

  const { data, isLoading, refetch } = useQueryAllProcess();

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <div className="flex flex-1">
          <Button onClick={downloadCSV} type="button" variant={"primary"}>
            <i className="pi pi-file-excel"></i>
            Descargar CSV
          </Button>
        </div>
        <div>
          <Input
            autoFocus
            className="bg-white"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Filtrar..."
          />
        </div>
      </div>
    );
  };

  const generateExcel = (process: ProcessType) => {
    console.log("PROCESO: ", process);
    const flattenedData: Record<string, string> = {
      Fecha: process.createdAt,
      Tipo_de_ley: process.type_law,
      RIT: process.rit,
      RUC: process.ruc,
      RUN: process.run,
      Fecha_limite: process.date_limit,
      Tipo_de_resolución: process.type_resolution,
      Estado: process.status,
    };

    for (const key in process.resolution) {
      const val = key as keyof ResolutionType;
      if (process.resolution[val]) {
        if (process.resolution.answer) {
          flattenedData[`${process.type_resolution}.Respuesta`] =
            process.resolution.answer;
        }
        if (process.resolution.comuna) {
          flattenedData[`${process.type_resolution}.Comuna`] =
            process.resolution.comuna;
        }
        if (process.resolution.domicilio) {
          flattenedData[`${process.type_resolution}.Domicilio`] =
            process.resolution.domicilio;
        }
        if (process.resolution.first_visit) {
          flattenedData[`${process.type_resolution}.Primera_visita`] =
            process.resolution.first_visit;
        }
        if (process.resolution.new_prorroga) {
          flattenedData[`${process.type_resolution}.Nueva_prórroga`] =
            process.resolution.new_prorroga;
        }
        if (process.resolution.note) {
          flattenedData[`${process.type_resolution}.Nota`] =
            process.resolution.note;
        }
        if (process.resolution.presentation_date) {
          flattenedData[`${process.type_resolution}.Fecha_de_presentación`] =
            process.resolution.presentation_date;
        }
        if (process.resolution.radio) {
          flattenedData[`${process.type_resolution}.Radio`] =
            process.resolution.radio;
        }
        if (process.resolution.region) {
          flattenedData[`${process.type_resolution}.Región`] =
            process.resolution.region;
        }
        if (process.resolution.second_visit) {
          flattenedData[`${process.type_resolution}.Segunda_visita`] =
            process.resolution.second_visit;
        }
      }
    }

    const worksheet = XLSX.utils.json_to_sheet([flattenedData]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);

    const fileName = `${process.type_resolution}_${process._id}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const bodyActions = (process: ProcessType) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              generateExcel(process);
            }}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                <i className="pi pi-file-excel"></i>
              </Button>
              <span>Excel</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  useEffect(() => {
    getAllProcess();
  }, []);

  const onChangeStatus = (value: string, process: ProcessType) => {
    if (value === "1") {
      setTypeModal(value);
      setCurrentProcess(process);
      setModal(true);
    }
    if (value === "0") {
      setTypeModal(value);
      setCurrentProcess(process);
      setModal(true);
    }
  };

  const idBody = (process: ProcessType, options: ColumnBodyOptions) => {
    return options.rowIndex + 1;
  };

  const downloadCSV = () => {
    refTable.current?.exportCSV();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Histórico de sentencias y resoluciones
      </h1>

      <Dialog open={isShowModal} onOpenChange={onChangeModal}>
        <DialogContent>
          {/* <CreationProcess onClose={closeDialog} refetch={refetch} /> */}
        </DialogContent>
      </Dialog>

      <Card className="mt-6">
        <CardContent>
          <DataTable
            ref={refTable}
            className="mt-6"
            dataKey="_id"
            value={data}
            tableStyle={{ minWidth: "50rem" }}
            size="small"
            filters={filters}
            columnResizeMode="expand"
            resizableColumns
            stripedRows
            filterDisplay="row"
            header={renderHeader}
            globalFilterFields={[
              "type_law",
              "rit",
              "ruc",
              "run",
              "type_resolution",
            ]}
          >
            <Column field="id" header="#" body={idBody}></Column>
            <Column field="date" header="Fecha"></Column>
            <Column
              field="type_law"
              filter
              filterPlaceholder="Buscar por ley"
              sortable
              header="Tipo de ley"
            ></Column>
            <Column
              field="rit"
              filter
              filterPlaceholder="Buscar por RIT"
              sortable
              header="RIT"
            ></Column>
            <Column
              field="ruc"
              filter
              filterPlaceholder="Buscar por RUC"
              sortable
              header="RUC"
            ></Column>
            <Column
              field="run"
              filter
              filterPlaceholder="Buscar por RUN"
              sortable
              header="RUN"
            ></Column>
            <Column field="date_limit" header="Fecha limite"></Column>
            <Column
              field="type_resolution"
              filter
              filterPlaceholder="Buscar por resolución"
              sortable
              header="Tipo de resolución"
            ></Column>
            {/* <Column
              field="document"
              header="Documento adjunto"
              body={
                <i className="pi pi-eye text-green-400 hover:text-green-700 cursor-pointer"></i>
              }
            ></Column> */}
            <Column field="status" header="Estado"></Column>
            <Column
              field="actions"
              header="Acciones"
              body={bodyActions}
            ></Column>
          </DataTable>
        </CardContent>
      </Card>

      {/* <Tabs defaultValue="0" className="mt-2" defaultChecked>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="0">Instalación</TabsTrigger>
          <TabsTrigger value="1">Prorroga / Extensión</TabsTrigger>
          <TabsTrigger value="2">Cese de control </TabsTrigger>
          <TabsTrigger value="3">Cambio de domicilio</TabsTrigger>
          <TabsTrigger value="4">Solicita informe de control</TabsTrigger>
        </TabsList>
        <TabsContent value="0">
          <TableInstallation />
        </TabsContent>
        <TabsContent value="1">
          <TableProrroga />
        </TabsContent>
        <TabsContent value="2">
          <TableCeseControl />
        </TabsContent>
        <TabsContent value="3">
          <TableCambioDomicilio />
        </TabsContent>
        <TabsContent value="4">
          <TableInforme />
        </TabsContent>
      </Tabs> */}

      {/* <ProcessModal
        refetch={refetch}
        open={modal}
        type={typeModal}
        process={currentProcess}
        onClose={() => setModal(false)}
        // refetch={refetch}
      /> */}
    </div>
  );
};

export default ViewHistory;
