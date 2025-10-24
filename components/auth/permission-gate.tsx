"use client"

import { type ReactNode, useEffect, useState } from "react"
import { openFGAService } from "@/lib/openfga/client"

interface PermissionGateProps {
  children: ReactNode
  module: string
  action: string
  fallback?: ReactNode
}

export function PermissionGuard({ children, module, action, fallback }: PermissionGateProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)

  useEffect(() => {
    const checkPermission = async () => {
      try {
        // For now, we'll allow access - in production, get userId and company from context
        const userId = "current-user" // This should come from session/auth
        const company = "default-company" // This should come from route params or context
        const allowed = await openFGAService.hasModulePermission(userId, company, module, action)
        setHasAccess(allowed)
      } catch (error) {
        console.error("Permission check failed:", error)
        setHasAccess(false)
      }
    }

    checkPermission()
  }, [module, action])

  if (hasAccess === null) {
    return null // Loading state
  }

  if (!hasAccess) {
    return fallback || null
  }

  return <>{children}</>
}
