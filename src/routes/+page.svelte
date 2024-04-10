<script lang="ts">
	import { DefaultService } from '$lib/api/openapi/services/DefaultService';

	const cookiesthing = () => {
		chrome.cookies.getAll({ url: 'https://link-collections-api.joscha.io/' }).then((cookies) => {
			console.log(cookies);
		});
	};
	const save_current_link = () => {
		console.log('current link');
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			let url = tabs[0].url;
			console.log(url);
		});
	};
	const save_all_tabs = () => {
		console.log('all tabs');
		chrome.tabs.query({ currentWindow: true }, (tabs) => {
			// tabs have .title and .url
			console.log(tabs);
			tabs.map((tab) => console.log(tab));
		});
	};
	const aoeu = () => {
		DefaultService.userTestUserTestGet().then((res) => {
			console.log(res);
		});
	};
</script>

<button class="btn h-12 w-32" on:click={save_current_link}>Save current link </button>
<button class="btn h-12 w-32" on:click={save_all_tabs}>Save all tabs</button>

BS... sntahoesunthanstueh
<button class="btn h-12 w-32" on:click={cookiesthing}>Get cookie</button>
<button class="btn h-12 w-32" on:click={aoeu}>aoeu</button>
