import type { LoaderFunctionArgs } from "react-router"
import { Header } from "~/components/dashboard/header"
import { StatsCard } from "~/components/dashboard/stats-card"
import { WelcomeBanner } from "~/components/dashboard/welcome-banner"

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/correctness/noUnusedFunctionParameters: <explanation>
export const loader = async ({ request }: LoaderFunctionArgs) => {
	return null
}

export default function Dashboard() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header email="mock-email@example.com" />

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<WelcomeBanner email="mock-email@example.com" />

					<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						<StatsCard title="Total Projects" value="12" description="Active projects in your workspace" />
						<StatsCard title="Team Members" value="8" description="Collaborators across all projects" />
						<StatsCard title="Completion Rate" value="94%" description="Average project completion rate" />
					</div>
				</div>
			</main>
		</div>
	)
}
