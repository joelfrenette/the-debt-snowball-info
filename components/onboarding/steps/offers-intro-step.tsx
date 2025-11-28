"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { Percent, ArrowRight, ArrowLeft } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function OffersIntroStep() {
  const { hasExistingOffers, setHasExistingOffers, setCurrentStep, setShowAffiliateOffers } = useOnboarding()

  const handleContinue = () => {
    if (hasExistingOffers) {
      setCurrentStep("add-offers")
    } else {
      // If user has no existing offers, show affiliate offers
      setShowAffiliateOffers(true)
      setCurrentStep("offers-summary")
    }
  }

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Percent className="w-8 h-8 text-green-600" />
      </div>

      <h1 className="text-2xl font-bold">Let's Talk About Credit Offers</h1>

      <p className="text-lg text-muted-foreground max-w-2xl">
        One of the best ways to save money on interest is to take advantage of balance transfer offers or low-interest
        credit offers. These can help you pay off your debt faster and save money.
      </p>

      <div className="bg-amber-50 p-4 rounded-lg max-w-2xl">
        <p className="text-amber-700">
          <span className="font-medium">What are these offers?</span> Balance transfer offers let you move debt from
          high-interest cards to a card with a lower rate (often 0% for a promotional period). Low-interest offers give
          you access to credit at reduced rates.
        </p>
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-xl font-medium mb-4">Do you have any existing balance transfer or low-interest offers?</h2>

        <RadioGroup
          value={hasExistingOffers ? "yes" : "no"}
          onValueChange={(value) => setHasExistingOffers(value === "yes")}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="text-left">
              <span className="font-medium">Yes, I have offers</span>
              <p className="text-sm text-muted-foreground">
                I have credit cards or offers with low or 0% interest rates
              </p>
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="text-left">
              <span className="font-medium">No, I don't have any offers</span>
              <p className="text-sm text-muted-foreground">Show me some options that might help me save on interest</p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <p className="text-muted-foreground max-w-2xl">
        Don't worry if you don't have any offers - we'll still create an optimized debt payoff plan for you. And we
        might be able to suggest some options that could help you save money!
      </p>

      <div className="flex gap-4">
        <Button onClick={() => setCurrentStep("debt-summary")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
