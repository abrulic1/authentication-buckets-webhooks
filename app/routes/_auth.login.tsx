import { zodResolver } from "@hookform/resolvers/zod"
import { Github, Mail, SmartphoneNfc } from "lucide-react"
import { type ActionFunctionArgs, Form, Link, useNavigation } from "react-router"
import { getValidatedFormData } from "remix-hook-form"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"

import { loginSchema } from "~/schemas/login-schema"
const resolver = zodResolver(loginSchema)
export async function action({ request }: ActionFunctionArgs) {
	const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver)
	if (errors) {
		return { errors, defaultValues }
	}
	//do something with the data
	return { data }
}
export default function Login() {
	const navigation = useNavigation()
	const isSubmitting = navigation.state === "submitting"
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
				{/* {actionData?.error && (
					<div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
						<span className="block sm:inline">{actionData.error}</span>
					</div>
				)} */}
				<Form method="POST" className="mt-8 space-y-6">
					<div className="space-y-4 rounded-md shadow-sm">
						<div>
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" autoComplete="email" required className="mt-1" />
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
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</Button>
					<Separator text="or" />
					<div className="grid gap-2">
						<Button variant="outline" className="w-full" onClick={() => {}}>
							<SmartphoneNfc className="mr-2 h-4 w-4" />
							Continue with OTP
						</Button>
						<Button variant="outline" className="w-full" onClick={() => {}}>
							<Github className="mr-2 h-4 w-4" />
							Continue with GitHub
						</Button>
						<Button variant="outline" className="w-full" onClick={() => {}}>
							<Mail className="mr-2 h-4 w-4" />
							Continue with Google
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
