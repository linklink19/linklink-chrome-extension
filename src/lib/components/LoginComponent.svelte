<script lang="ts">
    import { WEBSITE_URL } from '$lib/constants';
</script>

<div class="flex flex-col p-4 w-full h-full justify-center items-center align-middle">
    <p
        class="tracking-normal text-4xl font-bold mb-8 mt-4 text-nowrap text-center"
    >
        Share Bookmarks,
        <br />
        Find Links.
    </p>
    <p class="text-center py-4">
        Linklink is a link management tool for organising and sharing links.
        Log in below to get started
    </p>
    <div class="flex gap-2 p-4 py-10">
        <a class="btn flex items-center gap-0 variant-filled-secondary hover:cursor-pointer h-10 rounded"
            href={`${WEBSITE_URL}/login`}
            target="_blank"
        >
            <p>Get Started</p>
            <i class="fas fa-chevron-right" />
        </a>
        <a
            class="btn flex items-center gap-2 variant-ringed hover:cursor-pointer h-10 rounded"
            href={WEBSITE_URL}
            target="_blank"
        >
            <p>Visit the website</p>
            <i class="fas fa-arrow-up-right-from-square" />
        </a>
    </div>

    <p class="text-lg p-3 underline start-0">Extension features</p>
    <ul class="list-disc text-left text-xl">
        <li>Save links into LinkLinks</li>
        <li>Create new LinkLinks</li>
        <li>Browse existing LinkLinks</li>
        <li>Save all tabs into LinkLinks</li>
    </ul>
</div>
