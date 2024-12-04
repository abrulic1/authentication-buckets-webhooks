interface WelcomeBannerProps {
	email: string | undefined
}

export function WelcomeBanner({ email }: WelcomeBannerProps) {
	return (
		<div className="bg-white overflow-hidden shadow rounded-lg">
			<div className="px-4 py-5 sm:p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back, {email}!</h2>
				<p className="text-gray-500">Here's what's happening with your account today.</p>
			</div>
		</div>
	)
}
