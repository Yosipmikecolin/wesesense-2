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

import { Circle, Ellipsis, Eye, Pencil, Trash } from "lucide-react";
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
import UpdatedUserModal from "./UpdatedUserModal";
import DeleteModalUser from "@/components/DeleteModalUser";
import { useQueryUsers } from "@/api/queries";
import { User } from "@/db/user";

const TableUsers = () => {
  const [idFilter, setIdFilter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [user, setUser] = useState<User>();
  const { data: users, isLoading, refetch } = useQueryUsers();

  const filters = [
    { id: 1, name: "Nombre" },
    { id: 2, name: "Nit" },
    { id: 3, name: "Perfil" },
    { id: 4, name: "Estado" },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Usuarios
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
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  NOMBRE COMPLETO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  NIT
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  PERFIL
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  ESTADO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  EMAIL
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  FECHA DE CREACIÓN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-gray-600">
                  TELÉFONO
                </TableHead>
                <TableHead className="mr-10 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.nit}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                        user.perfil === "Requirente"
                          ? "bg-orange-400 text-white p-1 rounded-md"
                          : user.perfil === "Coordinador"
                          ? "bg-blue-400 text-white p-1 rounded-md"
                          : "bg-red-400 text-white p-1 rounded-md"
                      }`}
                    >
                      {user.perfil}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "Activo"
                          ? "bg-green-400 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status === "Activo" ? (
                        "● Activo"
                      ) : (
                        <div className="flex items-center gap-1">
                          <Circle size={7} /> Inactivo
                        </div>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.creation_date}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell className="mr-10 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-10">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setIsModalOpen(true);
                            setUser(user);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Eye />
                            </Button>
                            <span>Detalles</span>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setIsModalOpen2(true);
                            setUser(user);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                              <Pencil />
                            </Button>
                            <span>Editar</span>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setIsModalOpen3(true);
                            setUser(user);
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
        user={user}
        onClose={() => setIsModalOpen(false)}
      />

      <UpdatedUserModal
        open={isModalOpen2}
        user={user}
        onClose={() => setIsModalOpen2(false)}
        refetch={refetch}
      />

      <DeleteModalUser
        id={user?._id}
        open={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        refetch={refetch}
      />
    </div>
  );
};

export default TableUsers;
