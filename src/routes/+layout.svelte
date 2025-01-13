<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '../app.postcss';
    import ProfileComponent from '$lib/components/ProfileComponent.svelte';
    import { account_info_store } from '$lib/stores';
    export let data;

</script>


<div class="h-[600px] w-[468px] relative">
  <div class="max-h-[500px] w-full flex-1">
    <slot />
  </div>
  <div class="absolute bottom-0 left-0 right-0  backdrop-blur-xl text-white text-center p-2 flex max-h-[60px]">
    {#if $account_info_store !== null}
      <ProfileComponent />
    {/if}
  </div>
</div>