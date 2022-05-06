import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

export default function Banner({ setOpen }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="bg-yellow-100">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-yellow-500">
                <SpeakerphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-medium text-yellow-700 truncate">
                <span className="md:hidden">
                  Download a wallet to interact.
                </span>
                <span className="hidden md:inline">
                  Download a wallet to explore funds and interact with the
                  marketplace on Ropsten testnet!
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                target="_blank"
                href="https://metamask.io/download/"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-white hover:bg-yellow-50"
              >
                Get a wallet
              </a>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-yellow-700" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
