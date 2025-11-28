"use client"

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
import { Sparkles } from "lucide-react"
import { getDebts, getCreditOffers, addRepaymentPlan, addRepaymentStep } from "@/lib/local-storage"

interface GeneratePlanDialogProps {
  onSuccess: () => void
}

export function GeneratePlanDialog({ onSuccess }: GeneratePlanDialogProps) {
  const [open, setOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePlan = async () => {
    setIsGenerating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const debts = getDebts()
    const offers = getCreditOffers()

    // Simple algorithm: Sort debts by interest rate (highest first)
    const sortedDebts = [...debts].sort((a, b) => b.interest_rate - a.interest_rate)

    let totalSavings = 0
    let monthsToPayoff = 0

    // Calculate simple savings estimate
    if (sortedDebts.length > 0 && offers.length > 0) {
      const highestInterestDebt = sortedDebts[0]
      const bestOffer = offers.sort((a, b) => a.intro_apr - b.intro_apr)[0]

      const savingsPerMonth =
        (highestInterestDebt.balance * (highestInterestDebt.interest_rate - bestOffer.intro_apr)) / 100 / 12
      totalSavings = savingsPerMonth * bestOffer.intro_period_months
      monthsToPayoff = Math.ceil(highestInterestDebt.balance / (highestInterestDebt.minimum_payment * 1.5))
    } else {
      monthsToPayoff = 24
    }

    const plan = addRepaymentPlan({
      total_savings: totalSavings,
      months_to_payoff: monthsToPayoff,
    })

    // Add steps
    if (sortedDebts.length > 0 && offers.length > 0) {
      const highestInterestDebt = sortedDebts[0]
      const bestOffer = offers.sort((a, b) => a.intro_apr - b.intro_apr)[0]

      addRepaymentStep({
        plan_id: plan.id,
        step_number: 1,
        action_type: "TRANSFER",
        from_debt_id: highestInterestDebt.id,
        to_offer_id: bestOffer.id,
        amount: Math.min(highestInterestDebt.balance, bestOffer.credit_limit),
        savings: totalSavings * 0.6,
      })

      sortedDebts.slice(1).forEach((debt, index) => {
        addRepaymentStep({
          plan_id: plan.id,
          step_number: index + 2,
          action_type: "PAYOFF",
          from_debt_id: debt.id,
          to_offer_id: null,
          amount: debt.minimum_payment * 1.5,
          savings: (totalSavings * 0.4) / (sortedDebts.length - 1),
        })
      })
    }

    setIsGenerating(false)
    setOpen(false)
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Plan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Optimized Plan</DialogTitle>
          <DialogDescription>
            Our AI will analyze your debts and credit offers to create an optimized repayment strategy that saves you
            money.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">The plan will include:</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Balance transfer recommendations
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Debt payoff priority order
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Estimated interest savings
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
              Timeline to becoming debt-free
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isGenerating}>
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={handleGeneratePlan} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Plan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
