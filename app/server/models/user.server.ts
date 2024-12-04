// export const hashPassword = (password: User["password"]) => bcrypt.hash(password, 10)

const getUser = async (params: { userId: string }) => {
	const { data, error } = await supabase
		.from("users") // Replace 'users' with your table name
		.select("*")
		.eq("id", params.userId)
		.single()
}
