import { redirect } from "react-router"
import { getSupabaseServerClient } from "~/supabase/supabase.server"
import { getUser } from "./models/user.server"

export const requireUser = async (request: Request) => {
	const headersToSet = new Headers()
	const { supabase } = getSupabaseServerClient(request, headersToSet)

	const { data } = await supabase.auth.getUser()
	if (!data.user) {
		//if we have return, we will get Property 'user' does not exist on type 'Response | { user: User; }' so thats why we use throw
		throw redirect("/login")
	}

	const dbUser = await getUser(data.user.id)

	if (!dbUser) {
		//if we have return, we will get Property 'user' does not exist on type 'Response | { user: User; }' so thats why we use throw
		throw redirect("/login")
	}

	return { user: { ...data.user, ...dbUser } }
}
