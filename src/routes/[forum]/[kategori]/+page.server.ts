import { error, fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const load = async ({ params, locals: { supabase } }) => {
	const { data, error: err } = await supabase
		.from('kategoriler')
		.select()
		.eq('slug', params.kategori);

	// if (err) {
	// 	throw error(500, 'Database');
	// }

	if (data?.length) {
		const kategori = data[0];
		// const { data: kategoriler } = await supabase.from('kategoriler').select().eq('forum', forum.id);
		// forum.kategoriler = kategoriler;
		const session = await supabase.auth.getSession();
		const isOwner = session.data.session?.user.id === kategori.owner;
		return {
			kategori,
			isOwner
		};
	}

	throw error(404, 'Kategori bulunamadı');
};

export const actions = {
	async yeni({ request, locals: { supabase, getSession } }) {
		const formData = await request.formData();
		// const forum = formData.get('forum') as string;
		const kategori = formData.get('kategori') as string;
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;

		const session = await getSession();
		const author = session?.user.id;

		const { error } = await supabase.from('konular').insert({
			title,
			content,
			author,
			kategori,
			slug: title.toLowerCase().trim().replaceAll(' ', '-')
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Bir hata oluştu.',
					values: {
						title
					}
				});
			}
			return fail(500, {
				error: 'Sunucu hatası. Data sonra tekrar deneyin.',
				values: {
					title
				}
			});
		}

		return { success: true };
	}
};
