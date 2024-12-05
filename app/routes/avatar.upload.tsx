import type { ActionFunction } from "react-router"
import { requireUser } from "~/server/guards.server"
import { updateAvatarUrl } from "~/server/models/user.server"
import { uploadHandler } from "~/supabase/supabase.server"

export const action: ActionFunction = async ({ request }) => {
	const clonedRequest = request.clone()
	const formData = await clonedRequest.formData()
	const avatar = formData.get("avatar")
	if (!avatar) {
		throw new Error("Avatar not found in form data")
	}
	const avatarUrl = await uploadHandler(request)
	if (!avatarUrl) {
		return { success: false, error: "failed to upload avatar" }
	}

	const { user } = await requireUser(request)
	const dbUser = await updateAvatarUrl(user.id, avatarUrl)
	return { user: dbUser }
}
