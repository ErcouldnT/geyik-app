import { error, fail } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import slugify from '$lib/slugify.js';

export const load = async ({ params, locals: { supabase } }) => {
	const { data } = await supabase.from('forumlar').select().eq('slug', params.forum);

	if (data?.length) {
		const forum = data[0];
		const { data: kategoriler } = await supabase.from('kategoriler').select().eq('forum', forum.id);
		// forum.kategoriler = kategoriler;
		const session = await supabase.auth.getSession();
		const isAdmin = session.data.session?.user.id === forum.admin;
		return {
			forum,
			kategoriler,
			isAdmin
		};
	}

	throw error(404, 'Forum bulunamadı');
};

export const actions = {
	async yeni({ request, locals: { supabase, getSession } }) {
		const formData = await request.formData();
		const forum = formData.get('forum') as number | null;
		const kategori = formData.get('kategori') as string;

		const session = await getSession();
		const owner = session?.user.id;

		const { error } = await supabase.from('kategoriler').insert({
			name: kategori,
			forum,
			owner,
			slug: slugify(kategori)
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Bir hata oluştu.',
					values: {
						kategori
					}
				});
			}
			return fail(500, {
				error: 'Sunucu hatası. Data sonra tekrar deneyin.',
				values: {
					kategori
				}
			});
		}

		return { success: true };
	}
};
