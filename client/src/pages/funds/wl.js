import { useState } from "react";
import WaitingInvestor from "../../components/view/WaitingInvestor";
import WaitingManager from "../../components/view/WaitingManager";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WaitingListPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { name: "Manage Investment", current: 0 },
    { name: "Manage Fund", current: 1 },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-4">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, idx) => (
              <a
                key={tab.name}
                onClick={() => setActiveTab(idx)}
                className={classNames(
                  activeTab === tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {activeTab === 0 ? <WaitingInvestor /> : <WaitingManager />}
    </div>
  );
}
