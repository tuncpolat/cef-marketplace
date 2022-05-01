import Title from "../shared/Title";
import Space from "../shared/Space";
import QuestionMarkLabel from "../shared/QuestionMarkLabel";

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
        title={"You are about to create a fund with a waiting list"}
        subtitle={"Please, give additional information regarding waiting list."}
      />
      <div className="space-y-3">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <QuestionMarkLabel
            label={"Token Price"}
            info={
              "This will be the price at which qualified investors can trade their tokens and buy issued tokens directly from the manager."
            }
          />
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              value={tokenPrice}
              onChange={(e) => setTokenPrice(e.target.value)}
              type="number"
              name="price"
              id="price"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="1"
              aria-describedby="price-currency"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                ETH
              </span>
            </div>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <QuestionMarkLabel
            label={"Token Cap"}
            info={
              "Maximum amount of tokens a qualified investor is allowed to buy if the first position on the waiting list is reached."
            }
          />
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
          <QuestionMarkLabel
            label={"Time Slot"}
            info={
              "Duration in hours a qualified investor can decide whether to invest or not if the first position on the waiting list is reached."
            }
          />
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
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                h
              </span>
            </div>
          </div>
        </div>
      </div>
    </Space>
  );
}
