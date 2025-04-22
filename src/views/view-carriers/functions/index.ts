import { RequesterPost } from "@/db/requester";
import { getDate } from "@/functions";
import {
  FormDataCarrier,
  FormDataWearer,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
} from "@/views/view-create-carrier/interfaces";
import { RequestTable } from "@/views/view-create-request/interfaces";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { request } from "http";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

function getHour(): string {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, "0");
  const minutos = ahora.getMinutes().toString().padStart(2, "0");
  const segundos = ahora.getSeconds().toString().padStart(2, "0");

  return `${horas}:${minutos}:${segundos}`;
}

const getValue = (key: string, selectedCarrier: Step1Data | any) => {
  switch (key) {
    case "date":
      return getDate() + " - " + getHour();

    case "test":
      return "Abogado";

    case "nameComplete":
      return (
        selectedCarrier.fullName +
        " " +
        selectedCarrier.paternalSurname +
        " " +
        selectedCarrier.motherSurname
      );

    case "response":
      return returnStatus(selectedCarrier.answer);

    default:
      return selectedCarrier[key] ?? "N/A";
  }
};

const returnStatus = (answer: string) => {
  switch (answer) {
    case "positive":
      return "Positivo";

    case "negative":
      return "Negativo";

    case "not-recommended":
      return "No recomendable";

    default:
      return undefined;
  }
};

export const generatePDF = (selectedCarrier: RequestTable) => {
  const doc = new jsPDF();

  // 🎨 Encabezado
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 20, "F");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("Informe de factibilidad técnica", 105, 12, {
    align: "center",
  });

  // 🗂️ Definición de secciones y sus campos
  const sections: {
    title: string;
    data:
      | RequestTable
      | Step1Data
      | Step2Data
      | Step3Data
      | Step4Data
      | Step5Data
      | Step6Data
      | RequesterPost;
    fields: { key: string; label: string }[];
  }[] = [
    {
      title: "---------",
      data: selectedCarrier,
      fields: [
        /*  { key: "crime", label: "Delito" }, */
        { key: "date", label: "Fecha y Hora" },
        { key: "law", label: "Tipo de ley" },
        { key: "folio", label: "Folio" },
        { key: "response", label: "Respuesta de la empresa" },
      ],
    },

    {
      title: "Información de la causa",
      data: selectedCarrier.carrier.cause,
      fields: [
        /*  { key: "crime", label: "Delito" }, */
        { key: "test", label: "Tipo de solicitante" },
        { key: "courtRegion", label: "Región" },
        { key: "court", label: "Tribunal/Juzgado" },
        /* { key: "rol", label: "ROL" }, */
        { key: "penatype", label: "Tipo de Pena Sustantiva" },
        { key: "rit", label: "RIT" },
        { key: "ruc", label: "RUC" },
      ],
    },
    {
      title: "Datos del solicitante",
      data: selectedCarrier.requester,
      fields: [
        { key: "test", label: "Tipo de requirente" },
        { key: "institution", label: "Nombre del tribunal" },
        { key: "email", label: "Correo electronico" },
        { key: "phone", label: "Teléfono del Tribunal" },
      ],
    },

    {
      title: "Datos de la persona sujeta control / Condenado",
      data: selectedCarrier.carrier.personalData,
      fields: [
        { key: "nameComplete", label: "Nombre Completo" },
        /*   { key: "socialName", label: "Nombre Social" },
        { key: "paternalSurname", label: "Apellido Paterno" },
        { key: "motherSurname", label: "Apellido Materno" },
        { key: "type_current", label: "Tipo Actual" },
        { key: "gender", label: "Género" }, */
        { key: "dateBirth", label: "Fecha de Nacimiento" },
        { key: "run", label: "RUT" },
        /*      { key: "maritalStatus", label: "Estado Civil" },
        { key: "nationality", label: "Nacionalidad" },
        { key: "run", label: "RUN" },
        { key: "phone", label: "Teléfono" },
        { key: "foreigner", label: "Extranjero" }, */
      ],
    },
    /*     {
      title: "Monitoreo",
      data: selectedCarrier.monitoring,
      fields: [
        { key: "crs", label: "CRS" },
        { key: "areas", label: "Áreas" },
        { key: "durationMeasurement", label: "Medida de Duración" },
        { key: "controlSchedule", label: "Horario de Control" },
        { key: "effectivePeriod", label: "Período Efectivo" },
        { key: "requestsFeasibility", label: "Solicitudes de Viabilidad" },
        { key: "judgment", label: "Juicio" },
        {
          key: "programmingInstallation",
          label: "Programación de Instalación",
        },
        { key: "installationsDone", label: "Instalaciones Realizadas" },
        { key: "modificationResolution", label: "Resolución de Modificación" },
        { key: "technicalSupports", label: "Soportes Técnicos" },
        { key: "nonReports", label: "Reportes No Realizados" },
        { key: "daysControl", label: "Días de Control" },
        { key: "uninstallations", label: "Desinstalaciones" },
      ],
    }, */
    {
      title: "Área de inclusión",
      data: selectedCarrier.carrier.inclusionArea,
      fields: [
        { key: "street", label: "Calle" },
        { key: "number", label: "Número" },
        { key: "additionalInformation", label: "Información Adicional" },
        { key: "commune", label: "Comuna" },
        { key: "region", label: "Región" },
        { key: "road", label: "Camino" },
        { key: "population", label: "Población" },
        { key: "zipCode", label: "Código Postal" },
        { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
        { key: "radio", label: "Radio" },
        { key: "complianceSchedule", label: "Horario de Cumplimiento" },
        { key: "characteristics", label: "Características" },
      ],
    },
    {
      title: "Área de exclusión",
      data: selectedCarrier.carrier.exclusionArea,
      fields: [
        { key: "street", label: "Calle" },
        { key: "number", label: "Número" },
        { key: "additionalInformation", label: "Información Adicional" },
        { key: "commune", label: "Comuna" },
        { key: "region", label: "Región" },
        { key: "road", label: "Camino" },
        { key: "population", label: "Población" },
        { key: "zipCode", label: "Código Postal" },
        { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
        { key: "radio", label: "Radio" },
        { key: "characteristics", label: "Características" },
        { key: "paternalSurname", label: "Apellido Paterno" },
        { key: "motherSurname", label: "Apellido Materno" },
        { key: "names", label: "Nombres" },
        { key: "rut", label: "RUT" },
        { key: "victimEmail", label: "Correo de la Víctima" },
        { key: "homeTelephone", label: "Teléfono Domicilio" },
        { key: "workplaceTelephone", label: "Teléfono Trabajo" },
      ],
    },

    {
      title: "Información de Víctima ",
      data: selectedCarrier.carrier.exclusionArea,
      fields: [
        { key: "paternalSurname", label: "Apellido Paterno" },
        { key: "motherSurname", label: "Apellido Materno" },
        { key: "names", label: "Nombres" },
        { key: "rut", label: "RUT" },
        { key: "victimEmail", label: "Correo de la Víctima" },
        { key: "homeTelephone", label: "Teléfono Domicilio" },
        { key: "workplaceTelephone", label: "Teléfono Trabajo" },
      ],
    },
  ];

  // 🗂️ Generación de secciones
  let y = 30;

  sections.forEach(({ title, data, fields }, sectionIndex) => {
    // Título de la sección
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text(title, 15, y);
    y += 8;

    fields.forEach(({ key, label }, index) => {
      // Salto de página si es necesario
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      const value =
        (data as unknown as Record<string, unknown>)?.[key] ??
        getValue(key, data as Step1Data);

      // Fondo alternado
      if (index % 2 === 0) {
        doc.setFillColor(240, 253, 244);
        doc.rect(10, y - 6, 190, 8, "F");
      }

      // Etiqueta
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text(`${label}:`, 15, y);

      // Valor
      doc.setFont("helvetica", "normal");
      doc.text(value.toString(), 80, y);

      y += 10;
    });

    // Espacio entre secciones
    y += 10;

    // Salto de página si es necesario después de la sección
    if (y > 260 && sectionIndex < sections.length - 1) {
      doc.addPage();
      y = 20;
    }
  });

  // 🎨 Footer
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 280, 210, 20, "F");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Generado con SGAMGC", 105, 289, { align: "center" });

  // Guardar el archivo
  const nameFile = selectedCarrier.carrier.personalData.fullName
    .split(" ")
    .join("_")
    .toLowerCase();
  doc.save(`Informe_${nameFile}.pdf`);
};

interface Field {
  key: keyof FormDataCarrier; // Unión de todas las claves: "fullName" | "socialName" | "nationality" | etc.
  label: string;
}

interface Section {
  title: string;
  fields: Field[];
}

export const generateWord = (selectedCarrier: FormDataWearer) => {
  // 🗂️ Definición de secciones y sus campos
  const sections = [
    {
      title: "Información Personal",
      data: selectedCarrier.wearer,
      fields: [
        { key: "first_name", label: "Nombres" },
        { key: "surname", label: "Apellidos" },
        { key: "email", label: "Email" },
      ],
    },
    // {
    //   title: "Información Personal",
    //   data: selectedCarrier.personalData,
    //   fields: [
    //     { key: "fullname", label: "Nombre Completo" },
    //     { key: "socialName", label: "Nombre Social" },
    //     { key: "paternalSurname", label: "Apellido Paterno" },
    //     { key: "motherSurname", label: "Apellido Materno" },
    //     { key: "type_current", label: "Tipo Actual" },
    //     { key: "gender", label: "Género" },
    //     { key: "dateBirth", label: "Fecha de Nacimiento" },
    //     { key: "maritalStatus", label: "Estado Civil" },
    //     { key: "nationality", label: "Nacionalidad" },
    //     { key: "run", label: "RUN" },
    //     { key: "phone", label: "Teléfono" },
    //     { key: "foreigner", label: "Extranjero" },
    //   ],
    // },
    // {
    //   title: "Causa",
    //   data: selectedCarrier.cause,
    //   fields: [
    //     { key: "penatype", label: "Tipo de Pena" },
    //     { key: "crime", label: "Delito" },
    //     { key: "courtAppeals", label: "Corte de Apelaciones" },
    //     { key: "courtRegion", label: "Región del Tribunal" },
    //     { key: "court", label: "Tribunal" },
    //     { key: "ruc", label: "RUC" },
    //     { key: "rit", label: "RIT" },
    //     { key: "rol", label: "ROL" },
    //   ],
    // },
    // {
    //   title: "Monitoreo",
    //   data: selectedCarrier.monitoring,
    //   fields: [
    //     { key: "crs", label: "CRS" },
    //     { key: "areas", label: "Áreas" },
    //     { key: "durationMeasurement", label: "Medida de Duración" },
    //     { key: "controlSchedule", label: "Horario de Control" },
    //     { key: "effectivePeriod", label: "Período Efectivo" },
    //     { key: "requestsFeasibility", label: "Solicitudes de Viabilidad" },
    //     { key: "judgment", label: "Juicio" },
    //     {
    //       key: "programmingInstallation",
    //       label: "Programación de Instalación",
    //     },
    //     { key: "installationsDone", label: "Instalaciones Realizadas" },
    //     { key: "modificationResolution", label: "Resolución de Modificación" },
    //     { key: "technicalSupports", label: "Soportes Técnicos" },
    //     { key: "nonReports", label: "Reportes No Realizados" },
    //     { key: "daysControl", label: "Días de Control" },
    //     { key: "uninstallations", label: "Desinstalaciones" },
    //   ],
    // },
    // {
    //   title: "Área de inclusión",
    //   data: selectedCarrier.inclusionArea,
    //   fields: [
    //     { key: "street", label: "Calle" },
    //     { key: "number", label: "Número" },
    //     { key: "additionalInformation", label: "Información Adicional" },
    //     { key: "commune", label: "Comuna" },
    //     { key: "region", label: "Región" },
    //     { key: "road", label: "Camino" },
    //     { key: "population", label: "Población" },
    //     { key: "zipCode", label: "Código Postal" },
    //     { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
    //     { key: "radio", label: "Radio" },
    //     { key: "complianceSchedule", label: "Horario de Cumplimiento" },
    //     { key: "characteristics", label: "Características" },
    //   ],
    // },
    // {
    //   title: "Área de exclusión y Información de Víctima ",
    //   data: selectedCarrier.exclusionArea,
    //   fields: [
    //     { key: "street", label: "Calle" },
    //     { key: "number", label: "Número" },
    //     { key: "additionalInformation", label: "Información Adicional" },
    //     { key: "commune", label: "Comuna" },
    //     { key: "region", label: "Región" },
    //     { key: "road", label: "Camino" },
    //     { key: "population", label: "Población" },
    //     { key: "zipCode", label: "Código Postal" },
    //     { key: "geographicCoordinates", label: "Coordenadas Geográficas" },
    //     { key: "radio", label: "Radio" },
    //     { key: "characteristics", label: "Características" },
    //     { key: "paternalSurname", label: "Apellido Paterno" },
    //     { key: "motherSurname", label: "Apellido Materno" },
    //     { key: "names", label: "Nombres" },
    //     { key: "rut", label: "RUT" },
    //     { key: "victimEmail", label: "Correo de la Víctima" },
    //     { key: "homeTelephone", label: "Teléfono Domicilio" },
    //     { key: "workplaceTelephone", label: "Teléfono Trabajo" },
    //   ],
    // },
  ];

  // 🗂️ Generación de secciones
  const sectionElements = sections.map((section) => {
    // Crear filas de la tabla para los campos
    const tableRows = section.fields.map((field, index) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: field.label,
                    bold: true,
                    font: "Arial",
                    size: 24,
                  }),
                ],
              }),
            ],
            shading: { fill: index % 2 === 0 ? "F0FDF4" : "FFFFFF" }, // Fondo alternado
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      section.data[field.key as keyof typeof section.data] ??
                      "-",
                    font: "Arial",
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        ],
      });
    });

    // Espaciado adicional antes de ciertas secciones
    const isMajorSection = [
      "Información Personal (Paso 1)",
      "Información Legal (Paso 2)",
      "Control y Seguimiento (Paso 3)",
    ].includes(section.title);
    const spacingBefore = isMajorSection ? { before: 600 } : { before: 200 };

    return [
      new Paragraph({
        children: [],
        spacing: spacingBefore,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: section.title,
            bold: true,
            font: "Arial",
            size: 28,
            color: "FFFFFF",
          }),
        ],
        shading: { fill: "22C55E" },
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Campo",
                        bold: true,
                        font: "Arial",
                        size: 26,
                        color: "FFFFFF",
                      }),
                    ],
                  }),
                ],
                shading: { fill: "22C55E" },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Valor",
                        bold: true,
                        font: "Arial",
                        size: 26,
                        color: "FFFFFF",
                      }),
                    ],
                  }),
                ],
                shading: { fill: "22C55E" },
              }),
            ],
          }),
          ...tableRows,
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
      }),
    ];
  });

  // 📄 Crear el documento
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Informe de factibilidad técnica",
                bold: true,
                font: "Arial",
                size: 36,
                color: "FFFFFF",
              }),
            ],
            alignment: AlignmentType.CENTER,
            shading: { fill: "22C55E" },
            spacing: { after: 300 },
          }),
          ...sectionElements.flat(),
          new Paragraph({
            children: [
              new TextRun({
                text: "Generado con SGAMGC",
                italics: true,
                font: "Arial",
                size: 20,
                color: "AAAAAA",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 300 },
          }),
        ],
      },
    ],
  });

  // 💾 Guardar el archivo
  Packer.toBlob(doc).then((blob) => {
    const nameFile = selectedCarrier.wearer.first_name
      .split(" ")
      .join("_")
      .toLowerCase();
    saveAs(blob, `detalles_${nameFile}.docx`);
  });
};

export const exportToExcel = (requests: RequestTable[]) => {
  // Define el tipo del objeto aplanado
  interface FlattenedData {
    [key: string]: string | number | boolean | undefined;
  }

  // Flatten the nested data for Excel with Spanish column names
  const flattenedDataArray: FlattenedData[] = requests.map((request) => ({
    Respuesta: request.answer,
    Fecha_Emisión: request.issue_date,
    Estado: request.status,

    // Datos del Solicitante
    Solicitante_Nombre_Completo: request.requester.fullName,
    Solicitante_Apellido: request.requester.lastName,
    Solicitante_Segundo_Nombre: request.requester.middleName,
    Solicitante_Correo: request.requester.email,
    Solicitante_RUN: request.requester.run,
    Solicitante_Teléfono: request.requester.phone,
    Solicitante_Tipo_Usuario: request.requester.userType,
    Solicitante_Institución: request.requester.institution,
    Solicitante_Número_Identificación: request.requester.identificationNumber,
    Solicitante_Región: request.requester.region,
    Solicitante_Dirección: request.requester.address,
    Solicitante_Áreas_Acceso: request.requester.accessAreas,
    Solicitante_Verificación_Identidad: request.requester.identityVerification,
    Solicitante_Pregunta_Seguridad: request.requester.securityQuestion,
    Solicitante_Fecha_Registro: request.requester.registrationDate,
    Solicitante_Observaciones: request.requester.observations,

    // Portador: Datos Personales
    Portador_DatosPersonales_Nombre_Completo:
      request.carrier.personalData.fullName,
    Portador_DatosPersonales_Nombre_Social:
      request.carrier.personalData.socialName,
    Portador_DatosPersonales_Apellido_Paterno:
      request.carrier.personalData.paternalSurname,
    Portador_DatosPersonales_Apellido_Materno:
      request.carrier.personalData.motherSurname,
    Portador_DatosPersonales_Sexo: request.carrier.personalData.sex,
    Portador_DatosPersonales_Tipo_Actual:
      request.carrier.personalData.type_current,
    Portador_DatosPersonales_Género: request.carrier.personalData.gender,
    Portador_DatosPersonales_Fecha_Nacimiento:
      request.carrier.personalData.dateBirth,
    Portador_DatosPersonales_Estado_Civil:
      request.carrier.personalData.maritalStatus,
    Portador_DatosPersonales_Nacionalidad:
      request.carrier.personalData.nationality,
    Portador_DatosPersonales_RUN: request.carrier.personalData.run,
    Portador_DatosPersonales_Teléfono: request.carrier.personalData.phone,
    Portador_DatosPersonales_Extranjero: request.carrier.personalData.foreigner
      ? "Sí"
      : "No",

    // Portador: Causa
    Portador_Causa_Tipo_Pena: request.carrier.cause.penatype,
    Portador_Causa_Delito: request.carrier.cause.crime,
    Portador_Causa_Corte_Apelaciones: request.carrier.cause.courtAppeals,
    Portador_Causa_Región_Corte: request.carrier.cause.courtRegion,
    Portador_Causa_Corte: request.carrier.cause.court,
    Portador_Causa_RUC: request.carrier.cause.ruc,
    Portador_Causa_RIT: request.carrier.cause.rit,
    Portador_Causa_ROL: request.carrier.cause.rol,

    // Portador: Monitoreo
    Portador_Monitoreo_Áreas: request.carrier.monitoring.areas,
    Portador_Monitoreo_Duración_Medida:
      request.carrier.monitoring.durationMeasurement,
    Portador_Monitoreo_Horario_Control:
      request.carrier.monitoring.controlSchedule,
    Portador_Monitoreo_Periodo_Efectivo:
      request.carrier.monitoring.effectivePeriod,
    Portador_Monitoreo_Solicitudes_Viabilidad:
      request.carrier.monitoring.requestsFeasibility,
    Portador_Monitoreo_Sentencia: request.carrier.monitoring.judgment,
    Portador_Monitoreo_Programación_Instalación:
      request.carrier.monitoring.programmingInstallation,
    Portador_Monitoreo_Instalaciones_Realizadas:
      request.carrier.monitoring.installationsDone,
    Portador_Monitoreo_Resolución_Modificación:
      request.carrier.monitoring.modificationResolution,
    Portador_Monitoreo_Soportes_Técnicos:
      request.carrier.monitoring.technicalSupports,
    Portador_Monitoreo_No_Informes: request.carrier.monitoring.nonReports,
    Portador_Monitoreo_Días_Control: request.carrier.monitoring.daysControl,
    Portador_Monitoreo_Desinstalaciones:
      request.carrier.monitoring.uninstallations,

    // Portador: Área de Inclusión
    Portador_ÁreaInclusión_Calle: request.carrier.inclusionArea.street,
    Portador_ÁreaInclusión_Número: request.carrier.inclusionArea.number,
    Portador_ÁreaInclusión_Información_Adicional:
      request.carrier.inclusionArea.additionalInformation,
    Portador_ÁreaInclusión_Comuna: request.carrier.inclusionArea.commune,
    Portador_ÁreaInclusión_Región: request.carrier.inclusionArea.region,
    Portador_ÁreaInclusión_Camino: request.carrier.inclusionArea.road,
    Portador_ÁreaInclusión_Población: request.carrier.inclusionArea.population,
    Portador_ÁreaInclusión_Código_Postal: request.carrier.inclusionArea.zipCode,
    Portador_ÁreaInclusión_Coordenadas_Geográficas:
      request.carrier.inclusionArea.geographicCoordinates,
    Portador_ÁreaInclusión_Radio: request.carrier.inclusionArea.radio,
    Portador_ÁreaInclusión_Horario_Cumplimiento:
      request.carrier.inclusionArea.complianceSchedule,
    Portador_ÁreaInclusión_Características:
      request.carrier.inclusionArea.characteristics,

    // Portador: Área de Exclusión
    Portador_ÁreaExclusión_Calle: request.carrier.exclusionArea.street,
    Portador_ÁreaExclusión_Número: request.carrier.exclusionArea.number,
    Portador_ÁreaExclusión_Información_Adicional:
      request.carrier.exclusionArea.additionalInformation,
    Portador_ÁreaExclusión_Comuna: request.carrier.exclusionArea.commune,
    Portador_ÁreaExclusión_Región: request.carrier.exclusionArea.region,
    Portador_ÁreaExclusión_Camino: request.carrier.exclusionArea.road,
    Portador_ÁreaExclusión_Población: request.carrier.exclusionArea.population,
    Portador_ÁreaExclusión_Código_Postal: request.carrier.exclusionArea.zipCode,
    Portador_ÁreaExclusión_Coordenadas_Geográficas:
      request.carrier.exclusionArea.geographicCoordinates,
    Portador_ÁreaExclusión_Radio: request.carrier.exclusionArea.radio,
    Portador_ÁreaExclusión_Características:
      request.carrier.exclusionArea.characteristics,
    Portador_ÁreaExclusión_Apellido_Paterno:
      request.carrier.exclusionArea.paternalSurname,
    Portador_ÁreaExclusión_Apellido_Materno:
      request.carrier.exclusionArea.motherSurname,
    Portador_ÁreaExclusión_Nombres: request.carrier.exclusionArea.names,
    Portador_ÁreaExclusión_RUT: request.carrier.exclusionArea.rut,
    Portador_ÁreaExclusión_Correo_Víctima:
      request.carrier.exclusionArea.victimEmail,
    Portador_ÁreaExclusión_Teléfono_Domicilio:
      request.carrier.exclusionArea.homeTelephone,
    Portador_ÁreaExclusión_Teléfono_Trabajo:
      request.carrier.exclusionArea.workplaceTelephone,

    // Respuesta del Adjudicatario
    Adjudicatario_Cobertura_Mínima: request.awardee_response.minimum_coverage,
    Adjudicatario_Estado: request.awardee_response.status,
    Adjudicatario_Latitud: request.awardee_response.latitude,
    Adjudicatario_Longitud: request.awardee_response.length,
    Adjudicatario_Aspectos_Indicación:
      request.awardee_response.indication_aspects,
    Adjudicatario_Valor: request.awardee_response.value,
    Adjudicatario_Evidencia_Fotográfica:
      request.awardee_response.photographic_evidence.join(", "),

    // Motivos de Revolución del Solicitante
    Motivos_Revolución_Solicitante: request.reason_revolution_requester
      .map(
        (r, index) =>
          `Motivo ${index + 1}: ${r.reason_return}, Descripción: ${
            r.description_reason
          }`
      )
      .join("; "),

    // Motivos de Revolución del Adjudicatario
    Motivos_Revolución_Adjudicatario: request.reason_revolution_awardee
      .map(
        (r, index) =>
          `Motivo ${index + 1}: ${r.reason_return}, Descripción: ${
            r.description_reason
          }`
      )
      .join("; "),
  }));

  // Create worksheet from the array of flattened data
  const worksheet = XLSX.utils.json_to_sheet(flattenedDataArray);

  // Create workbook and add worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Solicitudes");

  // Auto-size columns (approximate)
  const colWidths = Object.keys(flattenedDataArray[0] || {}).map((key) => {
    const maxLength = Math.max(
      key.length,
      ...flattenedDataArray.map((data) => String(data[key] || "").length)
    );
    return { wch: maxLength > 50 ? 50 : maxLength };
  });
  worksheet["!cols"] = colWidths;

  // Generate Excel file
  const fileName = `Solicitudes_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
