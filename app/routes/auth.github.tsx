import { type ActionFunctionArgs, redirect } from "react-router"
import { getSupabaseServerClient, refreshToken } from "~/supabase/supabase.server"
import { getSiteUrl } from "~/utils/url.server"

export const loader = () => redirect("/login")

export const action = async ({ request }: ActionFunctionArgs) => {
	const headers = new Headers()
	const supabase = getSupabaseServerClient(request, headers)
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${getSiteUrl(request)}/auth/github/callback`,
		},
	})

	if (error) {
		console.log("ERROR 🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢: ", error)
		return redirect("/login")
	}

	console.log({ data })
	if (data.url) {
		console.log("User redirected to github consent screen 🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿")
		throw redirect(data.url)
	}

	await refreshToken(supabase, data.session)
	return redirect("/login")
}
