"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Search, RefreshCw, X, Play, Pause } from "lucide-react"

const mockJobs = [
  {
    id: "HPC-2024-0156",
    name: "Molecular Dynamics Simulation",
    user: "dr.hassan@bibalex.org",
    status: "running",
    queue: "gpu",
    nodes: 4,
    cpus: 32,
    memory: "128GB",
    timeLimit: "24:00:00",
    timeUsed: "02:45:12",
    submitTime: "2024-01-15 09:30:00",
  },
  {
    id: "HPC-2024-0157",
    name: "Climate Model Analysis",
    user: "research.team@bibalex.org",
    status: "queued",
    queue: "compute",
    nodes: 8,
    cpus: 64,
    memory: "256GB",
    timeLimit: "48:00:00",
    timeUsed: "00:00:00",
    submitTime: "2024-01-15 10:15:00",
  },
  {
    id: "HPC-2024-0158",
    name: "Protein Folding Study",
    user: "bio.lab@bibalex.org",
    status: "completed",
    queue: "gpu",
    nodes: 2,
    cpus: 16,
    memory: "64GB",
    timeLimit: "12:00:00",
    timeUsed: "08:23:45",
    submitTime: "2024-01-15 08:00:00",
  },
  {
    id: "HPC-2024-0159",
    name: "Neural Network Training",
    user: "ai.research@bibalex.org",
    status: "failed",
    queue: "gpu",
    nodes: 1,
    cpus: 8,
    memory: "32GB",
    timeLimit: "06:00:00",
    timeUsed: "01:15:30",
    submitTime: "2024-01-15 11:00:00",
  },
]

export function JobQueue() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [jobs, setJobs] = useState(mockJobs);

  const handleRefresh = () => {
    // this is supposed to be API call for fetching jobs data 
      setJobs([...mockJobs]); 
    }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>
      case "queued":
        return <Badge className="bg-yellow-100 text-yellow-800">Queued</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }
  const handlePause = (id: string) => {
    // this is supposed to be API call for pausing job
  setJobs(jobs.map(job => job.id === id ? { ...job, status: 'queued' } : job));
  }

const handlePlay = (id: string) => {
   // this is supposed to be API call for playing job
  setJobs(jobs.map(job => job.id === id ? { ...job, status: 'running' } : job));
  }

const handleCancel = (id: string) => {
   // this is supposed to be API call for canceling job
  setJobs(jobs.map(job => job.id === id ? { ...job, status: 'failed' } : job));
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Queue Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, users, or job IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Queue</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((jobs) => (
                  <TableRow key={jobs.id}>
                    <TableCell className="font-mono text-sm">{jobs.id}</TableCell>
                    <TableCell className="font-medium">{jobs.name}</TableCell>
                    <TableCell className="text-sm">{jobs.user}</TableCell>
                    <TableCell>{getStatusBadge(jobs.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{jobs.queue}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>
                        {jobs.nodes}N / {jobs.cpus}C
                      </div>
                      <div className="text-muted-foreground">{jobs.memory}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>
                        {jobs.timeUsed} / {jobs.timeLimit}
                      </div>
                      <div className="text-muted-foreground">{jobs.submitTime}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {(jobs.status === "running" || jobs.status === "queued") && (
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={()=>handleCancel(jobs.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        {jobs.status === "queued" && (
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={() => handlePlay(jobs.id)}>
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        {jobs.status === "running" && (
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent" onClick={() => handlePause(jobs.id)}>
                            <Pause className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
