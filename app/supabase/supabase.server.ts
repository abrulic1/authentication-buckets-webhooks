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

// biome-ignore lint/nursery/noProcessEnv: <explanation>
// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const supabaseBucket = supabase.storage.from("avatars")

export async function uploadHandler(request: Request): Promise<string | null> {
	const formData = await request.formData()
	console.log("🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿", formData)
	const file = formData.get("avatar") as File | null

	if (!file) {
		throw new Error("No file uploaded")
	}

	// Read the file into a buffer
	const arrayBuffer = await file.arrayBuffer()
	const fileBuffer = Buffer.from(arrayBuffer)

	// Generate a unique filename
	const fileName = `${Date.now()}-${file.name}`

	// Upload file to Supabase bucket
	const { data, error } = await supabaseBucket.upload(fileName, fileBuffer, {
		contentType: file.type, // Use the MIME type from the uploaded file
		cacheControl: "3600",
	})

	if (error) {
		console.error("File upload error:", error.message)
		return null
	}

	// Generate and return the public URL
	const { data: dataPublicUrl } = supabaseBucket.getPublicUrl(fileName)
	return dataPublicUrl.publicUrl // Return the file's URL
}
