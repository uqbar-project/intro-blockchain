# Configuración de la integración continua

Github Actions tiene dos builds diferentes:

- uno ejecuta las pruebas y la cobertura de los smart contracts
- el segundo ejecuta los tests de frontend de React

Por supuesto, una prueba exhaustiva end-to-end en Cypress debería levantar una blockchain en el entorno de GH actions, luego la aplicación React y tratar de hacer un flujo normal de

- login
- visualizar el saldo
- poner plata
- sacar plata
- y desloguearse

Esto lo dejamos para una iteración futura. Por ahora nos manejamos con estas pruebas que nos parecen más que aceptables para detectar inconvenientes.

## Pruebas sobre los smart contracts

Lo único que hay que tener en cuenta es un archivo de configuración para que los tests de cobertura dejen un archivo json-summary que luego levanta el action que genera el badge que publica el README. Para eso creamos el archivo `.solcover.js` donde agregamos el reporter específico:

```js
module.exports = {
  istanbulReporter: ['json', 'json-summary']
}
```

El resto es sencillo, solo llamamos a un action común de node que ejecuta los tests de cobertura:

```yml
      - name: Environment
        uses: actions/setup-node@v4
      - name: Test
        run: |
          npm i
          npx hardhat coverage
```

## Pruebas sobre la app React

Estas pruebas son más conocidas, tenemos que utilizar la versión que está en el archivo [.nvmrc](./../monedero-react/.nvmrc), descargar las dependencias con `npm` y finalmente ejecutar los tests.


