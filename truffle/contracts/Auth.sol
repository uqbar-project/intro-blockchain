// SPDX-License-Identifier: GPL-3.0-or-later

// pragma solidity ^0.8.14;
pragma experimental ABIEncoderV2;

contract Auth {
    mapping(string => User) public users;

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

    // Login al sistema, si funciona ok devuelve la dirección de la persona
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
