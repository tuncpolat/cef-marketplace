const posts = [
  {
    seller: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    startinPrice: "1 ETH",
    amountToSell: "4 Tokens",
    total: "4 ETH",
  },
  {
    seller: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    startinPrice: "1 ETH",
    amountToSell: "5 Tokens",
    total: "5 ETH",
  },
  {
    seller: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    startinPrice: "1 ETH",
    amountToSell: "8 Tokens",
    total: "8 ETH",
  },
];

const Selling = () => {
  return (
    <div className="mt-6 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className="flex flex-col rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="flex-1 truncate">
                  <div className="flex space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      Seller
                    </h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      Open
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {post.seller}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-6">
              <div className="flex-1 truncate">
                <div className="flex space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">
                    Price per Token
                  </h3>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {post.startinPrice}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-6">
              <div className="flex-1 truncate">
                <div className="flex space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">
                    Amount of Tokens for Sale
                  </h3>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {post.amountToSell}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-6">
              <div className="flex-1 truncate">
                <div className="flex space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">
                    Total Price
                  </h3>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {post.total}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="text-white mt-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Selling;
