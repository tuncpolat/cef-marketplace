import { useState, useEffect, Fragment } from "react";
import AuctionInvestor from "../../components/view/AuctionInvestor";
import AuctionManager from "../../components/view/AuctionManager";
import { Dialog, Transition } from "@headlessui/react";
import Cef from "../../lib/cef";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Auction({ address }) {
  const [loading, setLoading] = useState(false);
  const [fund, setFund] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { name: "Manage Investment", current: 0 },
    { name: "Manage Fund", current: 1 },
  ]);

  useEffect(() => {
    const fetchFund = async () => {
      if (address) {
        setLoading(true);
        const fund = Cef(address);
        const data = await fund.methods.getSummary().call();
        console.log(data);
        setFund({
          manager: data[0],
          title: data[1],
          description: data[2],
        });
      }

      setLoading(false);
    };

    fetchFund();
  }, [address]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-4">
        <div className="max-w-xl mt-8">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {fund.title}
          </h2>
          <p className="mt-5 text-xl text-gray-500">{fund.description}</p>
        </div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => {
              setActiveTab(e.target.value);
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.current} value={tab.current}>
                {tab.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex justify-center py-2 px-4 mt-4 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {activeTab == 0 ? "Check Balance" : "Withdraw"}
          </button>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab, idx) => (
                <a
                  key={tab.name}
                  onClick={() => setActiveTab(idx)}
                  className={classNames(
                    activeTab == tab.current
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
              <button
                onClick={() => setOpen(true)}
                style={{ marginLeft: "auto" }}
                className="inline-flex justify-center py-2 px-4 my-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {activeTab == 0 ? "Check Balance" : "Withdraw"}
              </button>
            </nav>
          </div>
        </div>
        {activeTab == 0 ? <AuctionInvestor /> : <AuctionManager />}
      </div>

      {/* Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {activeTab == 0
                        ? "Check Token Balance"
                        : "Withdraw Ether from Contract"}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {activeTab == 0
                          ? "Paste your address to check your balance."
                          : "Check ether on contract or withdraw it."}
                      </p>
                    </div>
                    {activeTab == 0 ? (
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="mt-5 sm:mt-6 cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                        placeholder="0x..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    ) : (
                      <button
                        type="button"
                        className=" mt-5 sm:mt-6 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => console.log("Check Contract Balance")}
                      >
                        Check Contract Balance
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {activeTab == 0 ? "Check Balance" : "Withdraw"}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: { address: query.address }, // will be passed to the page component as props
  };
}
