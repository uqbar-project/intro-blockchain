
# Levantando la red Ethereum local

Continuando con este [buen tutorial](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d), una vez que [hayas instalado todos los componentes necesarios](./entorno.md), podemos levantar la red Ethereum localmente. Para hacer esto debemos ir al directorio raíz de este proyecto, abrir una terminal y escribir

```bash
geth --port 3000 --networkid 58343 --nodiscover --datadir=./data --maxpeers=0  --rpc --rpcport 8543 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner"
```

Geth recordamos que es la implementación de Ethereum en este caso en el lenguaje Go, y lo que estamos haciendo es levantar la red en el equipo local (127.0.0.1) diferentes servicios. Además de eth y net (la red privada), estaremos trabajando con

- **personal**: el servicio que administra las cuentas, tanto la de los smart contracts como las personales
- **web3**: la biblioteca que permitirá conectarnos a un nodo Ethereum (puede ser local o remoto) mediante el protocolo http o IPC. Recordá que tenés [la página oficial con la documentación](https://web3js.readthedocs.io/en/1.0/)
- **miner**: el servicio de minero que cuando lo levantes te permitirá deployar contratos y enviar transacciones

Otras configuraciones que acabamos de escribir son:

- **networkid**: puede ser cualquier número que lo identifique para que los otros nodos se conecten. Hay algunos números reservados, en el [tutorial](https://hackernoon.com/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d) los enumera.
- **nodiscover**: deshabilita la búsqueda de nodos (la conexión se hará manual)
- **datadir**: el directorio donde está la _blockchain_
- **maxpeers**: cantidad de nodos o _peers_ que pueden conectarse a la red (0: la red está deshabilitada, por defecto son 25)
- **rpc**: habilita HTTP-rpc
- **rpcapi**: permite utilizar los métodos remotos de web3js en la consola Geth, como veremos a continuación

