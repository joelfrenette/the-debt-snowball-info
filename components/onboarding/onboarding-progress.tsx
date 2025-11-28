"use client"

import { useOnboarding } from "./onboarding-provider"
import { CheckCircle2, Circle } from "lucide-react"

export function OnboardingProgress() {
  const { currentStep } = useOnboarding()

  const steps = [
    { id: "welcome", label: "Welcome" },
    { id: "debt-intro", label: "Debt Info" },
    { id: "add-debts", label: "Add Debts" },
    { id: "debt-summary", label: "Debt Summary" },
    { id: "offers-intro", label: "Credit Offers" },
    { id: "add-offers", label: "Add Offers" },
    { id: "offers-summary", label: "Offers Summary" },
    { id: "plan-generation", label: "Generate Plan" },
    { id: "plan-review", label: "Review Plan" },
    { id: "completion", label: "Complete" },
  ]

  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className="w-full">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index <= currentIndex ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
              }`}
            >
              {index < currentIndex ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </div>
            <span className={`text-xs mt-1 ${index <= currentIndex ? "text-green-600" : "text-gray-400"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium">{steps[currentIndex].label}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
