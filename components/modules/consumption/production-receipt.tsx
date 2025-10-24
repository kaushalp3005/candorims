"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductionReceiptProps {
  company: string
}

export function ProductionReceipt({ company }: ProductionReceiptProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Receipt</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Production receipt for {company}</p>
      </CardContent>
    </Card>
  )
}
