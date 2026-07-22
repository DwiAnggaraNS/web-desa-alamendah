import * as React from "react"

const Button = React.forwardRef(({ className = "", variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  
  const variants = {
    default: "bg-primary text-white hover:opacity-90",
    destructive: "bg-error text-white hover:bg-error/90",
    outline: "border border-secondary-container bg-transparent hover:bg-surface-container-low text-secondary",
    secondary: "bg-secondary text-white hover:opacity-90",
    ghost: "hover:bg-surface-container-low text-secondary",
    link: "text-primary underline-offset-4 hover:underline"
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10"
  }

  const classes = `${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`

  return (
    <button
      className={classes}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
