<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col justify-center items-center">
	<h1>{$page.status}</h1>
	<p>{$page.error?.message}</p>
</div>
