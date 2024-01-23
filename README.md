# iocjs

## A basic ioc container for JavaScript applications

### installation

```
npm install @karten-werk-gmbh/iocjs
```

### getting started

Define the ioc container in your main JavaScript entry file.

```
// main.js
import IocContainer from "@hkfrei/iocjs"

const appIoc = new IocContainer()

```

### register dependecies

register a transient class

```
appIoc.register({ name:"urlGateway", definition:UrlGateway });
```

register a transient class with initial values in the constructor

```
appIoc.register({ name: "initValue", definition:{ score:1 } })
appIoc.register({ name:"urlGateway", definition:UrlGateway, dependencies:["initValue"] });
```

register a transient class with dependecy classes

```
appIoc.register({ name:"urlGateway", definition:UrlGateway, dependencies:["initValue"] });
appIoc.register({ name:"mapPm", definition:MapPm, dependencies:["urlGateway] })
```

register a singleton

```
appIoc.register({ name:"urlGateway", definition:UrlGateway, singleton:true });
```

### retrieve Instances

You can get instances of the registered classes the following way.

```
const mapPm = appIoc.get("mapPm")

```

## Available Scripts

```
npm run test
```

Launches the test runner in the interactive watch mode.<br />

```
npm run build
```

Builds the app for production to the `dist` folder.<br />

## Built with

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

For a full list of used libraries, have a look at [package.json](package.json)

## Contribution

Contributions are welcome! Please reach out to [hkfrei@karten-werk.ch](mailto:hkfrei@karten-werk.ch) if you want to have more information.

## License

This project is Licensed under the GNU GENERAL PUBLIC License. See [LICENSE](LICENSE).

## Contact

[Karten-werk GmbH](https://karten-werk.ch)
Hanskaspar Frei
[hkfrei@karten-werk.ch](mailto:hkfrei@karten-werk.ch)
