import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	async yarat({ request, locals: { supabase } }) {
		const formData = await request.formData();
		const forumName = formData.get('forumName') as string;

		const data = await supabase.auth.getSession();
		const admin = data.data.session?.user.id;

		const { error } = await supabase
			.from('forumlar')
			.insert({
				name: forumName,
				admin,
				slug: forumName.toLowerCase().trim().replaceAll(' ', '-')
			});
		// console.log(error);

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Bir hata oluştu.',
					values: {
						forumName
					}
				});
			}
			return fail(500, {
				error: 'Sunucu hatası. Data sonra tekrar deneyin.',
				values: {
					forumName
				}
			});
		}

		throw redirect(303, '/');
	}
};
