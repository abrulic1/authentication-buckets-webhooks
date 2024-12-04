import { zodResolver } from "@hookform/resolvers/zod"
import { type ActionFunctionArgs, Form, Link, redirect, useNavigation } from "react-router"
import { getValidatedFormData } from "remix-hook-form"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { registerSchema } from "~/schemas/register-schema"
import { getSupabaseServerClient } from "~/supabase/supabase.server"
const resolver = zodResolver(registerSchema)

export async function action({ request }: ActionFunctionArgs) {
	const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver)
	if (errors) {
		return { errors, defaultValues }
	}

	const { email, password } = data
	const headersToSet = new Headers()
	const { supabase, headers } = getSupabaseServerClient(request, headersToSet)

	const { error: supaError } = await supabase.auth.signUp({
		email,
		password,
	})

	if (supaError) {
		return { errors: supaError }
	}

	return redirect("/dashboard", {
		headers,
	})
}
export default function Register() {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === "submitting"
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
					<p className="mt-2 text-sm text-gray-600">
						Already have an account?{" "}
						<Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
							Sign in
						</Link>
					</p>
				</div>
				<Form method="post" className="mt-8 space-y-6">
					<div className="space-y-4 rounded-md shadow-sm">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" autoComplete="email" required className="mt-1" />
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" required className="mt-1" />
						</div>
					</div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Creating account..." : "Create account"}
					</Button>
				</Form>
			</div>
		</div>
	)
}
