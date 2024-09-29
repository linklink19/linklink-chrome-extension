<script lang="ts">
    import ListSelectorComponent from '$lib/components/ListSelectorComponent.svelte';
    import ProfileComponent from '$lib/components/ProfileComponent.svelte';
    import TopComponent from './TopComponent.svelte';
    import UserLilis from '$lib/components/UserLilis.svelte';
</script>

<div
    class="flex flex-col gap-2 p-4 min-w-[480px]"
>



    <!-- class:w-96={saving_tabs} -->
    <!-- IGNORE START -->
    <!-- This HIDDEN button is only here because otherwise the button has an expansion animation when opening the extension, idk why. -->
    <button class="btn variant-ghost rounded h-12 hidden w-full">
        <span> Placeholder</span>
    </button>
    <!-- IGNORE END -->
    <UserLilis />

<!--    <TopComponent />-->
<!--    &lt;!&ndash; <SaveLink /> &ndash;&gt;-->
<!--    <ListSelectorComponent />-->
<!--    <ProfileComponent />-->
</div>
