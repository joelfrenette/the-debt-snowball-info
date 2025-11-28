"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { Coins, ArrowRight } from "lucide-react"

export function WelcomeStep() {
  const { setCurrentStep } = useOnboarding()

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Coins className="w-8 h-8 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold">Welcome to Your Debt-Free Journey!</h1>

      <p className="text-lg text-muted-foreground max-w-2xl">
        We're about to create your personalized debt payoff plan. Think of me as your friendly financial sidekick - here
        to help, not to judge. After all, debt happens to the best of us!
      </p>

      <div className="bg-blue-50 p-4 rounded-lg max-w-2xl">
        <p className="text-blue-700">"Money is a terrible master but an excellent servant." - P.T. Barnum</p>
      </div>

      <p className="text-muted-foreground max-w-2xl">
        This quick onboarding will take about 5 minutes. You'll need information about your current debts and any credit
        offers you might have. Don't worry, this is between me, you, and the AI assistant. Your information is secure
        and private.
      </p>

      <Button onClick={() => setCurrentStep("debt-intro")} className="bg-green-600 hover:bg-green-700" size="lg">
        Let's Get Started <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
