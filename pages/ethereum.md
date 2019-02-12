# Ethereum

[Ethereum](https://www.ethereum.org/) es una plataforma open-source que soporta  _smart contracts_ entre pares siguiendo el modelo de Blockchain.

A continuación vamos a contar los principales conceptos de esta arquitectura:

* objetivo principal
  * smart contract
  * transacción
* nodos
  * mineros 
  * ejecutores de contratos, Ethereum Virtual Machine
* ether, gas, medida
* transacción, bloque, blockchain
* proof of work / proof of stake
* repaso del circuito de una transacción en la blockchain

## Objetivo principal de la blockchain

Los objetivos de Ethereum son descentralizar la web, eliminando intermediarios y organismos reguladores. Por lo tanto la arquitectura tiene un esquema _peer-to-peer_, donde cada nodo tiene la misma importancia que los demás en una red Ethereum (en lugar de tener un servidor como fuente central de información).

Un smart contract define una relación contractual entre pares, que se instancia mediante un mensaje o **transacción**. Algunos ejemplos posibles de transacción son: un voto electrónico, el valor de venta de una propiedad, el currículum de una persona, el sueldo promedio para un determinado oficio, una billetera electrónica, etc.

## Nodos

### Nodos mineros

Algunos nodos llamados **mineros** cumplen las siguientes funciones:

* validan las transacciones que se generan
* las agregan a la _blockchain_
* y notifican a los demás nodos mineros (evitando duplicar información)

Más adelante describiremos con más profundidad el proceso, por el momento es importante saber que cada nodo contiene exactamente la misma información que los demás. Esta redundancia permite asegurar que aunque se caigan los nodos, la _blockchain_ es tolerante a fallos.

### Nodos que ejecutan contratos

Otros nodos tiene instalado un ambiente donde se procesan los smart contracts: la Ethereum Virtual Machine (EVM), que trabaja a nivel bytecodes. Esto implica que un Smart Contract puede estar escrito en [Solidity](https://solidity.readthedocs.io/en/v0.5.3/), [Serpent](https://github.com/ethereum/wiki/wiki/Serpent), [Viper](https://vyper.readthedocs.io/en/latest/), [Lisk](https://lisk.io/) o Chain, cualquiera de estos lenguajes se compila a un bytecode que la máquina virtual de Ethereum puede interpretar.

## Ether

El _ether_ es una criptomoneda (también llamado cripto-combustible) que sirve para el intercambio de mensajes dentro de la red Ethereum. Cada vez que queremos procesar una transacción en la EVM, esto implica un costo computacional que debe pagar el cliente (el que origina la transacción), evaluado en una cierta cantidad de _ether_.

Al igual que cualquier otra moneda, el _ether_ tiene una cotización que puede consultarse en varios sitios web, por ejemplo [aquí](https://coinmarketcap.com/es/currencies/ethereum/).

### Medidas de ether

Existen denominaciones para diferentes valores, que podemos ver en la siguiente tabla

| Denominación | Valor |
| ------- | ----- |
| wei | 1 |
| szabo | 10^12 |
| finney | 10^15 |
| ether | 10^18 |
| kether, einstein | 10^21 | 

Para más información recomendamos ver [esta tabla](https://etherconverter.online/)

## Circuito de flujo de un mensaje

![image](../images/transactionWorkflow.png)

[](https://medium.com/coinmonks/https-medium-com-ritesh-modi-solidity-chapter1-63dfaff08a11)

https://github.com/ethereum/wiki/wiki/Ethereum-Development-Tutorial

Una vez que accedemos a una red privada de Ethereum, podemos enviar un mensaje, lo que implica procesar un smart contract con valores concretos. Estos mensajes se agrupan hasta formar un bloque, entonces 

## Proceso minero en detalle

Cada transacción es validada por un proceso llamado **minero**. Este mecanismo de validación

* establece un mecanismo de confianza (consenso) entre todos los nodos
* evita fraudes o información maliciosa, ya que solamente un bloque **verificado** se puede agregar a la cadena de bloques reconocida

### En qué consiste la validación: **Proof of Work**

El **proof of work** consiste en resolver un algoritmo matemático no trivial. Varios nodos compiten y el primero que lo resuelve es recompensado con un porcentaje de _ether_ de comisión. El algoritmo es asimétrico y solo puede resolverse por fuerza bruta, de esa manera el _ether_ funciona como incentivo para que la red sea segura y no necesite intermediarios.

## Más información

* [este artículo cuenta la forma básica de trabajo de la Ethereum Virtual Machine](https://cryptodigestnews.com/blockchain-basics-what-is-evm-52d83616764)
* [este artículo profundiza sobre la diferencia entre la Proof of Work vs. Proof of Stake](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)