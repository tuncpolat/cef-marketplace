import { useState } from "react";
import AuctionsCards from "../../components/shared/Auction";
import { CalendarIcon, UserIcon } from "@heroicons/react/solid";

const tabs = [
  { idx: 0, name: "Auctions", href: "#", current: false },
  { idx: 1, name: "Issued Tokens", href: "#", current: false },
  { idx: 2, name: "Start Auction", href: "#", current: true },
  { idx: 3, name: "White-Listing", href: "#", current: false },
  { idx: 4, name: "Manager", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Auction() {
  const [addressList, setAddressList] = useState([
    "0x32Da3311c8414773c876d36E3d61105dfbb9c9D8",
    "0xDA0aaD724F7F0B78A8b31107d400b75c99F31070",
    "0x11E04e773066874b311E854D713083EcEfD34897",
  ]);

  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14 lg:overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Auctions
          </h3>
          <p className="mt-2 text-base text-gray-700 sm:mt-5">
            Participate in the auctions to buy your tokens.
          </p>
        </div>
        <AuctionsCards />
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-12">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Start Auction
          </h3>
          <p className="mt-2 text-base text-gray-700 sm:mt-5">
            Start your own auction to sell your tokens. (check balance)
          </p>
        </div>
        <div className="space-y-3">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Amount of Tokens you want to sell
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Starting Price of your Auction in WEI
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Discount Rate of your Auction in WEI per Minute
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Expiration Time of your Auction
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="account-number"
                  id="account-number"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="20-04-2022"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Auction
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-12">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Issued Tokens
          </h3>
          <p className="mt-2 text-base text-gray-700 sm:mt-5">
            Buy directly from the issuer.
          </p>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Calculate your token price
          </label>
          <div className="flex mt-4 sm:mt-0 sm:col-span-2">
            <input
              placeholder="How many tokens do you want to buy?"
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
            <p className="flex items-center ml-3">X 1 ETH = 2 ETH</p>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buy Tokens
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-12">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            White-Listing
          </h3>
          <p className="mt-2 text-base text-gray-700 sm:mt-5">
            Check if you are white-listed.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Whitelisted Investor
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
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
                  </div>
                );
              })}
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Check token balance
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                placeholder="Address to check"
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Check Balance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 mt-12">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Manager
          </h3>
          <p className="mt-2 text-base text-gray-700 sm:mt-5">
            Actions only available to the manager.
          </p>
        </div>
        <div className="space-y-3">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Mint new tokens
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                placeholder="How many tokens do you want to mint?"
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Mint tokens
              </button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Set new token price for issued tokens
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                placeholder="New price in WEI"
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Set price
              </button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Add investor to whitelist
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                placeholder="Address to be added"
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add investor
              </button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Remove investor from whitelist
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <input
                placeholder="Address to be removed"
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Remove investor
              </button>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Withdraw contract balance
            </label>
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
