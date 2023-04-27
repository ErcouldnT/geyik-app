<script lang="ts">
	// import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Mesaj from './Mesaj.svelte';

	export let data;
	// export let form;
	// $: mesajlar = data.yorumlar?.sort((a, b) => Number(a.created_at) - Number(b.created_at));

	// onMount(() => {});

	// const scrollToTop = () => {
	// 	window.scrollTo({ top: 0, behavior: 'smooth' });
	// };
</script>

<ol class="hidden md:flex breadcrumb">
	<li class="crumb"><a href="/">Forum</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/">Kategori</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>{data.konu.title}</li>
</ol>

<main class="flex flex-col gap-2">
	{#if data.isAuthor}
		<p class="italic">(Bu makalenin sahibi sizsiniz.)</p>
	{/if}

	<h1 class="my-2 underline break-words">{data.konu.title}</h1>
	<p class="text-justify">{data.konu.content}</p>

	<div class="space-y-2 my-5">
		<div class="flex space-x-1">
			<h3 class="underline">Cevaplar</h3>
			<div class="font-thin text-xl">{data.yorumlar?.length}</div>
		</div>
		{#each data.yorumlar || [] as yorum, i (yorum.id)}
			<Mesaj {yorum} supabase={data.supabase} hashtag={i + 1} />
		{/each}
	</div>

	{#if data.session}
		<form action="?/yeni" method="POST" class="flex flex-col" use:enhance>
			<input class="hidden" bind:value={data.konu.id} type="text" name="konu" />
			<label class="label">
				<span>Sen ne diyorsun?</span>
				<textarea class="input" name="yorum" rows="3" placeholder="Bence şu daha güzel!" />
			</label>
			<button type="submit" class="btn variant-filled-success after:content-['_↗']">Gönder</button>
		</form>
	{:else}
		<p>Yorum yazabilmek için lütfen <a href="/giriş">giriş</a> yapınız.</p>
	{/if}
</main>
