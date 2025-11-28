"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useOnboarding } from "../onboarding-provider"
import { ArrowRight, ArrowLeft, Plus, Trash2, CreditCard, DollarSign, Percent } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AddOffersStep() {
  const { creditOffers, addCreditOffer, updateCreditOffer, removeCreditOffer, setCurrentStep } = useOnboarding()
  const [hasIntroOffer, setHasIntroOffer] = useState(true)
  const [hasTransferFee, setHasTransferFee] = useState(true)
  const [currentOffer, setCurrentOffer] = useState({
    name: "",
    apr: "",
    intro_apr: "",
    intro_period_months: "",
    transfer_fee_percent: "",
    credit_limit: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateOffer = () => {
    const newErrors: Record<string, string> = {}

    if (!currentOffer.name) newErrors.name = "Offer name is required"
    if (!currentOffer.apr) newErrors.apr = "Standard APR is required"
    if (isNaN(Number(currentOffer.apr)) || Number(currentOffer.apr) < 0) {
      newErrors.apr = "Must be a non-negative number"
    }

    if (hasIntroOffer) {
      if (!currentOffer.intro_apr) newErrors.intro_apr = "Intro APR is required"
      if (isNaN(Number(currentOffer.intro_apr)) || Number(currentOffer.intro_apr) < 0) {
        newErrors.intro_apr = "Must be a non-negative number"
      }
      if (!currentOffer.intro_period_months) newErrors.intro_period_months = "Intro period is required"
      if (isNaN(Number(currentOffer.intro_period_months)) || Number(currentOffer.intro_period_months) <= 0) {
        newErrors.intro_period_months = "Must be a positive number"
      }
    }

    if (hasTransferFee) {
      if (!currentOffer.transfer_fee_percent) newErrors.transfer_fee_percent = "Transfer fee is required"
      if (isNaN(Number(currentOffer.transfer_fee_percent)) || Number(currentOffer.transfer_fee_percent) < 0) {
        newErrors.transfer_fee_percent = "Must be a non-negative number"
      }
    }

    if (!currentOffer.credit_limit) newErrors.credit_limit = "Credit limit is required"
    if (isNaN(Number(currentOffer.credit_limit)) || Number(currentOffer.credit_limit) <= 0) {
      newErrors.credit_limit = "Must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddOffer = () => {
    if (validateOffer()) {
      addCreditOffer({
        name: currentOffer.name,
        apr: Number(currentOffer.apr),
        intro_apr: hasIntroOffer ? Number(currentOffer.intro_apr) : null,
        intro_period_months: hasIntroOffer ? Number(currentOffer.intro_period_months) : null,
        transfer_fee_percent: hasTransferFee ? Number(currentOffer.transfer_fee_percent) : null,
        credit_limit: Number(currentOffer.credit_limit),
      })

      // Reset form
      setCurrentOffer({
        name: "",
        apr: "",
        intro_apr: "",
        intro_period_months: "",
        transfer_fee_percent: "",
        credit_limit: "",
      })
      setErrors({})
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Add Your Credit Offers</h1>
        <p className="text-muted-foreground mt-2">
          Add any balance transfer or low-interest credit offers you currently have.
        </p>
      </div>

      {/* Offer entry form */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> Offer Name
              </Label>
              <Input
                id="name"
                placeholder="Citi Diamond Preferred"
                value={currentOffer.name}
                onChange={(e) => setCurrentOffer({ ...currentOffer, name: e.target.value })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="credit_limit" className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" /> Credit Limit
              </Label>
              <Input
                id="credit_limit"
                placeholder="10000.00"
                value={currentOffer.credit_limit}
                onChange={(e) => setCurrentOffer({ ...currentOffer, credit_limit: e.target.value })}
                className={errors.credit_limit ? "border-red-500" : ""}
              />
              {errors.credit_limit && <p className="text-red-500 text-xs">{errors.credit_limit}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apr" className="flex items-center">
                <Percent className="w-4 h-4 mr-2" /> Standard APR
              </Label>
              <Input
                id="apr"
                placeholder="14.99"
                value={currentOffer.apr}
                onChange={(e) => setCurrentOffer({ ...currentOffer, apr: e.target.value })}
                className={errors.apr ? "border-red-500" : ""}
              />
              {errors.apr && <p className="text-red-500 text-xs">{errors.apr}</p>}
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Switch id="hasIntroOffer" checked={hasIntroOffer} onCheckedChange={setHasIntroOffer} />
              <Label htmlFor="hasIntroOffer">Has introductory APR offer</Label>
            </div>

            {hasIntroOffer && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="intro_apr" className="flex items-center">
                    <Percent className="w-4 h-4 mr-2" /> Introductory APR
                  </Label>
                  <Input
                    id="intro_apr"
                    placeholder="0.00"
                    value={currentOffer.intro_apr}
                    onChange={(e) => setCurrentOffer({ ...currentOffer, intro_apr: e.target.value })}
                    className={errors.intro_apr ? "border-red-500" : ""}
                  />
                  {errors.intro_apr && <p className="text-red-500 text-xs">{errors.intro_apr}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intro_period_months" className="flex items-center">
                    Intro Period (months)
                  </Label>
                  <Input
                    id="intro_period_months"
                    placeholder="12"
                    value={currentOffer.intro_period_months}
                    onChange={(e) => setCurrentOffer({ ...currentOffer, intro_period_months: e.target.value })}
                    className={errors.intro_period_months ? "border-red-500" : ""}
                  />
                  {errors.intro_period_months && <p className="text-red-500 text-xs">{errors.intro_period_months}</p>}
                </div>
              </>
            )}

            <div className="flex items-center space-x-2 md:col-span-2">
              <Switch id="hasTransferFee" checked={hasTransferFee} onCheckedChange={setHasTransferFee} />
              <Label htmlFor="hasTransferFee">Has balance transfer fee</Label>
            </div>

            {hasTransferFee && (
              <div className="space-y-2">
                <Label htmlFor="transfer_fee_percent" className="flex items-center">
                  <Percent className="w-4 h-4 mr-2" /> Transfer Fee
                </Label>
                <Input
                  id="transfer_fee_percent"
                  placeholder="3.00"
                  value={currentOffer.transfer_fee_percent}
                  onChange={(e) => setCurrentOffer({ ...currentOffer, transfer_fee_percent: e.target.value })}
                  className={errors.transfer_fee_percent ? "border-red-500" : ""}
                />
                {errors.transfer_fee_percent && <p className="text-red-500 text-xs">{errors.transfer_fee_percent}</p>}
                <p className="text-xs text-muted-foreground">Percentage of transferred amount</p>
              </div>
            )}
          </div>

          <Button onClick={handleAddOffer} className="mt-6 bg-green-600 hover:bg-green-700 w-full">
            <Plus className="mr-2 h-4 w-4" /> Add This Offer
          </Button>
        </CardContent>
      </Card>

      {/* List of added offers */}
      {creditOffers.length > 0 && (
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Your Credit Offers</h2>
          {creditOffers.map((offer, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeCreditOffer(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

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

      <div className="flex justify-between mt-8">
        <Button onClick={() => setCurrentStep("offers-intro")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={() => setCurrentStep("offers-summary")} className="bg-green-600 hover:bg-green-700">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Don't have any offers? No problem! You can skip this step and we'll still create a great plan for you.
        </p>
      </div>
    </div>
  )
}
