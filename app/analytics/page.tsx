"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useData } from "@/lib/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Phone, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  PhoneOff,
  PhoneCall,
  Target,
  BarChart3
} from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts"

function AnalyticsContent() {
  const { leads, campaigns, analytics } = useData()

  // Calculate status distribution
  const statusDistribution = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieData = [
    { name: "Interested", value: statusDistribution["interested"] || 0, color: "#10b981" },
    { name: "Callback", value: statusDistribution["callback"] || 0, color: "#3b82f6" },
    { name: "Not Interested", value: statusDistribution["not-interested"] || 0, color: "#f43f5e" },
    { name: "No Answer", value: statusDistribution["no-answer"] || 0, color: "#f59e0b" },
    { name: "Pending", value: statusDistribution["pending"] || 0, color: "#6b7280" },
  ].filter(item => item.value > 0)

  // Campaign performance data
  const campaignData = campaigns.map(campaign => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + "..." : campaign.name,
    leads: campaign.leadsCount,
    status: campaign.status,
  }))

  // Weekly trend data (mock)
  const weeklyTrend = [
    { day: "Mon", calls: 45, conversions: 12 },
    { day: "Tue", calls: 52, conversions: 15 },
    { day: "Wed", calls: 38, conversions: 9 },
    { day: "Thu", calls: 65, conversions: 22 },
    { day: "Fri", calls: 58, conversions: 18 },
    { day: "Sat", calls: 25, conversions: 8 },
    { day: "Sun", calls: 12, conversions: 4 },
  ]

  const chartConfig = {
    calls: { label: "Calls", color: "hsl(var(--primary))" },
    conversions: { label: "Conversions", color: "hsl(var(--chart-1))" },
    leads: { label: "Leads", color: "hsl(var(--primary))" },
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your calling performance and metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
                <p className="text-3xl font-semibold text-foreground">{analytics.totalCalls}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="size-3" />
                  +12% from last week
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Phone className="size-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interested Leads</p>
                <p className="text-3xl font-semibold text-foreground">{analytics.interestedLeads}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="size-3" />
                  +8% from last week
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle className="size-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-semibold text-foreground">{analytics.conversionRate}%</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                  <Target className="size-3" />
                  Above target
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10">
                <BarChart3 className="size-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Call Duration</p>
                <p className="text-3xl font-semibold text-foreground">{analytics.avgCallDuration}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  Optimal range
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock className="size-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Trend */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Performance</CardTitle>
            <CardDescription>Calls and conversions over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={weeklyTrend}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="hsl(var(--chart-1))" 
                  fill="hsl(var(--chart-1))" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Lead Status Distribution */}
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Lead Distribution</CardTitle>
            <CardDescription>Breakdown by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-border bg-card p-2 shadow-md">
                            <p className="font-medium text-foreground">{payload[0].name}</p>
                            <p className="text-sm text-muted-foreground">{payload[0].value} leads</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Campaign Performance</CardTitle>
          <CardDescription>Leads per campaign comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={campaignData} layout="vertical">
              <XAxis 
                type="number"
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                type="category"
                dataKey="name"
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                width={120}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="leads" 
                fill="hsl(var(--primary))" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <CheckCircle className="size-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interested</p>
              <p className="text-xl font-semibold text-foreground">{statusDistribution["interested"] || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <PhoneCall className="size-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Callbacks</p>
              <p className="text-xl font-semibold text-foreground">{statusDistribution["callback"] || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10">
              <XCircle className="size-5 text-rose-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Not Interested</p>
              <p className="text-xl font-semibold text-foreground">{statusDistribution["not-interested"] || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
              <PhoneOff className="size-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">No Answer</p>
              <p className="text-xl font-semibold text-foreground">{statusDistribution["no-answer"] || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics">
      <AnalyticsContent />
    </DashboardLayout>
  )
}
