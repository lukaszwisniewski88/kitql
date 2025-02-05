# KitQL - graphql-codegen

[KitQL](https://github.com/jycouet/kitql#kitql), _A set of tools, helping **you** building efficient apps in a fast way._

<p align="center">
  <img src="../../logo.svg" width="100" />
</p>

# ⚡How to - graphql-codegen

```bash
yarn add -D @kitql/graphql-codegen
```

## Steps

1. Create a `.graphqlrc.yaml` at the root of your application ([Like in the Demo 1](https://raw.githubusercontent.com/jycouet/kitql/main/examples/demo1/.graphqlrc.yaml))

```yaml
# ...
codegen:
  generates:
    ./src/lib/modules/:
      preset: graphql-modules
      presetConfig:
        baseTypesPath: ../graphql/_kitql/graphqlTypes.ts
        importBaseTypesFrom: $lib/graphql/_kitql/graphqlTypes
        filename: _kitql/moduleTypes.ts
      plugins:
        - typescript
        - typescript-resolvers
        - typescript-operations
        - typed-document-node
      config:
        contextType: $lib/graphql/yogaApp#IYogaContext

    ./src/lib/graphql/_kitql/graphqlStores.ts:
      plugins:
        - '@kitql/graphql-codegen'
      config:
        importBaseTypesFrom: $lib/graphql/_kitql/graphqlTypes

  config:
    useTypeImports: true
# ...
```

2. Create a script `gen` in your `package.json` like:

```json
"scripts": {
  "gen": "graphql-codegen --config ./.graphqlrc.yaml",
},
```

3. run code gen

```bash
yarn gen
```

4. Setup [vite-plugin-watch-and-run](https://github.com/jycouet/kitql/tree/main/packages/vite-plugin-watch-and-run#kitql---vite-plugin-watch-and-run) to run `gen` everytime you change a GraphQL file. ⚡⚡⚡
