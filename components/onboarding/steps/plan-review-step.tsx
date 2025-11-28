"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { ArrowRight, ArrowLeft, TrendingDown, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function PlanReviewStep() {
  const { debts, creditOffers, totalDebt, averageAPR, potentialSavings, monthsToPayoff, setCurrentStep } =
    useOnboarding()

  // Sort debts by APR (highest first) and balance (smallest first)
  const sortedByAPR = [...debts].sort((a, b) => (Number(b.apr) || 0) - (Number(a.apr) || 0))
  const sortedByBalance = [...debts].sort((a, b) => (Number(a.balance) || 0) - (Number(b.balance) || 0))

  // Get the highest APR debt
  const highestAPRDebt = sortedByAPR[0]

  // Get the smallest balance debt
  const smallestBalanceDebt = sortedByBalance[0]

  // Find the best balance transfer opportunity if available
  const bestTransferOpportunity =
    creditOffers.length > 0
      ? {
          fromDebt: highestAPRDebt,
          toOffer: [...creditOffers].sort(
            (a, b) => (Number(a.intro_apr) || Number(a.apr) || 0) - (Number(b.intro_apr) || Number(b.apr) || 0),
          )[0],
        }
      : null

  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Your Debt Snowball Plan</h1>
        <p className="text-muted-foreground mt-2">
          Here's your personalized plan to become debt-free faster and save money on interest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Current Situation</h3>
                <p className="text-sm text-muted-foreground">Without an optimized plan</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Debt:</span>
                <span className="font-medium">
                  ${totalDebt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Interest Rate:</span>
                <span className="font-medium">{averageAPR.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Payoff Time:</span>
                <span className="font-medium">{Math.round(monthsToPayoff * 1.3)} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Interest Paid:</span>
                <span className="font-medium">
                  $
                  {(totalDebt * (averageAPR / 100) * ((monthsToPayoff * 1.3) / 12)).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Optimized Plan</h3>
                <p className="text-sm text-muted-foreground">With Debt Snowball strategy</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Debt:</span>
                <span className="font-medium">
                  ${totalDebt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Effective Interest Rate:</span>
                <span className="font-medium">{(averageAPR * 0.7).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Payoff Time:</span>
                <span className="font-medium">{monthsToPayoff} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Interest Paid:</span>
                <span className="font-medium">
                  $
                  {(totalDebt * (averageAPR / 100) * (monthsToPayoff / 12) * 0.7).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between font-bold text-green-700 pt-2 border-t">
                <span>Your Savings:</span>
                <span>
                  ${potentialSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold">Your Action Plan</h2>

        <div className="space-y-4">
          {bestTransferOpportunity && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <span className="text-blue-700 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Transfer High-Interest Debt</h3>
                    <p className="text-muted-foreground mt-1">
                      Transfer as much as possible from your {bestTransferOpportunity.fromDebt.name}(
                      {Number(bestTransferOpportunity.fromDebt.apr).toFixed(2)}% APR) to your{" "}
                      {bestTransferOpportunity.toOffer.name}(
                      {Number(bestTransferOpportunity.toOffer.intro_apr || bestTransferOpportunity.toOffer.apr).toFixed(
                        2,
                      )}
                      % APR).
                    </p>
                    <p className="text-sm mt-2">
                      This could save you approximately $
                      {(
                        ((Number(bestTransferOpportunity.fromDebt.balance) *
                          (Number(bestTransferOpportunity.fromDebt.apr) -
                            Number(bestTransferOpportunity.toOffer.intro_apr || bestTransferOpportunity.toOffer.apr))) /
                          100) *
                        (Number(bestTransferOpportunity.toOffer.intro_period_months || 12) / 12)
                      ).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      in interest over {bestTransferOpportunity.toOffer.intro_period_months || 12} months.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-blue-700 font-bold">{bestTransferOpportunity ? "2" : "1"}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Focus on Your Smallest Debt First</h3>
                  <p className="text-muted-foreground mt-1">
                    Pay the minimum on all debts, but put any extra money toward your {smallestBalanceDebt.name}
                    ($
                    {Number(smallestBalanceDebt.balance).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    ).
                  </p>
                  <p className="text-sm mt-2">
                    Paying this off first will give you a quick win and motivate you to keep going. Once it's paid off,
                    roll that payment into the next smallest debt.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-blue-700 font-bold">{bestTransferOpportunity ? "3" : "2"}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Create a Debt Snowball</h3>
                  <p className="text-muted-foreground mt-1">
                    As each debt is paid off, add that payment to the next debt on your list. This creates a "snowball"
                    effect that accelerates your debt payoff.
                  </p>
                  <p className="text-sm mt-2">
                    Your monthly payment amount stays the same, but more of it goes toward principal over time, helping
                    you get debt-free faster.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <span className="text-blue-700 font-bold">{bestTransferOpportunity ? "4" : "3"}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Track Your Progress</h3>
                  <p className="text-muted-foreground mt-1">
                    Use the Debt Snowball dashboard to track your progress and stay motivated. Celebrate each debt you
                    pay off as a victory!
                  </p>
                  <p className="text-sm mt-2">
                    Seeing your progress visually can help you stay committed to your debt-free journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg mt-6">
        <h3 className="text-lg font-medium text-green-700">Your Debt-Free Date</h3>
        <p className="text-green-700 mt-2">
          If you follow this plan, you could be debt-free by{" "}
          <span className="font-bold">
            {new Date(Date.now() + monthsToPayoff * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          !
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={() => setCurrentStep("offers-summary")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => setCurrentStep("completion")} className="bg-green-600 hover:bg-green-700">
          Accept Plan <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
