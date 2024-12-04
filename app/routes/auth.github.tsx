import { type ActionFunctionArgs, redirect } from "react-router"
import { getSupabaseServerClient } from "~/supabase/supabase.server"
export const loader = () => redirect("/login")

export const action = async ({ request }: ActionFunctionArgs) => {
	const headers = new Headers()
	const supabase = getSupabaseServerClient(request, headers)
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `http://localhost:4280/auth/github/callback`,
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

	return redirect("/login")
}
