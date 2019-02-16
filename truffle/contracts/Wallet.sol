pragma solidity ^0.5.0;

/**
 * Smart contract que representa una billetera virtual
 */
contract Wallet {
    mapping (address => int256) public wallet;

    function put(int256 howMuch) public {
        int256 money = wallet[msg.sender];  // por defecto es 0
        money = money + howMuch;
        wallet[msg.sender] = money;
    }

    function withdraw(int256 howMuch) public {
        this.put(howMuch * (-1));
    }

    // TODO: no permitir que howMuch sea negativo en ninguno de los casos
    // TODO 2: no se puede sacar de la billetera más de lo que tiene

}