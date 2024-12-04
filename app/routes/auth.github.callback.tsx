import { type LoaderFunctionArgs, redirect } from "react-router"
import { getSupabaseServerClient } from "~/supabase/supabase.server"

export async function loader({ request }: LoaderFunctionArgs) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get("code")
	const headersToSet = new Headers()
	const { supabase, headers } = getSupabaseServerClient(request, headersToSet)

	if (!code) {
		return redirect("/login")
	}

	const { error } = await supabase.auth.exchangeCodeForSession(code)
	if (error) {
		return redirect("/login")
	}

	throw redirect("/dashboard", { headers })
}
