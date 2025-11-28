"use client"

import { CreditCard, DollarSign, HelpCircle, PlusCircle, Scissors, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  onTabChange: (tab: string) => void
}

export function DashboardHeader({ onTabChange }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Get an overview of your finances</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => onTabChange("faq")}>
          <HelpCircle className="mr-2 h-4 w-4" />
          FAQ
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTabChange("cut-expenses")}>
          <Scissors className="mr-2 h-4 w-4" />
          Cut Expenses
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTabChange("earn-cash")}>
          <DollarSign className="mr-2 h-4 w-4" />
          Earn Cash
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTabChange("add-debt")}>
          <CreditCard className="mr-2 h-4 w-4" />
          Add Debt
        </Button>
        <Button variant="outline" size="sm" onClick={() => onTabChange("add-offer")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Credit Offer
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" size="sm" onClick={() => onTabChange("generate-plan")}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Plan
        </Button>
      </div>
    </div>
  )
}
