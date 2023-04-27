<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	// export let form;
</script>

<ol class="hidden md:flex breadcrumb">
	<li class="crumb"><a href="/">Geyik</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>{data.forum.name}</li>
</ol>

<main class="flex flex-col gap-2">
	<h1 class="my-2">{data.forum.name}</h1>
	{#if data.isAdmin}
		<form action="?/yeni" method="POST" class="flex flex-col gap-2" use:enhance>
			<input class="hidden" bind:value={data.forum.id} type="text" name="forum" />
			<label class="label">
				<span>Yeni kategori</span>
				<input class="input" type="text" name="kategori" placeholder="Fal bakanlar buraya" />
			</label>
			<button type="submit" class="btn variant-filled-success">Ekle</button>
		</form>
	{/if}

	{#each data.kategoriler || [] as kategori (kategori.id)}
		<a href="{data.forum.slug}/{kategori.slug}" class="cursor-pointer">{kategori.name}</a>
	{/each}
</main>
