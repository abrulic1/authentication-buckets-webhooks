import { type ActionFunctionArgs, redirect } from "react-router"
import { getSupabaseServerClient } from "~/supabase/supabase.server"
export const loader = () => redirect("/login")

export const action = async ({ request }: ActionFunctionArgs) => {
	const headersToSet = new Headers()
	const { supabase, headers } = getSupabaseServerClient(request, headersToSet)
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: "http://localhost:4280/auth/github/callback",
		},
	})


	if (error) {
		return redirect("/login")
	}

	if (data.url) {
		throw redirect(data.url, { headers })
	}

	return redirect("/login")
}
