# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Instructivo general

Este proyecto se resolvió siguiendo [estos pasos](https://hardhat.org/ignition/docs/getting-started#overview).

## Cómo interactuar con tus smart contracts

```bash
npx hardhat node -- levantamos el entorno

# en otra terminal deployamos los contracts
npx hardhat run --network localhost scripts/deploy.ts

# ahora levantamos la consola
npx hardhat console

# y obtenemos una referencia a nuestro smart contract
const wallet = await (await ethers.getContractFactory("Wallet")).attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
```

https://ethereum.stackexchange.com/questions/93657/how-to-interact-with-the-functions-of-my-smart-contract-in-hardhat

## Cómo exportar a un ABI

Instalamos el [abi-exporter](https://www.npmjs.com/package/hardhat-abi-exporter) y ejecutamos

```bash
npx hardhat export-abi
```

En la carpeta `abi` están los JSON, podemos generar links simbólicos a los archivos en nuestro proyecto React:

```bash
ln ../../../monedero-hardhat/abi/contracts/Wallet.sol/Wallet.json  Wallet.json
ln ../../../monedero-hardhat/abi/contracts/Auth.sol/Auth.json  Auth.json
```

Y los usamos directamente en nuestra app de frontend. Previamente hay que asegurarse de tener levantado el entorno:

```bash
npx hardhat node
```