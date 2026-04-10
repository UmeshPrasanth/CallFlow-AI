"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Video,
  Mail,
  Phone,
  Send,
  ExternalLink,
  FileText,
  Zap,
  Users,
  Settings
} from "lucide-react"

const faqs = [
  {
    question: "How do I create a new campaign?",
    answer: "Navigate to the Campaigns page and click the 'New Campaign' button. Enter a campaign name, upload your CSV file with leads, and click 'Create Campaign' to start."
  },
  {
    question: "What CSV format should I use for leads?",
    answer: "Your CSV file should include columns for Name, Phone, and Email. Optional columns include Company and Notes. The first row should be headers."
  },
  {
    question: "How do I change a lead's status?",
    answer: "Go to the Leads page, find the lead you want to update, click the three-dot menu on the right, and select the new status from the dropdown."
  },
  {
    question: "Can I export my campaign data?",
    answer: "Yes, you can export your campaign data from the Analytics page. Click the Export button to download a CSV file with all your lead data and call statistics."
  },
  {
    question: "How does the AI calling system work?",
    answer: "Our AI system uses natural language processing to conduct automated calls. It can handle objections, schedule callbacks, and qualify leads based on your configured criteria."
  },
  {
    question: "What integrations are supported?",
    answer: "CallFlow AI integrates with popular CRMs like Salesforce, HubSpot, and Pipedrive. We also support Slack, Microsoft Teams, and Zapier for workflow automation."
  },
]

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of CallFlow AI",
    icon: Book,
    href: "#",
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step tutorials",
    icon: Video,
    href: "#",
  },
  {
    title: "API Documentation",
    description: "Integrate with your systems",
    icon: FileText,
    href: "#",
  },
  {
    title: "Best Practices",
    description: "Optimize your campaigns",
    icon: Zap,
    href: "#",
  },
]

export default function HelpPage() {
  const [supportForm, setSupportForm] = useState({
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSupportForm({ subject: "", message: "" })
  }

  return (
    <DashboardLayout title="Help & Support">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Help & Support</h1>
            <p className="text-sm text-muted-foreground">Get help with CallFlow AI</p>
          </div>

          {/* Quick Links */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Card key={resource.title} className="cursor-pointer bg-card/50 transition-colors hover:bg-card">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <resource.icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{resource.title}</p>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <Card className="bg-card/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <HelpCircle className="size-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                  <CardDescription>Quick answers to common questions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <MessageSquare className="size-5 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Send us a Message</CardTitle>
                    <CardDescription>We typically respond within 24 hours</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <FieldGroup className="gap-4">
                    <Field>
                      <FieldLabel>Subject</FieldLabel>
                      <Input
                        placeholder="What do you need help with?"
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Message</FieldLabel>
                      <Textarea
                        placeholder="Describe your issue or question..."
                        rows={4}
                        value={supportForm.message}
                        onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      />
                    </Field>
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 size-4" />
                      Send Message
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <Phone className="size-5 text-amber-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                    <CardDescription>Other ways to reach us</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 rounded-lg border border-border/50 p-4">
                    <Mail className="size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Email Support</p>
                      <p className="text-sm text-primary">support@callflow.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/50 p-4">
                    <Phone className="size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Phone Support</p>
                      <p className="text-sm text-primary">+1 (800) CALLFLOW</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/50 p-4">
                    <MessageSquare className="size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Live Chat</p>
                      <p className="text-sm text-muted-foreground">Available Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/50 p-4">
                    <Users className="size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Community Forum</p>
                      <p className="text-sm text-muted-foreground">Join discussions with other users</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
