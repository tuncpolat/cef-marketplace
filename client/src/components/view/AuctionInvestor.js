import { useState } from "react";
import AuctionsCards from "../shared/Auction";
import { CalendarIcon } from "@heroicons/react/solid";
import Title from "../shared/Title";
import Space from "../shared/Space";
import QuestionMarkLabel from "../shared/QuestionMarkLabel";

export default function AuctionInvestor() {
  const [addressList, setAddressList] = useState([
    "0x32Da3311c8414773c876d36E3d61105dfbb9c9D8",
    "0xDA0aaD724F7F0B78A8b31107d400b75c99F31070",
    "0x11E04e773066874b311E854D713083EcEfD34897",
  ]);

  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14 lg:overflow-hidden">
      <Space>
        <Title
          title={"Open Auctions"}
          subtitle={
            "Currently available tokens - Please place your bid to buy your tokens from other qualified investors."
          }
        />
        <AuctionsCards />
      </Space>

      <Space>
        <Title
          title={"Buy Tokens"}
          subtitle={
            "Enter the amount of tokens you want to buy directly from the fund manager."
          }
        />
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
          <QuestionMarkLabel
            label={"Calculate Token Price"}
            info={
              "Calculation of Ether required to purchase amount of tokens stated."
            }
          />
          <div className="flex flex-col align-start mt-4 sm:mt-0 sm:col-span-2">
            <input
              placeholder="Amount of Tokens"
              type="number"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
            <div className="mt-2 bg-white shadow rounded-lg overflow-hidden p-4">
              <dt className="text-xs font-medium text-gray-500 truncate">
                Total Price
              </dt>
              <dd className="mt-1 text-md font-semibold text-gray-900">
                2 ETH
              </dd>
            </div>
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
      </Space>

      <Space>
        <Title
          title={"Start your Auction"}
          subtitle={
            "Start your own auction to sell your tokens to other qualified investors."
          }
        />
        <div className="space-y-3">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Amount of Tokens to Sell
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
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <QuestionMarkLabel
              label={"Starting Price"}
              info={"Price at which the auction will start."}
            />
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  ETH
                </span>
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <QuestionMarkLabel
              label={"Minimum Price"}
              info={
                "Once the minimum price is reached the auction is terminated."
              }
            />
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  ETH
                </span>
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <QuestionMarkLabel
              label={"Expiration Date"}
              info={"After this date, the auction is terminated."}
            />
            <div className="flex mt-4 sm:mt-0 sm:col-span-2">
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="account-number"
                  id="account-number"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="20-04-2022"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
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
      </Space>

      <Space>
        <Title
          title={"White-List"}
          subtitle={"Check if you are white-listed."}
        />
        <div className="space-y-3">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Check White-Listed Address
            </label>
            <div className="flex flex-col md:flex-row mt-4 sm:mt-0 sm:col-span-2">
              <input
                placeholder="Paste own address"
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Check Address
              </button>
            </div>
          </div>
        </div>
      </Space>
    </div>
  );
}
