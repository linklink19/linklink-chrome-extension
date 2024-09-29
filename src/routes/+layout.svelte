<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '../app.postcss';
    import { fly } from 'svelte/transition'
    import ProfileComponent from '$lib/components/ProfileComponent.svelte';
    import Logo3 from '$lib/components/logo/logo3.svelte';
    import { WEBSITE_URL } from '$lib/constants';
    export let data;
</script>


{#key data.url}
<div
  in:fly={{ x: -200, duration: 300, delay: 300 }}
  out:fly={{ x: 200, duration: 300 }}
  class="min-w-[480px] min-h-[600px] max-w-[480px] max-h-[600px] relative"
>
  <button class="relative w-full h-10 flex items-center justify-items-center justify-center pt-4 align-middle hover-glow"
  on:click={() => {
    chrome.tabs.create({ url: `${WEBSITE_URL}` });
  }}
  >
    <Logo3/>
  </button>
  <div class="max-h-[500px] max-w-full flex-1">
    <slot />
  </div>

  <div class="absolute bottom-0 left-0 right-0  backdrop-blur-xl text-white text-center p-2 flex max-h-[60px]">
    <ProfileComponent />
  </div>
</div>
{/key}

<style>
    .hover-glow::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 70%;
    background: rgba(255, 255, 255, 0.5); /* Adjust color and opacity as needed */
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    pointer-events: none; /* Prevent interfering with element's interactions */
    filter: blur(20px);
  }

  .hover-glow:hover::before {
    opacity: 1;
  }
</style>