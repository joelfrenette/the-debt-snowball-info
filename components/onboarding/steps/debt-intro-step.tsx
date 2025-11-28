"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { CreditCard, ArrowRight, ArrowLeft } from "lucide-react"

export function DebtIntroStep() {
  const { setCurrentStep } = useOnboarding()

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CreditCard className="w-8 h-8 text-green-600" />
      </div>

      <h1 className="text-2xl font-bold">Let's Talk About Your Debts</h1>

      <p className="text-lg text-muted-foreground max-w-2xl">
        First, we'll need to know about all your outstanding debts. This includes credit cards, personal loans, student
        loans, auto loans, and any other debts you're paying interest on.
      </p>

      <div className="bg-amber-50 p-4 rounded-lg max-w-2xl">
        <p className="text-amber-700">
          <span className="font-medium">Friendly tip:</span> Have your most recent statements handy! We'll need details
          like current balances, interest rates, and minimum payments.
        </p>
      </div>

      <p className="text-muted-foreground max-w-2xl">
        Don't worry if you don't have exact numbers - your best estimates will work too. And remember, this is a
        judgment-free zone. We're here to help, not to make you feel bad about that impulse purchase that seemed like a
        good idea at the time. We've all been there!
      </p>

      <div className="flex gap-4">
        <Button onClick={() => setCurrentStep("welcome")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => setCurrentStep("add-debts")} className="bg-green-600 hover:bg-green-700">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
