"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, DollarSign, Scissors, Calculator } from "lucide-react"

export function SavingsSummary() {
  // Mock savings data
  const savingsData = {
    subscriptions: {
      current: 168.85,
      potential: 57.95,
      recommendations: [
        { name: "Cancel unused Apple Music", amount: 9.99 },
        { name: "Cancel Planet Fitness membership", amount: 24.99 },
        { name: "Cancel low-usage Hulu subscription", amount: 7.99 },
        { name: "Cancel New York Times subscription", amount: 4.99 },
        { name: "Downgrade Dropbox Plus to Basic", amount: 9.99 },
      ],
    },
    bills: {
      current: 2405.77,
      potential: 129.97,
      recommendations: [
        { name: "Negotiate Verizon Wireless plan", amount: 25.0 },
        { name: "Switch from DirecTV to streaming", amount: 69.99 },
        { name: "Negotiate insurance rates", amount: 34.98 },
      ],
    },
  }

  const totalCurrentExpenses = savingsData.subscriptions.current + savingsData.bills.current
  const totalPotentialSavings = savingsData.subscriptions.potential + savingsData.bills.potential
  const percentageSavings = (totalPotentialSavings / totalCurrentExpenses) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Your Savings Plan</h2>
        <p className="text-muted-foreground">
          Here's how you could save <span className="font-medium">${totalPotentialSavings.toFixed(2)}/month</span> on
          your expenses
        </p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-green-700">Total Potential Savings</h3>
            <p className="text-2xl font-bold text-green-700">${totalPotentialSavings.toFixed(2)}/month</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-green-700">Current: ${totalCurrentExpenses.toFixed(2)}/month</span>
              <span className="text-green-700">
                Optimized: ${(totalCurrentExpenses - totalPotentialSavings).toFixed(2)}/month
              </span>
            </div>
            <Progress value={percentageSavings} className="h-2 bg-green-200" indicatorClassName="bg-green-600" />
          </div>

          <div className="mt-4 bg-white p-3 rounded-lg border border-green-200">
            <div className="flex items-start">
              <Calculator className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-700">
                  <span className="font-medium">Debt Impact:</span> Adding ${totalPotentialSavings.toFixed(2)}/month to
                  your debt payments could:
                </p>
                <ul className="mt-1 text-sm text-green-700 space-y-1">
                  <li>
                    • Pay off your debt <span className="font-medium">2.5 years sooner</span>
                  </li>
                  <li>
                    • Save <span className="font-medium">${(totalPotentialSavings * 12 * 3.5).toFixed(2)}</span> in
                    interest
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Subscription Savings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    Current: ${savingsData.subscriptions.current.toFixed(2)}/month
                  </span>
                  <span className="font-medium">Save: ${savingsData.subscriptions.potential.toFixed(2)}/month</span>
                </div>
                <Progress
                  value={(savingsData.subscriptions.potential / savingsData.subscriptions.current) * 100}
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recommendations:</h4>
                {savingsData.subscriptions.recommendations.map((rec, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{rec.name}</span>
                    <span className="font-medium">${rec.amount.toFixed(2)}/mo</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => (window.location.href = "#subscriptions")}
              >
                Review Subscriptions <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Bill Savings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Current: ${savingsData.bills.current.toFixed(2)}/month</span>
                  <span className="font-medium">Save: ${savingsData.bills.potential.toFixed(2)}/month</span>
                </div>
                <Progress value={(savingsData.bills.potential / savingsData.bills.current) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recommendations:</h4>
                {savingsData.bills.recommendations.map((rec, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{rec.name}</span>
                    <span className="font-medium">${rec.amount.toFixed(2)}/mo</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full" onClick={() => (window.location.href = "#bills")}>
                Review Bills <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-700">Next Steps</h3>
        <ol className="mt-2 space-y-2 text-sm text-blue-600">
          <li>1. Review and cancel the recommended subscriptions</li>
          <li>2. Call service providers to negotiate your bills</li>
          <li>3. Add the saved money to your debt snowball payment</li>
          <li>4. Track your progress in the dashboard</li>
        </ol>
      </div>

      <div className="flex justify-center">
        <Button className="bg-green-600 hover:bg-green-700">
          Add Savings to Debt Snowball <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
