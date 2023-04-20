import { error } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	const { data, error: err } = await supabase.from('forumlar').select();

	if (err) {
		throw error(500, err);
	}

	return {
		forumlar: data
	};
};
