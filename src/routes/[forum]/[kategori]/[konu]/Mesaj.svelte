<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from './../../../../types/supabase';
	import dateDistance from '$lib/dateDistance.js';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let yorum: Database['public']['Tables']['yorumlar']['Row'];
	export let supabase: SupabaseClient<Database>;

	let nickname: string;
	let fullname: string;
	let avatarUrl =
		'https://qmcmuhpqtxdqkpkohtfs.supabase.co/storage/v1/object/public/profiles/pps/monsters.png';
	let timePassed: string;

	const timeCalculator = () => {
		timePassed = dateDistance(yorum.created_at);
	};

	const getUserName = async () => {
		const { data: profil } = await supabase
			.from('profiles')
			.select()
			.eq('user_id', yorum.author)
			.single();
		// nickname = profil?.nickname || yorum.author;
		fullname = profil?.fullname || '';
		nickname = profil?.nickname || '';
	};

	const checkAvatar = async () => {
		const url =
			'https://qmcmuhpqtxdqkpkohtfs.supabase.co/storage/v1/object/public/profiles/' +
			yorum.author +
			'/avatar.jpg';
		const res = await fetch(url);
		if (res.ok) {
			avatarUrl = url;
		}
	};

	onMount(async () => {
		await checkAvatar();
		await getUserName();
		timeCalculator();
		setInterval(timeCalculator, 1000 * 30);
	});
</script>

{#if nickname}
	<div class="flex gap-2 space-y-2 relative my-1">
		<div class="flex flex-col items-center m-2">
			<Avatar
				border="border-4 	border-surface-300-600-token hover:!border-primary-500"
				cursor="cursor-pointer"
				src={avatarUrl}
				width="w-24"
				rounded="rounded-full"
			/>
			<p class="chip">@{nickname}</p>
		</div>
		<div>
			<p class="py-5 text-justify">{yorum.content}</p>
			<!-- <p>{fullname}</p> -->
			<p class="absolute right-0 top-0">({timePassed} önce)</p>
		</div>
	</div>
{/if}
