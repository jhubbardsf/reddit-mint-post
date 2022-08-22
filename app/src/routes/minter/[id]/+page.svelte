<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	console.log({ data });
	let address: string;
	$: console.log({ address });
	const mint2 = () => {
		const reqHeader = new Headers();
		reqHeader.append('x-client-secret', '<API SECRET>');
		reqHeader.append('x-project-id', '<PROJECT ID>');
		reqHeader.append('Content-Type', 'application/json');

		const collectionName = 'default'; // change if you've created a collection
		const recipient = 'poly:0x0A8b88D055089f05beA6c495e66D061dA254FceF';
		// Or with just an email:
		// const recipient = "email:peter@crossmint.io:poly"

		const reqBody = JSON.stringify({
			mainnet: false,
			metadata: {
				name: 'Crossmint Mint API Test',
				image: 'https://www.crossmint.io/assets/crossmint/logo.png',
				description: 'Test NFT created by the Crossmint Minting API'
			},
			recipient: recipient
		});

		var requestOptions = {
			method: 'POST',
			headers: reqHeader,
			body: reqBody,
			redirect: 'follow'
		};
		const crossMintUrl = `https://www.crossmint.io/api/2022-06-09/collections/${collectionName}/nfts`;
		fetch(crossMintUrl, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));
	};

	const mint = () => {
		console.log('mint');
	};
</script>

<input type="text" id="address" name="address" value={address} />
<button on:click|preventDefault={mint}>Submit</button>
