
# Instalación y configuración del entorno

Vamos a seguir los pasos de [este tutorial](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d), para lo cual debemos entender cuáles son las herramientas necesarias para tener un entorno de blockchain local.

## Pre-requisitos

Asumimos que tenés instalados en tu máquina

* NodeJS
* npm

## Tecnologías

Las tecnologías que vamos a instalar son

* **Geth** (go-ethereum): la plataforma Ethereum implementada en el lenguaje [Go](https://golang.org/). Para instalarlo [seguí estos pasos](https://github.com/ethereum/go-ethereum/wiki/Installing-Geth)

* [**Truffle**](https://truffleframework.com/): una herramienta que facilita el desarrollo, el testeo y la migración de smart contracts. Se instala mediante npm.

```bash
$ npm install -g truffle
```

Para más detalles recomendamos [ir a la página específica de instalación](https://truffleframework.com/docs/truffle/getting-started/installation).


* [**Solidity**](https://solidity.readthedocs.io/en/v0.5.3/installing-solidity.html), el lenguaje que vamos a utilizar para crear _smart contracts_

```bash
$ npm install -g solc
```

* [**Ganache**](https://truffleframework.com/ganache): una aplicación que permite visualizar cuentas, bloques, transacciones y logs en forma visual. También hay una versión por consola:

```bash
$ npm install -g ganache-cli
```

Para más información recomendamos leer [esta página](https://truffleframework.com/docs/ganache/quickstart).

## Configuración

### Creación del bloque inicial de la blockchain

Como hemos visto, todo bloque tiene un link a su bloque padre, el anterior, a excepción del primer bloque que se denomina **genesis block**. Este se configura en un archivo JSON:

```bash
$ mkdir project1         # creamos un directorio project1 o cualquier otro nombre...
$ cd project1            # ...y dentro de este directorio...
$ touch genesis.json     # ...creamos un archivo de configuración genesis.json
```

El archivo genesis.json puede tener esta apariencia

```json
{
    "config": {
        "chainId": 143,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "alloc": {},
    "difficulty": "0x20000",
    "gasLimit": "0x8880000"
}
```

De todos estos parámetros, los más relevantes para comentar son

* `chainId` define un identificador del bloque inicial que es privado
* `difficulty` establece la dificultad del algoritmo a resolver para los mineros (mientras más difícil más tardarán los mineros en poblar la blockchain)
* `gasLimit` será el máximo que estaremos dispuesto a pagar para procesar el smart contract, es importante en caso de que haya un error en la programación de nuestro contrato (como un loop infinito)

### Creación de la blockchain propiamente dicha

A continuación debemos definir en qué dirección residirá la blockchain, para lo cual ejecutaremos comandos bastante sencillos:

```bash
$ mkdir data                             # creamos el directorio data...
$ geth --datadir data init genesis.json  # ...e inicializamos la blockchain en esa carpeta
```

Aunque `data` es bastante representativo, pueden elegir otro nombre si quieren.

## Cómo sigo

Ahora podés

* [Levantar la red Ethereum local](./startupEthereumLocal.md)
* [Volver a la página central](../README.md)