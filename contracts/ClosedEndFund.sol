// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

contract ClosedEndFund {
    address public manager; // address of the fund manager
    string public name; // name of the fund
    string public description; // description of the fund

    constructor(string memory _name, string memory _description) {
        manager = msg.sender;
        name = _name;
        description = _description;
    }
}
