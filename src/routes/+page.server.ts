export const load = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('forumlar').select();
	return {
		forumlar: data
	};
};
