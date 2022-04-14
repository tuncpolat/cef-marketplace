// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Closed-End Fund
 * @dev Tunç Polat
 **/

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol"; //"@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol"; // debug

contract CEFToken is ERC20 {
    constructor(uint256 initialSupply) payable ERC20("CEF TOKEN", "CEF") {
        _mint(msg.sender, initialSupply);
    }
}

contract ClosedEndFund is CEFToken {
    address public manager; // address of the fund manager
    string public title; // name of the fund
    string public description; // description of the fund
    uint256 public tokenPrice; // in WEI
    uint256 public tokensPerInvestor; // tokens that investor can buy at once
    mapping(address => bool) whiteListedInvestors; // white-listed investors

    event BuyInitialTokens(
        address buyer,
        uint256 amountOfETH,
        uint256 amountOfTokens
    );

    // *** MODIFIERS ***

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

    constructor(
        string memory _title,
        string memory _description,
        uint256 _tokenPrice,
        uint256 _initialSupply,
        uint256 _tokensPerInvestor,
        address[] memory _whiteListedInvestors
    ) CEFToken(_initialSupply) {
        manager = msg.sender;
        title = _title;
        description = _description;
        tokenPrice = _tokenPrice;
        tokensPerInvestor = _tokensPerInvestor;

        // add investors to mapping
        for (uint256 i = 0; i < _whiteListedInvestors.length; i++) {
            address whiteListedInvestor = _whiteListedInvestors[i];
            whiteListedInvestors[whiteListedInvestor] = true;
        }
    }

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
}

/*
Credits:
https://dev.to/stermi/how-to-create-an-erc20-token-and-a-solidity-vendor-contract-to-sell-buy-your-own-token-4j1m
https://ethereum.stackexchange.com/questions/68759/buytoken-function-with-erc20-interface
Whitelist: https://dev.to/emanuelferreira/how-to-create-a-smart-contract-to-whitelist-users-57ki
*/
