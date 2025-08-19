"use client"

import { useState } from "react"
import { HPCSidebar } from "@/components/hpc-sidebar"
// import { DashboardOverview } from "@/components/dashboard-overview"
import { JobQueue } from "@/components/hpc-jobQueue"
import { JobSubmit } from "@/components/hpc-JobSubmit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HPCDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {

   switch (activeTab) {
      //case "dashboard":
        //return <DashboardOverview />
      case "jobs":
        return <JobQueue />
      case "submit":
        return <JobSubmit />
      case "resources":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Resource Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Resource management interface coming soon...</p>
            </CardContent>
          </Card>
        )
      case "users":
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User management interface coming soon...</p>
            </CardContent>
          </Card>
        )
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings interface coming soon...</p>
            </CardContent>
          </Card>
        )
      default:
      //  return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <HPCSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Bibliotheca Alexandrina HPC Dashboard</h1>
            <p className="text-muted-foreground">High-Performance Computing Resource Management</p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
 )

}
