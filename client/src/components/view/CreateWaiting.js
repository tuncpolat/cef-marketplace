import Title from "../shared/Title";
import Space from "../shared/Space";

export default function CreateWaiting({
  tokenPrice,
  setTokenPrice,
  tokenCap,
  setTokenCap,
  timeToBuyInHours,
  setTimeToBuyInHours,
}) {
  return (
    <Space>
      <Title
        title={"Waiting List"}
        subtitle={"Give additional information regarding waiting list."}
      />
      <div className="space-y-3">
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
    </Space>
  );
}
