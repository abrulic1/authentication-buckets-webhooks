import { Github, SmartphoneNfc } from "lucide-react"
import { type ActionFunctionArgs, Form, Link, redirect, useSubmit } from "react-router"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import { loginSchema } from "~/schemas/login-schema"
import { getSupabaseServerClient } from "~/supabase/supabase.server"

//TODO add loader to check if user is already logged in, in that case redirect to dashboard

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	const parsedData = loginSchema.safeParse(data)
	if (!parsedData.success) {
		return { error: "Invalid input" }
	}

	const { email, password } = parsedData.data
	const headersToSet = new Headers()
	const { supabase, headers } = getSupabaseServerClient(request, headersToSet)

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return { error }
	}

	return redirect("/dashboard", {
		headers,
	})
}

//TODO show form validations
export default function Login() {
	const submit = useSubmit()
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
					<p className="mt-2 text-sm text-gray-600">
						Or{" "}
						<Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
							create a new account
						</Link>
					</p>
				</div>
				<Form method="POST" className="mt-8 space-y-6">
					<div className="space-y-4 rounded-md shadow-sm">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" autoComplete="email" className="mt-1" required name="email" />
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="mt-1"
							/>
						</div>
					</div>
					<div className="text-sm flex justify-end text-end">
						<Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
							Forgot your password?
						</Link>
					</div>
					<Button type="submit" className="w-full">
						Sign in
					</Button>
				</Form>
				<Separator text="or" />
				<div className="grid gap-2">
					<Button variant="outline" className="w-full" onClick={() => {}}>
						<SmartphoneNfc className="mr-2 h-4 w-4" />
						Continue with OTP
					</Button>
					<Button
						variant="outline"
						className="w-full"
						onClick={() => submit(null, { action: "/auth/github", method: "POST" })}
					>
						<Github className="mr-2 h-4 w-4" />
						Continue with GitHub
					</Button>
				</div>
			</div>
		</div>
	)
}
