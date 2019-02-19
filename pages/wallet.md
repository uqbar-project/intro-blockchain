
# Primer ejemplo de Smart Contract: una billetera virtual

Asumimos que previamente [instalaste el entorno Ethereum](startupEthereumLocal.md). Si no es así te recomendamos que lo hagas.

Nuestro primer ejemplo será muy sencillo, una billetera virtual (una extensión de un ejemplo anterior que quizás hayan visto, el monedero). La billetera registra de cada persona cuánta plata tiene, y admite dos operaciones:

* poner plata en la billetera
* sacar plata

por el momento dejamos afuera la posibilidad de hacer transacciones con otras personas.

A partir de aquí desarrollaremos

* Entorno de desarrollo
  * Lenguaje Solidity
  * IDE: Visual Studio + plugin
* Primer smart contract

## Entorno de desarrollo

### El lenguaje del smart contract

Utilizaremos el lenguaje **Solidity** que es el más estable en la comunidad, y que tiene muchas reminiscencias de javascript. Toda la documentación se accede a partir de [este link]((https://solidity.readthedocs.io/)).

### IDE

La propuesta oficial de Ethereum es trabajar con un IDE online llamado [Remix](https://remix.ethereum.org/#optimize=false), aunque hay que decir que es bastante limitado. Entonces nuestro consejo es que trabajes con

* [Visual Studio Code](https://code.visualstudio.com/)
* con el plugin [Solidity](https://github.com/juanfranblanco/vscode-solidity)

De hecho, [es la configuración que sugiere Truffle](https://truffleframework.com/tutorials/configuring-visual-studio-code).

## Ahora sí, nuestro primer smart contract

Veamos el código

```sol
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
        this.put(howMuch * (-1));
    }

}
```

https://www.codementor.io/swader/developing-for-ethereum-getting-started-with-ganache-l6abwh62j


https://rubygarage.org/yblog/ethereum-smart-contract-tutorial