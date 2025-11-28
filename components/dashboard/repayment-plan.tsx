import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { Debt, CreditOffer, RepaymentPlan, RepaymentStep } from "@/lib/local-storage"

interface RepaymentPlanProps {
  plan: RepaymentPlan
  steps: RepaymentStep[]
  debts: Debt[]
  creditOffers: CreditOffer[]
}

export function RepaymentPlanComponent({ plan, steps, debts, creditOffers }: RepaymentPlanProps) {
  // Helper function to find debt by id
  const findDebt = (id: string | null) => {
    if (!id) return null
    return debts.find((debt) => debt.id === id) || null
  }

  // Helper function to find credit offer by id
  const findCreditOffer = (id: string | null) => {
    if (!id) return null
    return creditOffers.find((offer) => offer.id === id) || null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Optimized Repayment Plan</CardTitle>
            <CardDescription>Follow these steps to save money and pay off debt faster</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
            <div className="font-medium text-green-700 dark:text-green-300">Plan Summary</div>
            <div className="mt-1 text-sm text-green-600 dark:text-green-400">
              Save $
              {Number(plan.total_savings).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              in interest and be debt-free in {plan.months_to_payoff} months!
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step) => {
              const fromDebt = findDebt(step.from_debt_id)
              const toOffer = findCreditOffer(step.to_offer_id)

              return (
                <div key={step.id} className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-700 dark:bg-green-800/30 dark:text-green-300">
                      {step.step_number}
                    </div>
                    <div className="flex-1">
                      {step.action_type === "TRANSFER" && fromDebt && toOffer ? (
                        <div className="space-y-1">
                          <h4 className="font-medium">Transfer Balance</h4>
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground">{fromDebt.name}</span>
                            <ArrowRight className="mx-2 h-4 w-4" />
                            <span className="text-muted-foreground">{toOffer.name}</span>
                          </div>
                          <p className="text-sm">
                            Transfer $
                            {Number(step.amount).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            to save $
                            {Number(step.savings).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            in interest
                          </p>
                        </div>
                      ) : step.action_type === "PAYOFF" && fromDebt ? (
                        <div className="space-y-1">
                          <h4 className="font-medium">Pay Off Debt</h4>
                          <p className="text-sm text-muted-foreground">Focus on paying off {fromDebt.name} first</p>
                          <p className="text-sm">
                            Pay an extra $
                            {Number(step.amount).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            per month to save $
                            {Number(step.savings).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            in interest
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <h4 className="font-medium">{step.action_type}</h4>
                          <p className="text-sm">
                            $
                            {Number(step.amount).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            - Save $
                            {Number(step.savings).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
