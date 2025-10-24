"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminMastersProps {
  company: string
}

export function AdminMasters({ company }: AdminMastersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Masters</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Admin masters for {company}</p>
      </CardContent>
    </Card>
  )
}
