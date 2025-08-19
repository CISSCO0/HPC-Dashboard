"use client"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function ClusterStatus() {

  const [status, setStatus] = useState<"online" | "offline" | "unknown">("unknown")
  const [nodes, setNodes] = useState({ active: 0, total: 0 })
   // Simulate fetching from backend API
  useEffect(() => {
    async function fetchClusterStatus() {
      // later this would be a real API call 
      // dummy response (simulate SLURM sinfo)
      const data = {
        state: "online",
        nodes: { active: 24, total: 32 },
      }

      setStatus(data.state as "online" | "offline")
      setNodes(data.nodes)
    }

    fetchClusterStatus()

    // auto-refresh every 10s
    const interval = setInterval(fetchClusterStatus, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Cluster Status</span>
        <Badge
          variant="secondary"
          className={
            status === "online"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {status === "unknown" ? "Loading..." : status.toUpperCase()}
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground">
        {nodes.active}/{nodes.total} nodes active
      </div>
    </div>
  )
}
