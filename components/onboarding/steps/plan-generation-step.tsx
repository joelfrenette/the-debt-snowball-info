"use client"

import { useEffect, useState } from "react"
import { useOnboarding } from "../onboarding-provider"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PlanGenerationStep() {
  const { setCurrentStep } = useOnboarding()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Analyzing your debt profile...")

  // Simulate plan generation with progress updates
  useEffect(() => {
    const statuses = [
      "Analyzing your debt profile...",
      "Calculating interest savings...",
      "Evaluating balance transfer opportunities...",
      "Optimizing payment strategy...",
      "Generating snowball payment plan...",
      "Finalizing your personalized plan...",
      "Plan ready!",
    ]

    let currentStep = 0
    const totalSteps = statuses.length

    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        setStatus(statuses[currentStep])
        setProgress(Math.round((currentStep / (totalSteps - 1)) * 100))
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setCurrentStep("plan-review")
        }, 500)
      }
    }, 1200)

    return () => clearInterval(interval)
  }, [setCurrentStep])

  return (
    <div className="flex flex-col items-center text-center space-y-8 py-12">
      <Loader2 className="h-16 w-16 text-green-600 animate-spin" />

      <h1 className="text-2xl font-bold">Generating Your Debt Snowball Plan</h1>

      <div className="w-full max-w-md">
        <Progress value={progress} className="h-2" />
      </div>

      <p className="text-lg text-green-600 font-medium">{status}</p>

      <p className="text-muted-foreground max-w-2xl">
        We're analyzing your debt information and creating a personalized plan to help you pay off your debt faster and
        save money on interest. This will only take a moment.
      </p>

      <div className="bg-blue-50 p-4 rounded-lg max-w-2xl">
        <p className="text-blue-700">
          "The secret of getting ahead is getting started. The secret of getting started is breaking your complex,
          overwhelming tasks into small, manageable tasks, then starting on the first one." - Mark Twain
        </p>
      </div>
    </div>
  )
}
