import Link from "next/link";
import { ExclamationIcon } from "@heroicons/react/solid";

const fakeFunds = [
  {
    id: 1,
    title: "CS Multi-Manager Real Estate Global",
    href: "/auction/mockup",
    mechanism: { name: "Dutch Auction", href: "/auction/mockup" },
    description:
      "CS (Lux) Multi-Manager Real Estate Global invests in a globally diversified portfolio of non-listed real estate funds using an active selection process. The investment group pursues a core+ investment strategy with a majority of investments in funds pursuing a core investment strategy thereby generating longterm, stable cash flow from rental income. To a lesser extent the investment group invests in value-add and opportunistic real estate funds which strive to achieve attractive risk-adjusted returns.",
    manager: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  },
  {
    id: 2,
    title: "Multi-Manager Real Estate SBPH-I",
    href: "/waitinglist/mockup",
    mechanism: { name: "Waiting List", href: "/waitinglist/mockup" },
    description:
      "CS (Lux) Multi-Manager Real Estate SBPH-I CHF invests in a globally diversified portfolio of non-listed real estate funds using an active selection process. The investment group pursues a core+ investment strategy with a majority of investments in funds pursuing a core investment strategy thereby generating longterm, stable cash flow from rental income. To a lesser extent the investment group invests in value-add and opportunistic real estate funds which strive to achieve attractive risk-adjusted returns.",
    manager: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  },
  {
    id: 3,
    title: "Multi-Manager Real Estate",
    href: "/waitinglist/mockup",
    mechanism: { name: "Waiting List", href: "/waitinglist/mockup" },
    description:
      "CS (Lux) Multi-Manager Real Estate EBPH CHF invests in a globally diversified portfolio of non-listed real estate funds using an active selection process. The investment group pursues a core+ investment strategy with a majority of investments in funds pursuing a core investment strategy thereby generating longterm, stable cash flow from rental income. To a lesser extent the investment group invests in value-add and opportunistic real estate funds which strive to achieve attractive risk-adjusted returns.",
    manager: "0xc3FA394F0B8EE501f97A56B3D7f7190aB66e81a7",
  },
];

const people = [
  {
    name: "Lena Mourad",
    role: "MA Economics, University of Zurich",
    imageUrl: "/lena.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/lena-mourad/?originalSubdomain=ch",
  },
  {
    name: "Tunç Polat",
    role: "MSc Business & Technology, University of Basel",
    imageUrl: "/tunc.jpg",
    linkedinUrl: "https://www.linkedin.com/in/tun%C3%A7-polat-b8203a116/",
  },
  {
    name: "Severin Plüss",
    role: "BSc Business Information Technology, FHNW",
    imageUrl: "/severin.jpg",
    linkedinUrl: "https://www.linkedin.com/in/severin-pl%C3%BCss-620995133/",
  },
];

export default function HomeView({ error, funds, loading }) {
  return (
    <>
      <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">Tokenize your</span>
                  <span className="block text-indigo-400">fund shares</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Simplify the cumbersome process of transferring shares in
                  closed-end funds from one qualified investor to another.
                </p>
                <div className="mt-10 sm:mt-12">
                  <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                    <div className="sm:flex">
                      <div className="mt-3 sm:mt-0">
                        <Link href="/funds/new">
                          <button
                            type="submit"
                            className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                          >
                            Create Fund
                          </button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                <img
                  className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://tailwindui.com/img/component-images/cloud-illustration-indigo-400.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog section */}
      <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
        <div className="relative">
          <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">
              Explore
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Closed-End Funds
            </p>
            <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
              Participate in the most exciting way to invest in closed-end
              funds.
            </p>
          </div>
          <div
            className={`mt-12 mx-auto max-w-md px-4 sm:max-w-lg sm:px-6 lg:px-8 lg:max-w-7xl ${
              loading || error
                ? "flex flex-col justify-center"
                : "grid gap-8 lg:grid-cols-3"
            }`}
          >
            {loading ? (
              <svg
                role="status"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
            ) : funds.length === 0 ? (
              error ? (
                <>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ExclamationIcon
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Download a wallet to explore funds and interact with
                          the marketplace on the Ropsten testnet!{" "}
                          <a
                            target="_blank"
                            href="https://metamask.io/download/"
                            className="font-medium underline text-yellow-700 hover:text-yellow-600"
                          >
                            Download metamask wallet here
                          </a>
                          . Nevertheless, we listed some mockup funds for
                          illustrative purposes below.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
                    {fakeFunds.map((fakeFund) => (
                      <Link key={fakeFund.id} href={fakeFund.mechanism.href}>
                        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer">
                          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-primary">
                                <a
                                  href={fakeFund.mechanism.href}
                                  className="hover:underline"
                                >
                                  {fakeFund.mechanism.name}
                                </a>
                              </p>
                              <a href={fakeFund.href} className="block mt-2">
                                <p className="text-xl font-semibold text-gray-900">
                                  {fakeFund.title}
                                </p>
                                <p className="mt-3 text-base text-gray-500">
                                  {fakeFund.description}
                                </p>
                              </a>
                            </div>
                            <div className="mt-6 flex items-center">
                              <div className="">
                                <p className="text-sm font-medium text-gray-900">
                                  <a
                                    href={fakeFund.mechanism.href}
                                    className="hover:underline"
                                  >
                                    Manager
                                  </a>
                                </p>
                                <div className="flex space-x-1 text-sm text-gray-500">
                                  <span>{fakeFund.manager}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                "No funds deployed yet"
              )
            ) : (
              funds.map((fund) => (
                <Link
                  key={fund["address"]}
                  href={
                    fund[7]
                      ? `/auction/${fund["address"]}`
                      : `/waitinglist/${fund["address"]}`
                  }
                >
                  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer">
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">
                          <a className="hover:underline">
                            {fund[7] ? "Dutch Auction" : "Waiting List"}
                          </a>
                        </p>
                        <a className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">
                            {fund[1]}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {fund[2]}
                          </p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="">
                          <p className="text-sm font-medium text-gray-900">
                            <a className="hover:underline">Manager</a>
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <span>{fund[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Team Section */}
      <div className="bg-gray-900">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Meet our team
              </h2>
              <p className="text-xl text-gray-300">
                Team members to work on the CSAM case during the Blockchain
                Challenge 2022 at the University of Basel.
              </p>
            </div>
            <ul
              role="list"
              className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
            >
              {people.map((person) => (
                <li
                  key={person.name}
                  className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left"
                >
                  <div className="space-y-6 xl:space-y-10">
                    <img
                      className="mx-auto rounded-full w-40 xl:w-56"
                      src={person.imageUrl}
                      alt=""
                    />
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-white">{person.name}</h3>
                        <p className="text-indigo-400">{person.role}</p>
                      </div>

                      <ul role="list" className="flex justify-center space-x-5">
                        <li>
                          <a
                            href={person.linkedinUrl}
                            className="text-gray-400 hover:text-gray-300"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
