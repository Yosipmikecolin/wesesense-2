import { useEffect, useState } from "react";
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
  FileCheck2,
  FileX2,
  Info,
  Redo2,
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
import ReturnRequestModal from "../ReturnRequestModal";
import ReturnDetailsModal from "../ReturnDetailsModal";
import FilterStatus from "../FilterStatus";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryRequest } from "@/api/queries";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { updatedRequest } from "@/api/request";
import axios from "axios";
import { useBuddieStore } from "@/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const TableAdministrator = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalReturnOpen, setIsModaReturnlOpen] = useState(false);
  const [isModalReturnOpenDetails, setIsModaReturnlOpenDetails] =
    useState(false);
  const email = "sgamgc@correo.com";
  const subject = encodeURIComponent("SGAMGC");
  const body = encodeURIComponent("Respuesta de la solicitud");
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);

  const [stateFilter, setStateFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RequestTable>();
  const [type, setType] = useState<"requester" | "awardee">("requester");
  const { data: requests, isLoading, refetch } = useQueryRequest();
  const { token, setToken } = useBuddieStore();
  const route = useRouter();
  const [carrier, setCarrier] = useState();
  const filters = [
    { id: 1, name: "Tipo de requirente" },
    { id: 2, name: "Nombre del requirente" },
    { id: 3, name: "Numero de identificación" },
    { id: 4, name: "Tipo de situación" },
  ];

  const handleClick = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  useEffect(() => {
    const carrierBuddie = localStorage.getItem("carrier-buddie");
    if (carrierBuddie) {
      const value = JSON.parse(carrierBuddie);
      setCarrier(value);
    }
  }, []);

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

                <TableHead className="text-xs font-bold text-gray-600">
                  <Popover>
                    <PopoverTrigger className="flex gap-2">
                      ESTADO <Info size={15} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <ul>
                        <li className="flex items-center gap-2">
                          <CircleSlash size={17} color="#B7B7B7" />
                          Sin respuesta
                        </li>

                        <li className="flex items-center gap-2">
                          <RotateCw size={17} color="#FF9D23" />
                          Retornado a la empresa
                        </li>
                        <li className="flex items-center gap-2">
                          <RotateCw size={17} color="#FF9D23" />
                          Retornado al requirente
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleCheck size={17} color="#16a34a" /> Confirmado
                        </li>
                        <li className="flex items-center gap-2">
                          <Eye size={17} color="#4D55CC" />
                          En revision
                        </li>
                        <li className="flex items-center gap-2">
                          <CircleMinus size={17} color="#577BC1" />
                          La empresa respondio
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
              {requests?.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.requester.userType}</TableCell>
                  <TableCell>{request.requester.fullName}</TableCell>
                  <TableCell className="text-xs ">
                    <div className="w-[140px]">
                      {request.answer === "positive" && (
                        <div className="flex items-center gap-2">
                          <span className="bg-green-400 text-white p-1 rounded-md">
                            Positivo
                          </span>
                          {request.status === "confirmed" && (
                            <CircleCheck size={17} color="#16a34a" />
                          )}
                        </div>
                      )}

                      {request.answer === "negative" && (
                        <div className="flex items-center gap-2">
                          <span className="bg-red-400 text-white p-1 rounded-md">
                            Negativo
                          </span>
                          {request.status === "confirmed" && (
                            <CircleCheck size={17} color="#16a34a" />
                          )}
                        </div>
                      )}

                      {request.answer === "not-recommended" && (
                        <div className="flex items-center gap-2">
                          <span className="bg-orange-400 text-white p-1 rounded-md">
                            No recomendado
                          </span>
                          {request.status === "confirmed" && (
                            <CircleCheck size={17} color="#16a34a" />
                          )}
                        </div>
                      )}

                      {request.answer === "no-confirmed" && (
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-400 text-white p-1 rounded-md">
                            Sin respuesta
                          </span>
                        </div>
                      )}

                      {request.answer === "---" && (
                        <div className="flex items-center gap-2">---</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{request.issue_date}</TableCell>

                  <TableCell>{request.response_date || "----"}</TableCell>

                  <TableCell>
                    {request.status === "confirmed" && (
                      <div className="flex items-center gap-2">
                        <CircleCheck size={17} color="#16a34a" />
                        <span className="text-sm">Confirmado</span>
                      </div>
                    )}

                    {request.status === "returned" && (
                      <div className="flex gap-2 items-center">
                        <RotateCw size={17} color="#FF9D23" />
                        <span className="text-sm">Retornado a la empresa</span>
                      </div>
                    )}

                    {request.status === "unconfirmed" && (
                      <div className="flex items-center gap-2">
                        <CircleSlash size={17} color="#B7B7B7" />
                        <span className="text-sm">Sin respuesta</span>
                      </div>
                    )}

                    {request.status === "answered" && (
                      <div className="flex items-center gap-2">
                        <CircleMinus size={17} color="#577BC1" />
                        <span className="text-sm">La empresa respondio</span>
                      </div>
                    )}

                    {request.status === "reviewing" && (
                      <li className="flex items-center gap-2">
                        <Eye size={17} color="#4D55CC" />
                        En revision
                      </li>
                    )}

                    {request.status === "returned_to_requester" && (
                      <li className="flex items-center gap-2">
                        <RotateCw size={17} color="#FF9D23" />
                        Retornado al requirente
                      </li>
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
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedRequest(request);
                            setIsModalOpenDetails(true);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Eye />
                            </Button>
                            <span>Detalles</span>
                          </div>
                        </DropdownMenuItem>

                        {/* OPCIONES PARA LA RETONRO DE LA SOLICITUD AL REQUIRENTE */}
                        {request.status === "returned_to_requester" && (
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

                        {/* OPCIONES PARA LA SOLICITUD DEL REQUIRENTE */}
                        {request.status === "reviewing" && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                              toast.success("Solicitud confirmada");
                              await updatedRequest({
                                ...request,
                                status: "unconfirmed",
                                answer: "no-confirmed",
                                time_respond: "24 horas",
                              });
                              refetch();
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FileCheck2 />
                              </Button>
                              <span>Aceptar</span>
                            </div>
                          </DropdownMenuItem>
                        )}

                        {request.status === "reviewing" && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setIsModaReturnlOpen(true);
                              setSelectedRequest(request);
                              setType("requester");
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FileX2 />
                              </Button>
                              <span>Regresar</span>
                            </div>
                          </DropdownMenuItem>
                        )}

                        {/* OPCIONES PARA LA RESPUESTA DE BUDDI */}
                        {request.status === "answered" && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                              const response_create = await axios.post(
                                "/api/buddie",
                                {
                                  method: "setup.wearer.create",
                                  token,
                                  create_wearer: carrier,
                                }
                              );
                              if (response_create.data.error) {
                                route.push("/");
                                localStorage.setItem("sesion", "1");
                              } else {
                                await updatedRequest({
                                  ...request,
                                  status: "confirmed",
                                  time_respond: "",
                                });
                                setToken(response_create.data.csrf_token);
                                refetch();
                              }
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FileCheck2 />
                              </Button>
                              <span>Confirmar</span>
                            </div>
                          </DropdownMenuItem>
                        )}

                        {request.status === "answered" && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsModaReturnlOpen(true);
                              setType("awardee");
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Redo2 />
                              </Button>
                              <span>Devolver</span>
                            </div>
                          </DropdownMenuItem>
                        )}

                        {/* OPCIONES PARA LA GENDARMERRIA SI ACEPTO LA SOLCIITUD DE BUDDI */}

                        {/*                         {request.status === "confirmed" && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsModaReturnlOpen(true);
                              setType("awardee");
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <FileDown />
                              </Button>
                              <span>Exportar SFIT</span>
                            </div>
                          </DropdownMenuItem>
                        )} */}

                        {/*              {request.status === "confirmed" && (
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <SendHorizontal />
                                </Button>
                                <span>Exportar SFIT</span>
                              </div>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={handleClick}>
                                  <Mail size={15} />
                                  Email
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        )} */}
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
          {!isLoading && !requests?.length && (
            <div className="w-full h-[500px] bg-r flex justify-center items-center">
              <h1 className="text-xl">No hay solicitudes</h1>
            </div>
          )}
        </CardContent>
      </Card>
      <Pagination />
      <ReturnRequestModal
        type={type}
        refetch={refetch}
        request={selectedRequest}
        open={isModalReturnOpen}
        onClose={() => setIsModaReturnlOpen(false)}
      />

      <DetailsModal
        open={isModalOpenDetails}
        request={selectedRequest}
        onClose={() => setIsModalOpenDetails(false)}
      />

      {selectedRequest && (
        <ReturnDetailsModal
          type={type}
          request={selectedRequest}
          open={isModalReturnOpenDetails}
          onClose={() => setIsModaReturnlOpenDetails(false)}
        />
      )}
    </div>
  );
};
