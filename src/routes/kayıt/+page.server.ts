import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	kayıt: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { error } = await locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later.'
			});
		}

		throw redirect(303, '/');
	}
};
