
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

[Volver a la página central](../README.md)