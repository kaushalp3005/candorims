"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConsumptionLedgerProps {
  company: string
}

export function ConsumptionLedger({ company }: ConsumptionLedgerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumption Ledger</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Ledger for {company}</p>
      </CardContent>
    </Card>
  )
}
