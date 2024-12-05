import { type ActionFunctionArgs, redirect } from "react-router"
import { getSupabaseServerClient } from "~/supabase/supabase.server"

export const action = async ({ request }: ActionFunctionArgs) => {
	const headersToSet = new Headers()
	const { supabase, headers } = getSupabaseServerClient(request, headersToSet)
	const { error } = await supabase.auth.signOut()

	if (error) {
		return { error: error.message }
	}

	return redirect("/login", {
		headers,
	})
}
