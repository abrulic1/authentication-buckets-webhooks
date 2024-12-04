import type { ActionFunction } from "react-router"
import { requireUser } from "~/server/guards.server"
import { getSupabaseServerClient, uploadHandler } from "~/supabase/supabase.server"

export const action: ActionFunction = async ({ request }) => {
	// Clone the request before consuming the body
	const clonedRequest = request.clone()

	// Extract the form data from the cloned request
	const formData = await clonedRequest.formData()
	const avatar = formData.get("avatar")

	if (!avatar) {
		throw new Error("Avatar not found in form data")
	}

	// Handle the avatar upload (using the original request)
	const avatarUrl = await uploadHandler(request)

	// Initialize the headers and supabase client
	const headersToSet = new Headers()
	const { supabase, headers } = getSupabaseServerClient(request, headersToSet)

	// Get the authenticated user
	const { user } = await requireUser(request)

	// Update the avatar URL for the current user in the "profiles" table
	const { data, error } = await supabase
		.from("profiles")
		.update({ avatarUrl }) // Update the `avatarUrl` column
		.eq("id", user.id) // Match the `id` with the current user's ID

		console.log("🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿", user.id)
	if (error) {
		console.error("Error updating avatar URL:", error.message)
		return { success: false, error: error.message }
	}

	console.log("☃️☃️☃️☃️☃️☃️☃️☃️", data)

	console.log("Avatar URL updated successfully")
	return null
}
