import { useState } from "react";
import { UserIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import Title from "../shared/Title";
import Space from "../shared/Space";
import QuestionMarkLabel from "../shared/QuestionMarkLabel";

export default function WaitingManager() {
  const [tokenCap, setTokenCap] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [timeToBuyInHours, setTimeToBuyInHours] = useState("");
  const [address, setAddress] = useState("");
  const [addressIsInList, setAddressIsInList] = useState(false);
  const [addressList, setAddressList] = useState([
    "0x32Da3311c8414773c876d36E3d61105dfbb9c9D8",
    "0xDA0aaD724F7F0B78A8b31107d400b75c99F31070",
    "0x11E04e773066874b311E854D713083EcEfD34897",
  ]);

  const handleChangeAddress = (e) => {
    e.preventDefault();
    setAddressIsInList(false);
    const value = e.target.value;

    if (addressList.includes(value)) {
      setAddressIsInList(true);
    } else {
      setAddress(value);
    }
  };

  const handleAddAddress = () => {
    setAddressList((prevProps) => [...prevProps, address]);
    setAddress("");
  };

  const handleRemoveAddress = (address) => {
    setAddressList(addressList.filter((item) => item !== address));
  };

  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14 lg:overflow-hidden">
      <Space>
        <Title
          title={"White-List"}
          subtitle={
            "Add and remove white-listed qualified investors from the fund."
          }
        />
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              White-listed Investors
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={handleChangeAddress}
                    name="address"
                    id="address"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                    placeholder="0x..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <PlusIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Add</span>
                </button>
              </div>
              {addressIsInList ? (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  Address already in array
                </p>
              ) : (
                ""
              )}
              {addressList.map((address) => {
                return (
                  <div className="mt-1 flex rounded-md shadow-sm" key={address}>
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                        value={address}
                        disabled
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(address)}
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <TrashIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Remove</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Space>
      <Space>
        <Title
          title={"Corporate Actions"}
          subtitle={"Functionalities to manage your fund."}
        />
        <div className="space-y-3">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <QuestionMarkLabel
              label={"Mint New Tokens"}
              info={"Create new tokens to issue."}
            />
            <div className="flex flex-col md:flex-row mt-4 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="md:ml-auto mt-2 md:mt-0 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Mint tokens
              </button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <QuestionMarkLabel
              label={"Price Tokens"}
              info={
                "Set or change the price for already issued or newly issued tokens at which a qualified investor can buy from you."
              }
            />
            <div className="flex  flex-col md:flex-row mt-4 sm:mt-0 sm:col-span-2 relative">
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  value={tokenPrice}
                  onChange={(e) => setTokenPrice(e.target.value)}
                  type="number"
                  name="price"
                  id="price"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                  aria-describedby="price-currency"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    ETH
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="md:ml-auto  mt-2 md:mt-0 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Set price
              </button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <QuestionMarkLabel
              label={"Token Cap"}
              info={
                "Maximum amount of tokens a qualified investor is allowed to buy if the first position on the waiting list is reached."
              }
            />
            <div className="flex  flex-col md:flex-row mt-4 sm:mt-0 sm:col-span-2">
              <input
                value={tokenCap}
                onChange={(e) => setTokenCap(e.target.value)}
                type="number"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="md:ml-auto  mt-2 md:mt-0 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Set new cap
              </button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <QuestionMarkLabel
              label={"Time Slot"}
              info={
                "Duration in hours a qualified investor can decide whether to invest or not if the first position on the waiting list is reached."
              }
            />
            <div className="flex  flex-col md:flex-row mt-4 sm:mt-0 sm:col-span-2">
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  value={timeToBuyInHours}
                  onChange={(e) => setTimeToBuyInHours(e.target.value)}
                  type="number"
                  name="hours"
                  id="hours"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    h
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="md:ml-auto  mt-2 md:mt-0 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Set new timeframe
              </button>
            </div>
          </div>
        </div>
      </Space>
    </div>
  );
}
