<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	// export let form;
</script>

<main class="flex flex-col gap-2">
	<h1 class="my-2">{data.kategori.name}</h1>

	{#each data.konular || [] as konu (konu.id)}
		<a href="{data.kategori.slug}/{konu.slug}" class="cursor-pointer">{konu.title}</a>
	{/each}

	{#if data.session}
		<form action="?/yeni" method="POST" class="flex flex-col gap-2" use:enhance>
			<input class="hidden" bind:value={data.kategori.id} type="text" name="kategori" />
			<label class="label">
				<span>Başlık</span>
				<input class="input" type="text" name="title" placeholder="AMD mi, Intel mi?" />
			</label>
			<label class="label">
				<span>İçerik</span>
				<textarea
					class="input"
					name="content"
					rows="5"
					placeholder="İşlemci bozuldu, ne yapmam lazım?"
				/>
			</label>
			<button type="submit" class="btn variant-filled-success">Konu aç</button>
		</form>
	{/if}
	<p class="italic">Geyik'e üye olmuş herkes konu açabilir.</p>
</main>
