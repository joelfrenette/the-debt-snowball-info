"use client"
import { AddDebtDialog } from "@/components/dashboard/add-debt-dialog"
import { AddCreditOfferDialog } from "@/components/dashboard/add-credit-offer-dialog"
import { GeneratePlanDialog } from "@/components/dashboard/generate-plan-dialog"

interface DashboardHeaderProps {
  onDataChange: () => void
}

export function DashboardHeader({ onDataChange }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Joel Frenette</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <AddDebtDialog onSuccess={onDataChange} />
        <AddCreditOfferDialog onSuccess={onDataChange} />
        <GeneratePlanDialog onSuccess={onDataChange} />
      </div>
    </div>
  )
}
