"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Play,
  Server,
  Cpu,
  HardDrive,
  User,
  Settings,
  FileText,
  FolderOpen,
  Code,
  Activity,
} from "lucide-react"

import mockJobs from "@/mockData/mockJobs"


interface JobDetailsProps {
  jobId: string;            
  onBack: () => void;       
}
function getJobDetails(jobId: string): any {
  return mockJobs.find((job) => job.id === jobId) || null;
}

export function JobDetails({ jobId, onBack }:JobDetailsProps) {
  const [job, setJob] = useState(getJobDetails(jobId))
  const [progress, setProgress] = useState(45)

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (job.status === "running") {
        setProgress((prev) => Math.min(prev + 1, 95))
        // Update elapsed time
        setJob((prev:any) => ({
          ...prev,
          elapsedTime: `${Math.floor(Math.random() * 300) + 270} seconds elapsed`,
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [job.status])



const getStatusBadge = (status: string) => {
  const colors: Record<string, string> = {
    running: "bg-green-100 text-green-800",
    queued: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={`text-sm px-3 py-1 ${colors[status] || "bg-gray-100 text-gray-800"}`}>
      {status.toUpperCase()}
    </Badge>
  );
};



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Back to Jobs
              </Button>
                <div className="mb-4 mt-3">
                <h1 className="text-xl font-bold text-foreground">
                    Job {job.id}
                </h1>
                </div>
            </div>
          <div className="flex items-center gap-4">
            {getStatusBadge(job.status)}
            </div>

          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Timeline */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans font-bold text-lg">Job Progress </CardTitle>

                {job.status === "running" && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{progress}% complete</p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {job.stages.map((stage:any, index:any) => (
                    <div key={stage.name} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`
                          w-8 h-8 rounded-full border-2 flex items-center justify-center
                          ${
                            stage.completed
                              ? "bg-primary border-primary text-primary-foreground"
                              : stage.active
                                ? "bg-background border-primary text-primary animate-pulse"
                                : "bg-background border-muted text-muted-foreground"
                          }
                        `}
                        >
                          {stage.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : stage.active ? (
                            <Play className="h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4" />
                          )}
                        </div>
                        {index < job.stages.length - 1 && (
                          <div className={`w-0.5 h-8 mt-2 ${stage.completed ? "bg-primary" : "bg-muted"}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium ${
                            stage.active
                              ? "text-primary"
                              : stage.completed
                                ? "text-foreground"
                                : "text-muted-foreground"
                          }`}
                        >
                          {stage.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{stage.time || "Pending"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans font-bold text-lg">Job Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">User</p>
                        <p className="text-sm text-muted-foreground">{job.user}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Group</p>
                        <p className="text-sm text-muted-foreground">{job.group}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Account</p>
                        <p className="text-sm text-muted-foreground">{job.account}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Priority</p>
                        <p className="text-sm text-muted-foreground">{job.priority}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">{job.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Nodes</p>
                        <p className="text-sm text-muted-foreground">{job.nodes}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Partition</p>
                        <p className="text-sm text-muted-foreground">{job.partition}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">QOS</p>
                        <p className="text-sm text-muted-foreground">{job.qos}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Execution Details */}
            <Card>
              <CardHeader>
                  <CardTitle className="font-sans font-bold text-lg">Execution Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Submit line</p>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm font-mono break-all">{job.submitLine}</code>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Script</p>
                      <p className="text-sm text-muted-foreground font-mono">{job.script}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Working directory</p>
                      <p className="text-sm text-muted-foreground font-mono">{job.workingDirectory}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Exit Code</p>
                    <p className="text-sm text-muted-foreground">{job.exitCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Allocation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                      <CardTitle className="font-sans font-bold text-lg">Requested</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Nodes: {job.requestedNodes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">CPU: {job.requestedCpu}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Memory: {job.requestedMemory}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle className="font-sans font-bold text-lg">Allocated</CardTitle>
               
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Nodes: {job.allocatedNodes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">CPU: {job.allocatedCpu}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Memory: {job.allocatedMemory}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
