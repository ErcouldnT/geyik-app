<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { Avatar, FileDropzone } from '@skeletonlabs/skeleton';

	export let data;

	let nickname = '';
	$: {
		nickname = nickname.toLowerCase().replaceAll(' ', '');
		if (!nickname.startsWith('@')) {
			nickname = '@' + nickname;
		}
		if (nickname === '@') {
			nickname = '';
		}
	}

	let isim = '';
	$: isim = isim.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());

	let kvkk = false;
	let kurallar = false;
	let letsGo = false;

	let isUploadingAvatar = false;
	let errorUploadingAvatar = false;

	let files: FileList;
	let avatarUrl =
		'https://qmcmuhpqtxdqkpkohtfs.supabase.co/storage/v1/object/public/profiles/pps/monsters.png';

	const checkAvatar = async () => {
		const url =
			'https://qmcmuhpqtxdqkpkohtfs.supabase.co/storage/v1/object/public/profiles/' +
			data.session?.user.id +
			'/avatar.jpg';
		const res = await fetch(url);
		if (res.ok) {
			avatarUrl = url;
		}
	};

	onMount(async () => {
		await checkAvatar();
	});

	const onUploadAvatarHandler = async (e: Event): Promise<void> => {
		isUploadingAvatar = true;
		errorUploadingAvatar = false;
		const avatarFile = files[0];
		// delete previous avatar
		await data.supabase.storage.from('profiles').remove([data.session?.user.id + '/avatar.jpg']);
		// upload new one
		const { data: avatar, error } = await data.supabase.storage
			.from('profiles')
			.upload(data.session?.user.id + '/avatar.jpg', avatarFile);
		if (error) {
			errorUploadingAvatar = true;
			// console.log(error);
		}
		isUploadingAvatar = false;
		await checkAvatar();
	};

	$: letsGo = kvkk && kurallar && Boolean(nickname) && Boolean(isim);
</script>

<!-- <h1>Geyik'e hoşgeldin</h1> -->
<!-- <p>Size nasıl seslenelim?</p> -->

<FileDropzone name="files" bind:files on:change={onUploadAvatarHandler}>
	<svelte:fragment slot="lead">
		<div class="flex justify-center items-center">
			<Avatar src={avatarUrl} width="w-32" rounded="rounded-full" />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="message"
		><div>
			{#if errorUploadingAvatar}
				<p class="variant-filled-primary">Yanlış dosya</p>
			{/if}
			{isUploadingAvatar ? 'Yükleniyor...' : 'Avatar yüklemek için tıkla veya sürükle'}
		</div></svelte:fragment
	>
	<svelte:fragment slot="meta">~5 MB PNG, JPG veya GIF yükleyebilirsin.</svelte:fragment>
</FileDropzone>

<form action="?/profil" method="POST" class="w-full flex flex-col gap-2" use:enhance>
	<label class="label">
		<span>Kullanıcı adı <span class="font-thin text-xs">(zorunlu)</span></span>
		<input
			bind:value={nickname}
			class="input"
			type="text"
			name="nickname"
			placeholder=""
			required
		/>
	</label>
	<label class="label">
		<span>Ad Soyad <span class="font-thin text-xs">(zorunlu)</span></span>
		<input bind:value={isim} class="input" type="text" name="isim" placeholder="" required />
	</label>
	<label class="label">
		<span>Token sayısı</span>
		<input class="input" type="text" name="token" placeholder="100" disabled />
	</label>
	<label class="label">
		<span>Profil durumu</span>
		<select class="select" name="visibility" value={'Herkese açık'} required>
			<option value={'Herkese açık'}>Herkese açık</option>
			<option value={'Gizli'}>Gizli</option>
		</select>
	</label>
	<label class="label">
		<span>İmza <span class="font-thin text-xs">(Her mesajınızın altında görünür.)</span></span>
		<textarea class="input" name="imza" placeholder="" rows="3" />
	</label>
	<label class="label flex gap-2 items-center">
		<input bind:checked={kvkk} class="checkbox" type="checkbox" name="kvkk" required />
		<span class="text-sm">KVKK için izin veriyorum.</span>
	</label>
	<label class="label flex gap-2 items-center">
		<input bind:checked={kurallar} class="checkbox" type="checkbox" name="rules" required />
		<span class="text-sm">Geyik kurallarını okudum ve sözleşmeyi onaylıyorum.</span>
	</label>

	<button type="submit" class="btn {letsGo ? 'variant-filled-success' : 'variant-filled-primary'}"
		>{letsGo ? 'Geyik yapmaya hazırım!' : 'Lütfen formu doldurun.'}</button
	>
	<p class="italic">Şimdilik bu bilgileri daha sonradan değiştiremezsiniz.</p>
</form>
