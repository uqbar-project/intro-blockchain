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
* Circuito de una Transacción en la Blockchain
  * Proof of Work
* Ataques a la seguridad
  * Denial of Service
  * 51% Attack
* Proof of Stake

____

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

El ambiente donde se procesan las operaciones primitivas de los smart contracts es la Ethereum Virtual Machine (EVM), que trabaja a nivel bytecodes. Un Smart Contract puede estar escrito en diferentes lenguajes: [Solidity](https://solidity.readthedocs.io/en/v0.5.3/), [Serpent](https://github.com/ethereum/wiki/wiki/Serpent), [Viper](https://vyper.readthedocs.io/en/latest/), [Lisk](https://lisk.io/) o Chain, cualquiera de estos lenguajes se compila a un bytecode que la máquina virtual de Ethereum puede interpretar.

Algo interesante de remarcar es que la EVM está pensada para trabajar 

* **en forma determinística**: dado un estado inicial y una función siempre obtendremos el mismo estado final
* **aislada**: por eso cada nodo procesa los smart contracts en forma independiente
* **terminable**: como veremos más adelante con el valor **start gas** el propio algoritmo de la EVM se asegura de que dentro de un límite de tiempo se resolverá el estado final.

### Otros tipos de nodos

Algunos nodos llamados _non-miners_ tienen menor capacidad de procesamiento y solo proveen la EVM para hacer operaciones pero no pueden validar que la transacción sea correcta, dependen del nodo minero para esta tarea.

Recientemente se separó la idea de **full node** para nodos que contienen todo el historial de transacciones de blockchain y por lo tanto son totalmente confiables, versus los **light node** que solo contienen el último estado activo de la blockchain. El objetivo que persigue es la escalabilidad de la blockchain conforme crecen exponencialmente las operaciones.

### Para el curioso...

En https://etherscan.io/nodetracker pueden ver todos los nodos alrededor del mundo (en Argentina hay 25 aunque eso puede ir variando...)

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

Por el momento existen dos tipos de cuentas de Ethereum:

* **cuentas externas** (EOA: Externally Owned Accounts), que pertenecen a personas físicas, se identifican por la clave privada de dicha cuenta (técnicamente por los primeros 160 caracteres).
* **cuentas de contrato** (Contract Accounts), las que pertenecen a un Smart Contract, no tienen clave privada sino una dirección pública o _address_ y almacenan código.

Está la idea de unificar las cuentas para que incluso las cuentas de personas estén regidas por código para accederlo. En los próximos años seguramente tendremos novedades.

## Transacciones

Las transacciones son funciones que toman un estado inicial (S) y producen un cambio final (S') que modifica la blockchain. Algunas de esas funciones incluyen

* transferir ether de una cuenta a otra (cualesquiera sean)
* el _deploy_ de un Smart Contract por parte de una cuenta externa (así es como se crean)
* ejecutar una llamada a otra función de un smart contract

Cuando repasemos el circuito de una transacción veremos su estructura.

### Costo computacional

Cada una de las operaciones involucradas en una transacción tienen un determinado costo computacional, por ejemplo leer un valor y asignarlo en la memoria, crear una cuenta, transferir ether, o incluso realizar un ciclo o _loop_, tienen distintos valores que se miden en **gas**, como explicaremos a continuación.

### Gas

Dado que el ether como toda moneda puede fluctuar mucho su valor, se trabaja en un valor fijo llamado **gas**. De la misma manera que uno llena el tanque del auto en una estación de servicio, eso implica 20 litros de combustible, y el valor depende de cuánto esté el litro de nafta, de esa misma manera se le paga al minero la transacción en base a la cantidad de "combustible" que estuvo utilizando para las operaciones. En ese caso, el minero actúa como estación de servicio, el combustible es el **gas** y nuestro auto es el conjunto de operaciones provisto como código dentro de un smart contract.

### Gas price y Start gas

La analogía anterior no es exacta, ya que la cantidad de ether que vamos a pagar para que un minero procese y firme la transacción no está regulada, sino que se define en el smart contract a partir de un valor que es **gas price**. Aquí indicamos cuánto estamos dispuestos de ether por unidad de `gas`: como resultado, mientras más estemos dispuestos a pagar, más rápidamente será procesada la transacción, ya que los mineros eligen primero las transacciones que más pagan.

Por otra parte, como queremos evitar ciclos infinitos, tenemos otro valor importante, el **start gas** que indica la cantidad máxima de gas que vamos a pagar por una operación. Si nos encontramos haciendo un loop en donde nos olvidamos de incrementar el índice, en algún momento excederemos el máximo permitido y la EVM hará un rollback de la transacción cobrando únicamente el gas máximo establecido como límite. Por lo tanto un smart contract que tiene vulnerabilidades solo nos costará un valor acotado en ether. 

Para más información pueden ver este [artículo que cuenta en profundidad la diferencia entre gas y ether con ejemplos prácticos](https://blockgeeks.com/guides/ethereum-gas-step-by-step-guide/).

## Circuito de flujo de una transacción

![image](../images/transactionWorkflow.png)

### Estructura de una transacción

Todo comienza cuando se genera una transacción, que contiene la siguiente estructura

* **from/quién la origina**
* **to/a quién se dirige:** en el caso de la transferencia es la cuenta de destino, en el caso de la creación de un smart contract este campo está vacío
* **value:** la cantidad de ether a transferir, en el caso de una transferencia
* **input:** apunta al bytecode a ejecutar dentro de la EVM para controlar la transacción
* **blockhash** y **blocknumber**, inicialmente vacíos, cuando una transacción luego se agrupa contiene el identificador o hash del bloque y qué orden ocupa (blocknumber).
* **gas** o **start gas**: la cantidad de gas que quien origina la transacción envía para procesar el smart contract. Es conveniente proveer el suficiente gas para hacer todas las operaciones, de lo contrario la transacción se echará para atrás e igualmente será necesario pagar a los mineros el costo computacional.
* **gas price**: el precio que estamos dispuesto a pagar por el gas, como hemos visto anteriormente.

entre otros datos.

Si querés investigar, podés ingresar a la dirección https://etherscan.io/txs, y buscar por ejemplo la última transacción haciendo click sobre ella:

![image](../images/trx_structure.png)

### Agrupando la transacción en un bloque

Cuando una transacción se crea, es recibida por todos los nodos mineros de la red, que las agrupan hasta formar un bloque. Cada bloque contiene

* un **hash**, acompañado de los campos **difficulty** y **nonce** que explicaremos a continuación
* **gas used**, que se refiere a la cantidad de combustible utilizado para procesar las transacciones que están en el bloque
* **gas limit**, el máximo de combustible permitido: esto evita que en un mismo bloque haya muchas transacciones que sean computacionalmente costosas, ya que pasarán a formar parte del próximo bloque. Por ejemplo, si el gas limit es 1.000, y el gas used es 800, si tenemos una transacción de 250 no formará parte de ese bloque.
* **miner**, el nodo que a la larga será el ganador del proceso de minado
* **number**, el número correlativo que ocupa el bloque en la _blockchain_
* **parent hash**, o puntero al bloque anterior
* **transactions**, apuntando al conjunto de transacciones que conforman el bloque. Por una cuestión de optimización, se trabaja con un árbol binario o **Merkel tree** que permite rápidamente validar el conjunto de transacciones dentro del bloque. Para profundizar más pueden leer [este artículo](https://hackernoon.com/merkle-tree-introduction-4c44250e2da7)
* **timestamp**, con el momento de creación del bloque

Podés navegar por la página etherscan hasta llegar a un bloque, como el https://etherscan.io/block/7221830:

![image](../images/block_structure.png)

### Proof of work para un bloque

Todos los mineros compiten para ver quién puede crear un bloque válido lo más rápido posible, lo que consiste en resolver un desafío que es el **algoritmo de consenso**. Para explicar cómo funciona dicho algoritmo, imaginemos que tenemos un campo alfanumérico, por ejemplo "Joni -> Dodain 4 ether", lo que produce el siguiente hash

```
5a04f4d588d8c8c82a4a5a0eeb9eb80af1d4f115395fb21d44f3dcb253977b5a
```

si le agregamos el valor "K", esto produce que el dato sea "Joni -> Dodain 4 etherK" y el hash cambie a

```
00823dec910b4b60ee5d176bab6cc0f40e301b4d54727537de4973ab864b8e64
```

Lo que hace cada minero es generar un hash del bloque combinando de a pares los hashes de todas las transacciones que lo conforman + un valor aleatorio de dígitos alfanuméricos y ver qué hash sale. El desafío se resuelve cuando encontramos un hash válido, es decir, cuando el hash **comienza con una serie de una determinada cantidad de ceros al comienzo de la cadena de caracteres**. Entonces la **dificultad** es la cantidad de ceros iniciales que buscamos y el campo **nonce** son los dígitos necesarios para crear un hash válido. Si la dificultad (1) que buscamos es 2, entonces el valor _nonce_ posible para la transacción que acabamos de ver en el ejemplo puede ser "K".

> (1) Aclaración: la dificultad no se anota con la cantidad de ceros, sino con el valor máximo que puede tener un hash válido. Por ejemplo, si tenemos un hash de 6 dígitos y queremos que los 3 primeros comiencen con 0, el máximo valor del hash válido sería 000999: esa será nuestra dificultad.

La resolución de este desafío o **proof of work** (PoW) requiere únicamente fuerza bruta, lo que permite potencialmente a cualquier minero ganar el combate por el bloque.

### Qué pasa cuando gana un minero

Cuando un minero obtiene el hash adecuado para el bloque

* actualiza el campo _nonce_ en el bloque con el valor que resolvió la _proof of work_ (hay otro campo _nonce_ en la transacción pero permite evitar duplicados en el envío)
* luego agrega el nuevo bloque a la blockchain, esto implica relacionar el último bloque con el anterior y viceversa
* cobra su comisión o _fee_ (esta es la única forma de generar ether de la nada, por eso la palabra minero recuerda la idea de "extracción" de un mineral escaso)
* y por último dispara un broadcast a todos los otros nodos mineros, quienes ejecutarán la validación del bloque con el nuevo campo _nonce_ (operación que es rápida contra lo costoso que es encontrar la _proof of work_) y agregarán el bloque en la blockchain propia de cada nodo.

![image](../images/overallProcess.png)

Para más información, recomendamos leer [este artículo de Ritesh Modi sobre Ethereum](https://medium.com/coinmonks/https-medium-com-ritesh-modi-solidity-chapter1-63dfaff08a11).

## Ataques a la blockchain

### Direct Denial of Service

![image](../images/ddos-attack.png)

En este caso el hacker intenta colar transacciones inválidas a un nodo minero que es la víctima. Este tipo de ataques son frecuentes, pero no produce ningún tipo de pérdida más que la caída del servicio del nodo minero hasta que logra bloquear los ingresos de máquinas infectadas o _zombies_, ya que todas las transacciones son validadas.

### 51% Attack

Otra de las formas posibles para hackear la blockchain consiste en interceptar una transacción y modificar información sensible. Por ejemplo, el usuario Jorge Luis paga 100 ether en concepto de una notebook usada a Fernando. Pero podría interceptar la transacción y modificar el 100 por un 0. Esto produciría que el hash de esa transacción variara drásticamente, con lo que como consecuencia también el hash del bloque se modificará (en el ejemplo de abajo, de 9BZ pasa a PP4).

![image](../images/blockchain_changed.png)

Como los mineros rápidamente generan nuevos bloques que deben apuntar al bloque anterior, es fácilmente detectable el segundo bloque como fraudulento. Para tener éxito, el hacker debe generar tantos bloques falsos como bloques nuevos se hayan añadido a la blockchain:

![image](../images/51_attack.png)

Eso requeriría tener una capacidad mayor a la del resto de los mineros del mundo: por este motivo se lo conoce como **"51% attack"**. No obstante, esta estrategia tiene muchos puntos en contra

1) El costo de tener el 51% del procesamiento tiene un costo que excede notablemente el beneficio
2) Eventualmente, se detectarán los nodos mineros fraudulentos, y la blockchain se restaurará a partir de un backup anterior al ataque,
3) sin contar que dado que la blockchain es descentralizada porque está basada en la confianza, cualquier ataque hace que su valor caiga abruptamente, lo que es perjudicial especialmente para el hacker.

Para más información pueden leer estos artículos

* [diferentes tipos de ataque](https://medium.com/coinmonks/what-is-a-51-attack-or-double-spend-attack-aa108db63474).
* [vulnerabilidades en Ethereum](https://medium.com/coinmonks/blockchain-for-beginners-what-is-blockchain-519db8c6677a).


### Proof of Stake

Recientemente Ethereum informó que va a reemplazar el sistema _Proof of Work_ por un algoritmo llamado **Proof of Stake** (PoS), que consiste en eliminar la competencia de mineros y elegir por algún mecanismo determinístico quién genera los nuevos bloques en base a su "prosperidad", asumiendo que el principal interesado en conservar la confianza (y por tanto, el valor) de la criptomoneda es el mejor responsable posible para garantizar las transacciones. Dado que los poseedores de criptomonedas cuentan con una ventaja comparativa enorme respecto de sus competidores, algunas variantes más recientes tratan de democratizar la elección del creador tomando en cuenta el tiempo en el que no fueron seleccionados, números al azar, etc. Es importante señalar que **no hay recompensa por agregar bloques a la cadena**.

El objetivo que está detrás principalmente, es disminuir la necesidad de procesamiento que implica una altísima cantidad de consumo energético (se prevé que en 2020 se estará usando la misma cantidad de energía que Dinamarca). 

Por otra parte, aun hay interrogantes que no quedan claros respecto a cómo responderá ante ataques maliciosos (como un _51% attack_), o cómo se comporta para manejar un algoritmo de consenso descentralizado. Veremos a futuro cómo se desarrollan los avances en este sentido.

## Cómo sigo

Podés

* [Volver a la página central](../README.md)
* o ir a la [Instalación del entorno](pages/entorno.md)

## Bibliografía

* [el White Paper de Ethereum](https://github.com/ethereum/wiki/wiki/White-Paper), que sirve como introducción
* [el Yellow Paper de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), de Gavin Wood, que cuenta detalles de implementación
* [este artículo cuenta la forma básica de trabajo de la Ethereum Virtual Machine](https://cryptodigestnews.com/blockchain-basics-what-is-evm-52d83616764)
* [tutorial de desarrollo de Ethereum](https://github.com/ethereum/wiki/wiki/Ethereum-Development-Tutorial)
* [este artículo profundiza sobre la diferencia entre la Proof of Work vs. Proof of Stake](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)