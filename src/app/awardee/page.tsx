import { Dashboard } from "@/components";
import { ViewCreationEvents, ViewProcessManagement, ViewReport } from "@/views";
import ViewHistory from "@/views/view-history/ViewHistory";
import { TableAwardee } from "@/views/view-requests/components/tables/TableAwardee";
import ViewSupportManagement from "@/views/view-support-management/ViewSupportManagement";
import {
  BookText,
  CalendarPlus,
  Cog,
  Files,
  FileStack,
  RefreshCcwDot,
} from "lucide-react";

const Awardee = () => {
  const menuItems = [
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <TableAwardee />,
    },

    {
      icon: <CalendarPlus size={17} />,
      label: "Creación de eventos",
      content: <ViewCreationEvents />,
    },
    {
      icon: <BookText size={17} />,
      label: "Reportes",
      content: <ViewReport />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Awardee;
