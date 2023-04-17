import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase } }) => {
	const { data, error: err } = await supabase.from('forumlar').select().eq('slug', params.forum);

	// if (err) {
	// 	throw error(500, 'Database');
	// }

	if (data?.length) {
		const forum = data[0];
		const session = await supabase.auth.getSession();
		const isAdmin = session.data.session?.user.id === forum.admin;
		return {
			forum,
			isAdmin
		};
	}

	throw error(404, 'Forum bulunamadı');
};
