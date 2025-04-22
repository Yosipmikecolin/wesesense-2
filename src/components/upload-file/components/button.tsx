import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, disabled, ...props }, ref) => {
    // Base classes
    let buttonClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "

    // Variant classes
    if (variant === "default") {
      buttonClasses += "bg-blue-600 text-white hover:bg-blue-700 "
    } else if (variant === "outline") {
      buttonClasses += "border border-gray-300 bg-white hover:bg-gray-100 "
    } else if (variant === "ghost") {
      buttonClasses += "hover:bg-gray-100 "
    }

    // Size classes
    if (size === "default") {
      buttonClasses += "h-10 px-4 py-2 "
    } else if (size === "sm") {
      buttonClasses += "h-9 rounded-md px-3 "
    } else if (size === "lg") {
      buttonClasses += "h-11 rounded-md px-8 "
    } else if (size === "icon") {
      buttonClasses += "h-10 w-10 p-0 "
    }

    // Add custom classes
    buttonClasses += className

    return (
      <button className={buttonClasses} disabled={disabled} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"
