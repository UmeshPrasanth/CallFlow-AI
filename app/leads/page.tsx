"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useData } from "@/lib/data-context"
import type { LeadStatus } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Mail,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  PhoneOff,
  PhoneCall
} from "lucide-react"

const statusConfig: Record<LeadStatus, { label: string; color: string; icon: React.ElementType }> = {
  interested: { label: "Interested", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
  callback: { label: "Callback", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: PhoneCall },
  "not-interested": { label: "Not Interested", color: "bg-rose-500/10 text-rose-400 border-rose-500/20", icon: XCircle },
  "no-answer": { label: "No Answer", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: PhoneOff },
  pending: { label: "Pending", color: "bg-muted text-muted-foreground border-border", icon: Clock },
}

function LeadsContent() {
  const { leads, updateLeadStatus, addLead } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all")
  const [isAddingLead, setIsAddingLead] = useState(false)
  const [newLead, setNewLead] = useState({ name: "", phone: "", email: "", campaign: "" })

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone) return
    addLead({
      ...newLead,
      status: "pending",
      lastCalled: "Never",
      campaign: newLead.campaign || "Manual Entry",
    })
    setNewLead({ name: "", phone: "", email: "", campaign: "" })
    setIsAddingLead(false)
  }

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground">Manage and track all your leads</p>
        </div>
        <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 size-4" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Enter the lead details below</DialogDescription>
            </DialogHeader>
            <FieldGroup className="gap-4 pt-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  placeholder="John Doe"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  placeholder="john@example.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel>Campaign (Optional)</FieldLabel>
                <Input
                  placeholder="Q2 Outreach"
                  value={newLead.campaign}
                  onChange={(e) => setNewLead({ ...newLead, campaign: e.target.value })}
                />
              </Field>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddLead} disabled={!newLead.name || !newLead.phone}>
                  Add Lead
                </Button>
                <Button variant="outline" onClick={() => setIsAddingLead(false)}>
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.entries(statusConfig) as [LeadStatus, typeof statusConfig[LeadStatus]][]).map(([status, config]) => (
          <Card 
            key={status} 
            className={`cursor-pointer bg-card/50 transition-colors hover:bg-card ${statusFilter === status ? 'ring-1 ring-primary' : ''}`}
            onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`rounded-lg p-2 ${config.color.split(' ')[0]}`}>
                <config.icon className={`size-4 ${config.color.split(' ')[1]}`} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{statusCounts[status] || 0}</p>
                <p className="text-xs text-muted-foreground">{config.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leads Table */}
      <Card className="bg-card/50">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">All Leads</CardTitle>
              <CardDescription>{filteredLeads.length} of {leads.length} leads</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Leads
                  </DropdownMenuItem>
                  {(Object.entries(statusConfig) as [LeadStatus, typeof statusConfig[LeadStatus]][]).map(([status, config]) => (
                    <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                      {config.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Contact</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Campaign</TableHead>
                <TableHead className="text-muted-foreground">Last Called</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => {
                const config = statusConfig[lead.status]
                return (
                  <TableRow key={lead.id} className="border-border/50">
                    <TableCell>
                      <p className="font-medium text-foreground">{lead.name}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="size-3" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="size-3" />
                          {lead.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={config.color}>
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.campaign}</TableCell>
                    <TableCell className="text-muted-foreground">{lead.lastCalled}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {(Object.entries(statusConfig) as [LeadStatus, typeof statusConfig[LeadStatus]][]).map(([status, cfg]) => (
                            <DropdownMenuItem 
                              key={status} 
                              onClick={() => updateLeadStatus(lead.id, status)}
                              disabled={lead.status === status}
                            >
                              <cfg.icon className="mr-2 size-4" />
                              {cfg.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filteredLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No leads found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LeadsPage() {
  return (
    <DashboardLayout title="Leads">
      <LeadsContent />
    </DashboardLayout>
  )
}
