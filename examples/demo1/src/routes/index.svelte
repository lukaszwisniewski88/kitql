<script context="module" lang="ts">
	import Continents from '$lib/components/Continents.svelte';
	import Countries from '$lib/components/Countries.svelte';
	import {
		KQL_AllContinents,
		KQL_AllCountriesOfContinent
	} from '$lib/graphql/_kitql/graphqlStores';

	export async function load({ fetch, url }) {
		await KQL_AllContinents.query({ fetch });
		let code = url.searchParams.get('focus');
		if (code) {
			await KQL_AllCountriesOfContinent.query({ fetch, variables: { code } });
		}
		return {};
	}
</script>

<svelte:head>
	<title>KitQL</title>
</svelte:head>

<h1 class="vAlign">Welcome to KitQL <img class="ml-1" src="./logo.svg" alt="logo KitQL" /></h1>

<p>
	Visit <a target="_blanck" href="https://github.com/jycouet/kitql">Github KitQL</a> to read the documentation
</p>

<hr />

<div class="grid">
	<Continents />
	<Countries />
</div>

<style>
	:root {
		background-color: rgba(68, 68, 68, 0.1);
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}

	.vAlign {
		display: flex;
		align-items: center;
	}
	.ml-1 {
		margin-left: 1rem;
	}
</style>
