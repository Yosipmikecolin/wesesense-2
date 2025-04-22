import { Dashboard } from "@/components";
import { UserPlus, Users } from "lucide-react";
import { ViewCarries, ViewCreateCarrier } from "@/views";

const Koordinator = () => {
  const menuItems = [
    {
      icon: <UserPlus size={17} />,
      label: "Crear portador",
      content: <ViewCreateCarrier />,
    },

    {
      icon: <Users size={17} />,
      label: "Portadores",
      content: <ViewCarries />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Koordinator;
