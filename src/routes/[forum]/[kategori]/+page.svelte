<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;
</script>

<main class="flex flex-col gap-2">
	<h1 class="my-2">{data.kategori.name}</h1>
	{#if data.session}
		<form action="?/yeni" method="POST" class="flex flex-col gap-2" use:enhance>
			<input class="hidden" bind:value={data.kategori.id} type="text" name="forum" />
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
			<button type="submit" class="btn variant-filled-success">Ekle</button>
			<p class="italic">Geyik'e üye olmuş herkes konu açabilir.</p>
		</form>
	{/if}

	<!-- {#each data.forum.kategoriler as kategori (kategori.id)}
		<a href="{data.forum.slug}/{kategori.slug}" class="cursor-pointer">{kategori.name}</a>
	{/each} -->
</main>
