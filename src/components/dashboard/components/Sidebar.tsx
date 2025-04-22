import { Dispatch, JSX, SetStateAction } from "react";

interface SiderbarProps {
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  menuItems: {
    label: string;
    icon: JSX.Element;
    content: JSX.Element;
  }[];
}

const Sidebar = ({ view, setView, menuItems }: SiderbarProps) => {
  return (
    <div className="w-60 border-r bg-white h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center font-semibold text-xl">
          <span className="text-green-400">SGA</span>MGC
        </div>
      </div>
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <div
            onClick={() => setView(item.label)}
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg mb-1 cursor-pointer select-none ${
              view === item.label
                ? "bg-green-500 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
