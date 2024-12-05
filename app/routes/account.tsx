import { type ChangeEvent, useRef } from "react"
import { Form, type LoaderFunctionArgs, useFetcher, useLoaderData } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { requireUser } from "~/server/guards.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { user } = await requireUser(request)
	return { user }
}

export default function Account() {
	const { user } = useLoaderData<typeof loader>()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const fetcher = useFetcher()

	const getInitials = (email: string) => {
		return email?.split("@")[0].slice(0, 2).toUpperCase() || "??"
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files
		if (selectedFiles && selectedFiles.length > 0) {
			const avatar = selectedFiles[0]
			const formData = new FormData()
			formData.append("avatar", avatar)
			fetcher.submit(formData, { method: "POST", action: "/avatar/upload", encType: "multipart/form-data" })
		}
	}

	const selectPhoto = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const removePhoto = () => {
		fetcher.submit(null, { method: "POST", action: "/avatar/remove" })
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-black text-white py-8">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold">Your Profile</h1>
					<p className="my-1 text-blue-100">Manage your profile information</p>
				</div>
			</div>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
				<div className="bg-white rounded-lg shadow">
					<div className="p-8">
						<div className="flex items-center space-x-4 mb-8">
							<Avatar className="h-20 w-20">
								<AvatarImage src={user.avatarUrl || undefined} alt="user" />
								<AvatarFallback className="text-lg">{user.email ? getInitials(user.email) : "??"}</AvatarFallback>
							</Avatar>
							<div className="space-x-2">
								<h2 className="text-2xl font-bold text-gray-900">{"Update your profile"}</h2>
								<p className="text-gray-500">{user.email}</p>
								<Button className="mt-2" onClick={selectPhoto}>
									<input
										type="file"
										accept="image/*"
										ref={fileInputRef}
										id="avatar"
										name="avatar"
										style={{ display: "none" }}
										onChange={handleFileChange}
									/>
									Change photo
								</Button>
								<Button
									className="mt-2 bg-white text-black hover:bg-black/10"
									onClick={removePhoto}
									disabled={!user.avatarUrl}
								>
									<input
										type="file"
										accept="image/*"
										ref={fileInputRef}
										id="avatar"
										name="avatar"
										style={{ display: "none" }}
										onChange={handleFileChange}
									/>
									Remove photo
								</Button>
							</div>
						</div>
						<Form method="post" className="space-y-6">
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<Label htmlFor="lastName">Name</Label>
									<Input id="lastName" name="lastName" type="text" placeholder="Not provided" className="mt-1" />
								</div>
								<div>
									<Label htmlFor="address">Address</Label>
									<Input id="address" name="address" type="text" placeholder="Not provided" className="mt-1" />
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input id="email" name="email" type="email" defaultValue={user.email} className="mt-1" />
								</div>
								<div>
									<Label htmlFor="username">Username</Label>
									<Input id="username" name="username" type="text" placeholder="Not provided" className="mt-1" />
								</div>
							</div>
							<div className="flex justify-end pt-4">
								<Button type="submit" className="bg-blue-600 hover:bg-blue-700">
									Save Changes
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
