import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Interim 03 Fund",
    href: "/funds/auction",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { name: "Dutch Auction", href: "/funds/wl" },
    preview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    author: {
      name: "Manager",
      href: "/funds/auction",
    },
    readingLength: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  },
  {
    id: 2,
    title: "CSAM Alternative Assets Fund",
    href: "/funds/wl",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { name: "Waiting List", href: "/funds/wl" },
    preview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
    author: {
      name: "Manager",

      href: "/funds/wl",
    },
    readingLength: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  },
  {
    id: 3,
    title: "CSAM Real Estate Fund",
    href: "/funds/wl",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    category: { name: "Waiting List", href: "/funds/wl" },
    preview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    author: {
      name: "Manager",
      href: "/funds/wl",
    },
    readingLength: "0xc3FA394F0B8EE501f97A56B3D7f7190aB66e81a7",
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

export default function HomeView() {
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
                  Overcome and the cumbersome process of transferring shares in
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
          <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                      <a href={post.category.href} className="hover:underline">
                        {post.category.name}
                      </a>
                    </p>
                    <a href={post.href} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {post.title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {post.preview}
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="">
                      <p className="text-sm font-medium text-gray-900">
                        <a href={post.author.href} className="hover:underline">
                          {post.author.name}
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <span>{post.readingLength}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                Randomly generated team members to work on the CSAM case during
                the Blockchain Challenge 2022 at the University of Basel.
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
