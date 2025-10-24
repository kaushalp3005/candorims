"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConfigurationProps {
  company: string
}

export function Configuration({ company }: ConfigurationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Configuration for {company}</p>
      </CardContent>
    </Card>
  )
}
