import { Dashboard } from "@/components";
import { TableDmt } from "@/views/view-requests/components/tables/TableDmt";
import { Files } from "lucide-react";

const Coco = () => {
  const menuItems = [
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <TableDmt />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Coco;
