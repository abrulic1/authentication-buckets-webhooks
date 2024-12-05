import type { ActionFunction } from "react-router"
import { requireUser } from "~/server/guards.server"
import { removeAvatarUrl } from "~/server/models/user.server"

export const action: ActionFunction = async ({ request }) => {
	const { user } = await requireUser(request)
	const dbUser = await removeAvatarUrl(user.id)
	return { user: dbUser }
}
