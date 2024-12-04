import type { User } from "@prisma/client"
import bcrypt from "bcryptjs"

export const hashPassword = (password: User["password"]) => bcrypt.hash(password, 10)
