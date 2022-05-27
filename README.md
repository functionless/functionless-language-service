# Functionless Language Service Plugin

[![npm version](https://badge.fury.io/js/@functionless%2Flanguage-service.svg)](https://badge.fury.io/js/@functionless%2Flanguage-service)

The `@functionless/language-service` package configures a plugin for the TypeScript language service plugin that adds real-time errors to the IDE for [Functionless](https://github.com/functionless/functionless)'s semantic errors.

To configure, first install the module as a devDependency.

```shell
# if using NPM
npm install --save-dev @functionless/language-service

yarn add -D @functionless/language-service
```

Then add as a plugin to your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@functionless/language-service"
      }
    ]
  }
}
```
