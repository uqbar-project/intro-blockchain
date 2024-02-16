
# Startup del entorno Ethereum local

## Inicio del nodo

Hardhat permite levantar de una manera muy sencilla:

```bash
npx hardhat node
```

El comando

- inicia la red privada local en el puerto 8545 (salvo que configuremos otro puerto),
- levanta el proceso de minado,
- y crea varias cuentas para poder probar (recordá que las cuentas son las que van a pagar los smart contracts),

```bash
npx hardhat node
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

## Deployando los smart contracts

Para desplegar los smart contracts, tenemos que ejecutar el siguiente comando:

```bash
npx hardhat run --network localhost scripts/deploy.ts
```

El deploy se genera mediante código typescript. Hardhat te provee un ejemplo, nosotros lo modificamos para poder hacer el deploy de nuestros 2 smart contracts: Auth y Wallet.

## Conectándonos al nodo

Vamos a conectar nuestro primer nodo a la red, utilizando una nueva terminal:

```bash
npx hardhat console
```

La consola muestra cuál es la versión de la EVM (Ethereum Virtual Machine).

```
Compiled 2 Solidity files successfully (evm target: paris).
Welcome to Node.js v20.4.0.
Type ".help" for more information.
```

A partir de aquí podemos usar el smart contract 

```bash
> const { parseGwei } = await import("viem");
> const lockedAmount = parseGwei('1')
> const auth = await hre.viem.deployContract('Auth', [], {
...       value: lockedAmount,
...       value: lockedAmount2,
... 
> 
> const user = {
...       name: 'jperalta',
...       password: 'cool',
...       wallet_address: userAccount.account.address,
...       existing: false,
...     }
> await auth.read.exists([user.name])
true
> await auth.read.exists([user.name + '1'])
false
```

# Cómo sigo

Ahora podés

* [Ver el primer ejemplo de smart contract, una billetera virtual](./wallet.md)
* [Volver a la página central](../README.md)
