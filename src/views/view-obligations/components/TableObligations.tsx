import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { obligations } from "@/utils";
import {
  Circle,
  Ellipsis,
  Eye,
  FilePenLine,
  FileSymlink,
  FileUp,
  Pencil,
  PlusCircle,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DetailsModal from "./DetailsModal";
import ObservationModal from "./ObservationModal";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CreateObligationModal from "./CreateObligation";

export interface ObligationType {
  _id: string;
  contractual_obligation: string;
  notes: string;
  file_url: string;
  file_name: string;
  relation: string;
  status: string;
}

interface Props {
  mode_supervise: boolean;
}

const TableObligations = ({ mode_supervise }: Props) => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [obligation, setObligation] = useState<ObligationType | null>(null);
  const filters = [
    { id: 1, name: "Obligación" },
    { id: 2, name: "Nombre" },
    { id: 3, name: "Estado" },
  ];

  const getAllObligations = async () => {
    const response = await axios.get<ObligationType[]>(`/api/contract`);
    return response.data;
    // setProducts(response.data);
  };

  const useQueryAllObligations = () => {
    return useQuery({
      queryKey: ["all_obligations"],
      queryFn: () => getAllObligations(),
      refetchInterval: 5000,
    });
  };

  const { data, isLoading, refetch } = useQueryAllObligations();

  const onDelete = async (obligation: ObligationType) => {
    const response = await axios.delete(`/api/contract`, {
      params: {
        id: obligation._id,
      },
    });
    refetch();
  };

  const onUpdate = (obligation: ObligationType) => {
    setIsModalCreate(true);
    setObligation(obligation);
  };

  const onCloseCreateModal = () => {
    setIsModalCreate(false);
    setObligation(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Registro de obligaciones
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
      <Card className="w-full shadow-lg py-2">
        <CardHeader className="flex flex-row items-center justify-between">
          {mode_supervise ? (
            ""
          ) : (
            <Button onClick={() => setIsModalCreate(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Crear Obligación
            </Button>
          )}
        </CardHeader>
        <CardContent className="w-full px-3">
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  ID
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  OBLIGACIÓN CONTRACTUAL
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  NOMBRE DEL ARCHIVO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  ARCHIVO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  RELACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  ESTADO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  OBERVACIÓN
                </TableHead>

                <TableHead className="mr-10 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {data &&
                data.map((obligation, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{obligation.contractual_obligation}</TableCell>
                    <TableCell>
                      {obligation.file_name ? obligation.file_name : "N/A"}
                    </TableCell>
                    <TableCell>
                      {obligation.file_url ? (
                        <a
                          className=" underline text-green-500 "
                          href={obligation.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Descargar
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      {!obligation.relation || obligation.relation === ""
                        ? "Sin relación"
                        : `Obligación #${obligation.relation}`}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                          obligation.status === "Activo"
                            ? "bg-green-400 text-white"
                            : obligation.status === "Pendiente"
                            ? "bg-yellow-400 text-black"
                            : obligation.status === "En progreso"
                            ? "bg-blue-400 text-white"
                            : obligation.status === "Completado"
                            ? "bg-purple-400 text-white"
                            : "bg-gray-100 text-gray-800" // Estado por defecto
                        }`}
                      >
                        {obligation.status === "Activo" ? (
                          "● Activo"
                        ) : obligation.status === "Pendiente" ? (
                          "● Pendiente"
                        ) : obligation.status === "En progreso" ? (
                          "● En progreso"
                        ) : obligation.status === "Completado" ? (
                          "● Completado"
                        ) : (
                          <div className="flex items-center gap-1">
                            <Circle size={7} /> Desconocido
                          </div>
                        )}
                      </span>
                    </TableCell>
                    <TableCell>{obligation.notes}</TableCell>
                    <TableCell className="mr-10 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-10">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {mode_supervise ? (
                            ""
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setIsModalOpen(true);
                                setObligation(obligation);
                              }}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Eye />
                                </Button>
                                <span>Detalles</span>
                              </div>
                            </DropdownMenuItem>
                          )}
                          {mode_supervise ? (
                            ""
                          ) : (
                            <DropdownMenuItem
                              onClick={() => onUpdate(obligation)}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Pencil />
                                </Button>
                                <span>Editar</span>
                              </div>
                            </DropdownMenuItem>
                          )}
                          {mode_supervise ? (
                            ""
                          ) : (
                            <DropdownMenuItem
                              onClick={() => onDelete(obligation)}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Trash />
                                </Button>
                                <span>Eliminar</span>
                              </div>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => {
                              setIsModalOpen2(true);
                              setObligation(obligation);
                            }}
                          >
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FileUp />
                              </Button>
                              <span>Fiscalizar</span>
                            </div>
                          </DropdownMenuItem>
                          {mode_supervise ? (
                            ""
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setIsModalOpen2(true);
                                setObligation(obligation);
                              }}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <FileSymlink />
                                </Button>
                                <span>Auditar</span>
                              </div>
                            </DropdownMenuItem>
                          )}
                          {mode_supervise ? (
                            ""
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setIsModalOpen2(true);
                                setObligation(obligation);
                              }}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <FilePenLine />
                                </Button>
                                <span>Registrar</span>
                              </div>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TableUI>
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpen}
        obligation={obligation}
        onClose={() => setIsModalOpen(false)}
      />
      <ObservationModal
        open={isModalOpen2}
        obligation={obligation}
        onClose={() => setIsModalOpen2(false)}
      />
      <CreateObligationModal
        open={isModalCreate}
        obligation={obligation}
        onClose={onCloseCreateModal}
        refetch={refetch}
      />
    </div>
  );
};

export default TableObligations;
