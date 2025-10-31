import * as React from "react"
import { cn } from "../../../lib/utils"
import { X } from "lucide-react"
import { useToast } from "./use-toast"

export function Toast({ title, description, id, action }: any) {
  const { removeToast } = useToast()

  return (
    <div
      className="relative bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-sm"
    >
      <button
        onClick={() => removeToast(id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="text-sm font-medium text-gray-900">{title}</div>
      {description && (
        <div className="mt-1 text-sm text-gray-600">{description}</div>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
