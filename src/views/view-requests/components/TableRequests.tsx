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

import { requests } from "@/utils";
import {
  CircleCheck,
  CircleMinus,
  CircleSlash,
  Ellipsis,
  Eye,
  FileCheck2,
  FilePen,
  Info,
  Mail,
  Redo2,
  RotateCw,
  SendHorizontal,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownFilter, Pagination } from "@/components";
import AddressModal from "./AddressModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { toast } from "@/hooks/use-toast";
import FilterStatus from "./FilterStatus";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Request } from "@/interfaces";

const TableRequests = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReturnOpen, setIsModaReturnlOpen] = useState(false);
  const [isModalReturnOpenDetails, setIsModaReturnlOpenDetails] =
    useState(false);
  const email = "sgamgc@correo.com";
  const subject = encodeURIComponent("SGAMGC");
  const body = encodeURIComponent("Respuesta de la solicitud");
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [viewButton, setViewButton] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<Request>();
  const filters = [
    { id: 1, name: "Tipo de requirente" },
    { id: 2, name: "Nombre del requirente" },
    { id: 3, name: "Numero de identificación" },
    { id: 4, name: "Tipo de situación" },
  ];

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setViewButton(email);
    }
  }, []);

  const handleClick = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  const filterForRol = (requests: Request[]) => {
    if (viewButton === "administrator@gmail.com") {
      return requests.filter((i) => i.status.includes(stateFilter));
    } else if (viewButton === "requiring@gmail.com") {
      return requests.filter(
        (i) =>
          i.status.includes("Sin respuesta") || i.confirmation.includes("true")
      );
    } else {
      return requests
        .filter((a) => a.confirmation !== "true" && a.response_date === "----")
        .filter((i) => i.status.includes(stateFilter));
    }
  };

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
                  RESPUESTA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE SITUACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 ">
                  FECHA DE EMISIÓN
                </TableHead>

                {viewButton === "awardee@gmail.com" && (
                  <TableHead className="text-xs font-bold text-gray-600 ">
                    FECHA DE DEVOLUCIÓN
                  </TableHead>
                )}
                {viewButton === "awardee@gmail.com" && (
                  <TableHead className="text-xs font-bold text-gray-600 ">
                    TIEMPO PARA RESPONDER
                  </TableHead>
                )}
                {viewButton === "administrator@gmail.com" && (
                  <TableHead className="text-xs font-bold text-gray-600 ">
                    FECHA DE RESPUESTA
                  </TableHead>
                )}
                <TableHead className="text-xs font-bold text-gray-600">
                  <Popover>
                    <PopoverTrigger className="flex gap-2">
                      ESTADO <Info size={15} />
                    </PopoverTrigger>
                    <PopoverContent>
                      {viewButton === "administrator@gmail.com" ||
                      viewButton === "requiring@gmail.com" ? (
                        <div>
                          {viewButton === "requiring@gmail.com" ? (
                            <ul>
                              <li className="flex items-center gap-2">
                                <CircleSlash size={17} color="#B7B7B7" />
                                Sin repuesta
                              </li>
                              <li className="flex items-center gap-2">
                                <CircleCheck size={17} color="#16a34a" />{" "}
                                Confirmado
                              </li>
                            </ul>
                          ) : (
                            <ul>
                              <li className="flex items-center gap-2">
                                <CircleSlash size={17} color="#B7B7B7" />
                                Sin repuesta
                              </li>
                              <li className="flex items-center gap-2">
                                <CircleMinus size={17} color="#577BC1" />
                                Sin confirmar los datos
                              </li>
                              <li className="flex items-center gap-2">
                                <RotateCw size={17} color="#FF9D23" />
                                Retornado
                              </li>
                            </ul>
                          )}
                        </div>
                      ) : (
                        <ul>
                          <li className="flex items-center gap-2">
                            <CircleSlash size={17} color="#B7B7B7" />
                            No se ha dado una respuesta
                          </li>
                          <li className="flex items-center gap-2">
                            <RotateCw size={17} color="#FF9D23" />
                            Solicitud retornada
                          </li>
                          <li className="flex items-center gap-2">
                            <CircleCheck size={17} color="#16a34a" /> Confirmado
                          </li>
                        </ul>
                      )}
                    </PopoverContent>
                  </Popover>
                </TableHead>
                <TableHead className="mr-10 mt-6 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {(viewButton === "administrator@gmail.com"
                ? filterForRol(requests).filter(
                    (a) => a.confirmation !== "true"
                  )
                : filterForRol(requests)
              ).map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.requester_type}</TableCell>
                  <TableCell>{request.requester_name}</TableCell>
                  <TableCell className="text-xs ">
                    <div className="w-[110px]">
                      {request.status === "Positivo" && (
                        <span className="bg-green-400 text-white p-1 rounded-md">
                          {request.status}
                        </span>
                      )}
                      {request.status === "Sin respuesta" && (
                        <span className="bg-gray-400 text-white p-1 rounded-md">
                          {request.status}
                        </span>
                      )}
                      {request.status === "Negativo" && (
                        <span className="bg-red-400 text-white p-1 rounded-md">
                          {request.status}
                        </span>
                      )}
                      {request.status === "No recomendable" && (
                        <div className="flex items-center gap-2">
                          <span className="bg-orange-400 text-white p-1 rounded-md">
                            {request.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{request.situation_type}</TableCell>
                  <TableCell>{request.request_date}</TableCell>

                  {viewButton === "awardee@gmail.com" && (
                    <TableCell>
                      {request.confirmation !== "return"
                        ? "No aplica"
                        : request.request_date}
                    </TableCell>
                  )}

                  {viewButton === "awardee@gmail.com" && (
                    <TableCell
                      className={
                        request.hour === "13 horas y 15 minutos" ||
                        request.hour === "26 horas 25 minutos"
                          ? "text-red-500"
                          : "text-black"
                      }
                    >
                      {request.hour}
                    </TableCell>
                  )}
                  {viewButton === "administrator@gmail.com" && (
                    <TableCell>{request.response_date}</TableCell>
                  )}
                  <TableCell className="w-10">
                    {request.confirmation === "true" && (
                      <CircleCheck size={17} color="#16a34a" />
                    )}

                    {request.confirmation === "false" &&
                      request.response_date === "----" && (
                        <CircleSlash size={17} color="#B7B7B7" />
                      )}

                    {request.confirmation === "return" && (
                      <div className="flex gap-2 items-center">
                        <RotateCw size={17} color="#FF9D23" />
                        {viewButton === "awardee@gmail.com" && (
                          <Eye
                            size={17}
                            className="cursor-pointer"
                            onClick={() => setIsModaReturnlOpenDetails(true)}
                          />
                        )}
                      </div>
                    )}

                    {request.confirmation === "false" &&
                      request.response_date !== "----" && (
                        <CircleMinus size={17} color="#577BC1" />
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
                        {viewButton === "awardee@gmail.com" &&
                          (request.confirmation === "return" ? (
                            <DropdownMenuItem
                              onClick={() => setIsModalOpen(true)}
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
                          ) : (
                            <DropdownMenuItem
                              onClick={() => setIsModalOpen(true)}
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
                          ))}

                        {viewButton === "administrator@gmail.com" &&
                          request.status !== "Sin respuesta" &&
                          request.confirmation === "false" && (
                            <DropdownMenuItem
                              onClick={() =>
                                toast({
                                  title: "Solicitud confirmada",
                                  className: "bg-green-500 text-white",
                                  description:
                                    "Esta solicitud ha pasado por todo el proceso de verificación y validación.",
                                })
                              }
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <FileCheck2 />
                                </Button>
                                <span>Confirmar</span>
                              </div>
                            </DropdownMenuItem>
                          )}

                        {viewButton === "administrator@gmail.com" &&
                          request.status !== "Sin respuesta" &&
                          request.status !== "Positivo" &&
                          request.confirmation === "false" && (
                            <DropdownMenuItem
                              onClick={() => setIsModaReturnlOpen(true)}
                            >
                              <div className="flex items-center gap-2 cursor-pointer">
                                <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                  <Redo2 />
                                </Button>
                                <span>Devolver</span>
                              </div>
                            </DropdownMenuItem>
                          )}

                        {viewButton === "administrator@gmail.com" &&
                          request.confirmation === "true" && (
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <div className="flex items-center gap-2 cursor-pointer">
                                  <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                    <SendHorizontal />
                                  </Button>
                                  <span>Enviar IFT</span>
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
                          )}

                        {viewButton === "awardee@gmail.com" &&
                          request.confirmation === "true" && (
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                Estado
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title:
                                          "El estado ha sido cambiado a (Positivo)",
                                        className:
                                          "border border-green-500 text-green-600",
                                      });
                                    }}
                                  >
                                    Positivo
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title:
                                          "El estado ha sido cambiado a (Negativo)",
                                        className:
                                          "border border-red-500 text-red-600",
                                      });
                                    }}
                                  >
                                    Negativo
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      toast({
                                        title:
                                          "El estado ha sido cambiado a (No recomendable)",
                                        className:
                                          "border border-orange-500 text-orange-600",
                                      });
                                    }}
                                  >
                                    No recomendable
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          )}

                        {/*                {viewButton === "requiring@gmail.com" && (
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Pencil />
                              </Button>
                              <span>Editar</span>
                            </div>
                          </DropdownMenuItem>
                        )} */}
                        {viewButton === "requiring@gmail.com" && (
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Trash />
                              </Button>
                              <span>Eliminar</span>
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

      {/*    <DetailsModal
        open={isModalOpenDetails}
        request={selectedRequest}
        onClose={() => setIsModalOpenDetails(false)}
      /> */}

      {/*       <AddressModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </div>
  );
};

export default TableRequests;
