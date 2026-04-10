"use client"

import { Phone, UserCheck, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useData } from "@/lib/data-context"

export function StatsCards() {
  const { analytics, leads } = useData()

  const stats = [
    {
      title: "Total Calls",
      value: analytics.totalCalls.toLocaleString(),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Phone,
      description: `${leads.length} total leads`,
    },
    {
      title: "Interested Leads",
      value: analytics.interestedLeads.toLocaleString(),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: UserCheck,
      description: "vs last month",
    },
    {
      title: "Conversion Rate",
      value: `${analytics.conversionRate}%`,
      change: analytics.conversionRate > 15 ? "+2.4%" : "-1.2%",
      changeType: analytics.conversionRate > 15 ? "positive" as const : "negative" as const,
      icon: TrendingUp,
      description: "of called leads",
    },
    {
      title: "Avg. Call Duration",
      value: analytics.avgCallDuration,
      change: "-0.8%",
      changeType: "negative" as const,
      icon: Clock,
      description: "vs last month",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:bg-card/70">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="size-5 text-primary" />
              </div>
              <span
                className={`text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "text-primary"
                    : "text-destructive"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
