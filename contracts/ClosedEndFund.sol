// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

/**
 * @title Closed-End Fund
 * @dev Tunç Polat
 **/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CEFToken is ERC20 {
    constructor(uint256 initialSupply) payable ERC20("CEF TOKEN", "CEF") {
        _mint(msg.sender, initialSupply);
    }
}

contract ClosedEndFund is CEFToken {
    // *** VARIABLES *** //

    address public manager; // address of the fund manager
    string public title; // name of the fund
    string public description; // description of the fund
    uint256 public tokenPrice; // in WEI
    uint256 public tokensPerInvestor; // tokens that investor can buy at once
    uint256 public timeToBuyInHours; // time frame to buy tokens
    uint256 public startDate; // start date when CA is deployed
    bool public isDutchAuction; // decide whether it's a dutch auction or waiting list mechanism
    address[] public waitingList;

    // *** STRUCT *** //
    struct Auction {
        address seller; // addres of seller
        uint256 amountToSell; // amount of tokens to sell
        uint256 startingPrice; // startin price of auction
        uint256 discountPerMinute; // discount per minute in WEI
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
        bool whiteListed;
        bool allowToBuy;
        bool boughtTokens;
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

    // *** MODIFIERS *** //

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Withdraw only allowed for fund manager"
        );
        _;
    }

    modifier isWhiteListed(address _address) {
        require(
            whiteListedInvestors[_address].whiteListed,
            "You are not a white-listed investor"
        );
        _;
    }

    modifier isAuction() {
        require(isDutchAuction, "Functions only available for auctions");
        _;
    }

    modifier isWaitingList() {
        require(
            !isDutchAuction,
            "Functions only available for waiting list mechanism"
        );
        _;
    }

    constructor(
        string memory _title,
        string memory _description,
        uint256 _tokenPrice,
        uint256 _initialSupply,
        uint256 _tokensPerInvestor,
        bool _isDutchAuction,
        uint256 _timeToBuyInHours,
        address[] memory _whiteListedInvestors
    ) CEFToken(_initialSupply) {
        manager = msg.sender;
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
            whiteListedInvestors[whiteListedInvestor].allowToBuy = true;
        }
    }

    // *** STO & Transfer *** //

    function issue(uint256 _amountOfTokens)
        public
        payable
        isWhiteListed(msg.sender)
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

        // Transfer token to the msg.sender
        _transfer(manager, msg.sender, _amountOfTokens);

        // emit the event
        emit BuyTokens(msg.sender, manager, msg.value, _amountOfTokens);

        return _amountOfTokens;
    }

    // function redeem()

    // manager can withdraw to invest (other idea, pay directly through contract)
    function withdraw() public onlyManager {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance to withdraw");
        payable(msg.sender).transfer(contractBalance);
    }

    // *** WHITELIST *** //

    function addInvestor(address _addressToWhitelist) public onlyManager {
        require(
            !whiteListedInvestors[_addressToWhitelist].whiteListed,
            "Already white listed"
        );
        whiteListedInvestors[_addressToWhitelist].whiteListed = true;
        whiteListedInvestors[_addressToWhitelist].allowToBuy = true;
    }

    function removeInvestor(address _addressToBlacklist) public onlyManager {
        require(
            whiteListedInvestors[_addressToBlacklist].whiteListed,
            "Already black listed"
        );
        whiteListedInvestors[_addressToBlacklist].whiteListed = false;
        whiteListedInvestors[_addressToBlacklist].allowToBuy = false; // kind of blacklist; not really removed

        // remove from waiting list in an ordered way
        int256 index = findIndexInArray(_addressToBlacklist);
        require(index >= 0, "Investor is not found in waiting list");
        for (uint256 i = uint256(index); i < waitingList.length - 1; i++) {
            waitingList[i] = waitingList[i + 1];
        }
        delete waitingList[waitingList.length - 1];
    }

    function verifyInvestor(address _whitelistedAddress)
        public
        view
        returns (bool)
    {
        bool investorIsWhitelisted = whiteListedInvestors[_whitelistedAddress]
            .whiteListed;
        return investorIsWhitelisted;
    }

    // *** Corporate Actions *** //

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
    function setTokenPrice(uint256 _newTokenPrice) public returns (uint256) {
        tokenPrice = _newTokenPrice; // set new token price
        emit SetNewTokenPrice(tokenPrice); // emit the event
        return tokenPrice;
    }

    // set new token per investor
    function setTokenPerInvestor(uint256 _newTokenCap)
        public
        returns (uint256)
    {
        tokensPerInvestor = _newTokenCap; // set new token price
        emit SetNewTokenCap(tokenPrice); // emit the event
        return tokensPerInvestor;
    }

    // *** WAITING LIST MECHANISM *** //

    // why selling like this? CSAM needs money, so Investor can't really rely on CA, that it has always enough money + not possible in approve to use CA

    function sellToken(uint256 _amountToSell) public {
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

    function buyWLToken(uint256 index, uint256 _amountOfTokens)
        public
        payable
        isWhiteListed(msg.sender)
        isWaitingList
        returns (uint256 tokenAmount)
    {
        Selling storage selling = sellings[index]; // access selling; storage because need to change variable
        require(!selling.completed, "This selling is completed");
        require(
            tokensPerInvestor > _amountOfTokens,
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

        uint256 timeNow = block.timestamp;
        uint256 timeEnd = startDate +
            timeToBuyInHours *
            60 *
            60 *
            waitingList.length; //
        uint256 timeToBuyEnd = startDate +
            (uint256(idx) + 1) *
            timeToBuyInHours *
            60 *
            60; // time to buy in seconds
        uint256 timeToBuyStart = startDate +
            (uint256(idx)) *
            timeToBuyInHours *
            60 *
            60; // time to buy in seconds

        // time is up for all investors
        if (timeNow > timeEnd) {
            startDate = timeNow; // reset time

            // reset bought tokens to false again, so investors can start from beginning
            for (uint256 i = 0; i < waitingList.length; i++) {
                address investorAddress = waitingList[i];
                whiteListedInvestors[investorAddress].boughtTokens = false;
            }
        }

        // if investor still need to wait
        require(
            !(timeToBuyStart > timeNow),
            "Investors needs to wait. It's too early to buy."
        );

        // if investor is too late
        require(
            !(timeNow > timeToBuyEnd),
            "Investors needs to wait. It's too late to buy."
        );

        // else: allow to buy tokens

        // set investor as already bought, so he can't buy more than once in his time frame
        require(
            !whiteListedInvestors[msg.sender].boughtTokens,
            "Investor bought tokens already. Wait until your next turn"
        );
        whiteListedInvestors[msg.sender].boughtTokens = true;

        // set completed to true if all tokens are sold
        selling.amountToSell -= _amountOfTokens;
        if (selling.amountToSell <= 0) {
            selling.completed = true;
        }

        _transfer(selling.seller, msg.sender, _amountOfTokens); // Transfer token to the msg.sender

        emit BuyTokens(msg.sender, selling.seller, msg.value, _amountOfTokens); // emit the event

        payable(selling.seller).transfer(msg.value); // transfer (exact) money to seller

        return (_amountOfTokens);
    }

    // *** DUTCH AUCTION *** //
    function startAuction(
        uint256 _amountToSell,
        uint256 _startingPrice,
        uint256 _discountPerMinute,
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
            discountPerMinute: _discountPerMinute,
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
        uint256 timeElapsed = block.timestamp - auction.startAt; // UNIX; Differnce of 60 = 1 minute
        uint256 discount = (auction.discountPerMinute * timeElapsed) / 60;
        return auction.startingPrice - discount;
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

        _transfer(auction.seller, msg.sender, auction.amountToSell); // transfer token (re-entrancy attack danger?) + if balance to enough transfer aborted (no-double spending)

        uint256 refund = msg.value - price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund); // refund buyer if payed too much
        }

        payable(auction.seller).transfer(price); // transfer money to seller
    }
}

/*
Credits:
https://dev.to/stermi/how-to-create-an-erc20-token-and-a-solidity-vendor-contract-to-sell-buy-your-own-token-4j1m
https://ethereum.stackexchange.com/questions/68759/buytoken-function-with-erc20-interface
Whitelist: https://dev.to/emanuelferreira/how-to-create-a-smart-contract-to-whitelist-users-57ki
Dutch Auction: https://www.quicknode.com/guides/solidity/how-to-create-a-dutch-auction-smart-contract
FindIndexInArray: https://ethereum.stackexchange.com/questions/121913/get-index-of-element-in-array
Delete Element in Array: https://ethereum.stackexchange.com/questions/1527/how-to-delete-an-element-at-a-certain-index-in-an-array
*/
