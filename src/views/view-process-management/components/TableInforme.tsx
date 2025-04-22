"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CalendarX2,
  Check,
  Delete,
  Ellipsis,
  Eye,
  Pencil,
  PlusCircle,
  Send,
  SendHorizontal,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { ProcessType } from "../ViewProcessManagement";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import InstallationModal from "./InstallationModal";
import { Input } from "@/components/ui/input";
import InformeModal from "./InformeModal";
import { useQuery } from "@tanstack/react-query";

const TableInforme = () => {
  // const [data, setData] = useState<InstalationType[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const [currentProcess, setCurrentProcess] = useState<ProcessType>();

  const [modal, setModal] = useState(false);

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

  const getAllProcess = async () => {
    const response = await axios.get(`/api/awardee/process`, {
      params: {
        method: "get.informe",
      },
    });
    // console.log("DATA: ", response.data);
    // setProducts(response.data);
    return response.data;
  };

  const useQueryAllProcess = () => {
    return useQuery({
      queryKey: ["all_informe"],
      queryFn: () => getAllProcess(),
      refetchInterval: 5000,
    });
  };

  const { data, isLoading, refetch } = useQueryAllProcess();

  // useEffect(() => {
  //   getAllProcess();
  // }, []);

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
        <div className="flex flex-1"></div>
        <div>
          <Input
            className="bg-white"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Filtrar..."
          />
        </div>
      </div>
    );
  };

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
              onChangeStatus("1", process);
            }}
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                <Send />
              </Button>
              <span>Respuesta de resolución</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div>
      <Card>
        <CardContent>
          <DataTable
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
            <Column field="date" header="Fecha"></Column>
            <Column field="type_law" sortable header="Tipo de ley"></Column>
            <Column field="run" sortable header="RUN"></Column>
            <Column field="rit" sortable header="RIT"></Column>
            <Column field="ruc" sortable header="RUC"></Column>
            <Column field="date_limit" header="Fecha limite"></Column>
            {/* <Column
              field="type_resolution"
              sortable
              header="Tipo de resolución"
            ></Column> */}
            {/* <Column
              field="document"
              header="Documento adjunto"
              body={<span>Sin documento</span>}
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
      <Pagination />
      <InformeModal
        open={modal}
        type={typeModal}
        process={currentProcess}
        onClose={() => setModal(false)}
        // refetch={refetch}
      />
      {/* <DetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles del instalación"
        data={selectedDocument}
        fields={[
          { key: "deviceStatus", label: "Estado del Dispositivo" },
          { key: "installationLocation", label: "Lugar de Instalación" },
          { key: "deviceType", label: "Tipo de Dispositivo" },
          { key: "serialNumber", label: "Número de Serie" },
          { key: "installationDate", label: "Fecha de Instalación" },
        ]}
      /> */}
    </div>
  );
};

export default TableInforme;
