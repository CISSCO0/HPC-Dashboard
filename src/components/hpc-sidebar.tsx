"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Activity, Users, Settings, BarChart3, PlayCircle, Menu, X } from "lucide-react"
import { ClusterStatus } from "./hpc-clusterStatus"
interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function HPCSidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "jobs", label: "Job Queue", icon: Activity },
    { id: "submit", label: "Submit Job", icon: PlayCircle },
    { id: "resources", label: "Resources", icon: Server },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <Card
      className={`h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-semibold text-sidebar-foreground">BA HPC</h2>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent "
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
             <Button
  key={item.id}
  variant={isActive ? "default" : "ghost"}
  className={`${
    isCollapsed
      ? "w-10 h-10 mx-auto flex items-center justify-center rounded-lg"
      : "w-full justify-start gap-3 px-3"
  } ${
    isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
  }`}
  onClick={() => onTabChange(item.id)}
>
  <Icon className="h-4 w-4 flex-shrink-0" />
  {!isCollapsed && <span>{item.label}</span>}
</Button>
            )
          })}
        </nav>

        {/* Status */}
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <ClusterStatus></ClusterStatus>
          </div>
        )}
      </div>
    </Card>
  )
}
