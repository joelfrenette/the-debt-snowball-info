"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { addDebt, addCreditOffer, addRepaymentPlan } from "@/lib/local-storage"

export function CompletionStep() {
  const { debts, creditOffers, potentialSavings, monthsToPayoff } = useOnboarding()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleSaveAndContinue = async () => {
    setSaving(true)

    try {
      // Save debts to localStorage
      for (const debt of debts) {
        addDebt(debt)
      }

      // Save credit offers to localStorage
      for (const offer of creditOffers) {
        addCreditOffer(offer)
      }

      // Create repayment plan
      addRepaymentPlan({
        name: "Debt Snowball Plan",
        total_savings: potentialSavings,
        months_to_payoff: monthsToPayoff,
      })

      // Redirect to dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("Error saving plan:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold">Congratulations!</h1>

      <p className="text-lg text-muted-foreground max-w-2xl">
        You've successfully created your personalized debt snowball plan. You're on your way to financial freedom!
      </p>

      <div className="bg-green-50 p-6 rounded-lg max-w-2xl">
        <h3 className="text-xl font-medium text-green-700">Your Plan Summary</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-green-700">Total Debt:</span>
            <span className="font-medium text-green-700">
              $
              {debts
                .reduce((sum, debt) => sum + Number(debt.balance), 0)
                .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Potential Savings:</span>
            <span className="font-medium text-green-700">
              ${potentialSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Estimated Payoff Time:</span>
            <span className="font-medium text-green-700">{monthsToPayoff} months</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Debt-Free Date:</span>
            <span className="font-medium text-green-700">
              {new Date(Date.now() + monthsToPayoff * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground max-w-2xl">
        Your plan has been created and is ready to use. Click the button below to save your plan and continue to your
        dashboard, where you can track your progress and make adjustments as needed.
      </p>

      <div className="space-y-4">
        <Button onClick={handleSaveAndContinue} className="bg-green-600 hover:bg-green-700" size="lg" disabled={saving}>
          {saving ? "Saving..." : "Save Plan & Continue to Dashboard"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-sm text-muted-foreground">Don't worry, you can always make changes to your plan later.</p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg max-w-2xl mt-4">
        <p className="text-blue-700">"The journey of a thousand miles begins with a single step." - Lao Tzu</p>
        <p className="text-sm text-blue-700 mt-2">You've taken that first step toward financial freedom. Keep going!</p>
      </div>
    </div>
  )
}
