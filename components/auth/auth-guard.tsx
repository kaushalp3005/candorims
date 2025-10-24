"use client"

import type { ReactNode } from "react"
import { openFGAService } from "@/lib/openfga/client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface AuthGuardProps {
  children: ReactNode
  company: string
  module: string
  action?: string
}

export function AuthGuard({ children, company, module, action = "view" }: AuthGuardProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // For now, we'll allow access - in production, get userId from session
        const userId = "current-user" // This should come from session/auth
        const allowed = await openFGAService.hasModulePermission(userId, company, module, action)
        setHasAccess(allowed)
      } catch (error) {
        console.error("Auth check failed:", error)
        setHasAccess(false)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [company, module, action])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-lg">Access Denied</h2>
                <p className="text-sm text-muted-foreground">You don't have permission to access this module.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
