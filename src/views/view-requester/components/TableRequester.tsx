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
  Briefcase,
  BriefcaseBusiness,
  Ellipsis,
  Eye,
  Gavel,
  Pencil,
  Trash,
  UserCheck,
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
import { Requester } from "@/db/requester";
import DeleteModalRequester from "@/components/DeleteModalRequester";
import UpdatedRequesterModal from "./UpdatedRequesterModal";
import { useQueryRequesters } from "@/api/queries";

const TableRequester = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [selectedRequester, setSelectedRequester] = useState<Requester>();
  const { data: requesters, isLoading, refetch } = useQueryRequesters();
  const filters = [
    { id: 1, name: "Nombre" },
    { id: 2, name: "Email" },
    { id: 3, name: "Tipo" },
    { id: 4, name: "Institución" },
    { id: 5, name: "Ciudad" },
    { id: 6, name: "Dirección" },
    { id: 7, name: "Identificación" },
  ];
  console.log("requesters", requesters);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Requirentes
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
        <CardContent className="w-full px-3">
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  NOMBRE COMPLETO
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  EMAIL
                </TableHead>

                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  INSTITUCIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  CIUDAD
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  DIRECCIÓN
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  NÚMERO DE IDENTIFICACIÓN
                </TableHead>
                <TableHead className="mr-10 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {requesters?.map((requester, index) => (
                <TableRow key={index}>
                  <TableCell>{requester.fullName}</TableCell>
                  <TableCell>{requester.email}</TableCell>
                  <TableCell>
                    <div className="w-28 flex items-center justify-between gap-2 bg-green-400 text-white py-1 px-2 font-bold rounded-md">
                      {requester.userType}

                      {requester.userType === "Abogado" && (
                        <BriefcaseBusiness size={15} />
                      )}

                      {requester.userType === "Defensor" && <Gavel size={15} />}

                      {requester.userType === "Particular" && (
                        <UserCheck size={15} />
                      )}

                      {requester.userType === "Otros" && (
                        <Briefcase size={15} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{requester.institution}</TableCell>
                  <TableCell>{requester.region}</TableCell>
                  <TableCell>{requester.address}</TableCell>
                  <TableCell>{requester.identificationNumber}</TableCell>

                  <TableCell className="mr-10 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-10">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedRequester(requester);
                            setIsModalOpen(true);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Eye />
                            </Button>
                            <span>Detalles</span>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedRequester(requester);
                            setIsModalOpen2(true);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Pencil />
                            </Button>
                            <span>Editar</span>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedRequester(requester);
                            setIsModalOpen3(true);
                          }}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Trash />
                            </Button>
                            <span>Eliminar</span>
                          </div>
                        </DropdownMenuItem>
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
        </CardContent>
      </Card>
      <Pagination />
      <DetailsModal
        open={isModalOpen}
        requester={selectedRequester}
        onClose={() => setIsModalOpen(false)}
      />

      <UpdatedRequesterModal
        refetch={refetch}
        open={isModalOpen2}
        requester={selectedRequester}
        onClose={() => setIsModalOpen2(false)}
      />

      <DeleteModalRequester
        id={selectedRequester?._id}
        open={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        refetch={refetch}
      />
    </div>
  );
};

export default TableRequester;
