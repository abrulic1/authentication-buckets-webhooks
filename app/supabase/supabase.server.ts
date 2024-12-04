import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr"

export const getSupabaseServerClient = (request: Request, headers: Headers) =>
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!, {
		cookies: {
			getAll() {
				return parseCookieHeader(request.headers.get("Cookie") ?? "")
			},
			setAll(cookiesToSet) {
				cookiesToSet.map(({ name, value, options }) =>
					headers.append("Set-Cookie", serializeCookieHeader(name, value, options))
				)
			},
		},
	})

export const refreshToken = async (supabase: any, previousSession: any) => {
	const {
		data: { session },
		error: refreshTokenError,
	} = await supabase.auth.refreshSession(previousSession ?? undefined)
	if (refreshTokenError || !session) return

	await supabase.auth.setSession({
		access_token: session.access_token,
		refresh_token: session.refresh_token,
	})
}
