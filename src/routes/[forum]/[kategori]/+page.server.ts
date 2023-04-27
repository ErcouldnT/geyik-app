import { error, fail } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import slugify from '$lib/slugify.js';

export const load = async ({ params, locals: { supabase } }) => {
	const { data } = await supabase.from('kategoriler').select().eq('slug', params.kategori);

	if (data?.length) {
		const kategori = data[0];
		const { data: konular } = await supabase.from('konular').select().eq('kategori', kategori.id);
		// kategori.konular = konular;
		const session = await supabase.auth.getSession();
		const isOwner = session.data.session?.user.id === kategori.owner;
		return {
			kategori,
			konular,
			isOwner
		};
	}

	throw error(404, 'Kategori bulunamadı');
};

export const actions = {
	async yeni({ request, locals: { supabase, getSession } }) {
		const formData = await request.formData();
		// const forum = formData.get('forum') as string;
		const kategori = formData.get('kategori') as number | null;
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;

		const session = await getSession();
		const author = session?.user.id as string;

		const { error } = await supabase.from('konular').insert({
			title,
			content,
			author,
			kategori,
			slug: slugify(title)
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
