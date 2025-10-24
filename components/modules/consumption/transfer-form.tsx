"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TransferFormProps {
  company: string
}

export function TransferForm({ company }: TransferFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Items</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Transfer form for {company}</p>
      </CardContent>
    </Card>
  )
}
