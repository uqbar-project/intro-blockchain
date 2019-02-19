
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

```js
pragma solidity ^0.5.0;

/**
 * Smart contract que representa una billetera virtual
 */
contract Wallet {
    // mapa
    //   clave => una dirección de Ethereum que representa una persona física
    //   valor => $$$ que tiene
    // wallet es el nombre de la variable con visibilidad pública
    mapping (address => int256) public wallet;

    modifier positive(int256 value) {
        require(value > 0, "El valor a sacar o poner en la billetera debe ser positivo");
        _;  // delegamos la ejecución a la función que la llamó
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

Algunas observaciones:

* un smart contract tiene ciertas similitudes con una clase, tiene estructura interna y comportamiento definido a partir de funciones
* en nuestro caso, el dinero que tiene cada persona se almacena en un mapa que relaciona _address_ con un entero que admite negativos. Pueden ver [la lista de tipos que admite Solidity](https://solidity.readthedocs.io/en/latest/types.html). Fíjense que hay una gran cantidad de tipos de dato asociados a números: fixed, ufixed, int256, uint256, int8, int128, etc. y esto tiene que ver con a) el almacenamiento, b) el procesamiento ya que la Virtual Machine nos cobrará más por operaciones que involucren datos más voluminosos que otros.
* una consecuencia negativa de esto es que el lenguaje está pensado para optimizar el procesamiento: entonces cuando quiero sacar plata y no tengo suficiente efectivo, el mensaje de error es menos representativo de lo que nos gustaría: "No tiene suficiente efectivo". Para mostrar la cantidad de efectivo que tenemos, necesitamos concatenar ese valor con un mensaje de error, y a) solidity no tiene por el momento una operación de concatenación de strings, b) eso obedece a que es una operación costosa, que penaliza a quien envió el mensaje con más gas. Debemos entender esto en el contexto de una base descentralizada, que corre en cientos de miles de nodos con una capacidad de procesamiento acotada.
* cuando ponemos o sacamos plata, no queremos recibir un valor negativo para ese tipo de operaciones. Lo interesante es que Solidity provee un **modifier**, un decorador que se puede incorporar a una función y que ejecuta código antes o después de ella. Los guiones bajos (`_;`) en el modificador delegan la ejecución a la función que la llamó. Esto permite que escribamos primero alguna validación, o hagamos algo posteriormente.
* también es interesante la función `require` que es similar al `assert` de algunos frameworks, una forma declarativa de escribir una condición que queremos cumplir y un mensaje de error por el cual salir si esa condición no se satisface

## Testeo de nuestra billetera

### Definición de casos de prueba

Algunas pruebas que podemos hacer

* para probar el retiro de una billetera,
  * con una billetera de 100 pesos,
    * el caso feliz: retiramos 20 y nos quedan 80
    * el caso borde: retiramos 100 y nos queda 0
    * el caso borde 2: retiramos 0, esperamos un error
    * el caso inválido 1: queremos retirar -10, esperamos un error
    * el caso inválido 2: queremos retirar 120, esperamos un error
* para probar poner plata en una billetera,
  * con una billetera de 100 pesos,
    * el caso feliz: ponemos 200 y nos quedan 300
    * el caso borde: ponemos 0, esperamos un error
    * el caso inválido: queremos poner -10, esperamos un error

### Implementación



## Deploy

### Generando el Script

### 

# Otros tutoriales

https://www.codementor.io/swader/developing-for-ethereum-getting-started-with-ganache-l6abwh62j
https://rubygarage.org/yblog/ethereum-smart-contract-tutorial