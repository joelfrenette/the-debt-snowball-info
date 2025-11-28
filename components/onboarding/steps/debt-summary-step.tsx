"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DebtSummaryStep() {
  const { debts, totalDebt, averageAPR, setCurrentStep } = useOnboarding()

  // Calculate total minimum payment
  const totalMinPayment = debts.reduce((sum, debt) => sum + (Number(debt.minimum_payment) || 0), 0)

  // Find highest APR debt
  const highestAPRDebt = [...debts].sort((a, b) => (Number(b.apr) || 0) - (Number(a.apr) || 0))[0]

  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Your Debt Overview</h1>
        <p className="text-muted-foreground mt-2">Great job! Here's a summary of your current debt situation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium">Total Debt</h3>
            <p className="text-3xl font-bold text-green-600">
              ${totalDebt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Across {debts.length} {debts.length === 1 ? "account" : "accounts"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium">Average Interest Rate</h3>
            <p className="text-3xl font-bold text-green-600">{averageAPR.toFixed(2)}%</p>
            <p className="text-sm text-muted-foreground mt-2">Weighted by balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium">Monthly Payment</h3>
            <p className="text-3xl font-bold text-green-600">
              ${totalMinPayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Total minimum payments</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-amber-50 p-6 rounded-lg mt-6">
        <h3 className="text-lg font-medium text-amber-700">Did You Know?</h3>
        <p className="text-amber-700 mt-2">
          Your highest interest debt is {highestAPRDebt?.name} at {Number(highestAPRDebt?.apr).toFixed(2)}% APR. If you
          only make minimum payments, it could take years to pay off and cost thousands in interest!
        </p>
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold">What We've Learned</h2>
        <div className="space-y-2">
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
            <p>
              You have a total of $
              {totalDebt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in debt
            </p>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
            <p>Your average interest rate is {averageAPR.toFixed(2)}%</p>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
            <p>
              You're currently paying $
              {totalMinPayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per
              month in minimum payments
            </p>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
            <p>With the right strategy, you could save significantly on interest and pay off your debt faster!</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg mt-6">
        <p className="text-green-700">
          <span className="font-medium">Great progress!</span> Now let's see if we can optimize your debt repayment with
          some balance transfer or low-interest offers. This could help you save money on interest and pay off your debt
          even faster.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={() => setCurrentStep("add-debts")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => setCurrentStep("offers-intro")} className="bg-green-600 hover:bg-green-700">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
