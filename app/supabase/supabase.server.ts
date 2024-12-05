import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"

export const getSupabaseServerClient = (request: Request, headers: Headers) => {
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
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

// biome-ignore lint/nursery/noProcessEnv: <explanation>
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!)
export const supabaseBucket = supabase.storage.from("avatars")

export async function uploadHandler(request: Request): Promise<string | null> {
	const formData = await request.formData()
	const file = formData.get("avatar") as File | null //never use "as" but for demo purpose it can be like this

	if (!file) {
		throw new Error("No file uploaded")
	}

	const arrayBuffer = await file.arrayBuffer()
	const fileBuffer = Buffer.from(arrayBuffer)
	const fileName = `${Date.now()}-${file.name}`
	const { error } = await supabaseBucket.upload(fileName, fileBuffer, {
		contentType: file.type,
		cacheControl: "3600",
	})

	if (error) {
		return null
	}

	const { data: dataPublicUrl } = supabaseBucket.getPublicUrl(fileName)
	return dataPublicUrl.publicUrl
}
