<script lang="ts">
	export let data;
</script>

<main>
	<h1>{data.forum.name}</h1>
	{#if data.isAdmin}
		<p>Admin</p>
	{/if}
</main>
