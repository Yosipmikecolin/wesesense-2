import { Dashboard } from "@/components";
import { ViewProcessManagement } from "@/views";
import ViewHistory from "@/views/view-history/ViewHistory";
import { TableCrs } from "@/views/view-requests/components/tables/TableCrs";
import ViewSupportManagement from "@/views/view-support-management/ViewSupportManagement";
import { ClipboardPenLine, Cog, FileStack, RefreshCcwDot } from "lucide-react";

const Crs = () => {
  const menuItems = [
    {
      icon: <ClipboardPenLine size={17} />,
      label: "Resoluciones",
      content: <TableCrs />,
    },
    {
      icon: <RefreshCcwDot size={17} />,
      label: "Gestión de resoluciones",
      content: <ViewProcessManagement />,
    },
    {
      icon: <Cog size={17} />,
      label: "Gestión de soporte",
      content: <ViewSupportManagement />,
    },
    {
      icon: <FileStack size={17} />,
      label: "Histórico de resoluciones",
      content: <ViewHistory />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Crs;
