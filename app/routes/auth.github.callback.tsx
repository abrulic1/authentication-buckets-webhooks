import { type LoaderFunctionArgs, redirect } from "react-router"
import { getSupabaseServerClient } from "~/supabase/supabase.server"

export async function loader({ request }: LoaderFunctionArgs) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get("code")
	const headers = new Headers()
	const { supabase } = getSupabaseServerClient(request, headers)

	if (!code) {
		console.log("NEMA CODA")
		return redirect("/login")
	}

	const { data, error } = await supabase.auth.exchangeCodeForSession(code)
	if (error) {
		console.log("ERROR PRILIKOM EXCHANGEA")
		console.log({ error })
		return redirect("/login")
	}

	const githubProvider = (data.user.identities || []).find((identity) => identity.provider === "github")
	const currentSessionProviderId = data.session.user.user_metadata.provider_id
	const providerToken = data.session.provider_token

	if (currentSessionProviderId === githubProvider?.id) {
		if (providerToken) {
			const { error } = await supabase.auth.updateUser({
				data: {
					providerToken: providerToken,
				},
			})

			if (error) {
				console.log("Error updating user: ", error)
				return redirect("/login")
			}
		} else {
			console.log("NO GITHUB TOKEN FOUND")
		}
	}

	throw redirect("/dashboard")
}
