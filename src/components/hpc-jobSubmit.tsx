"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Send, FileText } from "lucide-react"

import mockJobs from "@/mockData/mockJobs"
export function JobSubmit() {
  const [jobName, setJobName] = useState("")
  const [queue, setQueue] = useState("")
  const [nodes, setNodes] = useState("1")
  const [cpus, setCpus] = useState("8")
  const [memory, setMemory] = useState("32")
  const [timeLimit, setTimeLimit] = useState("24:00:00")
  const [script, setScript] = useState("")

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newJob:any = {
    id: `HPC-${Date.now()}`, // unique mock ID
    name: jobName,
    user: "current.user@example.com", // replace with logged-in user if available
    group: "default",
    account: "default",
    status: "queued",
    queue,
    priority: 500,
    cpu: Number(cpus),
    cpus: Number(cpus),
    gpu: 0,
    memory: `${memory}GB`,
    nodes: Number(nodes),
    timeLimit,
    timeUsed: "00:00:00",
    time: "0h 0m",
    submitted: new Date().toISOString(),
    started: null,
    submitTime: new Date().toISOString(),
    submitLine: `sbatch --job-name=${jobName} --nodes=${nodes} --ntasks-per-node=${cpus} --time=${timeLimit}`,
    script,
    workingDirectory: "/home/user",
    exitCode: "PENDING",
    partition: queue,
    qos: "normal",
    requestedNodes: Number(nodes),
    requestedCpu: Number(cpus),
    requestedMemory: `${memory}GB`,
    allocatedNodes: 0,
    allocatedCpu: 0,
    allocatedMemory: "0GB",
    stages: [
      { name: "Submitted", completed: true, timestamp: new Date().toISOString() },
      { name: "Eligible", completed: false, timestamp: null },
      { name: "Scheduling", completed: false, timestamp: null },
      { name: "Running", completed: false, timestamp: null },
      { name: "Completing", completed: false, timestamp: null },
      { name: "Terminated", completed: false, timestamp: null },
    ],
  };

  // Add to mockJobs (for now in-memory)
  mockJobs.push(newJob);

  // Optionally reset form
  setJobName("");
  setQueue("");
  setNodes("");
  setCpus("");
  setMemory("");
  setTimeLimit("");
  setScript("");

  alert("Job submitted successfully!");
};


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobName">Job Name</Label>
                <Input
                  id="jobName"
                  placeholder="Enter job name"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="queue">Queue</Label>
                <Select value={queue} onValueChange={setQueue} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select queue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compute">Compute Queue</SelectItem>
                    <SelectItem value="gpu">GPU Queue</SelectItem>
                    <SelectItem value="memory">High Memory Queue</SelectItem>
                    <SelectItem value="debug">Debug Queue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Resource Requirements */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resource Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nodes">Nodes</Label>
                  <Input
                    id="nodes"
                    type="number"
                    min="1"
                    max="32"
                    value={nodes}
                    onChange={(e) => setNodes(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpus">CPUs per Node</Label>
                  <Input
                    id="cpus"
                    type="number"
                    min="1"
                    max="64"
                    value={cpus}
                    onChange={(e) => setCpus(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memory">Memory (GB)</Label>
                  <Input
                    id="memory"
                    type="number"
                    min="1"
                    max="512"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time Limit</Label>
                  <Input
                    id="timeLimit"
                    placeholder="HH:MM:SS"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Script Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Job Script</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Upload className="h-4 w-4" />
                    Upload Script File
                  </Button>
                  <Button type="button" variant="outline" className="flex items-center gap-2 bg-transparent">
                    <FileText className="h-4 w-4" />
                    Use Template
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="script">Script Content</Label>
                  <Textarea
                    id="script"
                    placeholder="#!/bin/bash&#10;#SBATCH --job-name=my-job&#10;#SBATCH --nodes=1&#10;#SBATCH --ntasks-per-node=8&#10;&#10;# Your commands here"
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Resource Summary */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Resource Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total CPUs:</span>
                    <div className="font-medium">{Number.parseInt(nodes||"0") * Number.parseInt(cpus || "0")}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Memory:</span>
                    <div className="font-medium">{Number.parseInt(nodes||"0") * Number.parseInt(memory || "0")} GB</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Queue:</span>
                    <div>{queue && <Badge variant="outline">{queue}</Badge>}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Wait:</span>
                    <div className="font-medium">~2.3 hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-2" onClick={handleSubmit}>
                <Send className="h-4 w-4" />
                Submit Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
