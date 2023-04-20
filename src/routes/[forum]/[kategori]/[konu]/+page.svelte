<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	// export let form;
</script>

<main class="flex flex-col gap-2">
	{#if data.isAuthor}
		<p class="italic">(Bu makalenin sahibi sizsiniz.)</p>
	{/if}

	<h1 class="my-2">{data.konu.title}</h1>
	<p>{data.konu.content}</p>

	<h2>Yorumlar</h2>
	{#each data.yorumlar || [] as yorum (yorum.id)}
		<div>★ {yorum.content}</div>
		<!-- <p>{created_at}</p> -->
	{/each}

	{#if data.session}
		<form action="?/yeni" method="POST" class="flex flex-col" use:enhance>
			<input class="hidden" bind:value={data.konu.id} type="text" name="konu" />
			<label class="label">
				<span>Sen ne diyorsun?</span>
				<textarea class="input" name="yorum" rows="3" placeholder="Bence şu daha güzel!" />
			</label>
			<button type="submit" class="btn variant-filled-success">Gönder</button>
		</form>
	{:else}
		<p>Yorum yazmak için lütfen giriş yapınız.</p>
	{/if}
</main>
