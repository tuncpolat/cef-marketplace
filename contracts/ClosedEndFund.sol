// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Closed-End Fund
 * @dev Tunç Polat
 **/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CEFFactory {
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

contract CEFToken is ERC20 {
    constructor(address _manager, uint256 initialSupply)
        ERC20("CEF TOKEN", "CEF")
    {
        _mint(_manager, initialSupply);
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
        require(msg.sender == manager, "Only allowed for fund manager");
        _;
    }

    modifier isWhiteListed(address _address) {
        require(
            whiteListedInvestors[_address].whiteListed ||
                (msg.sender == manager),
            "You are not a white-listed investor nor the manager"
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
            whiteListedInvestors[whiteListedInvestor].allowToBuy = true;
        }
    }

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
        bool checkedTimeRestriction = checkTimeRestriction(uint256(idx));
        require(
            checkedTimeRestriction,
            "It is too late for all investors; reset time"
        );

        // set investor as already bought, so she can't buy more than once in her time frame
        require(
            !whiteListedInvestors[msg.sender].boughtTokens,
            "Investor bought tokens already. Wait until your next turn"
        );
        whiteListedInvestors[msg.sender].boughtTokens = true;

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
        bool checkedTimeRestriction = checkTimeRestriction(uint256(idx));
        require(
            checkedTimeRestriction,
            "It is too late for all investors; reset time"
        );

        // check if investor bought already in own time frame
        require(
            !whiteListedInvestors[msg.sender].boughtTokens,
            "Investor bought tokens already. Wait until your next turn"
        );

        // after checks: allow to buy

        // set investor as already bought, so she can't buy more than once in her time frame
        whiteListedInvestors[msg.sender].boughtTokens = true;

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

    // helper functions
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
        isWaitingList
        returns (bool)
    {
        uint256 timeNow = block.timestamp;
        uint256 timeEnd = startDate +
            timeToBuyInHours *
            60 *
            60 *
            waitingList.length;
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

            return false;
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

        return true;
    }

    // *** Manager *** //

    // Demonstration Purpose Only (in prod not possible)
    function buyFromManager(uint256 _amountOfTokens)
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

    // manager can withdraw to invest
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
        waitingList.push(_addressToWhitelist);
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

    //*** ERC20 OVERRIDE ***//
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

    //*** Helper ***//

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
}

/***
Disclosure: 
To learn Solidity and the concepts behind it we attended the class from Fabian Schär "Smart Contracts and Decentralized Blockchain Applications" and a course on Udemy "Ethereum and Solidity: The Complete Developer's Guide" by Stephen Grider. 
Concepts like "Factory", "getSummary" and how to implement a front-end with Nextjs were demonstrated in the Udemy course. Concepts like block.timestamp was demonstrated in Fabian Schär's course. 
Idea and the code are original from the group work. We are not aware of any copies. We are not aware of any third party code, except for the credits below.

Credits:
Buying & Selling: https://dev.to/stermi/how-to-create-an-erc20-token-and-a-solidity-vendor-contract-to-sell-buy-your-own-token-4j1m
Buying & Selling: https://ethereum.stackexchange.com/questions/68759/buytoken-function-with-erc20-interface
Whitelist: https://dev.to/emanuelferreira/how-to-create-a-smart-contract-to-whitelist-users-57ki
Dutch Auction: https://www.quicknode.com/guides/solidity/how-to-create-a-dutch-auction-smart-contract
Find Index in Array: https://ethereum.stackexchange.com/questions/121913/get-index-of-element-in-array
Delete Element in Array: https://ethereum.stackexchange.com/questions/1527/how-to-delete-an-element-at-a-certain-index-in-an-array
Fractionability: https://ethereum.stackexchange.com/questions/101876/how-to-transfer-a-fraction-of-erc20-token
****/
