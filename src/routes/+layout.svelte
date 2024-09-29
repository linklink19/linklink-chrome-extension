<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '../app.postcss';
    import { fly } from 'svelte/transition'
    export let data;
</script>


{#key data.url}
  <div
    in:fly={{ x: -200, duration: 300, delay: 300 }}
    out:fly={{ x: 200, duration: 300 }}
    class="flex flex-col min-w-[480px] min-h-[600px] min-h-24"
  >
    <slot />
  </div>
{/key}

