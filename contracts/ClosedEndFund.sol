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

    constructor(
        string memory _title,
        string memory _description,
        uint256 _initialSupply
    ) CEFToken(_initialSupply) {
        manager = msg.sender;
        title = _title;
        description = _description;
    }
}
