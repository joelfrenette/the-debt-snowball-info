import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Database } from "@/lib/database.types"
import { CreditCard, Edit, Trash } from "lucide-react"

type Debt = Database["public"]["Tables"]["debts"]["Row"]

interface DebtListProps {
  debts: Debt[]
}

export function DebtList({ debts }: DebtListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Debts</CardTitle>
        <CardDescription>Manage your credit cards, loans, and other debts</CardDescription>
      </CardHeader>
      <CardContent>
        {debts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No debts added yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Add your debts to get started with your repayment plan
            </p>
            <Link href="/dashboard/add-debt">
              <Button className="bg-green-600 hover:bg-green-700">Add Your First Debt</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <h4 className="font-medium">{debt.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last four: {debt.last_four} • {debt.apr}% APR
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-medium">
                    $
                    {Number(debt.balance).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Min: $
                    {Number(debt.minimum_payment).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/dashboard/edit-debt/${debt.id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/delete-debt/${debt.id}`}>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {debts.length > 0 && (
        <CardFooter>
          <Link href="/dashboard/add-debt" className="w-full">
            <Button variant="outline" className="w-full">
              Add Another Debt
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
