
# Instalación y configuración del entorno

## Pre-requisitos

Asumimos que tenés instalados en tu máquina

* NodeJS
* npm

## Tecnologías

Las tecnologías que vamos a instalar son

### Solidity

* [**Solidity**](https://solidity.readthedocs.io/en/v0.5.3/installing-solidity.html), el lenguaje que vamos a utilizar para crear _smart contracts_

```bash
npm install -g solc
```

### Hardhat

Desde septiembre 2023, Hardhat es la opción más utilizada para trabajar en proyectos con Smart Contract dentro de la tecnología JS/TS. Es el reemplazo de Truffle + Ganache (por si estuviste buscando en los navegadores).

Hardhat provee

- un entorno de programación, con el cual podés crear muy fácilmente un proyecto Javascript o Typescript
- un **runner** que te permite ejecutar tareas: compilar, desplegar, testear e incluso medir la cobertura de tus tests
- una **red** (network) donde viven tus smart contracts (aquí es donde podés levantar una consola y probarlos manualmente o bien ejecutar los tests automatizados). En esa red corre la VM llamada HRE (Hardhat Runtime Environment)

La página principal es [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started).

Todo se engloba en una carpeta donde está la configuración de Hardhat, tus smart contracts, los tests y otras cosas más que veremos luego. Para generar un proyecto desde cero podés escribir en la consola:

```bash
npm init -y
npm install --save-dev hardhat
npx hardhat init
# y seleccionar las opciones que quieras
```

Para más información podés ver [esta página](https://hardhat.org/hardhat-runner/docs/guides/project-setup).

## Cómo sigo

Ahora podés

* [Levantar la red Ethereum local](./startupEthereumLocal.md)
* [Volver a la página central](../README.md)