"use client";

import { Dashboard } from "@/components";
import {
  BriefcaseBusiness,
  FileInput,
  Files,
  FileSearch2,
  UserPlus,
  UserRoundPlus,
  Users,
  Users2,
} from "lucide-react";
import {
  ViewCreateRequest,
  ViewCreateRequester,
  ViewCreateUser,
  ViewRequester,
  ViewRequests,
  ViewUsers,
  ViewWorkload,
} from "@/views";
import TableObligations from "@/views/view-obligations/components/TableObligations";

const Admin = () => {
  const menuItems = [
    {
      icon: <FileSearch2 size={17} />,
      label: "Obligaciones",
      content: <TableObligations mode_supervise />,
    },
  ];
  return <Dashboard menuItems={menuItems} />;
};

export default Admin;
