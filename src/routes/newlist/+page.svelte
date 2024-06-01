<script>
    import NewLinkLink from '$lib/components/NewLinkLink.svelte';
    import ProfileComponent from '$lib/components/ProfileComponent.svelte';
    import SaveTabs from '$lib/components/SaveTabs.svelte';
</script>

<div class="flex flex-col gap-2 p-4 min-w-96">
    <NewLinkLink />
    <SaveTabs />

    <ProfileComponent />
</div>
