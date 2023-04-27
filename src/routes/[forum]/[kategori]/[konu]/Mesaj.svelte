<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { Database } from './../../../../types/supabase';
	import dateDistance from '$lib/dateDistance.js';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let yorum: Database['public']['Tables']['yorumlar']['Row'];
	export let supabase: SupabaseClient<Database>;
	export let hashtag: number;

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
	<div class="border-primary-500 rounded py-2 space-y-2">
		<div class="flex justify-between">
			<div class="flex space-x-2">
				<Avatar
					border="border-4 	border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					src={avatarUrl}
					width="w-12"
					rounded="rounded-full"
				/>
				<div>
					<div class="text-sm">{fullname}</div>
					<div class="text-sm font-thin">@{nickname}</div>
				</div>
			</div>
			<div>
				<div class="text-right font-thin">#{hashtag}</div>
				<div class="text-sm">{timePassed} önce</div>
			</div>
		</div>
		<div>
			<p class="text-justify">{yorum.content}</p>
		</div>
	</div>
	<hr />
{/if}
