import { useState, Fragment } from "react";
import { useRouter } from "next/router";
//import factory from "../../lib/factory";
//import web3 from "../../lib/web3";
import {
  PlusIcon,
  TrashIcon,
  UserIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";

const mechanism = [
  { id: 1, name: "Waiting List", value: false },
  { id: 2, name: "Dutch Auction", value: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateView() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDutchAuction, setIsDutchAuction] = useState(mechanism[0]);

  // token waiting list
  const [tokenPrice, setTokenPrice] = useState("1000000000000000000");
  const [tokenCap, setTokenCap] = useState("5");
  const [timeToBuyInHours, setTimeToBuyInHours] = useState("24");
  const [initialSupply, setInitialSupply] = useState("10");

  // white listing
  const [address, setAddress] = useState("");
  const [addressList, setAddressList] = useState([
    "0x32Da3311c8414773c876d36E3d61105dfbb9c9D8",
    "0xDA0aaD724F7F0B78A8b31107d400b75c99F31070",
    "0x11E04e773066874b311E854D713083EcEfD34897",
  ]);
  const [addressIsInList, setAddressIsInList] = useState(false);

  // handling
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDeploying(true);
    /* 
    setErrorMessage("");
    setIsDeploying(true);
    console.log(
      "Form Submit",
      title,
      description,
      tokenPrice,
      initialSupply,
      tokenCap,
      isDutchAuction.value,
      timeToBuyInHours,
      addressList
    );
    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCEF(
          title,
          description,
          tokenPrice,
          initialSupply,
          tokenCap,
          isDutchAuction.value,
          timeToBuyInHours,
          addressList
        )
        .send({
          from: accounts[0],
        });

      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    } */
    //router.push("/");
    //setIsDeploying(false);
  };

  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14 lg:overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Deploy Fund
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  With this information you will deploy a fund on the ropsten
                  testnet.
                </p>
              </div>

              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Title of Fund
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Description
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about the fund.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Waiting List vs. Dutch Auction
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Decide whether you want to use a waiting list mechanism or a
                  dutch auction.
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                <div className="pt-6 sm:pt-5">
                  <div role="group" aria-labelledby="label-email">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                      <div>
                        <div
                          className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                          id="label-email"
                        >
                          Mechanism
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:col-span-2">
                        <Listbox
                          value={isDutchAuction}
                          onChange={setIsDutchAuction}
                        >
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium text-gray-700">
                                Choose
                              </Listbox.Label>
                              <div className="mt-1 relative">
                                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                  <span className="block truncate">
                                    {isDutchAuction.name}
                                  </span>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {mechanism.map((person) => (
                                      <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "text-white bg-indigo-600"
                                              : "text-gray-900",
                                            "cursor-default select-none relative py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ isDutchAuction, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                isDutchAuction
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {person.name}
                                            </span>

                                            {isDutchAuction ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Waiting List
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Give additional information regarding waiting list.
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Token Price in WEI
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={tokenPrice}
                      onChange={(e) => setTokenPrice(e.target.value)}
                      type="number"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Token Cap for Investor
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={tokenCap}
                      onChange={(e) => setTokenCap(e.target.value)}
                      type="number"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Time to buy Tokens for an Investor in Hours
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={timeToBuyInHours}
                      onChange={(e) => setTimeToBuyInHours(e.target.value)}
                      type="number"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Issuing
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Decide how many tokens to issue. Manager will
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Tokens to issue
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      value={initialSupply}
                      onChange={(e) => setInitialSupply(e.target.value)}
                      type="number"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Whitelisting
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Paste addresses of whitelisted investors. The order is also
                  the order used in the waiting list.
                </p>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Add Whitelisted Investor
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
                        <div
                          className="mt-1 flex rounded-md shadow-sm"
                          key={address}
                        >
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
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              {isDeploying ? (
                <svg
                  role="status"
                  className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Deploy Fund
                </button>
              )}
            </div>

            <div>
              <div className="flex justify-end">
                {errorMessage ? (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span class="font-medium">Oops!</span> {errorMessage}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}