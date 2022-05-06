import { useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../components/shared/CodeBlock";

const subNavigation = [
  { name: "Factory Design Pattern", href: "#factory", current: false },
  { name: "ERC20 & Constructor", href: "#erc20", current: false },
  { name: "Variables & Events", href: "#variables", current: false },
  { name: "Modifiers", href: "#modifiers", current: false },
  { name: "Dutch Auction", href: "#dutchauction", current: false },
  { name: "Waiting List", href: "#waitinglist", current: false },
  { name: "Corporate Actions", href: "#corporateactions", current: false },
  { name: "Helper Functions", href: "#helper", current: false },
  { name: "Front-End", href: "#frontend", current: false },
  { name: "Credits", href: "#credits", current: false },
];

const variables = [
  { name: "manager", description: "Manager of the fund" },
  { name: "title", description: "Title of the fund" },
  { name: "description", description: "Description of the fund" },
  {
    name: "tokenPrice",
    description:
      "Price of the issued token; uses NAV for the waiting list mechanism and the result of auctions in funds based on dutch auctions.",
  },
  {
    name: "tokensPerInvestor",
    description:
      "Token cap per investor; How many tokens a qualified investor can buy at once.",
  },
  {
    name: "timeToBuyInHours",
    description:
      "Time slot per investor; How long a qualified investor has time to decide wheter to invest or not.",
  },
  {
    name: "startDate",
    description: "Start date of the fund; used for waiting list mechanism.",
  },
  {
    name: "isDutchAuction",
    description:
      "To determine if the fund uses a dutch auction or a waiting list mechanism.",
  },
  {
    name: "waitingList",
    description:
      "Waiting list of the fund; used to determine the position of the qualified investor in the fund.",
  },
  {
    name: "auctions",
    description:
      "Auctions of the fund; used with the struct Auction to have a collection of dutch auctions in the fund.",
  },
  {
    name: "sellings",
    description:
      "Selling positions of the fund; used with the struct Selling to have a collection of selling positions in the fund based on waiting list mechanism.",
  },
  {
    name: "whiteListedInvestors",
    description:
      "Mapping with addresss as key and Investor struct as value; used for white-listing and waiting list mechanism.",
  },
];

const corporateactions = [
  {
    name: "withdraw",
    description: "Only manager can withdraw the money from the contract.",
  },
  {
    name: "addInvestor",
    description: "Only manager can add an investor to the white-list.",
  },
  {
    name: "removeInvestor",
    description: "Only manager can remove an investor from the white-list.",
  },
  {
    name: "mintNewTokens",
    description: "Only manager can mint new tokens.",
  },
  {
    name: "setTokenPrice",
    description:
      "Only manager can set the token price; uses NAV for the waiting list mechanism and the result of auctions in funds based on dutch auctions.",
  },
  {
    name: "setTokenPerInvestor",
    description:
      "Only manager can set the token cap per investor; How many tokens a qualified investor can buy at once.",
  },
  {
    name: "setTimeSlot",
    description:
      "Only manager can set the time slot per investor; How long a qualified investor has time to decide wheter to invest or not.",
  },
];

const events = [
  {
    name: "BuyTokens",
    description:
      "Emit event after buying tokens used in dutch auctions and waiting list mechansim.",
  },
  {
    name: "CapitalCall",
    description: "Emit event after further tokens are minted.",
  },
  {
    name: "SetNewTokenPrice",
    description:
      "Emit event after setting new token price for issued tokens in dutch auction or NAV in waiting list mechanism.",
  },
  {
    name: "SetNewTokenCap",
    description:
      "Emit event after setting new token cap for waiting list mechanism.",
  },
];

const credits = [
  {
    topic: "Buying & Selling",
    link: "https://dev.to/stermi/how-to-create-an-erc20-token-and-a-solidity-vendor-contract-to-sell-buy-your-own-token-4j1m",
  },
  {
    topic: "Buying & Selling",
    link: "https://ethereum.stackexchange.com/questions/68759/buytoken-function-with-erc20-interface",
  },
  {
    topic: "Whitelist",
    link: "https://dev.to/emanuelferreira/how-to-create-a-smart-contract-to-whitelist-users-57ki",
  },
  {
    topic: "Dutch Auction",
    link: "https://www.quicknode.com/guides/solidity/how-to-create-a-dutch-auction-smart-contract",
  },
  {
    topic: "Find Index in Array",
    link: "https://ethereum.stackexchange.com/questions/121913/get-index-of-element-in-array",
  },
  {
    topic: "Delete Element in Array",
    link: "https://ethereum.stackexchange.com/questions/1527/how-to-delete-an-element-at-a-certain-index-in-an-array",
  },
  {
    topic: "Fractionability",
    link: "https://ethereum.stackexchange.com/questions/101876/how-to-transfer-a-fraction-of-erc20-token",
  },
  {
    topic: "Fractionability",
    link: "https://thetombomb.com/posts/adding-code-snippets-to-static-markdown-in-Next%20js",
  },
  {
    topic: "Save bytecode in modifiers",
    link: "https://www.youtube.com/watch?v=XDqD3X8DCiw",
  },
  {
    topic: "Front-End - Markdown highlighting",
    link: "https://thetombomb.com/posts/adding-code-snippets-to-static-markdown-in-Next%20js",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Docs() {
  return (
    <div className="pt-10 sm:pt-16 lg:pt-8 pb-10 lg:pb-14">
      <main className="relative">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </aside>

              <div className="divide-y divide-gray-200 lg:col-span-9">
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h1 className="text-xl leading-6 font-medium text-gray-900">
                      Technical Documentation
                    </h1>
                    <p className="mt-1 text-gray-500">
                      This is the technical documentation of the CSAM project
                      at the Blockchain Challenge 2022 at the University of
                      Basel. The GitHub repository can be found {" "}
                      <a
                        href="https://github.com/tuncpolat/cef-marketplace"
                        target="_blank"
                      >
                        here
                      </a>
                      .
                    </p>
                  </div>
                  <div className="mt-6" id="factory">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                      Factory Design Pattern
                    </h2>
                    <p className="mt-1 text-gray-500">
                      We decided to use a factory pattern to create our smart
                      contracts for closed-end funds. The createCEF
                      function will create a closed-end fund contract and push
                      the contract instance into an array. We used this pattern
                      to simplify the front-end logic. Getting all the
                      closed-end fund contract addresses to display them in the
                      front-end is as simple as calling the getCEFAddresses
                      function.
                    </p>
                    <ReactMarkdown components={CodeBlock}>
                      {`
    contract CEFFactory {\n
      ClosedEndFund[] public deployedCEF;

      function createCEF(
          string memory _title,
          string memory _description,
          uint256 _tokenPrice,
          uint256 _initialSupply,
          uint256 _tokensPerInvestor,
          bool _isDutchAuction,
          uint256 _timeToBuyInHours,
          address[] memory _whiteListedInvestors
      ) public {
          ClosedEndFund newCEF = new ClosedEndFund(
              msg.sender,
              _title,
              _description,
              _tokenPrice,
              _initialSupply,
              _tokensPerInvestor,
              _isDutchAuction,
              _timeToBuyInHours,
              _whiteListedInvestors
          );
          deployedCEF.push(newCEF);
      }

      function getDeployedCEF() public view returns (ClosedEndFund[] memory) {
          return deployedCEF;
      }
    }
`}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-6" id="erc20">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        ERC20 & Constructor
                      </h2>
                      <p className="mt-1 text-gray-500">
                        We decided to use an ERC20 token. The fund contract
                        inherits all the functionalities from the ERC20 contract
                        provided by openzeppelin. To deploy the fund contract, a
                        few parameters are needed. The variables are explained
                        in the chapter{" "}
                        <a href="variables">Variables & Events</a>. To whitelist
                        investors, we used a for loop to iterate over the array
                        of addresses provided by the contract deployer and add
                        them to the whiteListedInvestors variable.
                      </p>
                      <ReactMarkdown components={CodeBlock}>
                        {`
    contract CEFToken is ERC20 {
        constructor(address _manager, uint256 initialSupply)
            ERC20("CEF TOKEN", "CEF")
        {
            _mint(_manager, initialSupply);
        }
    }

    contract ClosedEndFund is CEFToken {
      ...
      constructor(
        address _manager,
        string memory _title,
        string memory _description,
        uint256 _tokenPrice,
        uint256 _initialSupply,
        uint256 _tokensPerInvestor,
        bool _isDutchAuction,
        uint256 _timeToBuyInHours,
        address[] memory _whiteListedInvestors
      ) CEFToken(_manager, _initialSupply) {
          manager = _manager;
          title = _title;
          description = _description;
          tokenPrice = _tokenPrice;
          tokensPerInvestor = _tokensPerInvestor;
          isDutchAuction = _isDutchAuction;
          timeToBuyInHours = _timeToBuyInHours;
          startDate = block.timestamp;
          waitingList = _whiteListedInvestors;
  
          // add investors to mapping (whitelisting) - O(n) linear algorithm - it's ok if amount of white-listed Investors is small
          for (uint256 i = 0; i < _whiteListedInvestors.length; i++) {
              address whiteListedInvestor = _whiteListedInvestors[i];
              whiteListedInvestors[whiteListedInvestor].whiteListed = true;
          }
      }
      ...
    }
`}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6" id="variables">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Variables & Events
                      </h2>
                      <p className="mt-1 text-gray-500">
                        The variables are descriped in the table below:
                      </p>
                      <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Variable
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {variables.map((person) => (
                                    <tr key={person.name}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {person.name}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {person.description}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-8 text-gray-500">
                        The events are descriped in the table below:
                      </p>
                      <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Events
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {events.map((event) => (
                                    <tr key={event.name}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {event.name}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {event.description}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ReactMarkdown components={CodeBlock}>
                        {`

    contract ClosedEndFund is CEFToken {
      // *** VARIABLES *** //
      address public manager; // address of the fund manager
      string public title; // name of the fund
      string public description; // description of the fund
      uint256 public tokenPrice; // in WEI
      uint256 public tokensPerInvestor; // tokens that investor can buy at once
      uint256 public timeToBuyInHours; // time slot to buy tokens
      uint256 public startDate; // start date when CA is deployed
      bool public isDutchAuction; // decide whether it's a dutch auction or waiting list mechanism
      address[] public waitingList; // waiting list array with ordered position

      // *** STRUCT *** //
      struct Auction {
          address seller; // addres of seller
          uint256 amountToSell; // amount of tokens to sell
          uint256 startingPrice; // starting price of auction
          uint256 minimumPrice; // mimimun price of auction
          uint256 startAt; // start date
          uint256 expiresAt; // end date
          bool completed; // true if the auction has already been closed
      }

      Auction[] public auctions;

      // used for waiting list mechanism
      struct Selling {
          address seller;
          uint256 amountToSell; // amount of tokens to sell
          bool completed; // true if the auction has already been closed
      }

      Selling[] public sellings;

      struct Investor {
          bool whiteListed; // true if white-listed
          uint timeLastBoughtTokens; // check for waiting list mechanism if investor bought in the last timeToBuyInHours
      }

      mapping(address => Investor) public whiteListedInvestors;

      // *** EVENTS *** //
      event BuyTokens(
          address buyer,
          address seller,
          uint256 amountOfETH,
          uint256 amountOfTokens
      );
      event CapitalCall(uint256 amountOfTokens);
      event SetNewTokenPrice(uint256 newTokenPrice);
      event SetNewTokenCap(uint256 newTokenCap);
      event SetNewTimeToBuyInHours(uint256 newTimeToBuyInHours);
      ...
    }
`}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6" id="modifiers">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Modifiers
                      </h2>
                      <p className="mt-1 text-gray-500">
                        The modifiers shown below in the code are used to
                        restrict access to some of the functions. We wrapped the
                        require statements into functions and then used in the
                        modifier to reduce bytecode size. The modifiers are
                        self-explanatory.
                      </p>

                      <ReactMarkdown components={CodeBlock}>
                        {`

    contract ClosedEndFund is CEFToken {
      ...
      // *** MODIFIERS *** //
      function _onlyManager() private view {
          require(msg.sender == manager, "Only allowed for fund manager");
      }

      modifier onlyManager() {
          _onlyManager();
          _;
      }

      function _isWhiteListed(address _address) private view {
          require(
              whiteListedInvestors[_address].whiteListed ||
                  (msg.sender == manager),
              "You are not a white-listed investor nor the manager"
          );
      }

      modifier isWhiteListed(address _address) {
          _isWhiteListed(_address);
          _;
      }

      function _isAuction() private view {
          require(isDutchAuction, "Functions only available for auctions");
      }

      modifier isAuction() {
          _isAuction();
          _;
      }

      function _isWaitingList() private view {
          require(
              !isDutchAuction,
              "Functions only available for waiting list mechanism"
          );
      }

      modifier isWaitingList() {
          _isWaitingList();
          _;
      }
      ...
    }
`}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6" id="dutchauction">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Dutch Auction
                      </h2>
                      <p className="mt-1 text-gray-500">
                        The dutch auction has mainly three functionalities. A
                        qualified investor can start a dutch auction
                        (startAuction), check the price of a particular auction
                        (getAuctionPrice), and make a bid for an auction to buy
                        tokens from other qualified investors (buyAuctionToken).
                        The function buyIssuedAuctionTokensFromManager allows
                        investors to buy issued tokens directly from the fund
                        manager with the price the manager sets for the tokens
                        (tokenPrice). We had to develop two functions to buy
                        directly from the manager, one for contracts based on
                        dutch auctions (buyIssuedAuctionTokensFromManager) and
                        one for funds based on waiting list mechanisms
                        (buyIssuedWaitingListTokensFromManager).
                      </p>
                      <ReactMarkdown components={CodeBlock}>
                        {`

    contract ClosedEndFund is CEFToken {
      ...
      // *** DUTCH AUCTION *** //

      // no restriction buying issued tokens
      function buyIssuedAuctionTokensFromManager(uint256 _amountOfTokens)
          public
          payable
          isWhiteListed(msg.sender)
          isAuction
          returns (uint256 tokenAmount)
      {
          require(msg.value > 0, "Send ETH to buy some tokens");
          require(
              msg.value == _amountOfTokens * tokenPrice,
              "Send right amount of ETH for the tokens"
          );

          // check manager balance
          uint256 managerBalance = this.balanceOf(manager);
          require(
              managerBalance >= _amountOfTokens,
              "Fund manager has not enough tokens in its balance"
          );

          // Transfer token to the buyer
          _transfer(manager, msg.sender, _amountOfTokens);

          // emit the event
          emit BuyTokens(msg.sender, manager, msg.value, _amountOfTokens);

          return _amountOfTokens;
      }

      function startAuction(
          uint256 _amountToSell,
          uint256 _startingPrice,
          uint256 _minimumPrice,
          uint256 _durationInMinutes
      ) public isWhiteListed(msg.sender) isAuction {
          // check amount of tokens
          uint256 sellerBalance = this.balanceOf(msg.sender);
          require(
              sellerBalance >= _amountToSell,
              "Seller has not enough tokens in its balance"
          );

          // initalize auction
          Auction memory newAuction = Auction({
              seller: msg.sender,
              amountToSell: _amountToSell,
              startingPrice: _startingPrice,
              minimumPrice: _minimumPrice,
              startAt: block.timestamp,
              expiresAt: block.timestamp + _durationInMinutes * 1 minutes,
              completed: false
          });

          // push to auction array
          auctions.push(newAuction);
      }

      function getAuctionPrice(uint256 index)
          public
          view
          isAuction
          returns (uint256)
      {
          Auction memory auction = auctions[index]; // access auction
          uint priceGap = auction.startingPrice - auction.minimumPrice;
          return ((auction.startingPrice - (priceGap * (block.timestamp - auction.startAt)/(auction.expiresAt - auction.startAt))))  * auction.amountToSell;
      }

      function buyAuctionToken(uint256 index) external payable isAuction {
          Auction storage auction = auctions[index]; // access auction; storage because need to change variable

          require(!auction.completed, "This auction is completed");
          require(block.timestamp < auction.expiresAt, "This auction has ended");

          uint256 price = getAuctionPrice(index);
          require(
              msg.value >= price,
              "The amount of ETH sent is less than the price of token"
          );

          auction.completed = true; // close auction

          _transfer(auction.seller, msg.sender, auction.amountToSell); // transfer token

          uint256 refund = msg.value - price;
          if (refund > 0) {
              payable(msg.sender).transfer(refund); // refund buyer if payed too much
          }

          payable(auction.seller).transfer(price); // transfer money to seller
      }
      ...
    }
`}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6" id="waitinglist">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Waiting List
                      </h2>
                      <p className="mt-1 text-gray-500">
                        The waiting list is considered when an investor wants to
                        buy tokens from other qualified investors or directly
                        from the manager. The logic to decide whether an
                        investor is in the correct position on the waiting list,
                        so eligible to buy, is predominantly determined by the
                        two helper functions findIndexInArray and
                        checkTimeRestriction. These two functions are explained
                        below in the chapter Helper Functions.
                      </p>
                      <ReactMarkdown components={CodeBlock}>
                        {`

    contract ClosedEndFund is CEFToken {
      ...
      // *** WAITING LIST MECHANISM *** //

      function buyIssuedWaitingListTokensFromManager(uint256 _amountOfTokens)
          public
          payable
          isWhiteListed(msg.sender)
          isWaitingList
          returns (uint256 tokenAmount)
      {
          require(msg.value > 0, "Send ETH to buy some tokens");
          require(
              msg.value == _amountOfTokens * tokenPrice,
              "Send right amount of ETH for the tokens"
          );
          require(
              tokensPerInvestor >= _amountOfTokens,
              "Tokens per investor cap exceeded"
          );

          // check manager balance
          uint256 managerBalance = this.balanceOf(manager);
          require(
              managerBalance >= _amountOfTokens,
              "Fund manager has not enough tokens in its balance"
          );

          // check waiting list position of buyer
          int256 idx = findIndexInArray(msg.sender);
          require(idx >= 0, "Investor is not found in waiting list");

          // check time restriction
          checkTimeRestriction(uint256(idx));

          // after checks: allow to buy

          whiteListedInvestors[msg.sender].timeLastBoughtTokens = block.timestamp;

          // Transfer token to the buyer
          _transfer(manager, msg.sender, _amountOfTokens);

          // emit the event
          emit BuyTokens(msg.sender, manager, msg.value, _amountOfTokens);

          return _amountOfTokens;
      }

      function sellWaitingListToken(uint256 _amountToSell)
          public
          isWhiteListed(msg.sender)
          isWaitingList
      {
          // check amount of tokens
          uint256 sellerBalance = this.balanceOf(msg.sender);
          require(
              sellerBalance >= _amountToSell,
              "Seller has not enough tokens in its balance"
          );

          // initalize selling
          Selling memory newSelling = Selling({
              seller: msg.sender,
              amountToSell: _amountToSell,
              completed: false
          });

          // push to sellings array
          sellings.push(newSelling);
      }

      function buyWaitingListToken(uint256 index, uint256 _amountOfTokens)
          public
          payable
          isWhiteListed(msg.sender)
          isWaitingList
          returns (uint256 tokenAmount)
      {
          Selling storage selling = sellings[index]; // access selling; storage because need to change variable
          require(!selling.completed, "This selling is completed");
          require(
              tokensPerInvestor >= _amountOfTokens,
              "Tokens per investor cap exceeded"
          );
          require(msg.value > 0, "Send ETH to buy some tokens");
          require(
              msg.value == _amountOfTokens * tokenPrice,
              "Send right amount of ETH for the tokens"
          );

          // check investors balance
          uint256 sellerBalance = this.balanceOf(selling.seller);
          require(
              sellerBalance >= _amountOfTokens,
              "Seller has not enough tokens (anymore) in its balance"
          );

          // check waiting list position
          int256 idx = findIndexInArray(msg.sender);
          require(idx >= 0, "Investor is not found in waiting list");

          // check time restriction
          checkTimeRestriction(uint256(idx));

          // after checks: allow to buy

          // set time of buying for investor
          whiteListedInvestors[msg.sender].timeLastBoughtTokens = block.timestamp;

          // set completed to true if all tokens are sold
          selling.amountToSell -= _amountOfTokens;
          if (selling.amountToSell <= 0) {
              selling.completed = true;
          }

          _transfer(selling.seller, msg.sender, _amountOfTokens); // Transfer token to the buyer

          emit BuyTokens(msg.sender, selling.seller, msg.value, _amountOfTokens); // emit the event

          payable(selling.seller).transfer(msg.value); // transfer (exact) money to seller

          return (_amountOfTokens);
      }
      ...
    }
`}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6" id="corporateactions">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Corporate Actions
                      </h2>
                      <p className="mt-1 text-gray-500">
                        The functionalites of the corporate actions are
                        descriped in the table below.
                      </p>
                      <div className="mt-8 mb-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Functions
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {corporateactions.map((action) => (
                                    <tr key={action.name}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {action.name}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {action.description}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ReactMarkdown components={CodeBlock}>
                        {`

    contract ClosedEndFund is CEFToken {
      ...
      // *** Corporate Actions *** //

      // manager can withdraw to invest
      function withdraw() public onlyManager {
          uint256 contractBalance = address(this).balance;
          require(contractBalance > 0, "Contract has no balance to withdraw");
          payable(msg.sender).transfer(contractBalance);
      }

      // add investor to white-list
      function addInvestor(address _addressToWhitelist) public onlyManager {
          require(
              !whiteListedInvestors[_addressToWhitelist].whiteListed,
              "Already white listed"
          );
          whiteListedInvestors[_addressToWhitelist].whiteListed = true;
          waitingList.push(_addressToWhitelist);
      }

      // remove investor from white-list
      function removeInvestor(address _addressToBlacklist) public onlyManager {
          require(
              whiteListedInvestors[_addressToBlacklist].whiteListed,
              "Already black listed"
          );
          whiteListedInvestors[_addressToBlacklist].whiteListed = false; // kind of blacklist; not really removed

          // remove from waiting list in an ordered way
          int256 index = findIndexInArray(_addressToBlacklist);
          require(index >= 0, "Investor is not found in waiting list");
          for (uint256 i = uint256(index); i < waitingList.length - 1; i++) {
              waitingList[i] = waitingList[i + 1];
          }
          delete waitingList[waitingList.length - 1];
      }

      // capital call
      function mintNewTokens(uint256 _amountOfTokens)
          public
          onlyManager
          returns (uint256)
      {
          _mint(manager, _amountOfTokens); // mint new tokens
          emit CapitalCall(_amountOfTokens); // emit the event
          return _amountOfTokens;
      }

      // set new token price
      function setTokenPrice(uint256 _newTokenPrice) 
          public 
          onlyManager 
          returns (uint256) 
      {
          tokenPrice = _newTokenPrice; // set new token price
          emit SetNewTokenPrice(tokenPrice); // emit the event
          return tokenPrice;
      }

      // set new token per investor
      function setTokenPerInvestor(uint256 _newTokenCap)
          public
          onlyManager
          returns (uint256)
      {
          tokensPerInvestor = _newTokenCap; // set new token price
          emit SetNewTokenCap(tokenPrice); // emit the event
          return tokensPerInvestor;
      }

      // set new time slot 
      function setTimeSlot(uint256 _NewTimeToBuyInHours)
          public 
          onlyManager 
          returns (uint256) 
      {
          timeToBuyInHours = _NewTimeToBuyInHours; // set new token price
          emit SetNewTimeToBuyInHours(timeToBuyInHours); // emit the event
          return timeToBuyInHours;
      }
      ...
    }
`}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6" id="helper">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Helper Functions
                      </h2>
                      <p className="mt-1 text-gray-500">
                        The two helper functions findIndexInArray and
                        checkTimeRestriction are used to determine if an
                        investor is in the correct waiting list position and,
                        therefore, allowed to buy. The idea behind it is to
                        check where the index of the investor on the waiting
                        list is and then compare it with time components. In
                        order to avoid shifting the waiting list array, the
                        modulo operator is used. The getSummary function is a
                        helper function for simplifying the front-end. It allows
                        to fetch all the information from a single contract.
                      </p>
                      <ReactMarkdown components={CodeBlock}>
                        {`

    contract ClosedEndFund is CEFToken {
      ...
      //*** Helper ***//

      function findIndexInArray(address _investor)
          public
          view
          isWaitingList
          returns (int256)
      {
          for (uint256 i = 0; i < waitingList.length; i++) {
              if (waitingList[i] == _investor) {
                  return int256(i);
              }
          }
          return -1;
      }

      function checkTimeRestriction(uint256 idx)
          public
          view
          isWaitingList
      {
          uint256 timeEnd = startDate +
              timeToBuyInHours *
              60 *
              60 *
              waitingList.length; // end time of array calculated from startDate (one circle)

          uint256 timeNow = (block.timestamp - startDate)%(timeEnd-startDate)+startDate; // time now calculated with modulo

          uint256 timeToBuyStart = startDate +
              (uint256(idx)) *
              timeToBuyInHours *
              60 *
              60; // time to buy: slot start for investor

          uint256 timeToBuyEnd = startDate +
              (uint256(idx) + 1) *
              timeToBuyInHours *
              60 *
              60; // time to buy: slot end for investor
          
          // check if investor bought in the last x hours
          require(
              !(whiteListedInvestors[msg.sender].timeLastBoughtTokens > block.timestamp - timeToBuyInHours * 60 * 60),
              "Investor bought tokens already. Wait until your next turn"
          );

          // if investor still needs to wait
          require(
              !(timeToBuyStart > timeNow),
              "Investors needs to wait. It's too early to buy."
          );

          // if investor is too late
          require(
              !(timeNow > timeToBuyEnd),
              "Investors needs to wait. It's too late to buy."
          );
      }

      function getSummary()
          public
          view
          returns (
              address,
              string memory,
              string memory,
              uint256,
              uint256,
              uint256,
              uint256,
              bool,
              address[] memory,
              Auction[] memory,
              Selling[] memory
          )
      {
          return (
              manager,
              title,
              description,
              tokenPrice,
              tokensPerInvestor,
              timeToBuyInHours,
              startDate,
              isDutchAuction,
              waitingList, // incl. white-listed investors
              auctions,
              sellings
          );
      }

      //*** ERC20 OVERRIDE ***//

      // override to avoid transfering shares outside of fund
      function transfer(address _recipient, uint256 _amount)
          public
          override
          onlyManager
          returns (bool)
      {
          _transfer(msg.sender, _recipient, _amount);
          return true;
      }

      function approve(address spender, uint256 amount)
          public
          override
          onlyManager
          returns (bool)
      {
          _approve(msg.sender, spender, amount);
          return true;
      }
    }
`}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="mt-6" id="frontend">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Front-End
                      </h2>
                      <p className="mt-1 text-gray-500">
                        The front-end is the web application that allows the
                        investor and the manager to interact with the contracts
                        in user friendly way. The framework we used is Nextjs.
                        Additionally, we injected Web3 library to connect with
                        the blockchain. Fetching the smart contracts and
                        deploying them works. When it comes to the management of
                        the funds, we decided not to implement the
                        functionalities, as the visitors at the Gala Event will
                        not be able to trade the tokens. Instead, we implemented
                        the funds pre-filled pages for a fund with a dutch
                        auction and a fund based on a waiting list mechanism.
                        These funds appear in the exploration section, as soon
                        as the front-end sees that no Metamask connection is
                        established.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6" id="credits">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Credits & Disclosure
                      </h2>
                      <p className="mt-1 text-gray-500">
                        To learn Solidity and the concepts behind it we attended
                        the class from Prof. Dr. Fabian Schär "Smart Contracts
                        and Decentralized Blockchain Applications" and a course
                        on Udemy "Ethereum and Solidity: The Complete
                        Developer's Guide" by Stephen Grider. Concepts like
                        "Factory", "getSummary" and how to implement a front-end
                        with Nextjs were demonstrated in the Udemy course.
                        Concepts like block.timestamp was demonstrated in Prof.
                        Dr. Fabian Schär's course. Implementation of the code
                        are original from the CSAM team. We are not aware of any
                        copies. We are not aware of any third party code, except
                        for the credits below.
                      </p>
                      <div className="mt-8 mb-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Topic
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                      Link
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {credits.map((credit) => (
                                    <tr key={credit.name}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {credit.topic}
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <a href={credit.link}>{credit.link}</a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
