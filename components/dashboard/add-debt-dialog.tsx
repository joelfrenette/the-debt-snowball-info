"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { addDebt } from "@/lib/local-storage"

interface AddDebtDialogProps {
  onSuccess: () => void
}

export function AddDebtDialog({ onSuccess }: AddDebtDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    interest_rate: "",
    minimum_payment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addDebt({
      name: formData.name,
      balance: Number.parseFloat(formData.balance),
      interest_rate: Number.parseFloat(formData.interest_rate),
      minimum_payment: Number.parseFloat(formData.minimum_payment),
    })

    setFormData({
      name: "",
      balance: "",
      interest_rate: "",
      minimum_payment: "",
    })
    setOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Debt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Debt</DialogTitle>
          <DialogDescription>Enter the details of your debt to track it in your repayment plan.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Debt Name</Label>
              <Input
                id="name"
                placeholder="e.g., Chase Credit Card"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="balance">Current Balance</Label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="e.g., 5000.00"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interest_rate">Interest Rate (%)</Label>
              <Input
                id="interest_rate"
                type="number"
                step="0.01"
                placeholder="e.g., 18.99"
                value={formData.interest_rate}
                onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minimum_payment">Minimum Monthly Payment</Label>
              <Input
                id="minimum_payment"
                type="number"
                step="0.01"
                placeholder="e.g., 125.00"
                value={formData.minimum_payment}
                onChange={(e) => setFormData({ ...formData, minimum_payment: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Add Debt
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
