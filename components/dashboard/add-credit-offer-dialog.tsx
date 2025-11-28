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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard } from "lucide-react"
import { addCreditOffer } from "@/lib/local-storage"

interface AddCreditOfferDialogProps {
  onSuccess: () => void
}

export function AddCreditOfferDialog({ onSuccess }: AddCreditOfferDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    credit_limit: "",
    intro_apr: "",
    intro_period_months: "",
    regular_apr: "",
    balance_transfer_fee: "",
    annual_fee: "",
    rewards_program: "",
    rewards_rate: "",
    rewards_category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addCreditOffer({
      name: formData.name,
      credit_limit: Number.parseFloat(formData.credit_limit),
      intro_apr: Number.parseFloat(formData.intro_apr),
      intro_period_months: Number.parseInt(formData.intro_period_months),
      regular_apr: Number.parseFloat(formData.regular_apr),
      balance_transfer_fee: Number.parseFloat(formData.balance_transfer_fee),
      annual_fee: Number.parseFloat(formData.annual_fee),
      rewards_program: formData.rewards_program || undefined,
      rewards_rate: formData.rewards_rate ? Number.parseFloat(formData.rewards_rate) : undefined,
      rewards_category: formData.rewards_category || undefined,
    })

    setFormData({
      name: "",
      credit_limit: "",
      intro_apr: "",
      intro_period_months: "",
      regular_apr: "",
      balance_transfer_fee: "",
      annual_fee: "",
      rewards_program: "",
      rewards_rate: "",
      rewards_category: "",
    })
    setOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CreditCard className="mr-2 h-4 w-4" />
          Add Credit Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Credit Card Offer</DialogTitle>
          <DialogDescription>
            Enter the details of a credit card offer you've received or are considering.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="rewards">Rewards & Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Card Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Chase Slate Edge"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="credit_limit">Credit Limit</Label>
                <Input
                  id="credit_limit"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 10000.00"
                  value={formData.credit_limit}
                  onChange={(e) => setFormData({ ...formData, credit_limit: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="intro_apr">Intro APR (%)</Label>
                <Input
                  id="intro_apr"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 0.00"
                  value={formData.intro_apr}
                  onChange={(e) => setFormData({ ...formData, intro_apr: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="intro_period_months">Intro Period (months)</Label>
                <Input
                  id="intro_period_months"
                  type="number"
                  placeholder="e.g., 18"
                  value={formData.intro_period_months}
                  onChange={(e) => setFormData({ ...formData, intro_period_months: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="regular_apr">Regular APR (%)</Label>
                <Input
                  id="regular_apr"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 16.99"
                  value={formData.regular_apr}
                  onChange={(e) => setFormData({ ...formData, regular_apr: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="balance_transfer_fee">Balance Transfer Fee (%)</Label>
                <Input
                  id="balance_transfer_fee"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 3.00"
                  value={formData.balance_transfer_fee}
                  onChange={(e) => setFormData({ ...formData, balance_transfer_fee: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="annual_fee">Annual Fee</Label>
                <Input
                  id="annual_fee"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 0.00"
                  value={formData.annual_fee}
                  onChange={(e) => setFormData({ ...formData, annual_fee: e.target.value })}
                  required
                />
              </div>
            </TabsContent>
            <TabsContent value="rewards" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="rewards_program">Rewards Program</Label>
                <Select
                  value={formData.rewards_program}
                  onValueChange={(value) => setFormData({ ...formData, rewards_program: value })}
                >
                  <SelectTrigger id="rewards_program">
                    <SelectValue placeholder="Select rewards type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash Back">Cash Back</SelectItem>
                    <SelectItem value="Travel Points">Travel Points</SelectItem>
                    <SelectItem value="Airline Miles">Airline Miles</SelectItem>
                    <SelectItem value="Hotel Points">Hotel Points</SelectItem>
                    <SelectItem value="General Points">General Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rewards_rate">Rewards Rate (%)</Label>
                <Input
                  id="rewards_rate"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 1.5 (for 1.5% cash back)"
                  value={formData.rewards_rate}
                  onChange={(e) => setFormData({ ...formData, rewards_rate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rewards_category">Bonus Category</Label>
                <Select
                  value={formData.rewards_category}
                  onValueChange={(value) => setFormData({ ...formData, rewards_category: value })}
                >
                  <SelectTrigger id="rewards_category">
                    <SelectValue placeholder="Select bonus category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dining">Dining</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Gas">Gas</SelectItem>
                    <SelectItem value="Groceries">Groceries</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="All Purchases">All Purchases</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Add Offer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
