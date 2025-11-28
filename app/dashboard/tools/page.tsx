"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseReductionDashboard } from "@/components/expense-reduction/expense-reduction-dashboard"
import { EnhancedEarnCashDashboard } from "@/components/earn-cash/enhanced-earn-cash-dashboard"

export default function ToolsPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("expense-reduction")

  useEffect(() => {
    if (tabParam === "earn-cash") {
      setActiveTab("earn-cash")
    }
  }, [tabParam])

  return (
    <div className="container max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Debt Management Tools</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense-reduction">Expense Reduction</TabsTrigger>
          <TabsTrigger value="earn-cash">Earn Cash</TabsTrigger>
        </TabsList>

        <TabsContent value="expense-reduction">
          <ExpenseReductionDashboard />
        </TabsContent>

        <TabsContent value="earn-cash">
          <EnhancedEarnCashDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
