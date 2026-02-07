"use client";

import { JSX, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Content from "./components/Content";

interface DashboardProps {
  menuItems: {
    label: string;
    icon: JSX.Element;
    content: JSX.Element;
  }[];
}

const Dashboard = ({ menuItems }: DashboardProps) => {
  const [view, setView] = useState(menuItems[0].label);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} view={view} setView={setView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <Content view={view} menuItems={menuItems} />
      </div>
    </div>
  );
};

export default Dashboard;
