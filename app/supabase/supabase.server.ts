import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr"

export const getSupabaseServerClient = (request: Request, headers: Headers) =>
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	{
		const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!, {
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get("Cookie") ?? "")
				},
				setAll(cookiesToSet) {
					for (const { name, value, options } of cookiesToSet) {
						headers.append("Set-Cookie", serializeCookieHeader(name, value, options))
					}
				},
			},
		})
		return { supabase, headers }
	}
