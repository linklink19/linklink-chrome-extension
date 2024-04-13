<script lang="ts">
	import { AuthService, LiliService, LinkService } from '$lib/api/openapi';
	import { WEBSITE_URL } from '$lib/constants';
	import { account_info_store } from '$lib/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount, tick } from 'svelte';

	const get_initals = (name: string): string => {
		const words = name.split(' ');
		if (words.length == 1) {
			return words[0].substring(0, 2);
		} else {
			return words[0].substring(0, 1) + words[1].substring(0, 1);
		}
	};

	let saving_tabs = false;
	let linklink_name = 'My New LinkLink';
	let linklink_name_to_save = '';
	let input_box: HTMLInputElement;

	let show_saved = false;
	let awaiting_single_link_save = false;
	let awaiting_tabs_save = false;
	const saved_notification = () => {
		show_saved = true;
		setTimeout(() => {
			show_saved = false;
		}, 2000);
	};

	const save_current_link = () => {
		console.log('current link');
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
			let tab = tabs[0];
			console.log(tab);
			try {
				awaiting_single_link_save = true;
				let saved_link = await LinkService.createLinkPost($account_info_store!.workspace_id, [
					{
						order_in_list: 0,
						name: tab.title!,
						url: tab.url!
					}
				]);
				if (saved_link !== null) {
					saved_notification();
				}
			} catch {
				console.log('error saving link');
			} finally {
				awaiting_single_link_save = false;
			}
		});
	};

	const save_all_tabs = () => {
		console.log('all tabs');
		linklink_name_to_save = linklink_name;
		chrome.tabs.query({ currentWindow: true }, actually_save_tabs_to_new_list);
		// reset
		linklink_name = 'My New LinkLink';
		saving_tabs = false;
	};

	const actually_save_tabs_to_new_list = async (tabs) => {
		// tabs have .title and .url
		console.log(tabs);
		awaiting_tabs_save = true;
		try {
			let lili_out = await LiliService.createLiliPost({
				name: linklink_name_to_save,
				links: tabs.map((tab, idx) => {
					return {
						order_in_list: idx,
						name: tab.title,
						url: tab.url
					};
				})
			});
			saved_notification();
			console.log(lili_out);
			if (lili_out !== null) {
				chrome.tabs.create({ url: `${WEBSITE_URL}/lili/${lili_out.id}` });
			}
		} catch {
			console.log('error saving tabs');
		} finally {
			awaiting_tabs_save = false;
		}
	};

	const open_workspace = () => {
		console.log('open workspace');
		chrome.tabs.create({
			url: `${WEBSITE_URL}/lili/${$account_info_store!.workspace_id}`
		});
	};

	const check_login = async () => {
		// checks if logged in, tries refresh if not, sets account_info_store
		try {
			let account_info = await AuthService.checkAuthAuthCheckAuthGet();
			if (account_info) {
				console.log('logged in');
				$account_info_store = account_info;
			} else {
				console.log('not logged in');
				try {
					await AuthService.refreshTokensAuthRefreshTokensPost();
				} catch {}
				let account_info = await AuthService.checkAuthAuthCheckAuthGet();
				if (account_info) {
					console.log('logged in after refresh');
					$account_info_store = account_info;
				} else {
					console.log('not logged in after refresh');
					$account_info_store = null;
				}
			}
		} catch {
			console.log('error logging in');
			$account_info_store = null;
		}
	};

	onMount(async () => {
		// just check/refresh every time you open the thing. maybe not the best idea
		// but for now it's ok, no custom re-login if unauthorized bs.
		// this would only break client side if someone leaves the extension open for >15 mins
		check_login();
	});
</script>

{#if $account_info_store}
	<div class="flex flex-col gap-2 p-4 min-w-48" class:w-96={saving_tabs}>
		{#if show_saved}
			<button class="btn variant-ghost-primary rounded h-36 w-full" on:click={open_workspace}>
				<i class="fas fa-check w-8 p-1"></i>
				<span> Saved</span>
			</button>
		{:else}
			<!-- This HIDDEN button is only here because otherwise the button has an expansion animation when opening the extension, idk why. -->
			<button class="btn variant-ghost rounded h-12 hidden w-full">
				<span> Placeholder</span>
			</button>
			<button
				class="btn variant-ghost rounded h-12 w-full"
				on:click={save_current_link}
				disabled={awaiting_single_link_save}
			>
				<i class="fas fa-bookmark w-8 p-1"></i>
				<span> Save URL</span>
			</button>
			{#if saving_tabs}
				<div class="flex gap-2 items-center">
					<input
						type="text"
						class="input w-full"
						placeholder="LinkLink Name"
						bind:value={linklink_name}
						bind:this={input_box}
						on:focus={() => {
							input_box.select();
						}}
						disabled={awaiting_tabs_save}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								save_all_tabs();
							}
						}}
					/>
					<button class="btn variant-ghost rounded h-12 w-12" disabled={awaiting_tabs_save}>
						<i class="fas fa-save w-8 p-1"></i>
					</button>
				</div>
			{:else}
				<button
					class="btn variant-ghost rounded h-12 w-full"
					on:click={async () => {
						saving_tabs = true;
						await tick();
						input_box.focus();
					}}
				>
					<i class="fas fa-save w-8 p-1"></i>
					<span> Save All Tabs</span>
				</button>
			{/if}

			<button class="btn variant-ghost rounded h-12 w-full" on:click={open_workspace}>
				<i class="fas fa-share w-8 p-1"></i>
				<span> Workspace</span>
			</button>
		{/if}
		<div class="flex items-center justify-start gap-2">
			{#if $account_info_store.profile_picture_url}
				<Avatar
					src={$account_info_store?.profile_picture_url ?? ''}
					initials={get_initals($account_info_store?.name ?? '')}
					width="w-11"
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					on:click={() => {
						chrome.tabs.create({ url: `${WEBSITE_URL}/profile` });
					}}
				/>
			{/if}
			<span class="font-bold italic">@{$account_info_store.username}</span>
		</div>
	</div>
{:else}
	<div class="p-4">
		<button
			class="btn variant-ghost rounded hover:underline h-12 w-32"
			on:click={() => {
				chrome.tabs.create({ url: `${WEBSITE_URL}/login` });
			}}
		>
			<i class="fas fa-sign-in-alt w-8"></i>
			<span>Login</span>
		</button>
	</div>
{/if}
