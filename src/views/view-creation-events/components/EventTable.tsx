"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteModalEvent from "./DeleteModalEvent";

export interface EventType {
  _id: string;
  type: string;
  date: string;
  note: string;
  user: string;
}
export interface UserType {
  _id: string;
  email: string;
  name: string;
  nit: string;
  perfil: string;
  phone: string;
  status: string;
}

interface Props {
  onEvent: (data: EventType) => void;
}

export default function EventTable({ onEvent }: Props) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get<EventType[]>(`/api/awardee`);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers().then(() => {
      getAll();
    });
  }, []);

  const findUser = (value: EventType) => {
    const result = users.find((item) => item._id === value.user);
    return result ? result.name : "Sin usuario";
  };

  const onUpdate = (item: EventType) => {
    onEvent(item);
  };

  const onDelete = async (item: EventType) => {
    setSelectedToDelete(item._id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Incidencias registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold text-gray-600">
                    TIPO DE EVENTO
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600">
                    FECHA
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600">
                    NOTA
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600">
                    USUARIO
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600">
                    ACCIONES
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.note}</TableCell>
                    <TableCell>{users.length > 0 && findUser(event)}</TableCell>
                    <TableCell className="mr-10 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-10">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onUpdate(event)}>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <Pencil />
                              </Button>
                              <span>Editar</span>
                            </div>
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => onDelete(event)}>
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
            </Table>
          </div>
        </CardContent>
      </Card>
      <Pagination />
      <DeleteModalEvent
        id={selectedToDelete}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // refetch={refetch}
      />
    </div>
  );
}
