# Ethereum

[Ethereum](https://www.ethereum.org/) es una plataforma open-source que soporta  _smart contracts_ entre pares siguiendo el modelo de Blockchain.

A continuación vamos a contar los principales conceptos de esta arquitectura:

* Objetivo Principal
  * Smart Contract
  * Transacción
* Nodos
  * Nodos mineros
  * Ethereum Virtual Machine
  * Otros tipos de nodos
* Ether
  * Medidas
* Cuentas
* Transacciones
  * Gas
  * Gas price y start gas
* repaso del circuito de una transacción en la blockchain
  * proof of work / proof of stake

## Objetivo principal de la blockchain

Los objetivos de Ethereum son descentralizar la web, eliminando intermediarios y organismos reguladores. Por lo tanto la arquitectura tiene un esquema _peer-to-peer_, donde cada nodo tiene la misma importancia que los demás en una red Ethereum (en lugar de tener un servidor como fuente central de información).

Un smart contract define una relación contractual entre pares, que se instancia con datos a partir de una **transacción**. Algunos ejemplos posibles son: votar a un candidato, el valor de venta de una propiedad, el currículum de una persona, el sueldo promedio de un oficio determinado, una billetera electrónica, etc.

## Nodos

### Nodos mineros

La mayoría de los nodos, llamados **mineros**, tienen una gran capacidad de procesamiento y cumplen las siguientes funciones:

* reciben transacciones nuevas que llegan y verifican su validez
* las agregan a la _blockchain_
* y notifican a los demás nodos mineros (evitando duplicar información)

Más adelante describiremos con más profundidad el proceso, por el momento es importante saber que cada nodo contiene exactamente la misma información que los demás. Esta redundancia permite asegurar que aunque se caigan los nodos, la _blockchain_ es tolerante a fallos.

Para poder procesar las transacciones, cuentan con una Virtual Machine propia de Ethereum, como veremos a continuación.

### EVM: Ethereum Virtual Machine

Es el ambiente donde se procesan las operaciones primitivas de los smart contracts: la Ethereum Virtual Machine (EVM), que trabaja a nivel bytecodes. Un Smart Contract puede estar escrito en diferentes lenguajes: [Solidity](https://solidity.readthedocs.io/en/v0.5.3/), [Serpent](https://github.com/ethereum/wiki/wiki/Serpent), [Viper](https://vyper.readthedocs.io/en/latest/), [Lisk](https://lisk.io/) o Chain, cualquiera de estos lenguajes se compila a un bytecode que la máquina virtual de Ethereum puede interpretar.

Algo interesante de remarcar es que la EVM está pensada para trabajar 

* **en forma determinística**: dado un estado inicial y una función siempre obtendremos el mismo estado final
* **aislada**: por eso cada nodo procesa los smart contracts en forma independiente
* **terminable**: como veremos más adelante con el valor **start gas** el propio algoritmo de la EVM se asegura de que dentro de un límite de tiempo se resolverá el estado final.

### Otros tipos de nodos

Algunos nodos llamados _non-miners_ tienen menor capacidad de procesamiento y solo proveen la EVM para hacer operaciones pero no pueden validar que la transacción sea correcta, dependen del nodo minero para esta tarea.

Recientemente se separó la idea de **full node** para nodos que contienen todo el historial de transacciones de blockchain y por lo tanto son totalmente confiables, versus los **light node** que solo contienen el último estado activo de la blockchain. El objetivo que persigue es la escalabilidad de la blockchain conforme crecen exponencialmente las operaciones.

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

## Cuentas

Existen dos tipos de cuentas de Ethereum:

* **cuentas externas** (EOA: Externally Owned Accounts), que pertenecen a personas físicas, tienen una clave privada.
* **cuentas de contrato** (Contract Accounts), controladas por un Smart Contract a través del código.

## Transacciones

Las transacciones son funciones que toman un estado inicial (S) y producen un cambio final (S') que modifica la blockchain. 

Cada una de las operaciones tienen un determinado costo computacional, por ejemplo leer un valor y asignarlo en la memoria, crear una cuenta, transferir una determinada cantidad de ether a otra cuenta, o incluso realizar un ciclo o _loop_, tienen distintos valores que se miden en **gas**, como explicaremos a continuación.

### Gas

Dado que el ether como toda moneda puede fluctuar mucho su valor, se trabaja en un valor fijo llamado **gas**. De la misma manera que uno llena el tanque del auto en una estación de servicio, eso implica 20 litros de combustible, y el valor depende de cuánto esté el litro de nafta, de esa misma manera se le paga al minero la transacción en base a la cantidad de "combustible" que estuvo utilizando para las operaciones. En ese caso, el minero actúa como estación de servicio, el combustible es el **gas** (que en inglés no necesita traducción) y nuestro auto es el conjunto de operaciones provisto como código dentro de un smart contract.

### Gas price y Start gas

La analogía anterior no es exacta, ya que la cantidad de ether que vamos a pagar para que un minero procese y firme la transacción no está regulada, sino que se define en el smart contract a partir de un valor que es **gas price**. Aquí indicamos cuánto estamos dispuestos de ether por unidad de `gas`: como resultado, mientras más estemos dispuestos a pagar, más rápidamente será procesada la transacción, ya que los mineros eligen primero las transacciones que más pagan.

Por otra parte, como queremos evitar ciclos infinitos, tenemos otro valor importante, el **start gas** que indica la cantidad máxima de gas que vamos a pagar por una operación. Si nos encontramos haciendo un loop en donde nos olvidamos de incrementar el índice, en algún momento excederemos el máximo permitido y por lo tanto un smart contract que tiene vulnerabilidades solo nos costará un valor acotado, ya que la EVM hará un rollback de la transacción cobrando únicamente el gas máximo establecido como límite. 

## Circuito de flujo de un mensaje

![image](../images/transactionWorkflow.png)

[](https://medium.com/coinmonks/https-medium-com-ritesh-modi-solidity-chapter1-63dfaff08a11)

Una vez que accedemos a una red privada de Ethereum, podemos enviar un mensaje, lo que implica procesar un smart contract con valores concretos. Estos mensajes se agrupan hasta formar un bloque, entonces 

### En qué consiste la validación: **Proof of Work**

El **proof of work** consiste en resolver un algoritmo matemático no trivial. Varios nodos compiten y el primero que lo resuelve es recompensado con un porcentaje de _ether_ de comisión. El algoritmo es asimétrico y solo puede resolverse por fuerza bruta, de esa manera el _ether_ funciona como incentivo para que la red sea segura y no necesite intermediarios.

## Más información

* [el White Paper de Ethereum](https://github.com/ethereum/wiki/wiki/White-Paper), que sirve como introducción
* [el Yellow Paper de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), de Gavin Wood, que cuenta detalles de implementación
* [este artículo cuenta la forma básica de trabajo de la Ethereum Virtual Machine](https://cryptodigestnews.com/blockchain-basics-what-is-evm-52d83616764)
* [tutorial de desarrollo de Ethereum](https://github.com/ethereum/wiki/wiki/Ethereum-Development-Tutorial)
* [este artículo profundiza sobre la diferencia entre la Proof of Work vs. Proof of Stake](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)