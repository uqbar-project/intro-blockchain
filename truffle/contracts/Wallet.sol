pragma solidity ^0.5.0;

contract Wallet {
    int256 public money = 0;

    function put(int howMuch) public {
        money = money + howMuch;
    }

    function withdraw(int howMuch) public {
        money = money - howMuch;
    }

}