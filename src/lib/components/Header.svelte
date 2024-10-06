<script>
    import { page } from '$app/stores';
    import { WEBSITE_URL } from '$lib/constants.ts';
    import Logo3 from '$lib/components/logo/logo3.svelte';
    import { pinned_extension_page } from '$lib/stores.ts';
</script>
<div class="flex justify-between items-center align-middle px-6 pt-4">
    <a class="variant-ringed-error rounded text-sm min-w-20 flex flex-nowrap items-center py-2 align-middle gap-2 justify-center"
     class:variant-ringed-error={true}
     class:hover:variant-glass-error={true}
     class:invisible={'/index.html' === $page.url.pathname || '/' === $page.url.pathname}
     href="/"
       on:click={() => {$pinned_extension_page = null;}}
    >
      <i class="fas fa-caret-left"></i>
      <span>Back</span>
    </a>
    <button class="relative w-full h-10 flex items-center justify-items-center justify-center align-middle
      hover:scale-110 transition ease-in-out duration-300"
    on:click={() => {
      chrome.tabs.create({ url: `${WEBSITE_URL}` });
    }}
    >
      <Logo3/>
    </button>
    <div class="min-w-20"></div>
  </div>