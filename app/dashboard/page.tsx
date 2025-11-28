"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, DollarSign, Scissors } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSummary } from "@/components/dashboard/dashboard-summary"
import { DebtList } from "@/components/dashboard/debt-list"
import { CreditOfferList } from "@/components/dashboard/credit-offer-list"
import { RepaymentPlanComponent } from "@/components/dashboard/repayment-plan"
import { FAQPage } from "@/components/faq/faq-page"
import { CutExpensesDashboard } from "@/components/cut-expenses/cut-expenses-dashboard"
import { EnhancedEarnCashDashboard } from "@/components/earn-cash/enhanced-earn-cash-dashboard"
import { getDebts, getCreditOffers, getCurrentPlan, getRepaymentSteps } from "@/lib/local-storage"
import type { Debt, CreditOffer, RepaymentPlan } from "@/lib/database.types"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("faq")
  const [debts, setDebts] = useState<Debt[]>([])
  const [creditOffers, setCreditOffers] = useState<CreditOffer[]>([])
  const [currentPlan, setCurrentPlan] = useState<RepaymentPlan | null>(null)
  const [planSteps, setPlanSteps] = useState<any[]>([])

  const loadData = () => {
    setDebts(getDebts())
    setCreditOffers(getCreditOffers())
    const plan = getCurrentPlan()
    setCurrentPlan(plan)
    if (plan) {
      setPlanSteps(getRepaymentSteps(plan.id))
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <DashboardHeader onRefresh={loadData} />

      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="cut-expenses" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              <span className="hidden sm:inline">Cut Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="earn-cash" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Earn Cash</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-6">
            <FAQPage />
          </TabsContent>

          <TabsContent value="cut-expenses" className="mt-6">
            <CutExpensesDashboard />
          </TabsContent>

          <TabsContent value="earn-cash" className="mt-6">
            <EnhancedEarnCashDashboard />
          </TabsContent>
        </Tabs>

        {activeTab === "faq" && (
          <div className="mt-8 space-y-8">
            <DashboardSummary debts={debts} creditOffers={creditOffers} currentPlan={currentPlan} />

            {debts.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Your Debts</h2>
                <DebtList debts={debts} onUpdate={loadData} />
              </div>
            )}

            {creditOffers.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Credit Offers</h2>
                <CreditOfferList offers={creditOffers} onUpdate={loadData} />
              </div>
            )}

            {currentPlan && planSteps.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Your Repayment Plan</h2>
                <RepaymentPlanComponent plan={currentPlan} steps={planSteps} debts={debts} offers={creditOffers} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
