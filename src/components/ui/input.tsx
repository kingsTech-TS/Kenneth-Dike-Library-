import * as React from "react"
import { cn } from "../../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
