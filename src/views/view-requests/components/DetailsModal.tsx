import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Foto1 from "/public/foto-1.jpg";
import Foto2 from "/public/foto-2.jpg";
import Foto3 from "/public/foto-3.jpg";
import Foto4 from "/public/foto-4.jpg";
import dynamic from "next/dynamic";
import { RequestTable } from "@/views/view-create-request/interfaces";
import { Download, FileText, PackageOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

interface DetailsModalProps {
  request?: RequestTable;
  open: boolean;
  onClose: VoidFunction;
}

const DetailsModal = ({ request, open, onClose }: DetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="modal sm:max-w-[550px] max-h-[800px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Detalles de la solicitud
          </DialogTitle>
        </DialogHeader>
        <DialogClose />
        <Tabs defaultValue="application-information" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="application-information">
              Información de la solicitud
            </TabsTrigger>
            <TabsTrigger value="awardee-response">
              Respuesta del adjudicatario
            </TabsTrigger>
          </TabsList>
          <TabsContent value="application-information">
            <div className="flex items-center justify-between">
              <span>Fecha de emisión</span>
              <span>{request?.issue_date}</span>
            </div>
            {/*      <div className="p-2 border-t text-lg border-b-0 flex items-center justify-between">
              <div className="font-semibold p-1 flex">Estado:</div>
              <div className="text-end ">
                {request?.status === "confirmed" && (
                  <div className="flex items-center gap-2">
                    <CircleCheck size={17} color="#16a34a" />
                    <span className="text-lg">Confirmado</span>
                  </div>
                )}

                {request?.status === "returned" && (
                  <div className="flex gap-2 items-center">
                    <RotateCw size={17} color="#FF9D23" />
                    <span className="text-lg">Retornado</span>
                  </div>
                )}

                {request?.status === "unconfirmed" && (
                  <div className="flex items-center gap-2">
                    <CircleSlash size={17} color="#B7B7B7" />
                    <span className="text-lg">Sin confirmar</span>
                  </div>
                )}

                {request?.status === "answered" && (
                  <div className="flex items-center gap-2">
                    <CircleMinus size={17} color="#577BC1" />
                    <span className="text-lg">Respuesta de adjudicado</span>
                  </div>
                )}
              </div>
            </div> */}

            <div className="bg-gray-100 rounded-sm font-bold p-3 text-lg border-gray-300 mt-3">
              Información del solicitante
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="personal-info">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Información Personal
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Nombre Completo"
                      value={request?.requester.fullName}
                    />
                    <InfoItem
                      label="Apellido"
                      value={request?.requester.lastName}
                    />
                    <InfoItem
                      label="Segundo Nombre"
                      value={request?.requester.middleName}
                    />
                    <InfoItem label="Email" value={request?.requester.email} />
                    <InfoItem
                      label="Teléfono"
                      value={request?.requester.phone}
                    />
                    <InfoItem
                      label="Tipo de Usuario"
                      value={request?.requester.userType}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="identification">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Identificación y Ubicación
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem label="RUC" value={request?.requester.run} />
                    <InfoItem
                      label="Número de Identificación"
                      value={request?.requester.identificationNumber}
                    />
                    <InfoItem
                      label="Institución"
                      value={request?.requester.institution}
                    />
                    <InfoItem
                      label="Región"
                      value={request?.requester.region}
                    />
                    <InfoItem
                      label="Dirección"
                      value={request?.requester.address}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="access-security">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Acceso y Seguridad
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Áreas de Acceso"
                      value={request?.requester.accessAreas}
                    />
                    <InfoItem
                      label="Verificación de Identidad"
                      value={request?.requester.identityVerification}
                    />
                    <InfoItem
                      label="Pregunta de Seguridad"
                      value={request?.requester.securityQuestion}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="additional-info">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Información Adicional
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Fecha de Registro"
                      value={request?.requester.registrationDate}
                    />
                    <InfoItem
                      label="Observaciones"
                      value={request?.requester.observations}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="bg-gray-100 rounded-sm font-bold p-3 text-lg border-gray-300 mt-3">
              Información del portador
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="personal-data">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Datos Personales
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Nombre Completo"
                      value={request?.carrier.personalData.fullName}
                    />
                    <InfoItem
                      label="Nombre Social"
                      value={request?.carrier.personalData.socialName}
                    />
                    <InfoItem
                      label="Apellido Paterno"
                      value={request?.carrier.personalData.paternalSurname}
                    />
                    <InfoItem
                      label="Apellido Materno"
                      value={request?.carrier.personalData.motherSurname}
                    />
                    <InfoItem
                      label="Tipo Actual"
                      value={request?.carrier.personalData.type_current}
                    />
                    <InfoItem
                      label="Género"
                      value={request?.carrier.personalData.gender}
                    />
                    <InfoItem
                      label="Fecha de Nacimiento"
                      value={request?.carrier.personalData.dateBirth}
                    />
                    <InfoItem
                      label="Estado Civil"
                      value={request?.carrier.personalData.maritalStatus}
                    />
                    <InfoItem
                      label="Nacionalidad"
                      value={request?.carrier.personalData.nationality}
                    />
                    <InfoItem
                      label="RUN"
                      value={request?.carrier.personalData.run}
                    />
                    <InfoItem
                      label="Teléfono"
                      value={request?.carrier.personalData.phone}
                    />
                    <InfoItem
                      label="Extranjero"
                      value={
                        request?.carrier.personalData.foreigner ? "Sí" : "No"
                      }
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cause">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Causa
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Tipo de Pena"
                      value={request?.carrier.cause.penatype}
                    />
                    <InfoItem
                      label="Delito"
                      value={request?.carrier.cause.crime}
                    />
                    <InfoItem
                      label="Corte de Apelaciones"
                      value={request?.carrier.cause.courtAppeals}
                    />
                    <InfoItem
                      label="Región del Tribunal"
                      value={request?.carrier.cause.courtRegion}
                    />
                    <InfoItem
                      label="Tribunal"
                      value={request?.carrier.cause.court}
                    />
                    <InfoItem label="RUC" value={request?.carrier.cause.ruc} />
                    <InfoItem label="RIT" value={request?.carrier.cause.rit} />
                    <InfoItem label="ROL" value={request?.carrier.cause.rol} />
                    <InfoItem label="CRS" value={request?.carrier.cause.crs} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="monitoring">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Monitoreo
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Áreas"
                      value={request?.carrier.monitoring.areas}
                    />
                    <InfoItem
                      label="Duración de la Medida"
                      value={request?.carrier.monitoring.durationMeasurement}
                    />
                    <InfoItem
                      label="Horario de Control"
                      value={request?.carrier.monitoring.controlSchedule}
                    />
                    <InfoItem
                      label="Período Efectivo"
                      value={request?.carrier.monitoring.effectivePeriod}
                    />
                    <InfoItem
                      label="Solicitudes de Factibilidad"
                      value={request?.carrier.monitoring.requestsFeasibility}
                    />
                    <InfoItem
                      label="Sentencia"
                      value={request?.carrier.monitoring.judgment}
                    />
                    <InfoItem
                      label="Programación de Instalación"
                      value={
                        request?.carrier.monitoring.programmingInstallation
                      }
                    />
                    <InfoItem
                      label="Instalaciones Realizadas"
                      value={request?.carrier.monitoring.installationsDone}
                    />
                    <InfoItem
                      label="Resolución de Modificación"
                      value={request?.carrier.monitoring.modificationResolution}
                    />
                    <InfoItem
                      label="Soportes Técnicos"
                      value={request?.carrier?.monitoring.technicalSupports}
                    />
                    <InfoItem
                      label="No Reportes"
                      value={request?.carrier.monitoring.nonReports}
                    />
                    <InfoItem
                      label="Días de Control"
                      value={request?.carrier.monitoring.daysControl}
                    />
                    <InfoItem
                      label="Desinstalaciones"
                      value={request?.carrier.monitoring.uninstallations}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="inclusion-area">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Área de Inclusión
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Calle"
                      value={request?.carrier.inclusionArea.street}
                    />
                    <InfoItem
                      label="Número"
                      value={request?.carrier.inclusionArea.number}
                    />
                    <InfoItem
                      label="Información Adicional"
                      value={
                        request?.carrier.inclusionArea.additionalInformation
                      }
                    />
                    <InfoItem
                      label="Comuna"
                      value={request?.carrier.inclusionArea.commune}
                    />
                    <InfoItem
                      label="Región"
                      value={request?.carrier.inclusionArea.region}
                    />
                    <InfoItem
                      label="Vía"
                      value={request?.carrier.inclusionArea.road}
                    />
                    <InfoItem
                      label="Población"
                      value={request?.carrier.inclusionArea.population}
                    />
                    <InfoItem
                      label="Código Postal"
                      value={request?.carrier.inclusionArea.zipCode}
                    />
                    <InfoItem
                      label="Coordenadas Geográficas"
                      value={
                        request?.carrier.inclusionArea.geographicCoordinates
                      }
                    />
                    <InfoItem
                      label="Radio"
                      value={request?.carrier.inclusionArea.radio}
                    />
                    <InfoItem
                      label="Horario de Cumplimiento"
                      value={request?.carrier.inclusionArea.complianceSchedule}
                    />
                    <InfoItem
                      label="Características"
                      value={request?.carrier.inclusionArea.characteristics}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="exclusion-area">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  Área de Exclusión
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <InfoItem
                      label="Calle"
                      value={request?.carrier.exclusionArea.street}
                    />
                    <InfoItem
                      label="Número"
                      value={request?.carrier.exclusionArea.number}
                    />
                    <InfoItem
                      label="Información Adicional"
                      value={
                        request?.carrier.exclusionArea.additionalInformation
                      }
                    />
                    <InfoItem
                      label="Comuna"
                      value={request?.carrier.exclusionArea.commune}
                    />
                    <InfoItem
                      label="Región"
                      value={request?.carrier.exclusionArea.region}
                    />
                    <InfoItem
                      label="Vía"
                      value={request?.carrier.exclusionArea.road}
                    />
                    <InfoItem
                      label="Población"
                      value={request?.carrier.exclusionArea.population}
                    />
                    <InfoItem
                      label="Código Postal"
                      value={request?.carrier.exclusionArea.zipCode}
                    />
                    <InfoItem
                      label="Coordenadas Geográficas"
                      value={
                        request?.carrier.exclusionArea.geographicCoordinates
                      }
                    />
                    <InfoItem
                      label="Radio"
                      value={request?.carrier.exclusionArea.radio}
                    />
                    <InfoItem
                      label="Características"
                      value={request?.carrier.exclusionArea.characteristics}
                    />
                    <InfoItem
                      label="Apellido Paterno (Víctima)"
                      value={request?.carrier.exclusionArea.paternalSurname}
                    />
                    <InfoItem
                      label="Apellido Materno (Víctima)"
                      value={request?.carrier.exclusionArea.motherSurname}
                    />
                    <InfoItem
                      label="Nombres (Víctima)"
                      value={request?.carrier.exclusionArea.names}
                    />
                    <InfoItem
                      label="RUT (Víctima)"
                      value={request?.carrier.exclusionArea.rut}
                    />
                    <InfoItem
                      label="Email (Víctima)"
                      value={request?.carrier.exclusionArea.victimEmail}
                    />
                    <InfoItem
                      label="Teléfono Casa (Víctima)"
                      value={request?.carrier.exclusionArea.homeTelephone}
                    />
                    <InfoItem
                      label="Teléfono Trabajo (Víctima)"
                      value={request?.carrier.exclusionArea.workplaceTelephone}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="awardee-response">
            {request?.status === "answered" ||
            request?.status === "confirmed" ? (
              <div>
                <div className="bg-gray-100 rounded-sm font-bold p-3 text-lg border-gray-300 mt-3">
                  Información de la ubicacion
                </div>
                <div className="p-2 border-t text-lg border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Respuesta:</div>
                  <div className="text-end ">
                    <div className="flex items-center gap-2">
                      <div>
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
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-400 text-white py-1 px-2 rounded-md">
                              Sin respuesta
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 border-t text-lg border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Cobertura mínima:
                  </div>
                  <div className="text-end">
                    {request.awardee_response.minimum_coverage}
                  </div>
                </div>

                <div className="p-2 border-t text-lg border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Latitud:</div>
                  <div className="text-end">
                    {request.awardee_response.latitude}
                  </div>
                </div>

                <div className="p-2 border-t text-lg border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Longitud:</div>
                  <div className="text-end">
                    {request.awardee_response.length}
                  </div>
                </div>

                <div className="p-2 border-t text-lg border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">
                    Indicación de aspectos:
                  </div>
                  <div className="text-end">
                    {request.awardee_response.indication_aspects}
                  </div>
                </div>

                <div className="p-2 border-t text-lg border-b-0 flex items-center justify-between">
                  <div className="font-semibold p-1 flex">Valor:</div>
                  <div className="text-end">
                    {request.awardee_response.value}
                  </div>
                </div>
                <div className="animate-pulse bg-gray-200 rounded-md h-[200px] w-full overflow-hidden">
                  <Map
                    latitude={-33.46651382914682}
                    longitude={-70.66412385948745}
                  />
                </div>
                <div className="bg-gray-100 rounded-sm font-bold p-3 text-lg border-gray-300 mt-3 mb-5">
                  Pruebas fotograficas
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Image
                    width={70}
                    height={70}
                    src={Foto1}
                    alt="foto-1"
                    className="rounded-md"
                  />

                  <Image
                    width={70}
                    height={70}
                    src={Foto2}
                    alt="foto-2"
                    className="rounded-md"
                  />

                  <Image
                    width={70}
                    height={70}
                    src={Foto3}
                    alt="foto-3"
                    className="rounded-md"
                  />

                  <Image
                    width={70}
                    height={70}
                    src={Foto4}
                    alt="foto-4"
                    className="rounded-md"
                  />
                </div>
                <div className="bg-gray-100 rounded-sm font-bold p-3 text-lg border-gray-300 mt-3 mb-5">
                  Archivos adjuntados
                </div>

                <ul className="divide-y">
                  <li className="flex items-center justify-between p-3 bg-gray-100">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          Datos del solicitante
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
                  </li>

                  <li className="flex items-center justify-between p-3 bg-gray-100 ">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          Información de la persona sujeta a control
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
                  </li>
                </ul>
              </div>
            ) : (
              <div className="h-[500px] flex justify-center items-center flex-col gap-3">
                <h1 className="text-lg text-gray-600">
                  No hay respuesta de la empresa
                </h1>
                <PackageOpen size={100} color="gray" strokeWidth={1} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base">{value || "-"}</p>
    </div>
  );
}

export default DetailsModal;
