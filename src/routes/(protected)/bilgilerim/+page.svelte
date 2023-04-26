<script lang="ts">
	import { enhance } from '$app/forms';

	let kvkk = false;
	let kurallar = false;
	let letsGo = false;

	$: letsGo = kvkk && kurallar;
</script>

<h1>Geyik'e hoşgeldin</h1>
<p>Size nasıl seslenelim?</p>

<form action="?/profil" method="POST" class="w-full flex flex-col gap-2" use:enhance>
	<label class="label">
		<span>Kullanıcı adı <span class="font-thin text-xs">(zorunlu)</span></span>
		<input class="input" type="text" name="nickname" placeholder="" required />
	</label>
	<label class="label">
		<span>Tam adınız <span class="font-thin text-xs">(zorunlu)</span></span>
		<input class="input" type="text" name="isim" placeholder="" required />
	</label>
	<label class="label">
		<span>Token sayısı</span>
		<input class="input" type="text" name="token" placeholder="100" disabled />
	</label>
	<label class="label">
		<span>Profil durumu</span>
		<select class="select" name="secret" value={'Herkese açık'} required>
			<option value={'Herkese açık'}>Herkese açık</option>
			<option value={'Gizli'}>Gizli</option>
		</select>
	</label>
	<label class="label">
		<span>İmza <span class="font-thin text-xs">(Her mesajınızın altında görünür.)</span></span>
		<textarea class="input" name="imza" placeholder="" rows="3" />
	</label>
	<label class="label flex gap-2 items-center">
		<input bind:checked={kvkk} class="checkbox" type="checkbox" required />
		<span class="text-sm">KVKK için izin veriyorum.</span>
	</label>
	<label class="label flex gap-2 items-center">
		<input bind:checked={kurallar} class="checkbox" type="checkbox" required />
		<span class="text-sm">Geyik kurallarını okudum ve sözleşmeyi onaylıyorum.</span>
	</label>
	<button type="submit" class="btn {letsGo ? 'variant-filled-success' : 'variant-filled-primary'}"
		>Geyik yapmaya hazırım</button
	>
	<p class="italic">Şimdilik bu bilgileri daha sonradan değiştiremezsiniz.</p>
</form>
