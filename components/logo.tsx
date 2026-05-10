"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "default" | "light" | "minimal"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ 
  variant = "default", 
  size = "md", 
  showText = true,
  className 
}: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  const iconColor = variant === "light" ? "text-white" : "text-primary-foreground"
  const textColor = variant === "light" ? "text-white" : "text-foreground"
  const subTextColor = variant === "light" ? "text-white/70" : "text-muted-foreground"

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon */}
      <div className={cn(
        "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md",
        sizeClasses[size]
      )}>
        {/* House icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn("w-5 h-5", iconColor)}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        
        {/* 360 badge */}
        <div className="absolute -bottom-1 -right-1 bg-accent text-[8px] font-bold text-accent-foreground px-1 rounded">
          360
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold leading-tight", textSizeClasses[size], textColor)}>
            Nyumba360
          </span>
          <span className={cn("text-[10px] uppercase tracking-widest", subTextColor)}>
            Mombasa Coast
          </span>
        </div>
      )}
    </Link>
  )
}

export function LogoIcon({ 
  variant = "default", 
  size = "md",
  className 
}: Omit<LogoProps, "showText">) {
  return <Logo variant={variant} size={size} showText={false} className={className} />
}
