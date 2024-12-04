import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"
import { cn } from "~/utils/css"

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
	text?: string
}

const Separator = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
	({ className, orientation = "horizontal", decorative = true, text, ...props }, ref) => {
		if (text) {
			return (
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<SeparatorPrimitive.Root
							ref={ref}
							decorative={decorative}
							orientation={orientation}
							className={cn(
								"shrink-0 bg-border",
								orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
								className
							)}
							{...props}
						/>
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						{/* this bg-gray-50 is hardcoded for now */}
						<span className="bg-gray-50 px-2 text-muted-foreground">{text}</span>
					</div>
				</div>
			)
		}

		return (
			<SeparatorPrimitive.Root
				ref={ref}
				decorative={decorative}
				orientation={orientation}
				className={cn(
					"shrink-0 bg-border",
					orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
					className
				)}
				{...props}
			/>
		)
	}
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
