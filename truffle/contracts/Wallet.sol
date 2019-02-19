pragma solidity ^0.5.0;

/**
 * Smart contract que representa una billetera virtual
 */
contract Wallet {
    // mapa
    //   clave => una dirección de Ethereum que representa una persona física
    //   valor => $$$ que tiene
    mapping (address => int256) public wallet;

    modifier positive(int256 value) {
        require(value > 0, "El valor a sacar o poner en la billetera debe ser positivo");
        _;
    }

    // poner plata en la billetera
    function put(int256 howMuch) public positive(howMuch) {
        int256 money = wallet[msg.sender];  // por defecto es 0
        money = money + howMuch;
        wallet[msg.sender] = money;
    }

    // sacar plata de la billetera
    function withdraw(int256 howMuch) public positive(howMuch) {
        int256 money = wallet[msg.sender];  // por defecto es 0
        require(money >= howMuch, "No hay suficiente efectivo");
            // podríamos pensar que le falta decir cuánto hay de efectivo, 
            // 1) solidity no trae todavía funciones para concatenar strings
            // 2) deberíamos utilizar alguna biblioteca como 
            //    https://stackoverflow.com/questions/32157648/string-concatenation-in-solidity
            // 3) pero lo más importante, es una operación que consume gas, por lo tanto
            //    hay que tener en cuenta pros y contras: mensaje representativo vs. un contrato
            //    que requiere más dinero para ejecutarse
            // De la misma manera si bien estamos reutilizando la función put, hay una línea
            // duplicada en withdraw y en put, la que se fija cuál es el valor actual de la billetera
        this.put(howMuch * (-1));
    }

}