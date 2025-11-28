import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Database } from "@/lib/database.types"

type Debt = Database["public"]["Tables"]["debts"]["Row"]
type RepaymentPlan = Database["public"]["Tables"]["repayment_plans"]["Row"]

interface DashboardSummaryProps {
  debts: Debt[]
  repaymentPlan: RepaymentPlan | null
}

export function DashboardSummary({ debts, repaymentPlan }: DashboardSummaryProps) {
  // Calculate total debt
  const totalDebt = debts.reduce((sum, debt) => sum + Number(debt.balance), 0)

  // Calculate average APR
  const avgAPR = debts.length
    ? debts.reduce((sum, debt) => sum + Number(debt.apr) * Number(debt.balance), 0) / totalDebt
    : 0

  // Calculate monthly payment
  const totalMinPayment = debts.reduce((sum, debt) => sum + Number(debt.minimum_payment), 0)

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <CardDescription>Across all accounts</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalDebt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {debts.length} active {debts.length === 1 ? "debt" : "debts"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-medium">Average Interest Rate</CardTitle>
            <CardDescription>Weighted by balance</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgAPR.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            {debts.length > 0 ? `Highest: ${Math.max(...debts.map((d) => Number(d.apr))).toFixed(2)}%` : "No debts"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <CardDescription>With optimized plan</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {repaymentPlan
              ? `$${Number(repaymentPlan.total_savings).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : "Generate a plan"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {repaymentPlan
              ? `${repaymentPlan.months_to_payoff} months to debt freedom`
              : `Current monthly payment: $${totalMinPayment.toFixed(2)}`}
          </p>
        </CardContent>
      </Card>
    </>
  )
}
