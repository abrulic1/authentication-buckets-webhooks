import { z } from "zod"

export const registerSchema = z.object({
	// fullName: z.string().min(1, "Full name is required").max(100, "Full name must be 100 characters or less"),
	// username: z
	// 	.string()
	// 	.min(3, "Username must be at least 3 characters")
	// 	.max(50, "Username must be 50 characters or less")
	// 	.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must be 50 characters or less"),
})
