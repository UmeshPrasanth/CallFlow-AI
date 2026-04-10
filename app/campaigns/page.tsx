"use client"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useData } from "@/lib/data-context"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { 
  Plus, 
  Upload, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Trash2,
  FileSpreadsheet,
  Calendar,
  Users
} from "lucide-react"

function CampaignsContent() {
  const { campaigns, addCampaign, updateCampaignStatus } = useData()
  const [campaignName, setCampaignName] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "text/csv") {
      setUploadedFile(file)
    }
  }

  const handleCreateCampaign = () => {
    if (!campaignName.trim()) return
    
    addCampaign({
      name: campaignName,
      status: "active",
      leadsCount: uploadedFile ? Math.floor(Math.random() * 200) + 50 : 0,
      createdAt: new Date().toISOString(),
      fileName: uploadedFile?.name,
    })
    
    setCampaignName("")
    setUploadedFile(null)
    setIsCreating(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      completed: "bg-muted text-muted-foreground border-border",
    }
    return styles[status as keyof typeof styles] || styles.completed
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground">Manage your tele-calling campaigns</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)}>
          <Plus className="mr-2 size-4" />
          New Campaign
        </Button>
      </div>

      {/* Create Campaign Card */}
      {isCreating && (
        <Card className="border-primary/20 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">Create New Campaign</CardTitle>
            <CardDescription>Set up a new calling campaign with your leads</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel>Campaign Name</FieldLabel>
                <Input
                  placeholder="e.g., Q2 Sales Outreach"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>Upload Leads (CSV)</FieldLabel>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full justify-start"
                  >
                    <Upload className="mr-2 size-4" />
                    {uploadedFile ? uploadedFile.name : "Choose CSV file"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </Field>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleCreateCampaign} disabled={!campaignName.trim()}>
                  Create Campaign
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      )}

      {/* Campaigns Table */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">All Campaigns</CardTitle>
          <CardDescription>{campaigns.length} total campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Campaign</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Leads</TableHead>
                <TableHead className="text-muted-foreground">Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="border-border/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <FileSpreadsheet className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{campaign.name}</p>
                        {campaign.fileName && (
                          <p className="text-xs text-muted-foreground">{campaign.fileName}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="size-3" />
                      <span>{campaign.leadsCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="size-3" />
                      <span>{formatDate(campaign.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {campaign.status === "active" ? (
                          <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, "paused")}>
                            <Pause className="mr-2 size-4" />
                            Pause Campaign
                          </DropdownMenuItem>
                        ) : campaign.status === "paused" ? (
                          <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, "active")}>
                            <Play className="mr-2 size-4" />
                            Resume Campaign
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem onClick={() => updateCampaignStatus(campaign.id, "completed")}>
                          <Trash2 className="mr-2 size-4" />
                          Mark Complete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {campaigns.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No campaigns yet. Create your first campaign above.
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

export default function CampaignsPage() {
  return (
    <DashboardLayout title="Campaigns">
      <CampaignsContent />
    </DashboardLayout>
  )
}
