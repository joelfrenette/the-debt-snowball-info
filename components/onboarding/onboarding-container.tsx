"use client"

import { useOnboarding } from "./onboarding-provider"
import { Card, CardContent } from "@/components/ui/card"
import { WelcomeStep } from "./steps/welcome-step"
import { DebtIntroStep } from "./steps/debt-intro-step"
import { AddDebtsStep } from "./steps/add-debts-step"
import { DebtSummaryStep } from "./steps/debt-summary-step"
import { OffersIntroStep } from "./steps/offers-intro-step"
import { AddOffersStep } from "./steps/add-offers-step"
import { OffersSummaryStep } from "./steps/offers-summary-step"
import { PlanGenerationStep } from "./steps/plan-generation-step"
import { PlanReviewStep } from "./steps/plan-review-step"
import { CompletionStep } from "./steps/completion-step"
import { OnboardingProgress } from "./onboarding-progress"

export function OnboardingContainer() {
  const { currentStep } = useOnboarding()

  const renderStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeStep />
      case "debt-intro":
        return <DebtIntroStep />
      case "add-debts":
        return <AddDebtsStep />
      case "debt-summary":
        return <DebtSummaryStep />
      case "offers-intro":
        return <OffersIntroStep />
      case "add-offers":
        return <AddOffersStep />
      case "offers-summary":
        return <OffersSummaryStep />
      case "plan-generation":
        return <PlanGenerationStep />
      case "plan-review":
        return <PlanReviewStep />
      case "completion":
        return <CompletionStep />
      default:
        return <WelcomeStep />
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <OnboardingProgress />
      <Card className="mt-6">
        <CardContent className="pt-6">{renderStep()}</CardContent>
      </Card>
    </div>
  )
}
