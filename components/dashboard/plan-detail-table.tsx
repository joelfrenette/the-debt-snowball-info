import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Database } from "@/lib/database.types"

type Debt = Database["public"]["Tables"]["debts"]["Row"]
type RepaymentStep = Database["public"]["Tables"]["repayment_steps"]["Row"]

interface PlanDetailTableProps {
  debts: Debt[]
  steps: RepaymentStep[]
  months: number
}

export function PlanDetailTable({ debts, steps, months }: PlanDetailTableProps) {
  // Generate monthly breakdown
  const generateMonthlyBreakdown = () => {
    const monthlyData = []

    // Simple simulation of debt payoff
    const debtBalances = debts.reduce(
      (acc, debt) => {
        acc[debt.id] = Number(debt.balance)
        return acc
      },
      {} as Record<string, number>,
    )

    const monthlyPayments = debts.reduce(
      (acc, debt) => {
        acc[debt.id] = Number(debt.minimum_payment)
        return acc
      },
      {} as Record<string, number>,
    )

    // Apply steps
    for (const step of steps) {
      if (step.action_type === "PAYOFF" && step.from_debt_id) {
        monthlyPayments[step.from_debt_id] = Number(step.amount)
      }
    }

    // Calculate monthly breakdown
    let totalRemaining = Object.values(debtBalances).reduce((sum, balance) => sum + balance, 0)
    let month = 0

    while (totalRemaining > 0 && month < months) {
      month++

      const monthData: any = {
        month,
        totalRemaining,
        debts: {},
      }

      // Apply payments to each debt
      for (const debtId in debtBalances) {
        if (debtBalances[debtId] <= 0) continue

        const debt = debts.find((d) => d.id === debtId)
        if (!debt) continue

        // Calculate interest for the month
        const interest = debtBalances[debtId] * (Number(debt.apr) / 100 / 12)

        // Apply payment
        const payment = Math.min(debtBalances[debtId] + interest, monthlyPayments[debtId])
        debtBalances[debtId] = Math.max(0, debtBalances[debtId] + interest - payment)

        monthData.debts[debtId] = {
          name: debt.name,
          startBalance: debtBalances[debtId] + payment - interest,
          interest,
          payment,
          endBalance: debtBalances[debtId],
        }
      }

      // Recalculate total remaining
      totalRemaining = Object.values(debtBalances).reduce((sum, balance) => sum + balance, 0)

      monthlyData.push(monthData)

      // If all debts are paid off, break
      if (totalRemaining <= 0) break
    }

    return monthlyData
  }

  const monthlyBreakdown = generateMonthlyBreakdown()

  // Only show first 12 months in the table
  const displayMonths = monthlyBreakdown.slice(0, 12)

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Total Remaining</TableHead>
            <TableHead>Total Paid</TableHead>
            <TableHead>Interest Paid</TableHead>
            <TableHead>Principal Paid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayMonths.map((month) => {
            const totalPaid = Object.values(month.debts).reduce((sum: number, debt: any) => sum + debt.payment, 0)
            const interestPaid = Object.values(month.debts).reduce((sum: number, debt: any) => sum + debt.interest, 0)
            const principalPaid = totalPaid - interestPaid

            return (
              <TableRow key={month.month}>
                <TableCell>{month.month}</TableCell>
                <TableCell>
                  $
                  {month.totalRemaining.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  ${interestPaid.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  ${principalPaid.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {monthlyBreakdown.length > 12 && (
        <div className="text-center text-sm text-muted-foreground mt-4">
          Showing first 12 months of {monthlyBreakdown.length} total months
        </div>
      )}
    </div>
  )
}
