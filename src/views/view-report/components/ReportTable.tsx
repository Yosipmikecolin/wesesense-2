import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Report {
  id: number;
  name: string;
  pdfUrl: string;
}

const reports: Report[] = [
  {
    id: 1,
    name: "Solicitudes de factibilidad técnica",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F01_Solicitud%2Bde%2Bfactibilidad%2Btecnica.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 2,
    name: "Instalaciones realizadas por CRS",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F02_Instalaciones%2Brealizadas%2Bpor%2BCRS.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 3,
    name: "Dispositivos de victima entregados",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F03_Dispositivos%2Bde%2Bvictima%2Bentregados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 4,
    name: "Desinstalaciones realizadas por CRS",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F04_Desinstalaciones%2Brealizadas%2Bpor%2BCRS.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 5,
    name: "Total de soportes tecnicos realizados",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F09_Total%2Bde%2Bsoportes%2Btecnicos%2Brealizados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 6,
    name: "Total de instalaciones agendadas",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F10_Total%2Bde%2Binstalaciones%2Bagendadas.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 7,
    name: "Total de desinstalaciones agendadas",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F11_Total%2Bde%2Bdesinstalaciones%2Bagendadas.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 8,
    name: "Total de soportes tecnicos agendados",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F12_Total%2Bde%2Bsoportes%2Btecnicos%2Bagendados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 9,
    name: "Total de entrega de dispositivos a víctimas agendados",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F13_Total%2Bde%2Bentrega%2Bde%2Bdispositivos%2Ba%2Bv%25C3%25ADctimas%2Bagendados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 10,
    name: "Total de procesos no realizados",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2F14_Total%2Bde%2Bprocesos%2Bno%2Brealizados.xlsx&wdOrigin=BROWSELINK",
  },
  {
    id: 11,
    name: "Protocolo Alarmas v1",
    pdfUrl:
      "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwesense-maqueta.s3.us-east-2.amazonaws.com%2FProtocolo%2BAlarmas%2Bv1.xlsx&wdOrigin=BROWSELINK",
  },
];

const ReportTable: React.FC = () => {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <CardTitle className="text-3xl font-bold tracking-tight mb-5">
          Reportes
        </CardTitle>

        <div className="w-[200px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Cantidad de meses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12 Meses">12 Meses</SelectItem>
              <SelectItem value="24 Meses">24 Meses</SelectItem>
              <SelectItem value="36 Meses">36 Meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <Card className="w-full shadow-lg py-2">
          <CardContent className="w-full px-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold text-gray-600">
                    ID
                  </TableHead>
                  <TableHead className="text-xs font-bold text-gray-600 uppercase">
                    Nombre del Reporte
                  </TableHead>
                  <TableHead className=" text-xs flex justify-end mr-2 font-bold text-gray-600 uppercase">
                    Descargar
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.name}</TableCell>
                    <TableCell className="flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <a href={report.pdfUrl} download target="_blank">
                          <FileDown className="mr-2 h-4 w-4" />
                          PDF
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Pagination />
      </div>
    </div>
  );
};

export default ReportTable;
