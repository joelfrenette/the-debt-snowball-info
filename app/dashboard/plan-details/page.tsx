import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlanDetailChart } from "@/components/dashboard/plan-detail-chart"
import { PlanDetailTable } from "@/components/dashboard/plan-detail-table"

export default async function PlanDetailsPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Fetch user's debts
  const { data: debts } = await supabase.from("debts").select("*").order("balance", { ascending: false })

  // Fetch user's latest repayment plan
  const { data: repaymentPlans } = await supabase
    .from("repayment_plans")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)

  if (!repaymentPlans || repaymentPlans.length === 0) {
    redirect("/dashboard/generate-plan")
  }

  // Fetch repayment steps
  const { data: repaymentSteps } = await supabase
    .from("repayment_steps")
    .select("*")
    .eq("plan_id", repaymentPlans[0].id)
    .order("step_number", { ascending: true })

  return (
    <div className="container max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Detailed Repayment Plan</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plan Summary</CardTitle>
            <CardDescription>Overview of your debt repayment plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Debt</p>
                  <p className="text-2xl font-bold">
                    $
                    {debts
                      ?.reduce((sum, debt) => sum + Number(debt.balance), 0)
                      .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    $
                    {Number(repaymentPlans[0].total_savings).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time to Debt-Free</p>
                  <p className="text-2xl font-bold">{repaymentPlans[0].months_to_payoff} months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Debt-Free Date</p>
                  <p className="text-2xl font-bold">
                    {new Date(
                      Date.now() + repaymentPlans[0].months_to_payoff * 30 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payoff Projection</CardTitle>
            <CardDescription>Visualize your debt payoff journey</CardDescription>
          </CardHeader>
          <CardContent>
            <PlanDetailChart
              months={repaymentPlans[0].months_to_payoff}
              totalDebt={debts?.reduce((sum, debt) => sum + Number(debt.balance), 0) || 0}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Month-by-Month Plan</CardTitle>
            <CardDescription>Detailed breakdown of your repayment strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <PlanDetailTable
              debts={debts || []}
              steps={repaymentSteps || []}
              months={repaymentPlans[0].months_to_payoff}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
