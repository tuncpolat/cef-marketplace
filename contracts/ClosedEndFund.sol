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
    bool public isDutchAuction; // decide whether it's a dutch auction or waiting list mechanism
    mapping(address => bool) public whiteListedInvestors; // white-listed investors

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

    // *** EVENTS *** //

    event BuyInitialTokens(
        address buyer,
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
            whiteListedInvestors[_address],
            "You are not a white-listed investor"
        );
        _;
    }

    modifier isAuction() {
        require(isDutchAuction, "Functions only available for auctions");
        _;
    }

    constructor(
        string memory _title,
        string memory _description,
        uint256 _tokenPrice,
        uint256 _initialSupply,
        uint256 _tokensPerInvestor,
        bool _isDutchAuction,
        address[] memory _whiteListedInvestors
    ) CEFToken(_initialSupply) {
        manager = msg.sender;
        title = _title;
        description = _description;
        tokenPrice = _tokenPrice;
        tokensPerInvestor = _tokensPerInvestor;
        isDutchAuction = _isDutchAuction;

        // add investors to mapping
        for (uint256 i = 0; i < _whiteListedInvestors.length; i++) {
            address whiteListedInvestor = _whiteListedInvestors[i];
            whiteListedInvestors[whiteListedInvestor] = true;
        }
    }

    // *** STO & Transfer *** //

    function buyInitialTokens(uint256 _amountOfTokens)
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
        emit BuyInitialTokens(msg.sender, msg.value, _amountOfTokens);

        return _amountOfTokens;
    }

    // manager can withdraw to invest (other idea, pay directly through contract)
    function withdraw() public onlyManager {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance to withdraw");
        payable(msg.sender).transfer(contractBalance);
    }

    // *** WHITELIST *** //

    function addInvestor(address _addressToWhitelist) public onlyManager {
        whiteListedInvestors[_addressToWhitelist] = true;
    }

    function removeInvestor(address _addressToBlacklist) public onlyManager {
        whiteListedInvestors[_addressToBlacklist] = false; // kind of blacklist; not really removed
    }

    function verifyInvestor(address _whitelistedAddress)
        public
        view
        returns (bool)
    {
        bool investorIsWhitelisted = whiteListedInvestors[_whitelistedAddress];
        return investorIsWhitelisted;
    }

    // *** Corporate Actions *** //

    // capital call
    function mintNewTokens(uint256 _amountOfTokens) public returns (uint256) {
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

        _transfer(auction.seller, msg.sender, auction.amountToSell); // transfer token (re-entrancy attack danger?) + if balance to enough transfer aborted

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
*/
