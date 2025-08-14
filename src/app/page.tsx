"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function FamilyOfficeDashboard() {
  const [connectedServices, setConnectedServices] = useState({
    googleDrive: false,
    blackboxAI: false,
    plaid: false,
    docusign: false
  })

  const portfolioData = [
    { name: "Equity Investments", value: 2500000, change: 5.2 },
    { name: "Real Estate", value: 1800000, change: 2.1 },
    { name: "Fixed Income", value: 950000, change: 1.8 },
    { name: "Alternative Investments", value: 750000, change: 8.7 }
  ]

  const recentDocuments = [
    { name: "Q4 Financial Report", type: "PDF", status: "Processed", date: "2024-01-15" },
    { name: "Investment Strategy 2024", type: "Google Doc", status: "AI Analyzed", date: "2024-01-14" },
    { name: "Tax Planning Notes", type: "Google Sheet", status: "Pending", date: "2024-01-13" },
    { name: "Estate Planning Updates", type: "PDF", status: "Signed", date: "2024-01-12" }
  ]

  const aiInsights = [
    "Portfolio diversification suggests reducing equity exposure by 5%",
    "Tax optimization opportunities identified in real estate holdings",
    "Estate planning documents require updates based on new regulations",
    "Investment strategy alignment with family goals shows 92% match"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Family Office Management Platform
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                AI-Powered Wealth Management & Document Intelligence
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Live Demo
              </Badge>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* API Integration Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>API Integration Status</CardTitle>
            <CardDescription>
              Connect your services to unlock full functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(connectedServices).map(([service, connected]) => (
                <div key={service} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium capitalize">
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <Badge variant={connected ? "default" : "secondary"}>
                      {connected ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant={connected ? "outline" : "default"}
                    onClick={() => setConnectedServices(prev => ({
                      ...prev,
                      [service]: !prev[service as keyof typeof prev]
                    }))}
                  >
                    {connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">$6.0M</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    +4.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Documents Processed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">247</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    15 processed today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">12</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    3 high priority
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
                <CardDescription>Asset allocation and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{asset.name}</h3>
                          <div className="text-right">
                            <p className="font-bold">${asset.value.toLocaleString()}</p>
                            <p className={`text-sm ${asset.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {asset.change > 0 ? '+' : ''}{asset.change}%
                            </p>
                          </div>
                        </div>
                        <Progress value={(asset.value / 6000000) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Google Drive integration and AI processing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{doc.type} • {doc.date}</p>
                      </div>
                      <Badge variant={
                        doc.status === 'Processed' ? 'default' :
                        doc.status === 'AI Analyzed' ? 'secondary' :
                        doc.status === 'Signed' ? 'default' : 'outline'
                      }>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Blackbox AI analysis of your documents and data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-blue-900 dark:text-blue-100">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Workflows</CardTitle>
                <CardDescription>Document-to-code generation and automated processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Google Drive → Code Generation</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Automatically generate code components from document updates
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Active</Badge>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Document Processing Pipeline</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      OCR, text extraction, and AI analysis of uploaded documents
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Active</Badge>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Financial Data Sync</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Real-time synchronization with banking and investment APIs
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Pending Setup</Badge>
                      <Button size="sm">Setup</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
