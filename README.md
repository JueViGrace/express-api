<p align="center" style="font-size:5rem">
    <a href="https://expressjs.com/" target="blank">Express JS</a>
</p>
<p align="center">
Express es un entorno de trabajo para aplicaciones web para el programario <a href="http://nodejs.org" target="_blank">Node.js</a>, de código abierto y con licencia MIT. Se utiliza para desarrollar aplicaciones web y APIs.
</p>

## Introducción

CLOSS API desarrollada en Express JS.

## Instalación

<p style="font-size:1.2em">
Se deben utilizar los siguientes comandos para realizar la correcta instalacion de las dependencias del proyecto asi como la compilación del código <a href="https://www.typescriptlang.org/" target="blank">TypeScript</a> a código <a href="https://devdocs.io/javascript/" target="blank">JavaScript</a>.
</p>

```bash
npm run build
```

> Los comandos utilizados se encuentran en el archivo package.json

## Crear la base de datos

<p style="font-size:1.2em">
Para crear la base de datos, y antes de iniciar la aplicación, se deben ejecutar los siguientes comandos.
</p>

```bash
npm run m:gen path-to-migration
```

> Este comando generará un archivo de migración. Como parametro se le debe pasar la ruta a la carpeta de migraciones del proyecto, inicialmente en "src/migrations/(nombre de la migración)". Para cada migración se recomienda colocar un nombre significativo que la identifique.

<p style="font-size:1.2em">
Luego de generar el archivo de migración ejecutar el siguiente comando.
</p>

```bash
npm run m:run
```

> Este ejecutara la migración y creara la base de datos o los cambios hechos en la migración.

NOTA IMPORTANTE: En caso de que haya un error luego de la migración eliminar la carpeta <b>dist</b>

## Ejecutar la app

<p style="font-size:1.2em">
La siguiente lista de comandos comprenden los modos en los que se puede ejecutar la aplicación.
</p>

```bash
# desarrollo
npm run start

# watch mode
npm run start:dev

# producción
npm run start:prod
```

- Desarrollo (comando para desarrollo): ejecuta dos comandos, el primero "build" descrito arriba y como segundo comando "node dist/server.js" para ejecutar la aplicación.
- Watch mode (comando para desarrollo): ejecuta los mismos comandos que el primero con la diferencia de que este observa los cambios realizados en el código y no hay necesidad de terminar el proceso a mano.
- Producción: este comando ejecuta la aplicación en modo de producción,

> El comando de producción a diferencia de los demás altera la variable NODE_ENV lo que hace que se utilicen las variables de entorno de producción. Las variables de entorno se encuentran en los archivos .env, este ultimo contiene las variables de desarrollo y .production.env las de producción.

Nota: Los archivos de variables de entorno no se suben a este repositorio, en cambio hay un archivo de ejemplo que contiene las variables utilizadas pero no valores reales. En caso de clonar el repositorio crear estos archivos.

## Recursos

- <a href="https://www.youtube.com/playlist?list=PLergODdA95keGVKSOPApWRw0XuA-ivH_u">Curso Node.js & TypeScript</a>
- <a href="https://www.youtube.com/watch?v=tGJt93O_DMo&t=2349s">TypeORM Nodejs</a>
- <a href="https://www.youtube.com/watch?v=RWUmlsdZ1e4&list=PLPl81lqbj-4LqA6sXRETXUg4uNkYG4aUc&pp=iAQB">API REST con Nest.js</a>
- <a href="https://www.youtube.com/watch?v=nH9E25nkk3I">Express Js Full Course</a>
- <a href="https://www.youtube.com/watch?v=ardeKHEN1j4&t=491s">React & Node.js app</a>
