import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	const { data, error: err } = await supabase.from('forumlar').select().eq('slug', params.forum);

	// if (err) {
	// 	throw error(500, 'Database');
	// }

	if (data?.length) {
		return {
			forum: data[0]
		};
	}

	throw error(404, 'Forum bulunamadı');
};
