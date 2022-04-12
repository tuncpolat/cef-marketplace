// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CEFToken is ERC20 {
    constructor(uint256 initialSupply) payable ERC20("CEF TOKEN", "CEF") {
        _mint(msg.sender, initialSupply);
    }
}

contract ClosedEndFund {
    address public manager; // address of the fund manager
    string public title; // name of the fund
    string public description; // description of the fund
    uint256 public tokenPrice; // token price in WEI
    uint256 public tokensPerInvestor; // limit of buyable tokens in one transaction per investor

    event BuyInitialTokens(
        address buyer,
        uint256 amountOfETH,
        uint256 amountOfTokens
    );

    constructor(
        string memory _title,
        string memory _description,
        uint256 _tokenPrice,
        uint256 _initialSupply,
        uint256 _tokensPerInvestor
    ) CEFToken(_initialSupply) {
        manager = msg.sender;
        title = _title;
        description = _description;
        tokenPrice = _tokenPrice;
        tokensPerInvestor = _tokensPerInvestor;
    }

    function buyInitialTokens(uint256 _amountOfTokens)
        public
        payable
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
    function withdraw() public {
        require(
            msg.sender == manager,
            "Withdraw only allowed for fund manager"
        );
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance to withdraw");
        payable(msg.sender).transfer(contractBalance);
    }

    // return contract balance
    function balance() public view returns (uint256) {
        return address(this).balance;
    }
}
