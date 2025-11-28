"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type OnboardingStep =
  | "welcome"
  | "debt-intro"
  | "add-debts"
  | "debt-summary"
  | "offers-intro"
  | "add-offers"
  | "offers-summary"
  | "plan-generation"
  | "plan-review"
  | "completion"

interface Debt {
  name: string
  last_four: string
  balance: number
  apr: number
  minimum_payment: number
  payment_day: number
}

interface CreditOffer {
  name: string
  apr: number
  intro_apr: number | null
  intro_period_months: number | null
  transfer_fee_percent: number | null
  credit_limit: number
}

interface OnboardingContextType {
  currentStep: OnboardingStep
  setCurrentStep: (step: OnboardingStep) => void
  debts: Debt[]
  addDebt: (debt: Debt) => void
  updateDebt: (index: number, debt: Debt) => void
  removeDebt: (index: number) => void
  creditOffers: CreditOffer[]
  addCreditOffer: (offer: CreditOffer) => void
  updateCreditOffer: (index: number, offer: CreditOffer) => void
  removeCreditOffer: (index: number) => void
  potentialSavings: number
  setPotentialSavings: (savings: number) => void
  monthsToPayoff: number
  setMonthsToPayoff: (months: number) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [debts, setDebts] = useState<Debt[]>([])
  const [creditOffers, setCreditOffers] = useState<CreditOffer[]>([])
  const [potentialSavings, setPotentialSavings] = useState(0)
  const [monthsToPayoff, setMonthsToPayoff] = useState(0)

  const addDebt = (debt: Debt) => {
    setDebts([...debts, debt])
  }

  const updateDebt = (index: number, debt: Debt) => {
    const updatedDebts = [...debts]
    updatedDebts[index] = debt
    setDebts(updatedDebts)
  }

  const removeDebt = (index: number) => {
    setDebts(debts.filter((_, i) => i !== index))
  }

  const addCreditOffer = (offer: CreditOffer) => {
    setCreditOffers([...creditOffers, offer])
  }

  const updateCreditOffer = (index: number, offer: CreditOffer) => {
    const updatedOffers = [...creditOffers]
    updatedOffers[index] = offer
    setCreditOffers(updatedOffers)
  }

  const removeCreditOffer = (index: number) => {
    setCreditOffers(creditOffers.filter((_, i) => i !== index))
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        debts,
        addDebt,
        updateDebt,
        removeDebt,
        creditOffers,
        addCreditOffer,
        updateCreditOffer,
        removeCreditOffer,
        potentialSavings,
        setPotentialSavings,
        monthsToPayoff,
        setMonthsToPayoff,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return context
}
