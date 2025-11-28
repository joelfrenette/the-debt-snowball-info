"use client"

import { Button } from "@/components/ui/button"
import { useOnboarding } from "../onboarding-provider"
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function OffersSummaryStep() {
  const { creditOffers, showAffiliateOffers, setCurrentStep } = useOnboarding()

  // Affiliate offers (these would typically come from a database or API)
  const affiliateOffers = [
    {
      name: "Citi® Diamond Preferred®",
      introAPR: "0%",
      introPeriod: "21 months",
      standardAPR: "17.24% - 27.99%",
      transferFee: "5%",
      annualFee: "$0",
      creditScore: "Good to Excellent",
      link: "#",
      description: "One of the longest 0% intro APR periods available for balance transfers.",
    },
    {
      name: "Chase Freedom Unlimited®",
      introAPR: "0%",
      introPeriod: "15 months",
      standardAPR: "19.24% - 27.99%",
      transferFee: "3%",
      annualFee: "$0",
      creditScore: "Good to Excellent",
      link: "#",
      description: "Great for balance transfers and everyday spending with cash back rewards.",
    },
    {
      name: "Discover it® Balance Transfer",
      introAPR: "0%",
      introPeriod: "18 months",
      standardAPR: "16.24% - 27.24%",
      transferFee: "3%",
      annualFee: "$0",
      creditScore: "Good to Excellent",
      link: "#",
      description: "Long intro period with cash back rewards and no annual fee.",
    },
  ]

  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Credit Offers Summary</h1>
        <p className="text-muted-foreground mt-2">
          {creditOffers.length > 0
            ? "Here's a summary of the credit offers you've added."
            : "You haven't added any credit offers yet."}
        </p>
      </div>

      {creditOffers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Credit Offers</h2>
          {creditOffers.map((offer, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Offer Name</p>
                    <p className="font-medium">{offer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="font-medium">${Number(offer.credit_limit).toLocaleString("en-US")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Standard APR</p>
                    <p className="font-medium">{Number(offer.apr).toFixed(2)}%</p>
                  </div>
                  {offer.intro_apr !== null && (
                    <div>
                      <p className="text-sm text-muted-foreground">Intro APR</p>
                      <p className="font-medium">
                        {Number(offer.intro_apr).toFixed(2)}% for {offer.intro_period_months} months
                      </p>
                    </div>
                  )}
                  {offer.transfer_fee_percent !== null && (
                    <div>
                      <p className="text-sm text-muted-foreground">Transfer Fee</p>
                      <p className="font-medium">{Number(offer.transfer_fee_percent).toFixed(2)}%</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showAffiliateOffers && (
        <div className="space-y-4 mt-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Recommended Balance Transfer Offers</h2>
            <p className="text-muted-foreground mt-2">
              These offers could help you save money on interest and pay off your debt faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {affiliateOffers.map((offer, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardContent className="pt-6 flex-grow">
                  <h3 className="text-lg font-bold">{offer.name}</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Intro APR:</span>
                      <span className="text-sm font-medium">
                        {offer.introAPR} for {offer.introPeriod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Standard APR:</span>
                      <span className="text-sm font-medium">{offer.standardAPR}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transfer Fee:</span>
                      <span className="text-sm font-medium">{offer.transferFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Annual Fee:</span>
                      <span className="text-sm font-medium">{offer.annualFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Credit Score:</span>
                      <span className="text-sm font-medium">{offer.creditScore}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-4">{offer.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full" onClick={() => window.open(offer.link, "_blank")}>
                    Learn More <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p className="text-blue-700 text-sm">
              <span className="font-medium">Note:</span> These offers are recommendations based on general market
              availability. Approval depends on your credit score and financial situation. Terms and conditions apply.
            </p>
          </div>
        </div>
      )}

      <div className="bg-green-50 p-6 rounded-lg mt-6">
        <p className="text-green-700">
          <span className="font-medium">Great progress!</span> Now we have all the information we need to create your
          optimized debt payoff plan. In the next step, we'll analyze your debts and credit offers to create a
          personalized plan to help you become debt-free faster.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setCurrentStep(creditOffers.length > 0 ? "add-offers" : "offers-intro")}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => setCurrentStep("plan-generation")} className="bg-green-600 hover:bg-green-700">
          Generate My Plan <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
