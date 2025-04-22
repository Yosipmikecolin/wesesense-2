"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Check, Ellipsis, PlusCircle, Send, Tag } from "lucide-react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import CreationSupport from "./components/CreationSupport";
import SupportModal from "./components/SupportModal";

export interface SupportType {
  _id: string;
  createdAt: string;
  adress: string;
  type_support: string;
  priority: string;
  status: string;
  result: string;
  window: string;
  start_date: string;
  finish_date: string;
  user_assigned: string;
  finished: string;
  support: Object;
}

const ViewSupportManagement = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [modal, setModal] = useState(false);
  const [currentSupport, setCurrentSupport] = useState<SupportType>();

  const [typeModal, setTypeModal] = useState("0");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const onChangeModal = (e: boolean) => {
    setIsShowModal(e);
  };

  const getAllSupport = async () => {
    const response = await axios.get(`/api/awardee/support`, {
      params: {
        method: "get.all",
      },
    });
    return response.data;
  };

  const useQueryAllSupports = () => {
    return useQuery({
      queryKey: ["all_supports"],
      queryFn: () => getAllSupport(),
    });
  };

  const show = () => {
    setIsShowModal(true);
  };

  const closeDialog = () => {
    setIsShowModal(false);
  };

  const { data, isLoading, refetch } = useQueryAllSupports();

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
        <Button onClick={show} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Soporte
        </Button>
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

  const renderWindow = (support: SupportType) => {
    const fecha1 = new Date(support.start_date);
    const fecha2 = new Date(support.finish_date);
    const opciones = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // o true si prefieres formato AM/PM
    } as const;
    const date1 = fecha1.toLocaleString("es-ES", opciones);
    const date2 = fecha2.toLocaleString("es-ES", opciones);
    return (
      <>
        <span>
          {date1} - {date2}
        </span>
      </>
    );
  };

  const renderFecha = (support: SupportType) => {
    const fecha = new Date(support.createdAt);
    return <span>{fecha.toLocaleDateString()}</span>;
  };

  const bodyActions = (support: SupportType) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {support.finished === "No" && (
            <DropdownMenuItem
              onClick={() => {
                onChangeStatus("1", support);
              }}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                  <Tag />
                </Button>
                <span>Cerrar ticket</span>
              </div>
            </DropdownMenuItem>
          )}
          {support.finished === "Si" && (
            <DropdownMenuItem
              onClick={() => {
                //   onChangeStatus("0", support);
              }}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                  <Send />
                </Button>
                <span>Enviar</span>
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const onChangeStatus = (value: string, support: SupportType) => {
    if (value === "1") {
      setTypeModal(value);
      setCurrentSupport(support);
      setModal(true);
    }
    if (value === "0") {
      setTypeModal(value);
      setCurrentSupport(support);
      setModal(true);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Gestión de soporte</h1>

      <Dialog open={isShowModal} onOpenChange={onChangeModal}>
        <DialogContent>
          <CreationSupport onClose={closeDialog} refetch={refetch} />
        </DialogContent>
      </Dialog>

      <Card className="mt-6">
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
            globalFilterFields={["type_support", "priority", "status"]}
          >
            <Column
              field="createdAt"
              header="Fecha"
              body={renderFecha}
            ></Column>
            <Column field="adress" sortable header="Dirección"></Column>
            <Column field="type_support" sortable header="Tipo"></Column>
            <Column field="priority" sortable header="Prioridad"></Column>
            <Column field="status" sortable header="Estado"></Column>
            <Column field="result" sortable header="Resultado"></Column>
            <Column
              field="window"
              header="Ventana"
              body={renderWindow}
            ></Column>
            <Column field="user_assigned" sortable header="Asignado"></Column>
            <Column field="finished" header="Terminado"></Column>
            {/* <Column field="status" header="Estado"></Column> */}
            <Column
              field="actions"
              header="Acciones"
              body={bodyActions}
            ></Column>
          </DataTable>
        </CardContent>
      </Card>

      <SupportModal
        refetch={refetch}
        open={modal}
        type={typeModal}
        support={currentSupport}
        onClose={() => setModal(false)}
        // refetch={refetch}
      />
    </div>
  );
};

export default ViewSupportManagement;
