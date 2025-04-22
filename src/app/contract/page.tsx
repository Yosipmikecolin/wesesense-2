import { Dashboard } from "@/components";
import { ViewCreateObligations, ViewObligations } from "@/views";
import MaintenanceView from "@/views/Maintenance";
import ReporteVisitaForm from "@/views/ReporteVisitaForm";
import SatellitePhoneTestView from "@/views/evidence/satellite-phone-test-view";
import BillingHistoryView from "@/views/tracking-history/billing-history-view";
import TrainingView from "@/views/training/training-view";
import ViewMantencionForm from "@/views/view-create-mantencion/view-create-form";
import ViewDeviceStock from "@/views/view-device-stock/view-device-stock";
import {
  FilePlus,
  FileSearch2,
  FilePen,
  FileSpreadsheet,
  UserRoundCheck,
  PhoneCall,
  CircleDot,
  FilePlus2,
  Drill,
} from "lucide-react";

const Contract = () => {
  const menuItems = [
    // {
    //   icon: <FilePlus size={17} />,
    //   label: "Crear obligación",
    //   content: <ViewCreateObligations />,
    // },
    {
      icon: <FileSearch2 size={17} />,
      label: "Obligaciones",
      content: <ViewObligations />,
    },
    {
      icon: <FilePen size={17} />,
      label: "Programación",
      content: <ViewMantencionForm />,
    },
    {
      icon: <FileSpreadsheet size={17} />,
      label: "Reportes",
      content: <ReporteVisitaForm />,
    },
    {
      icon: <Drill size={17} />,
      label: "Mantenimientos",
      content: <MaintenanceView />,
    },
    {
      icon: <UserRoundCheck size={17} />,
      label: "Capacitaciones",
      content: <TrainingView />,
    },
    {
      icon: <PhoneCall size={17} />,
      label: "Pruebas telefonicas",
      content: <SatellitePhoneTestView />,
    },
    {
      icon: <CircleDot size={17} />,
      label: "Stock dispositivos",
      content: <ViewDeviceStock />,
    },
    {
      icon: <FilePlus2 size={17} />,
      label: "Facturación",
      content: <BillingHistoryView />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Contract;
