import { type ChangeEvent, useRef } from "react"
import { Form, type LoaderFunctionArgs, useFetcher } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/correctness/noUnusedFunctionParameters: <explanation>
export async function loader({ request }: LoaderFunctionArgs) {
	return null
}
export default function Account() {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const fetcher = useFetcher()
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	const getInitials = (email: string) => {
		return email?.split("@")[0].slice(0, 2).toUpperCase() || "??"
	}
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files
		if (selectedFiles && selectedFiles.length > 0) {
			const avatar = selectedFiles[0]
			// Validate file type
			const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
			if (!validImageTypes.includes(avatar.type)) {
				alert("Please select a valid image file (jpeg, png, gif).")
				return
			}
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
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	const removePhoto = () => {
		fetcher.submit(null, { method: "POST", action: "/avatar/remove" })
	}
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-black text-white py-8">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold">Your Profile</h1>
					<p className="my-1 text-blue-100">Manage your profile information</p>
				</div>
			</div>
			{/* Profile Content */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
				<div className="bg-white rounded-lg shadow">
					<div className="p-8">
						{/* Profile Header */}
						<div className="flex items-center space-x-4 mb-8">
							<Avatar className="h-20 w-20">
								<AvatarImage src="" alt="mock-user" />
								<AvatarFallback className="text-lg">
									{/* {"mock-user@example.com" ? getInitials("dd") : "??"} */}
									XY
								</AvatarFallback>
							</Avatar>
							<div>
								<h2 className="text-2xl font-bold text-gray-900">{"Update your profile"}</h2>
								<p className="text-gray-500">{"mock-user@example.com"}</p>
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
							</div>
						</div>
						{/* Profile Form */}
						<Form method="post" className="space-y-6">
							<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<Label htmlFor="lastName">Name</Label>
									<Input id="lastName" name="lastName" type="text" defaultValue={"mock-name"} className="mt-1" />
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input id="email" name="email" type="email" defaultValue={"mock-user@example.com"} className="mt-1" />
								</div>
								<div>
									<Label htmlFor="username">Username</Label>
									<Input id="username" name="username" type="text" defaultValue={"mock-username"} className="mt-1" />
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
