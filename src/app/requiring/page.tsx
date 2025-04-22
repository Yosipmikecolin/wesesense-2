import { Dashboard } from "@/components";
import { ViewCreateRequest } from "@/views";
import { TableRequiring } from "@/views/view-requests/components/tables/TableRequiring";
import { FileInput, Files } from "lucide-react";

const ProfileRequirers = () => {
  const menuItems = [
    {
      icon: <FileInput size={17} />,
      label: "Crear solicitud",
      content: <ViewCreateRequest />,
    },
    {
      icon: <Files size={17} />,
      label: "Solicitudes",
      content: <TableRequiring />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default ProfileRequirers;
