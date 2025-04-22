interface ProgressProps {
    value?: number
    className?: string
  }
  
  export function Progress({ value = 0, className = "" }: ProgressProps) {
    return (
      <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
        <div
          className="h-full w-full flex-1 bg-blue-600 transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </div>
    )
  }
  