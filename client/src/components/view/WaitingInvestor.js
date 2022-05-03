import { useState } from "react";
import Selling from "../shared/Selling";
import Title from "../shared/Title";
import Space from "../shared/Space";
import QuestionMarkLabel from "../shared/QuestionMarkLabel";

export default function WaitingInvestor() {
  const [addressList, setAddressList] = useState([
    "0x32Da3311c8414773c876d36E3d61105dfbb9c9D8",
    "0xDA0aaD724F7F0B78A8b31107d400b75c99F31070",
    "0x11E04e773066874b311E854D713083EcEfD34897",
  ]);

  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14 lg:overflow-hidden">
      <Space>
        <Title
          title={"Selling Postitions"}
          subtitle={"Buy tokens from other investors."}
        />
        <Selling />
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
          title={"Sell Tokens"}
          subtitle={
            "Open a selling position to sell your tokens to other qualified investors."
          }
        />
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
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Open Position
            </button>
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
