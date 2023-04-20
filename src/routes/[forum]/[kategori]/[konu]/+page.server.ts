import { error, fail } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const load = async ({ params, locals: { supabase } }) => {
	const { data } = await supabase.from('konular').select().eq('slug', params.konu);

	if (data?.length) {
		const konu = data[0];
		const { data: yorumlar } = await supabase.from('yorumlar').select().eq('konu', konu.id);
		// konu.yorumlar = yorumlar;
		const session = await supabase.auth.getSession();
		const isAuthor = session.data.session?.user.id === konu.author;
		return {
			konu,
			yorumlar,
			isAuthor
		};
	}

	throw error(404, 'Konu bulunamadı');
};

export const actions = {
	async yeni({ request, locals: { supabase, getSession } }) {
		const formData = await request.formData();
		const konu = formData.get('konu') as number | null;
		const yorum = formData.get('yorum') as string;

		const session = await getSession();
		const author = session?.user.id;

		const { error } = await supabase.from('yorumlar').insert({
			konu,
			content: yorum.trim(),
			author
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Bir hata oluştu.',
					values: {
						yorum
					}
				});
			}
			return fail(500, {
				error: 'Sunucu hatası. Data sonra tekrar deneyin.',
				values: {
					yorum
				}
			});
		}

		return { success: true };
	}
};
