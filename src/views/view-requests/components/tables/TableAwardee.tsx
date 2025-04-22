"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CircleCheck,
  CircleMinus,
  CircleSlash,
  Ellipsis,
  Eye,
  FilePen,
  FileText,
  Info,
  RotateCw,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DetailsModal from "../DetailsModal";
import ReturnDetailsModal from "../ReturnDetailsModal";
import FilterStatus from "../FilterStatus";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryRequest } from "@/api/queries";
import { RequestTable } from "@/views/view-create-request/interfaces";
import AddressModal from "../AddressModal";
import { generatePDF } from "@/views/view-carriers/functions";

export const TableAwardee = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReturnOpenDetails, setIsModaReturnlOpenDetails] =
    useState(false);

  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [stateFilter, setStateFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RequestTable>();
  const { data: requests, isLoading, refetch } = useQueryRequest();
  const filters = [
    { id: 1, name: "Tipo de requirente" },
    { id: 2, name: "Nombre del requirente" },
    { id: 3, name: "Numero de identificación" },
    { id: 4, name: "Tipo de situación" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Solicitudes de factibilidad técnica
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
          <FilterStatus
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
          />
        </div>
      </div>
      <Card className="w-full shadow-lg py-2">
        <CardContent className="w-full px-3">
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE REQUIRENTE
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NOMBRE DEL REQUIRENTE
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  RESPUESTA DE LA EMPRESA
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600 ">
                  FECHA DE EMISIÓN
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600 ">
                  FECHA DE RESPUESTA
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600 ">
                  TIEMPO PARA RESPONDER
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  <Popover>
                    <PopoverTrigger className="flex gap-2">
                      ESTADO <Info size={15} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <ul>
                        <li className="flex items-center gap-2">
                          <CircleSlash size={17} color="#B7B7B7" />
                          Sin responder
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={17} color="#16a34a" /> Respondido
                        </li>
                        <li className="flex items-center gap-2">
                          <RotateCw size={17} color="#FF9D23" />
                          Retornado
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </TableHead>
                <TableHead className="mr-10 mt-6 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {requests
                ?.filter(
                  (i) =>
                    i.status !== "confirmed" &&
                    i.status !== "reviewing" &&
                    i.status !== "returned_to_requester"
                )
                ?.filter((i) => {
                  if (!stateFilter) return true;
                  return i.status === stateFilter;
                })
                .map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.requester.userType}</TableCell>
                    <TableCell>{request.requester.fullName}</TableCell>
                    <TableCell className="text-xs ">
                      <div className="w-[120px]">
                        {request.answer === "positive" && (
                          <span className="bg-green-400 text-white py-1 px-2 rounded-md">
                            Positivo
                          </span>
                        )}
                        {request.answer === "negative" && (
                          <span className="bg-red-400 text-white py-1 px-2 rounded-md">
                            Negativo
                          </span>
                        )}
                        {request.answer === "not-recommended" && (
                          <span className="bg-orange-400 text-white py-1 px-2 rounded-md">
                            No recomendado
                          </span>
                        )}

                        {request.answer === "no-confirmed" && (
                          <span className="bg-gray-400 text-white py-1 px-2 rounded-md">
                            Sin respuesta
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{request.issue_date}</TableCell>
                    <TableCell>{request.response_date || "----"}</TableCell>
                    <TableCell>{request.time_respond || "----"}</TableCell>

                    <TableCell>
                      {request.status === "returned" && (
                        <div className="flex gap-2 items-center">
                          <RotateCw size={17} color="#FF9D23" />
                          <span className="text-sm">Retornado</span>
                        </div>
                      )}

                      {request.status === "unconfirmed" && (
                        <div className="flex items-center gap-2">
                          <CircleSlash size={17} color="#B7B7B7" />
                          <span className="text-sm">Sin responder</span>
                        </div>
                      )}

                      {request.status === "answered" && (
                        <div className="flex items-center gap-2">
                          <CircleCheck size={17} color="#16a34a" />
                          <span className="text-sm">Respondido</span>
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="mr-10 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsModalOpenDetails(true);
                            }}
                          >
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Eye />
                              </Button>
                              <span>Detalles</span>
                            </div>
                          </DropdownMenuItem>

                          {request.status === "returned" && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsModalOpen(true);
                              }}
                            >
                              <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setSelectedRequest(request)}
                              >
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <FilePen />
                                </Button>
                                Gestionar devolución
                              </div>
                            </DropdownMenuItem>
                          )}

                          {request.status === "unconfirmed" && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsModalOpen(true);
                              }}
                            >
                              <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setSelectedRequest(undefined)}
                              >
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <FilePen />
                                </Button>
                                Gestionar
                              </div>
                            </DropdownMenuItem>
                          )}

                          {/* OPCIONES PARA LA RETONRO DEL ADJUDICADO */}
                          {request.status === "returned" && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => {
                                setIsModaReturnlOpenDetails(true);
                                setSelectedRequest(request);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Search />
                                </Button>
                                <span>Motivo</span>
                              </div>
                            </DropdownMenuItem>
                          )}

                          {request.status === "answered" && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={async () => {
                                console.log("request", request);
                                generatePDF(request);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <FileText />
                                </Button>
                                <span>Ver informe</span>
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
          {isLoading && (
            <div className="w-full h-[500px] bg-r flex justify-center items-center">
              <div className="loader-spiner" />
            </div>
          )}
          {!isLoading &&
            !requests?.filter(
              (i) =>
                i.status !== "confirmed" &&
                i.status !== "reviewing" &&
                i.status !== "returned_to_requester"
            ).length && (
              <div className="w-full h-[500px] bg-r flex justify-center items-center">
                <h1 className="text-xl">No hay solicitudes</h1>
              </div>
            )}
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpenDetails}
        request={selectedRequest}
        onClose={() => setIsModalOpenDetails(false)}
      />
      <AddressModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />
      {selectedRequest && (
        <ReturnDetailsModal
          type={"awardee"}
          request={selectedRequest}
          open={isModalReturnOpenDetails}
          onClose={() => setIsModaReturnlOpenDetails(false)}
        />
      )}
    </div>
  );
};
