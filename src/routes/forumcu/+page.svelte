<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form action="?/yarat" method="POST" class="flex flex-col gap-2" use:enhance>
	<h1 class="my-2">Forum yarat</h1>
	<label class="label">
		<span>Forum adı</span>
		<input class="input" type="text" name="forumName" placeholder="Dingo'nun ahırı" />
	</label>
	<button type="submit" class="btn variant-filled-success">Oluştur</button>
</form>
