<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { KQL_AllContinents } from '$lib/graphql/_kitql/graphqlStores';
	import { queryStringApprend } from '@kitql/helper';
	import KitQlInfo from './KitQLInfo.svelte';

	function reset() {
		KQL_AllContinents.resetCache();
	}

	async function query() {
		await KQL_AllContinents.query(); // { policy: 'cache-first' }
	}

	async function cacheAndNetwork() {
		await KQL_AllContinents.query({ settings: { policy: 'cache-and-network' } });
	}

	async function networkOnly() {
		await KQL_AllContinents.query({ settings: { policy: 'network-only' } });
	}

	async function cacheOnly() {
		await KQL_AllContinents.query({ settings: { policy: 'cache-only' } });
	}

	async function manualUpdate() {
		KQL_AllContinents.patch([{ name: 'JYC Land', code: 'JYC' }], 'continents');
	}

	async function details(code: string) {
		goto(`?${queryStringApprend($page.url.searchParams, { focus: code })}`);
		// await GetAllCountriesOfContinentQuery({ variables: { code } });
	}
</script>

<div>
	<h2 class="vAlign">
		Continents

		<button on:click={() => reset()}>Reset</button>
		<button on:click={() => query()}>Query again</button>
		<button on:click={() => cacheAndNetwork()}>cache-and-network</button>
		<button on:click={() => networkOnly()}>network-only</button>
		<button on:click={() => cacheOnly()}>cache-only</button>
		<button on:click={() => manualUpdate()}>Manual Update</button>
	</h2>
	<KitQlInfo store={$KQL_AllContinents} />
	<ul>
		{#each $KQL_AllContinents.data?.continents ?? [] as continent}
			<li class="allSpace">
				<p>{continent?.name}</p>
				<button on:click={() => details(continent?.code)}>Get Countries</button>
			</li>
		{:else}
			No data
		{/each}
	</ul>
</div>

<style>
	.allSpace {
		display: flex;
		flex: 1;
		justify-content: space-between;
	}

	.vAlign {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	li {
		padding: 0.5rem;
	}
</style>
