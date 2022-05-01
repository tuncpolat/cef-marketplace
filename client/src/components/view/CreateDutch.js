import Title from "../shared/Title";
import Space from "../shared/Space";
import QuestionMarkLabel from "../shared/QuestionMarkLabel";

export default function CreateDutch({ tokenPrice, setTokenPrice }) {
  return (
    <Space>
      <Title
        title={"You are about to create a fund with a dutch auction"}
        subtitle={
          "Please, give additional information regarding dutch auction."
        }
      />
      <div className="space-y-3">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <QuestionMarkLabel
            label={"Token Price"}
            info={
              "This will be the price at which qualified investors can buy issued tokens directly from the manager."
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
      </div>
    </Space>
  );
}
