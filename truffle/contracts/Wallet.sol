pragma solidity ^0.5.0;

/**
 * Smart contract que representa una billetera virtual
 */
contract Wallet {
    // mapa
    //   clave => una dirección de Ethereum que representa una persona física
    //   valor => $$$ que tiene
    mapping (address => int256) public wallet;

    // validación general para poner o sacar
    modifier positive(int256 value) {
        require(value > 0, "Value must be positive");
        _;
    }

    // poner plata en la billetera
    function put(address owner, int256 howMuch) public positive(howMuch) {
        int256 money = wallet[owner];  // por defecto es 0
        money = money + howMuch;
        wallet[owner] = money;
    }

    // sacar plata de la billetera
    function withdraw(address owner, int256 howMuch) public positive(howMuch) {
        int256 money = wallet[owner];  // por defecto es 0
        require(money >= howMuch, "Not enough cash");
        money = money - howMuch;
        wallet[owner] = money;
    }

    function balance(address owner) public view returns(int256) {
        return wallet[owner];
    }
}