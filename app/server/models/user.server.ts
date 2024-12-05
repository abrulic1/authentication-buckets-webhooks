import type { profiles } from "@prisma/client"
import { db } from "~/utils/db.server"

export const getUser = (id: profiles["id"]) =>
	db.profiles.findFirst({
		where: {
			id,
		},
	})

export const updateAvatarUrl = (id: profiles["id"], avatarUrl: string) =>
	db.profiles.update({
		where: { id },
		data: { avatarUrl },
	})

export const removeAvatarUrl = (id: profiles["id"]) =>
	db.profiles.update({
		where: { id },
		data: { avatarUrl: null },
	})
