"use client"

import React from "react"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ConsumptionErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error("Consumption module error:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900">Error Loading Module</h3>
                <p className="text-sm text-red-700">{this.state.error?.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}
