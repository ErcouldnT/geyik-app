<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form action="?/giriş" method="POST" class="flex flex-col gap-2" use:enhance>
	<h1 class="my-2">Girişler buradan</h1>
	<label class="label">
		<span>Email</span>
		<input class="input" type="text" name="email" placeholder="destek@geyik.app" />
	</label>
	<label class="label">
		<span>Parola</span>
		<input class="input" name="password" type="password" placeholder="******" />
	</label>
	<button type="submit" class="btn variant-filled-success">Giriş yap</button>
	<p class="italic">Hesabınızı doğruladıktan sonra giriş yapınız.</p>
</form>
