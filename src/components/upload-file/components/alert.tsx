import type React from "react"

interface AlertProps {
  variant?: "default" | "destructive"
  className?: string
  children: React.ReactNode
}

export function Alert({ variant = "default", className = "", children }: AlertProps) {
  const baseClasses = "relative w-full rounded-lg border p-4 "
  const variantClasses =
    variant === "default" ? "bg-white text-gray-900 border-gray-200" : "border-red-300 text-red-600 bg-red-50"

  return <div className={`${baseClasses}${variantClasses} ${className}`}>{children}</div>
}

export function AlertDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm leading-relaxed ${className}`} {...props} />
}
