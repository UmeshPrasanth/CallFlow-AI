// "use client"

// import { useState, useEffect } from "react"
// import { Search } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
// import type { LeadStatus } from "@/lib/types"

// export function LeadsTable() {

//   const [leads, setLeads] = useState<any[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all")

//   // ✅ SAFE FETCH
//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetch("http://localhost:9090/api/leads")
//         .then(res => res.json())
//         .then(data => {
//           console.log("API DATA:", data)

//           if (Array.isArray(data)) {
//             setLeads(data)
//           } else {
//             setLeads([]) // fallback safety
//           }
//         })
//         .catch(() => setLeads([]))
//     }, 2000)

//     return () => clearInterval(interval)
//   }, [])

//   // ✅ SAFE FILTER
//   const filteredLeads = (leads || []).filter((lead: any) => {
//     const matchesSearch =
//       lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       lead.phone?.includes(searchQuery)

//     const matchesStatus =
//       statusFilter === "all" || lead.status === statusFilter

//     return matchesSearch && matchesStatus
//   })

//   return (
//     <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
//       <CardHeader>
//         <div className="flex justify-between">
//           <div>
//             <CardTitle>Real Leads</CardTitle>
//             <CardDescription>
//               {filteredLeads.length} leads from database
//             </CardDescription>
//           </div>

//           <InputGroup className="w-64">
//             <InputGroupAddon>
//               <Search className="size-4" />
//             </InputGroupAddon>
//             <InputGroupInput
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </InputGroup>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Phone</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Last Call</TableHead>
//               <TableHead>Follow Up</TableHead>
//               <TableHead>AI Message</TableHead>
//               <TableCell>{lead.aiMessage || "-"}</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {filteredLeads.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center">
//                   No Leads Found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredLeads.map((lead: any, index: number) => (
//                 <TableRow key={index}>
//                   <TableCell>{lead.name}</TableCell>
//                   <TableCell>{lead.phone}</TableCell>
//                   <TableCell>
//                     <select
//   value={lead.status}
//   onChange={(e) => {
//     fetch(`http://localhost:9090/api/leads/${lead.id}/status?status=${e.target.value}`, {
//       method: "PUT"
//     })
//   }}
//   className="bg-black text-white border rounded px-2 py-1"
// >

  
//   <option value="pending">Pending</option>
//   <option value="interested">Interested</option>
//   <option value="callback">Callback</option>
//   <option value="not-interested">Not Interested</option>
//   <option value="no-answer">No Answer</option>
// </select>
//                   </TableCell>
//                   <td>
//   {lead.lastCall
//     ? new Date(lead.lastCall).toLocaleString()
//     : "-"}
// </td>
//                   <TableCell>{lead.followUp || "-"}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import type { LeadStatus } from "@/lib/types"

export function LeadsTable() {

  const [leads, setLeads] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all")

  // ✅ FETCH LEADS EVERY 2s
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:9090/api/leads")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setLeads(data)
          } else {
            setLeads([])
          }
        })
        .catch(() => setLeads([]))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // ✅ FILTER LOGIC
  const filteredLeads = leads.filter((lead: any) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery)

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Real Leads</CardTitle>
            <CardDescription>
              {filteredLeads.length} leads from database
            </CardDescription>
          </div>

          <InputGroup className="w-64">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>
      </CardHeader>

      <CardContent>
        <Table>

          {/* ✅ HEADER (NO ERRORS HERE) */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Call</TableHead>
              <TableHead>Follow Up</TableHead>
              {/* <TableHead>AI Message</TableHead> */}
            </TableRow>
          </TableHeader>

          {/* ✅ BODY */}
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No Leads Found
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>

                  {/* STATUS */}
                  <TableCell>
                    <select
                      value={lead.status}
                      onChange={(e) => {
                        fetch(
                          `http://localhost:9090/api/leads/${lead.id}/status?status=${e.target.value}`,
                          { method: "PUT" }
                        )
                      }}
                      className="bg-black text-white border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="interested">Interested</option>
                      <option value="callback">Callback</option>
                      <option value="not-interested">Not Interested</option>
                      <option value="no-answer">No Answer</option>
                    </select>
                  </TableCell>

                  {/* LAST CALL */}
                  <TableCell>
                    {lead.lastCall
                      ? new Date(lead.lastCall).toLocaleString()
                      : "-"}
                  </TableCell>

                  {/* FOLLOW UP */}
                  <TableCell>
                    {lead.followUp
                      ? new Date(lead.followUp).toLocaleString()
                      : "-"}
                  </TableCell>

                  {/* 🔥 AI MESSAGE */}
                  <TableCell>
                    {lead.aiMessage || "-"}
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </CardContent>
    </Card>
  )
}