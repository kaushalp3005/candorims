"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface JobCardsListProps {
  company: string
}

export function JobCardsList({ company }: JobCardsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Cards</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Job cards for {company}</p>
      </CardContent>
    </Card>
  )
}
