import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Download } from "lucide-react";
import { generatePDF, generateWord } from "../functions";
import { FormDataWearer } from "@/views/view-create-carrier/interfaces";

interface Props {
  carrier?: FormDataWearer;
  // carrier?: FormDataCarrier;
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ carrier, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="modal overflow-auto">
        <DialogHeader className="border-[1.5px] rounded-sm">
          <DialogTitle className="text-2xl p-2 mt-2">
            Detalles del portador
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="w-full text-left border-collapse">
            <div className="flex gap-5 flex-col">
              <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Datos Personales
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nombres:</div>
                  <div className="text-end">{carrier?.wearer.first_name}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Apellidos:</div>
                  <div className="text-end">{carrier?.wearer.surname}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Email:</div>
                  <div className="text-end">{carrier?.wearer.email}</div>
                </div>

                {/* <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nombre Social:</div>
                  <div className="text-end">
                    {carrier?.personalData.socialName || "No registra"}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nacionalidad:</div>
                  <div className="text-end flex items-center gap-2">
                    {carrier?.personalData.nationality}
                    <Flag
                      width={20}
                      code={getCountryCode(carrier?.personalData.nationality || "")}
                    />
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">¿Es estranjero?:</div>
                  <div className="text-end">
                    {carrier?.personalData.foreigner ? "Si" : "No"}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido paterno:
                  </div>
                  <div className="text-end">
                    {carrier?.personalData.paternalSurname}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido materno:
                  </div>
                  <div className="text-end">{carrier?.personalData.motherSurname}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Estado Civil:</div>
                  <div className="text-end">{carrier?.personalData.maritalStatus}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Tipo de portador:
                  </div>
                  <div className="text-end">{carrier?.personalData.type_current}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Género:</div>
                  <div className="text-end">{carrier?.personalData.gender}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RUN:</div>
                  <div className="text-end">{carrier?.personalData.run}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Teléfono:</div>
                  <div className="text-end">{carrier?.personalData.phone}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Fecha de Nacimiento: :
                  </div>
                  <div className="text-end">{carrier?.personalData.dateBirth}</div>
                </div> */}
              </div>

              {/* <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Causa
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Tipo de Pena:</div>
                  <div className="text-end">{carrier?.cause.penatype}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Delito:</div>
                  <div className="text-end">{carrier?.cause.crime}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Corte de Apelaciones:
                  </div>
                  <div className="text-end">{carrier?.cause.courtAppeals}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región Judicial:</div>
                  <div className="text-end">{carrier?.cause.courtRegion}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Tribunal:</div>
                  <div className="text-end">{carrier?.cause.court}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RUC:</div>
                  <div className="text-end">{carrier?.cause.ruc}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RIT:</div>
                  <div className="text-end">{carrier?.cause.rit}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">ROL:</div>
                  <div className="text-end">{carrier?.cause.rol}</div>
                </div>
              </div> */}

              {/* <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Monitoreo
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">CRS:</div>
                  <div className="text-end">{carrier?.monitoring.crs}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Área de inclusión y exclusión:
                  </div>
                  <div className="text-end">{carrier?.monitoring.areas}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Duración de la medida:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.durationMeasurement}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Horario de control:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.controlSchedule}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Periodo efectivo de control:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.effectivePeriod}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Solicitudes de Factibilidad Técnica:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.requestsFeasibility}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Sentencia:</div>
                  <div className="text-end">{carrier?.monitoring.judgment}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Programaciones de Instalación:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.programmingInstallation}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Instalaciones realizadas:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.installationsDone}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Resoluciones judiciales:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.modificationResolution}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Soportes Técnicos Realizados:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.technicalSupports}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Informes de incumplimiento:
                  </div>
                  <div className="text-end">{carrier?.monitoring.nonReports}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Días efectivos de control:
                  </div>
                  <div className="text-end">{carrier?.monitoring.daysControl}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Desinstalaciones realizadas:
                  </div>
                  <div className="text-end">
                    {carrier?.monitoring.uninstallations}
                  </div>
                </div>
              </div> */}

              {/* <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Área de inclusión
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Calle:</div>
                  <div className="text-end">{carrier?.inclusionArea.street}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Número:</div>
                  <div className="text-end">{carrier?.inclusionArea.number}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Block/Dpto/Casa:</div>
                  <div className="text-end">
                    {carrier?.inclusionArea.additionalInformation}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 inclusionArea">Comuna:</div>
                  <div className="text-end">{carrier?.inclusionArea.commune}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región:</div>
                  <div className="text-end">{carrier?.inclusionArea.region}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Carretera/Ruta/Kilómetro
                  </div>
                  <div className="text-end">{carrier?.inclusionArea.road}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Población/Condominio/Villa:
                  </div>
                  <div className="text-end">{carrier?.inclusionArea.population}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Código Postal:</div>
                  <div className="text-end">{carrier?.inclusionArea.zipCode}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Coordenadas Geográficas:
                  </div>
                  <div className="text-end">
                    {carrier?.inclusionArea.geographicCoordinates}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Radio:</div>
                  <div className="text-end">{carrier?.inclusionArea.radio}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Horario de Cumplimiento:
                  </div>
                  <div className="text-end">
                    {carrier?.inclusionArea.complianceSchedule}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Características del sector:
                  </div>
                  <div className="text-end">
                    {carrier?.inclusionArea.characteristics}
                  </div>
                </div>
              </div> */}
              {/* <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Área de exclusión
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Calle:</div>
                  <div className="text-end">{carrier?.exclusionArea.street}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Número:</div>
                  <div className="text-end">{carrier?.exclusionArea.number}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Block/Dpto/Casa:</div>
                  <div className="text-end">
                    {carrier?.exclusionArea.additionalInformation}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Comuna:</div>
                  <div className="text-end">{carrier?.exclusionArea.commune}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región:</div>
                  <div className="text-end">{carrier?.exclusionArea.region}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Carretera/Ruta/Kilómetro
                  </div>
                  <div className="text-end">{carrier?.exclusionArea.road}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Población/Condominio/Villa:
                  </div>
                  <div className="text-end">{carrier?.exclusionArea.population}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Código Postal:</div>
                  <div className="text-end">{carrier?.exclusionArea.zipCode}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Coordenadas Geográficas:
                  </div>
                  <div className="text-end">
                    {carrier?.exclusionArea.geographicCoordinates}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Radio:</div>
                  <div className="text-end">{carrier?.exclusionArea.radio}</div>
                </div>

                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Características del sector:
                  </div>
                  <div className="text-end">
                    {carrier?.exclusionArea.characteristics}
                  </div>
                </div>
              </div> */}
              {/* <div className="border rounded-sm">
                <div className="bg-gray-100 font-bold p-3 text-lg border-gray-300">
                  Datos de la víctima
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido Paterno:
                  </div>
                  <div className="text-end">
                    {carrier?.exclusionArea.paternalSurname}
                  </div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Apellido Materno:
                  </div>
                  <div className="text-end">{carrier?.exclusionArea.motherSurname}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Nombres:</div>
                  <div className="text-end">{carrier?.exclusionArea.names}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">RUT:</div>
                  <div className="text-end">{carrier?.exclusionArea.rut}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Región:</div>
                  <div className="text-end">{carrier?.exclusionArea.region}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Email Víctima</div>
                  <div className="text-end">{carrier?.exclusionArea.victimEmail}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Teléfono Particular:
                  </div>
                  <div className="text-end">{carrier?.exclusionArea.homeTelephone}</div>
                </div>
                <div className="p-2 border-t border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Teléfono Lugar de Trabajo:
                  </div>
                  <div className="text-end">
                    {carrier?.exclusionArea.workplaceTelephone}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
{/*           <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => carrier && generatePDF(carrier)}
              className="bg-red-600 text-white hover:bg-red-500 hover:text-white flex"
            >
              PDF
              <Download />
            </Button>
            <Button
              variant="outline"
              onClick={() => carrier && generateWord(carrier)}
              className="bg-blue-600 text-white hover:bg-blue-500 hover:text-white flex"
            >
              WORD
              <Download />
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
