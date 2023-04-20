<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	// import { onMount } from 'svelte';

	export let data;

	// $: ({ supabase, session } = data);

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await data.supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<main class="flex flex-col gap-2">
	{#if data.session}
		<p>Hoşgeldin {data.session.user.email}</p>
		<form class="grid" action="/çıkış" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="btn variant-filled-error">Çıkış yap</button>
		</form>

		<a href="/yeni" type="submit" class="btn variant-filled-success">Yeni forum aç</a>
	{:else}
		<h1 class="my-2">Oopss...</h1>
		<p class="italic">Merak etme! İçeri giriş buradan...</p>
		<div class="grid grid-cols-2 gap-1">
			<a href="/giriş" type="button" class="btn variant-filled-success">Hesabım zaten var</a>
			<a href="/kayıt" type="button" class="btn variant-filled-warning">Hesabım yok</a>
		</div>
	{/if}

	<div class="py-5 flex flex-col gap-2">
		<h2>Geyik Forumlar</h2>
		<nav class="list-nav">
			<ul>
				{#each data.forumlar || [] as forum (forum.id)}
					<li>
						<a href={forum.slug}>
							<span class="badge text-xl text-fuchsia-600">></span>
							<span class="flex-auto">{forum.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div />
	</div>
</main>
