// src/routes/+layout.server.ts

import { redirect } from '@sveltejs/kit';

export const load = async ({ route, locals: { supabase, getSession } }) => {
	const session = await getSession();

	const profile = await supabase.from('profiles').select().eq('user_id', session?.user.id).single();

	if (session && !profile.data && route.id !== '/(protected)/bilgilerim') {
		throw redirect(302, '/bilgilerim');
	}

	// Bilgilerim sayfasına kullanıcı tekrar ulaşamaz.
	// Bilgileri düzenleme özelliği eklenince bunu kaldır.
	if (session && profile.data && route.id === '/(protected)/bilgilerim') {
		throw redirect(302, '/');
	}

	return {
		session
	};
};
