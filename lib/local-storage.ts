// Local storage utility functions for managing app data without a backend

export interface Debt {
  id?: string
  name: string
  last_four: string
  balance: number
  apr: number
  minimum_payment: number
  payment_day: number
  created_at?: string
}

export interface CreditOffer {
  id?: string
  name: string
  apr: number
  intro_apr: number | null
  intro_period_months: number | null
  transfer_fee_percent: number | null
  credit_limit: number
  rewards_program?: string | null
  rewards_rate?: number | null
  rewards_category?: string | null
  annual_fee?: number | null
  created_at?: string
}

export interface RepaymentPlan {
  id?: string
  name: string
  total_savings: number
  months_to_payoff: number
  is_active?: boolean
  created_at?: string
}

export interface RepaymentStep {
  id?: string
  plan_id: string
  month: number
  debt_name: string
  payment_amount: number
  remaining_balance: number
  created_at?: string
}

// Helper to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Debts
export const getDebts = (): Debt[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("debts")
  return data ? JSON.parse(data) : []
}

export const addDebt = (debt: Omit<Debt, "id" | "created_at">): Debt => {
  const debts = getDebts()
  const newDebt: Debt = {
    ...debt,
    id: generateId(),
    created_at: new Date().toISOString(),
  }
  debts.push(newDebt)
  localStorage.setItem("debts", JSON.stringify(debts))
  return newDebt
}

export const saveDebt = addDebt

export const updateDebt = (id: string, updates: Partial<Debt>): void => {
  const debts = getDebts()
  const index = debts.findIndex((d) => d.id === id)
  if (index !== -1) {
    debts[index] = { ...debts[index], ...updates }
    localStorage.setItem("debts", JSON.stringify(debts))
  }
}

export const deleteDebt = (id: string): void => {
  const debts = getDebts().filter((d) => d.id !== id)
  localStorage.setItem("debts", JSON.stringify(debts))
}

// Credit Offers
export const getCreditOffers = (): CreditOffer[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("creditOffers")
  return data ? JSON.parse(data) : []
}

export const addCreditOffer = (offer: Omit<CreditOffer, "id" | "created_at">): CreditOffer => {
  const offers = getCreditOffers()
  const newOffer: CreditOffer = {
    ...offer,
    id: generateId(),
    created_at: new Date().toISOString(),
  }
  offers.push(newOffer)
  localStorage.setItem("creditOffers", JSON.stringify(offers))
  return newOffer
}

export const saveCreditOffer = addCreditOffer

export const updateCreditOffer = (id: string, updates: Partial<CreditOffer>): void => {
  const offers = getCreditOffers()
  const index = offers.findIndex((o) => o.id === id)
  if (index !== -1) {
    offers[index] = { ...offers[index], ...updates }
    localStorage.setItem("creditOffers", JSON.stringify(offers))
  }
}

export const deleteCreditOffer = (id: string): void => {
  const offers = getCreditOffers().filter((o) => o.id !== id)
  localStorage.setItem("creditOffers", JSON.stringify(offers))
}

// Repayment Plans
export const getRepaymentPlans = (): RepaymentPlan[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("repaymentPlans")
  return data ? JSON.parse(data) : []
}

export const addRepaymentPlan = (plan: Omit<RepaymentPlan, "id" | "created_at">): RepaymentPlan => {
  const plans = getRepaymentPlans()

  // Mark all other plans as inactive
  const updatedPlans = plans.map((p) => ({ ...p, is_active: false }))

  const newPlan: RepaymentPlan = {
    ...plan,
    id: generateId(),
    is_active: true,
    created_at: new Date().toISOString(),
  }
  updatedPlans.push(newPlan)
  localStorage.setItem("repaymentPlans", JSON.stringify(updatedPlans))
  return newPlan
}

export const saveRepaymentPlan = addRepaymentPlan

export const getCurrentPlan = (): RepaymentPlan | null => {
  const plans = getRepaymentPlans()
  const activePlan = plans.find((p) => p.is_active)
  return activePlan || (plans.length > 0 ? plans[plans.length - 1] : null)
}

export const getActiveRepaymentPlan = getCurrentPlan

export const setCurrentPlan = (planId: string): void => {
  const plans = getRepaymentPlans()
  const updatedPlans = plans.map((p) => ({
    ...p,
    is_active: p.id === planId,
  }))
  localStorage.setItem("repaymentPlans", JSON.stringify(updatedPlans))
}

export const updateRepaymentPlan = (id: string, updates: Partial<RepaymentPlan>): void => {
  const plans = getRepaymentPlans()
  const index = plans.findIndex((p) => p.id === id)
  if (index !== -1) {
    plans[index] = { ...plans[index], ...updates }
    localStorage.setItem("repaymentPlans", JSON.stringify(plans))
  }
}

export const deleteRepaymentPlan = (id: string): void => {
  const plans = getRepaymentPlans().filter((p) => p.id !== id)
  localStorage.setItem("repaymentPlans", JSON.stringify(plans))

  // Also delete associated steps
  const steps = getRepaymentSteps().filter((s) => s.plan_id !== id)
  localStorage.setItem("repaymentSteps", JSON.stringify(steps))
}

// Repayment Steps
export const getRepaymentSteps = (): RepaymentStep[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("repaymentSteps")
  return data ? JSON.parse(data) : []
}

export const addRepaymentStep = (step: Omit<RepaymentStep, "id" | "created_at">): RepaymentStep => {
  const steps = getRepaymentSteps()
  const newStep: RepaymentStep = {
    ...step,
    id: generateId(),
    created_at: new Date().toISOString(),
  }
  steps.push(newStep)
  localStorage.setItem("repaymentSteps", JSON.stringify(steps))
  return newStep
}

export const saveRepaymentSteps = (
  planId: string,
  newSteps: Omit<RepaymentStep, "id" | "created_at">[],
): RepaymentStep[] => {
  // Remove old steps for this plan
  const existingSteps = getRepaymentSteps().filter((s) => s.plan_id !== planId)

  // Add new steps
  const stepsWithIds: RepaymentStep[] = newSteps.map((step) => ({
    ...step,
    id: generateId(),
    created_at: new Date().toISOString(),
  }))

  const allSteps = [...existingSteps, ...stepsWithIds]
  localStorage.setItem("repaymentSteps", JSON.stringify(allSteps))
  return stepsWithIds
}

export const getStepsByPlanId = (planId: string): RepaymentStep[] => {
  return getRepaymentSteps().filter((s) => s.plan_id === planId)
}

export const deleteStepsByPlanId = (planId: string): void => {
  const steps = getRepaymentSteps().filter((s) => s.plan_id !== planId)
  localStorage.setItem("repaymentSteps", JSON.stringify(steps))
}

// Onboarding
export const isOnboardingComplete = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("onboardingComplete") === "true"
}

export const setOnboardingComplete = (complete: boolean): void => {
  localStorage.setItem("onboardingComplete", String(complete))
}

// Clear all data
export const clearAllData = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("debts")
  localStorage.removeItem("creditOffers")
  localStorage.removeItem("repaymentPlans")
  localStorage.removeItem("repaymentSteps")
  localStorage.removeItem("onboardingComplete")
}
