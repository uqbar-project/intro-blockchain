# Configuración de la integración continua

El build que ejecuta Github Actions tiene por el momento estas integraciones:

- Levantar el entorno Blockchain
- Levantar la aplicación React y ejecutar los tests de frontend

Por supuesto, una prueba exhaustiva end-to-end en Cypress debería levantar una blockchain en el entorno de GH actions, luego la aplicación React y tratar de hacer un flujo normal de

- login
- visualizar el saldo
- poner plata
- sacar plata
- y desloguearse

Esto lo dejamos para una iteración futura, dado que necesitamos tener control sobre las cuentas que se generan en el ganache-cli que son las que necesitamos para loguearnos a la aplicación y también para poder ejecutar transacciones contra los smart contracts. Por ahora nos manejamos con estas pruebas que nos parecen más que aceptables para detectar inconvenientes.

## Pruebas sobre la blockchain

Para levantar una blockchain tenemos un contenedor docker con un archivo [docker-compose.yml](./../docker/docker-compose.yml) que levanta `ganache-cli` (la aplicación Ganache por consola, sin una interfaz gráfica). Eso nos garantiza tener al menos 10 cuentas y el servicio de minado, para luego ejecutar los tests de los smart contracts. Para eso necesitamos tener instalado truffle y lo hacemos vía npm.

```yml
    - name: Start Blockchain container
      working-directory: ./
      run: docker build . -t ganache-cli && docker run -d -p 8545:8545 ganache-cli
    - name: Test Smart contract
    - name: Test Smart contract
      working-directory: truffle
      run: npm install -g truffle && truffle test ./test/wallet.js && truffle test ./test/auth.js
```

Por último detenemos el contenedor que levantamos anteriormente.

## Pruebas sobre la app React

Estas pruebas son más conocidas, tenemos que utilizar la versión que está en el archivo [.nvmrc](./../monedero-react/.nvmrc), descargar las dependencias con `npm` y finalmente ejecutar los tests.


