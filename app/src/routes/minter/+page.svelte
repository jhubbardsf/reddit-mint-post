<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<h1>Reddit NFT Minter</h1>

	<div class="messages">
		<h2>Messages Go Below</h2>
		{#each data.messages as message}
			{@html message.body_html}
		{/each}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.messages {
		margin-top: 20px;
		border: 1px solid black;
		padding: 20px;
	}
</style>
