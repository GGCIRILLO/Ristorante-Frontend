import { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: string; // URL dell'icona SVG
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId }) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || tabs[0]?.id || ""
  );

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="border-b border-gray-200 flex-shrink-0">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`pb-3 px-6 font-medium text-sm border-b-2 ${
                activeTabId === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              aria-current={activeTabId === tab.id ? "page" : undefined}
            >
              <div className="flex items-center">
                {tab.icon && (
                  <img src={tab.icon} alt="" className="w-5 h-5 mr-2" />
                )}
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow  overflow-auto">{activeTab?.content}</div>
    </div>
  );
};
