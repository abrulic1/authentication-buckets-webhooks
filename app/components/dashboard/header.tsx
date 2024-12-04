import { Form, Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"

interface HeaderProps {
	email: string | undefined
}

export function Header({ email }: HeaderProps) {
	const getInitials = (email: string) => {
		return email?.split("@")[0].slice(0, 2).toUpperCase() || "??"
	}

	return (
		<header className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
					<div className="flex items-center gap-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="relative h-10 w-10 rounded-full">
									<Avatar>
										<AvatarImage src="" alt={email} />
										<AvatarFallback>{email ? getInitials(email) : "??"}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>
									<Link to="/account" className="w-full">
										Profile Settings
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Form method="post" action="/logout">
										<button className="w-full" type="submit">
											Sign out
										</button>
									</Form>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	)
}
