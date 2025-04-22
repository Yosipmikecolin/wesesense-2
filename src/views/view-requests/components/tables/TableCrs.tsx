"use client";

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
  CircleX,
  Download,
  Ellipsis,
  Eye,
  FileCheck2,
  FileText,
  FileX2,
  Info,
  Redo2,
  RotateCw,
  Search,
  SquareCheckBig,
  SquareX,
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

import ModalCRS from "../ModalCRS";

export const TableCrs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("1");
  const data = [
    {
      date: "2025-01-15",
      law: "21.378",
      rit: "RIT-001-2025",
      rut: "12345678-9",
      attached_document: "doc_001.pdf",
      status: "accepted",
    },
    {
      date: "2025-02-03",
      law: "18.216",
      rit: "RIT-002-2025",
      rut: "98765432-1",
      attached_document: "doc_002.pdf",
      status: "not accepted",
    },
    {
      date: "2025-03-22",
      law: "21.378",
      rit: "RIT-003-2025",
      rut: "11223344-5",
      attached_document: "doc_003.pdf",
      status: "accepted",
    },
    {
      date: "2025-04-10",
      law: "18.216",
      rit: "RIT-004-2025",
      rut: "55667788-0",
      attached_document: "doc_004.pdf",
      status: "not accepted",
    },
    {
      date: "2025-05-18",
      law: "21.378",
      rit: "RIT-005-2025",
      rut: "22334455-6",
      attached_document: "doc_005.pdf",
      status: "accepted",
    },
    {
      date: "2025-06-27",
      law: "18.216",
      rit: "RIT-006-2025",
      rut: "33445566-7",
      attached_document: "doc_006.pdf",
      status: "not accepted",
    },
    {
      date: "2025-07-09",
      law: "21.378",
      rit: "RIT-007-2025",
      rut: "44556677-8",
      attached_document: "doc_007.pdf",
      status: "accepted",
    },
    {
      date: "2025-08-14",
      law: "18.216",
      rit: "RIT-008-2025",
      rut: "66778899-2",
      attached_document: "doc_008.pdf",
      status: "not accepted",
    },
    {
      date: "2025-09-30",
      law: "21.378",
      rit: "RIT-009-2025",
      rut: "77889900-3",
      attached_document: "doc_009.pdf",
      status: "accepted",
    },
    {
      date: "2025-10-12",
      law: "18.216",
      rit: "RIT-010-2025",
      rut: "88990011-4",
      attached_document: "doc_010.pdf",
      status: "not accepted",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Proceso de recepción de sentencia y resoluciones
        </CardTitle>
      </div>
      <Card className="w-full shadow-lg py-2">
        <CardContent className="w-full px-3">
          <TableUI>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold text-gray-600">
                  FECHA
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  TIPO DE LEY
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600">
                  RIT
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 ">
                  RUT
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 ">
                  ESTADO
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-600 ">
                  DOCUMENTO ADJUNTADO
                </TableHead>
                <TableHead className="mr-10 mt-6 text-xs font-bold uppercase text-gray-600 flex justify-end">
                  ACCIONES
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="mt-5">
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.law}</TableCell>
                  <TableCell>{item.rit}</TableCell>
                  <TableCell>{item.rut}</TableCell>
                  <TableCell>
                    {item.status === "accepted" ? (
                      <div className="flex items-center gap-2">
                        Aceptada <CircleCheck size={13} color="green" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        No aceptada <CircleX size={13} color="red" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-sm w-full">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium truncate">
                            {item.attached_document}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700"
                          title="Descargar"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="mr-10 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {item.status === "not accepted" && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setIsModalOpen(true);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <SquareCheckBig />
                              </Button>
                              <span>Aceptar</span>
                            </div>
                          </DropdownMenuItem>
                        )}

                        {item.status === "accepted" && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setIsModalOpen(true);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <Button className="bg-gray-200 hover:bg-gray-200 text-gray-800 p-2">
                                <SquareX />
                              </Button>
                              <span>Devolución</span>
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

      <ModalCRS open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
