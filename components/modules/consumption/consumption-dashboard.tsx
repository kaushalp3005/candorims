"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConsumptionDashboardProps {
  company: string
}

export function ConsumptionDashboard({ company }: ConsumptionDashboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumption Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Dashboard for {company}</p>
      </CardContent>
    </Card>
  )
}
