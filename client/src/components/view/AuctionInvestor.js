import { useState } from "react";
import AuctionsCards from "../shared/Auction";
import {
  CalendarIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Title from "../shared/Title";
import Space from "../shared/Space";
import QuestionMarkLabel from "../shared/QuestionMarkLabel";
import web3 from "../../lib/web3";
import Cef from "../../lib/cef";

export default function AuctionInvestor({ address, fund, auctions }) {
  const [amountToBuy, setAmountToBuy] = useState(0);
  const [whiteListedAddress, setWhiteListedAddress] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  const handleCheckWhiteListedAddress = () => {
    setIsWhitelisted(false);
    setStartSearch(true);
    const found = fund.waitingList.find((e) => e === whiteListedAddress);
    if (found) {
      setIsWhitelisted(true);
    } else {
      setIsWhitelisted(false);
    }
    setWhiteListedAddress("");
  };

  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14 lg:overflow-hidden">
      <Space>
        <Title
          title={"Open Auctions"}
          subtitle={
            "Currently available tokens - Please place your bid to buy your tokens from other qualified investors."
          }
        />
        {auctions.length === 0 ? (
          <div className="rounded-md bg-blue-50 p-4 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon
                  className="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  No auctions available right now.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <AuctionsCards auctions={auctions} />
        )}
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
              value={amountToBuy}
              onChange={(e) => setAmountToBuy(e.target.value)}
              autoComplete="given-name"
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
            <div className="mt-2 bg-white shadow rounded-lg overflow-hidden p-4">
              <dt className="text-xs font-medium text-gray-500 truncate">
                Total Price
              </dt>
              <dd className="mt-1 text-md font-semibold text-gray-900">
                {amountToBuy * web3.utils.fromWei(fund.tokenPrice)} ETH
              </dd>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={() => handleBuyTokensFromManager()}
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
                value={whiteListedAddress}
                onChange={(e) => setWhiteListedAddress(e.target.value)}
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={() => handleCheckWhiteListedAddress()}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Check Address
              </button>
            </div>
          </div>
          {isWhitelisted ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    This address is white-listed
                  </h3>
                </div>
              </div>
            </div>
          ) : startSearch ? (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    This address is not white-listed
                  </h3>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Space>
    </div>
  );
}
