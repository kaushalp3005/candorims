"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DispatchFormProps {
  company: string
}

export function DispatchForm({ company }: DispatchFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dispatch Items</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Dispatch form for {company}</p>
      </CardContent>
    </Card>
  )
}
