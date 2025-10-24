"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConsumptionFormProps {
  company: string
}

export function ConsumptionForm({ company }: ConsumptionFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Consumption</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Consumption form for {company}</p>
      </CardContent>
    </Card>
  )
}
