<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data;

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
		<form action="/çıkış" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="btn variant-filled-error">Çıkış yap</button>
		</form>
	{:else}
		<h1 class="my-2">Oopss...</h1>
		<p class="italic">Merak etme! İçeri giriş buradan...</p>
		<div class="grid grid-cols-2 gap-1">
			<a href="/giriş" type="button" class="btn variant-filled-success">Hesabım zaten var</a>
			<a href="/kayıt" type="button" class="btn variant-filled-warning">Hesabım yok</a>
		</div>
	{/if}
</main>
