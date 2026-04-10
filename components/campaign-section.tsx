// // "use client"

// // import { useState, useRef } from "react"
// // import { Upload, Play, FileSpreadsheet, X, CheckCircle2, Square, Clock, Users } from "lucide-react"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Badge } from "@/components/ui/badge"
// // import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
// // import { useData } from "@/lib/data-context"
// // import { Spinner } from "@/components/ui/spinner"



// // export function CampaignSection() {
// //   const [file, setFile] = useState<File | null>(null)
// //   const [campaignName, setCampaignName] = useState("")
// //   const [isUploading, setIsUploading] = useState(false)
// //   const fileInputRef = useRef<HTMLInputElement>(null)
// //   const { campaigns, addCampaign, updateCampaignStatus } = useData()

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const selectedFile = e.target.files?.[0]
// //     if (selectedFile && selectedFile.type === "text/csv") {
// //       setFile(selectedFile)
// //     }
// //   }

// //   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
// //     e.preventDefault()
// //     const droppedFile = e.dataTransfer.files[0]
// //     if (droppedFile && droppedFile.type === "text/csv") {
// //       setFile(droppedFile)
// //     }
// //   }

// //   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
// //     e.preventDefault()
// //   }

// //   const removeFile = () => {
// //     setFile(null)
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = ""
// //     }
// //   }

// //   const handleStartCampaign = async () => {
// //   if (!campaignName) return

// //   setIsUploading(true)

// //   try {
// //     const res = await fetch("http://localhost:9090/api/campaign", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ name: campaignName }),
// //     })

// //     const data = await res.json()
// //     console.log("Saved:", data)

// //     // Keep your existing UI logic (IMPORTANT)
// //     addCampaign({
// //       name: campaignName,
// //       status: "active",
// //       leadsCount: Math.floor(Math.random() * 100) + 20,
// //       createdAt: new Date().toISOString(),
// //       fileName: file?.name || "uploaded.csv",
// //     })

// //     // Reset form
// //     setFile(null)
// //     setCampaignName("")
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = ""
// //     }

// //     alert("Campaign Created Successfully 🚀")

// //   } catch (error) {
// //     console.error(error)
// //     alert("Failed to create campaign ❌")
// //   }

// //   setIsUploading(false)
// // }

// //   const handleStopCampaign = (campaignId: string) => {
// //     updateCampaignStatus(campaignId, "paused")
// //   }

// //   const handleResumeCampaign = (campaignId: string) => {
// //     updateCampaignStatus(campaignId, "active")
// //   }

// //   const formatTimeAgo = (dateString: string) => {
// //     const date = new Date(dateString)
// //     const now = new Date()
// //     const diffMs = now.getTime() - date.getTime()
// //     const diffMins = Math.floor(diffMs / 60000)
// //     const diffHours = Math.floor(diffMins / 60)
// //     const diffDays = Math.floor(diffHours / 24)

// //     if (diffDays > 0) return `${diffDays}d ago`
// //     if (diffHours > 0) return `${diffHours}h ago`
// //     if (diffMins > 0) return `${diffMins}m ago`
// //     return "Just now"
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {/* New Campaign Card */}
// //       <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
// //         <CardHeader>
// //           <CardTitle className="flex items-center gap-2 text-foreground">
// //             <Play className="size-5 text-primary" />
// //             New Campaign
// //           </CardTitle>
// //           <CardDescription>
// //             Upload a CSV file with your leads and start a new calling campaign
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent className="space-y-6">
// //           <FieldGroup>
// //             <Field>
// //               <FieldLabel>Campaign Name</FieldLabel>
// //               <Input
// //                 placeholder="Enter campaign name..."
// //                 value={campaignName}
// //                 onChange={(e) => setCampaignName(e.target.value)}
// //                 className="bg-secondary/50"
// //               />
// //             </Field>
// //           </FieldGroup>

// //           <div>
// //             <FieldLabel className="mb-2 block">Upload Leads CSV</FieldLabel>
// //             <div
// //               onDrop={handleDrop}
// //               onDragOver={handleDragOver}
// //               onClick={() => fileInputRef.current?.click()}
// //               className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-all ${
// //                 file
// //                   ? "border-primary bg-primary/5"
// //                   : "border-border hover:border-primary/50 hover:bg-secondary/30"
// //               } p-8`}
// //             >
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 accept=".csv"
// //                 onChange={handleFileChange}
// //                 className="hidden"
// //               />
// //               {file ? (
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
// //                       <FileSpreadsheet className="size-5 text-primary" />
// //                     </div>
// //                     <div>
// //                       <p className="font-medium text-foreground">{file.name}</p>
// //                       <p className="text-sm text-muted-foreground">
// //                         {(file.size / 1024).toFixed(1)} KB
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <CheckCircle2 className="size-5 text-primary" />
// //                     <Button
// //                       variant="ghost"
// //                       size="icon"
// //                       onClick={(e) => {
// //                         e.stopPropagation()
// //                         removeFile()
// //                       }}
// //                       className="size-8 hover:bg-destructive/10 hover:text-destructive"
// //                     >
// //                       <X className="size-4" />
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center gap-3 text-center">
// //                   <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
// //                     <Upload className="size-6 text-muted-foreground" />
// //                   </div>
// //                   <div>
// //                     <p className="font-medium text-foreground">
// //                       Drop your CSV file here or click to browse
// //                     </p>
// //                     <p className="text-sm text-muted-foreground">
// //                       Supports CSV files with Name, Phone columns
// //                     </p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <Button
// //             onClick={handleStartCampaign}
// //             disabled={!file || !campaignName || isUploading}
// //             className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
// //             size="lg"
// //           >
// //             {isUploading ? (
// //               <>
// //                 <Spinner className="mr-2 size-4" />
// //                 Starting Campaign...
// //               </>
// //             ) : (
// //               <>
// //                 <Play className="mr-2 size-4" />
// //                 Start Campaign
// //               </>
// //             )}
// //           </Button>
// //         </CardContent>
// //       </Card>

// //       {/* Active Campaigns Card */}
// //       {campaigns.length > 0 && (
// //         <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
// //           <CardHeader className="pb-3">
// //             <CardTitle className="text-base text-foreground">Active Campaigns</CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-3">
// //             {campaigns.map((campaign) => (
// //               <div
// //                 key={campaign.id}
// //                 className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
// //               >
// //                 <div className="flex-1 min-w-0">
// //                   <div className="flex items-center gap-2">
// //                     <p className="font-medium text-foreground truncate">{campaign.name}</p>
// //                     <Badge
// //                       variant={campaign.status === "active" ? "default" : "secondary"}
// //                       className={
// //                         campaign.status === "active"
// //                           ? "bg-primary/10 text-primary hover:bg-primary/20"
// //                           : ""
// //                       }
// //                     >
// //                       {campaign.status === "active" ? "Active" : "Paused"}
// //                     </Badge>
// //                   </div>
// //                   <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
// //                     <span className="flex items-center gap-1">
// //                       <Users className="size-3" />
// //                       {campaign.leadsCount} leads
// //                     </span>
// //                     <span className="flex items-center gap-1">
// //                       <Clock className="size-3" />
// //                       {formatTimeAgo(campaign.createdAt)}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <Button
// //                   variant="ghost"
// //                   size="sm"
// //                   onClick={() =>
// //                     campaign.status === "active"
// //                       ? handleStopCampaign(campaign.id)
// //                       : handleResumeCampaign(campaign.id)
// //                   }
// //                   className={
// //                     campaign.status === "active"
// //                       ? "text-destructive hover:bg-destructive/10 hover:text-destructive"
// //                       : "text-primary hover:bg-primary/10 hover:text-primary"
// //                   }
// //                 >
// //                   {campaign.status === "active" ? (
// //                     <>
// //                       <Square className="mr-1 size-3" />
// //                       Stop
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Play className="mr-1 size-3" />
// //                       Resume
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             ))}
// //           </CardContent>
// //         </Card>
// //       )}
// //     </div>
// //   )
// // }


// "use client"

// import { useState, useRef } from "react"
// import { Upload, Play, FileSpreadsheet, X, CheckCircle2, Square, Clock, Users } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
// import { useData } from "@/lib/data-context"
// import { Spinner } from "@/components/ui/spinner"

// // 🔥 CSV PARSER
// function parseCSV(file: File): Promise<any[]> {
//   return new Promise((resolve) => {
//     const reader = new FileReader()

//     reader.onload = (e: any) => {
//       const text = e.target.result
//       const lines = text.split("\n")

//       const leads = lines.slice(1).map((line: string) => {
//         const [name, phone] = line.split(",")

//         return {
//           name: name?.trim(),
//           phone: phone?.trim()
//         }
//       }).filter((l: any) => l.name && l.phone)

//       resolve(leads)
//     }

//     reader.readAsText(file)
//   })
// }

// export function CampaignSection() {
//   const [file, setFile] = useState<File | null>(null)
//   const [campaignName, setCampaignName] = useState("")
//   const [isUploading, setIsUploading] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const { campaigns, addCampaign, updateCampaignStatus } = useData()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0]
//     if (selectedFile && selectedFile.type === "text/csv") {
//       setFile(selectedFile)
//     }
//   }

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     const droppedFile = e.dataTransfer.files[0]
//     if (droppedFile && droppedFile.type === "text/csv") {
//       setFile(droppedFile)
//     }
//   }

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//   }

//   const removeFile = () => {
//     setFile(null)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   // 🔥 MAIN FUNCTION (UPDATED)
//   const handleStartCampaign = async () => {
//     if (!file || !campaignName) return

//     setIsUploading(true)

//     try {
//       // ✅ 1. Save Campaign
//       await fetch("http://localhost:9090/api/campaign", {
        
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: campaignName }),
//       })

//       // ✅ 2. Parse CSV → Leads
//       const leads = await parseCSV(file)

//       // ✅ 3. Send Leads to Backend
//       await fetch("http://localhost:9090/api/leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(leads),
//       })

//       // ✅ 4. Update UI (existing logic)
//       addCampaign({
//         name: campaignName,
//         status: "active",
//         leadsCount: leads.length,
//         createdAt: new Date().toISOString(),
//         fileName: file.name,
//       })

//       alert("Campaign + Leads Uploaded Successfully 🚀")

//       // Reset
//       setFile(null)
//       setCampaignName("")
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ""
//       }

//     } catch (error) {
//       console.error(error)
//       alert("Something went wrong ❌")
//     }

//     setIsUploading(false)
//   }

//   const handleStopCampaign = (campaignId: string) => {
//     updateCampaignStatus(campaignId, "paused")
//   }

//   const handleResumeCampaign = (campaignId: string) => {
//     updateCampaignStatus(campaignId, "active")
//   }

//   const formatTimeAgo = (dateString: string) => {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffMs = now.getTime() - date.getTime()
//     const diffMins = Math.floor(diffMs / 60000)
//     const diffHours = Math.floor(diffMins / 60)
//     const diffDays = Math.floor(diffHours / 24)

//     if (diffDays > 0) return `${diffDays}d ago`
//     if (diffHours > 0) return `${diffHours}h ago`
//     if (diffMins > 0) return `${diffMins}m ago`
//     return "Just now"
//   }

//   return (
//     <div className="space-y-4">
//       <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-foreground">
//             <Play className="size-5 text-primary" />
//             New Campaign
//           </CardTitle>
//           <CardDescription>
//             Upload a CSV file with your leads and start a new calling campaign
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <FieldGroup>
//             <Field>
//               <FieldLabel>Campaign Name</FieldLabel>
//               <Input
//                 placeholder="Enter campaign name..."
//                 value={campaignName}
//                 onChange={(e) => setCampaignName(e.target.value)}
//                 className="bg-secondary/50"
//               />
//             </Field>
//           </FieldGroup>

//           <div>
//             <FieldLabel className="mb-2 block">Upload Leads CSV</FieldLabel>
//             <div
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onClick={() => fileInputRef.current?.click()}
//               className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-all ${
//                 file
//                   ? "border-primary bg-primary/5"
//                   : "border-border hover:border-primary/50 hover:bg-secondary/30"
//               } p-8`}
//             >
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".csv"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               {file ? (
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FileSpreadsheet className="size-5 text-primary" />
//                     <div>
//                       <p className="font-medium">{file.name}</p>
//                     </div>
//                   </div>
//                   <Button onClick={removeFile} size="icon">
//                     <X />
//                   </Button>
//                 </div>
//               ) : (
//                 <p className="text-center text-muted-foreground">
//                   Drop CSV or click to upload
//                 </p>
//               )}
//             </div>
//           </div>

//           <Button onClick={handleStartCampaign} disabled={!file || !campaignName || isUploading}>
//             {isUploading ? <Spinner /> : "Start Campaign"}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useState, useRef } from "react"
import { Upload, Play, FileSpreadsheet, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { useData } from "@/lib/data-context"
import { Spinner } from "@/components/ui/spinner"

// 🔥 CSV PARSER
function parseCSV(file: File): Promise<any[]> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e: any) => {
      const text = e.target.result
      const lines = text.split("\n")

      const leads = lines.slice(1).map((line: string) => {
        const [name, phone] = line.split(",")

        return {
          name: name?.trim(),
          phone: phone?.trim()
        }
      }).filter((l: any) => l.name && l.phone)

      resolve(leads)
    }

    reader.readAsText(file)
  })
}

export function CampaignSection() {
  const [file, setFile] = useState<File | null>(null)
  const [campaignName, setCampaignName] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { campaigns, addCampaign } = useData()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // 🔥 MAIN FUNCTION (UPDATED)
  const handleStartCampaign = async () => {
    if (!file || !campaignName) return

    setIsUploading(true)

    try {
      // ✅ 1. Save Campaign
      await fetch("http://localhost:9090/api/campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: campaignName }),
      })

      // ✅ 2. Parse CSV
      const leads = await parseCSV(file)

      // ✅ 3. Save Leads
      await fetch("http://localhost:9090/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leads),
      })

      // 🔥 4. CALL AI PROCESS (THIS IS WHAT YOU NEEDED)
      await fetch("http://localhost:9090/api/ai-process", {
        method: "POST"
      })

      // ✅ 5. Update UI
      addCampaign({
        name: campaignName,
        status: "active",
        leadsCount: leads.length,
        createdAt: new Date().toISOString(),
        fileName: file.name,
      })

      alert("Campaign + AI Processing Completed 🚀")

      // Reset
      setFile(null)
      setCampaignName("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

    } catch (error) {
      console.error(error)
      alert("Something went wrong ❌")
    }

    setIsUploading(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>New Campaign</CardTitle>
          <CardDescription>
            Upload CSV and run AI-powered campaign
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Campaign Name</FieldLabel>
              <Input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed p-6 text-center cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />

            {file ? (
              <div className="flex justify-between">
                <span>{file.name}</span>
                <Button onClick={removeFile}><X /></Button>
              </div>
            ) : (
              <p>Upload CSV</p>
            )}
          </div>

          <Button onClick={handleStartCampaign}>
            {isUploading ? <Spinner /> : "Start Campaign"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}