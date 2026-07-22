import * as React from "react"

const Dialog = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 w-full max-w-2xl bg-surface-container-lowest border border-secondary-container p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {children}
        <button
          onClick={() => onOpenChange?.(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

const DialogContent = ({ children, className = "", ...props }) => (
  <div className={`grid gap-4 mt-2 ${className}`} {...props}>
    {children}
  </div>
)

const DialogHeader = ({ className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-left ${className}`} {...props} />
)

const DialogFooter = ({ className = "", ...props }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4 ${className}`} {...props} />
)

const DialogTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h2 ref={ref} className={`text-lg font-semibold leading-none tracking-tight text-primary ${className}`} {...props} />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <p ref={ref} className={`text-sm text-secondary ${className}`} {...props} />
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
