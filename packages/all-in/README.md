# KitQL - all-in

[KitQL](https://github.com/jycouet/kitql#kitql), _A set of tools, helping **you** building efficient apps in a fast way._

<p align="center">
  <img src="../../logo.svg" width="100" />
</p>

# ⚡How to - all-in

## 1️⃣ In a SvelteKit project, install everything in one cmd!

(step 0, if it's not done, create a [sveltekit project](https://kit.svelte.dev/) with everything `true` 🙃)

```bash
yarn add @kitql/all-in graphql
```

## 2️⃣ Create a `.graphqlrc.yaml` at the root of your project

[Like in the Demo 1](https://raw.githubusercontent.com/jycouet/kitql/main/examples/demo1/.graphqlrc.yaml)

## 3️⃣ update your `package.json`

- Update your `dev port` to `3777` to fit the previous config file
- Add a `gen` script to launch the codegen

```json
"scripts": {
  "prepare": "yarn gen",                                // will run the codegen after yarn install
  "dev": "svelte-kit dev --port 3777",                  // adapt the port to your needs
  "gen": "graphql-codegen --config ./.graphqlrc.yaml",  // run codegen with the right config file
}
```

## 4️⃣ Install the plugin Watch & Run

In your `svelte.config.js` add a watchAndRun with the following configuration:

```js
import watchAndRun from './vite-plugin-watch-and-run.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		vite: {
			plugins: [
				watchAndRun([
					{
						watch: '**/*.(gql|graphql)',
						run: 'yarn gen'
					}
				])
			]
		}
	}
};

export default config;
```

## 5️⃣ Add some operations & mutations

Like this file for example: [demo1/src/lib/graphql/GetAllContinents.gql](https://raw.githubusercontent.com/jycouet/kitql/main/examples/demo1/src/lib/graphql/GetAllContinents.gql)

_If you were not running your app, run `yarn gen` manually_

## 6️⃣ Use your operations & mutations

```html
<!-- For SSR -->
<script context="module" lang="ts">
	export async function load({ fetch }) {
		await KQL_AllContinents.query({ fetch }); // Filling the store
		return {};
	}
</script>

<!-- Or in a svelte component -->
<script lang="ts">
	await KQL_AllContinents.query(); // Filling the store
</script>

<!-- Using the store where you want in the app -->
<ul>
	{#each $KQL_AllContinents.data?.continents as continent}
	<li>
		<p>{continent?.name}</p>
	</li>
	{/each}
</ul>
```

7️⃣8️⃣9️⃣

## 5️⃣ Run

```bash
yarn dev
```

🥳🥳🥳🥳🥳 (ok not yet, you need a bit more steps to create your server, client, etc, I will add it later to the README, even steps orders will change!).
