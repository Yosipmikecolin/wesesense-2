import { JSX } from "react";

interface ContentProps {
  menuItems: {
    label: string;
    icon: JSX.Element;
    content: JSX.Element;
  }[];
  view: string;
}

const Content = ({ view, menuItems }: ContentProps) => {
  const activeContent = menuItems.find((item) => item.label === view)?.content;
  return (
    <main className="flex-1 p-6 overflow-auto">
      {activeContent || <div>No content available</div>}
    </main>
  );
};

export default Content;
