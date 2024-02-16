// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.24;
// pragma experimental ABIEncoderV2;

contract Auth {
    mapping(string => User) public users;

    // Versiones más nuevas requieren un constructor vacío o va a tirar un error
    // críptico "TransactionExecutionError: An unknown RPC error occurred"
    constructor() payable {}

    struct User {
        string name;
        string password;
        address wallet_address;
        // Operación más barata para determinar si un usuario existe
        bool existing;
    }

    // Permite registrar un usuario al sistema
    function register(User memory user) public {
        require(!users[user.name].existing, "User already registered");
        user.existing = true;
        users[user.name] = user;
    }

    // Login al sistema, devuelve si funciona ok/nok
    function login(string memory name, string memory password) public view returns (bool) {
        User memory user = users[name];
        return user.existing && 
            keccak256(abi.encodePacked(user.password)) ==
                keccak256(abi.encodePacked(password));
    }

    function exists(string memory name) public view returns (bool) {
        return users[name].existing;
    }

    function get_address(string memory name) public view returns (address) {
        return users[name].wallet_address;
    }
}
