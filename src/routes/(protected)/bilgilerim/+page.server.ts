import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	async profil({ request, locals: { supabase, getSession } }) {
		const formData = await request.formData();
		// console.log(formData);

		const nickname = formData.get('nickname') as string;
		const isim = formData.get('isim') as string;
		// const token = formData.get('token') as string; // value: '100'
		// const visibility = formData.get('visibility') as string; // value: 'Herkese açık'
		const imza = formData.get('imza') as string;
		// const kvkk = formData.get('kvkk') as string; // value: 'on'
		// const rules = formData.get('rules') as string; // value: 'on'

		const session = await getSession();
		const user_id = session?.user.id;

		const { error } = await supabase.from('profiles').insert({
			user_id,
			nickname: nickname.slice(1),
			fullname: isim.trim(),
			imza: imza.trim()
		});
		// console.log(error);

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Bir hata oluştu.',
					values: {}
				});
			}
			return fail(500, {
				error: 'Sunucu hatası. Data sonra tekrar deneyin.',
				values: {}
			});
		}

		throw redirect(303, '/');
	}
};
