import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "./ui/button"
import {  X } from "lucide-react"

export default function CancelJobButton({ jobId, onCancel }: { jobId: string; onCancel: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onCancel(jobId);
    setOpen(false);
  };

  return (
    <>
      {/* Red X Button */}
      <Button
        size="sm"
        variant="destructive"
        className="h-8 w-8 p-0 flex items-center justify-center"
        onClick={() => setOpen(true)}
      >
        <X className="h-3 w-3" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Job</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to cancel this job? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
