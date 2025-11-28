"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOnboarding } from "../onboarding-provider"
import { ArrowRight, ArrowLeft, Plus, Trash2, CreditCard, DollarSign, Percent, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AddDebtsStep() {
  const { debts, addDebt, updateDebt, removeDebt, setCurrentStep } = useOnboarding()
  const [currentDebt, setCurrentDebt] = useState({
    name: "",
    last_four: "",
    balance: "",
    apr: "",
    minimum_payment: "",
    payment_day: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateDebt = () => {
    const newErrors: Record<string, string> = {}

    if (!currentDebt.name) newErrors.name = "Debt name is required"
    if (!currentDebt.last_four) newErrors.last_four = "Last 4 digits are required"
    if (!/^\d{4}$/.test(currentDebt.last_four)) newErrors.last_four = "Must be 4 digits"
    if (!currentDebt.balance) newErrors.balance = "Balance is required"
    if (isNaN(Number(currentDebt.balance)) || Number(currentDebt.balance) <= 0) {
      newErrors.balance = "Must be a positive number"
    }
    if (!currentDebt.apr) newErrors.apr = "APR is required"
    if (isNaN(Number(currentDebt.apr)) || Number(currentDebt.apr) < 0) {
      newErrors.apr = "Must be a non-negative number"
    }
    if (!currentDebt.minimum_payment) newErrors.minimum_payment = "Minimum payment is required"
    if (isNaN(Number(currentDebt.minimum_payment)) || Number(currentDebt.minimum_payment) <= 0) {
      newErrors.minimum_payment = "Must be a positive number"
    }
    if (!currentDebt.payment_day) newErrors.payment_day = "Payment day is required"
    if (
      isNaN(Number(currentDebt.payment_day)) ||
      Number(currentDebt.payment_day) < 1 ||
      Number(currentDebt.payment_day) > 31
    ) {
      newErrors.payment_day = "Must be between 1 and 31"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddDebt = () => {
    if (validateDebt()) {
      addDebt({
        name: currentDebt.name,
        last_four: currentDebt.last_four,
        balance: Number(currentDebt.balance),
        apr: Number(currentDebt.apr),
        minimum_payment: Number(currentDebt.minimum_payment),
        payment_day: Number(currentDebt.payment_day),
      })

      // Reset form
      setCurrentDebt({
        name: "",
        last_four: "",
        balance: "",
        apr: "",
        minimum_payment: "",
        payment_day: "",
      })
      setErrors({})
    }
  }

  const handleContinue = () => {
    if (debts.length > 0) {
      setCurrentStep("debt-summary")
    } else {
      setErrors({ general: "Please add at least one debt before continuing" })
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Add Your Debts</h1>
        <p className="text-muted-foreground mt-2">
          Let's add all your debts one by one. Don't worry, we'll make this as painless as possible!
        </p>
      </div>

      {/* Debt entry form */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> Debt Name
              </Label>
              <Input
                id="name"
                placeholder="Chase Sapphire Card"
                value={currentDebt.name}
                onChange={(e) => setCurrentDebt({ ...currentDebt, name: e.target.value })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_four" className="flex items-center">
                Last 4 Digits
              </Label>
              <Input
                id="last_four"
                placeholder="1234"
                value={currentDebt.last_four}
                onChange={(e) => setCurrentDebt({ ...currentDebt, last_four: e.target.value })}
                maxLength={4}
                className={errors.last_four ? "border-red-500" : ""}
              />
              {errors.last_four && <p className="text-red-500 text-xs">{errors.last_four}</p>}
              <p className="text-xs text-muted-foreground">For identification only</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="balance" className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" /> Current Balance
              </Label>
              <Input
                id="balance"
                placeholder="5000.00"
                value={currentDebt.balance}
                onChange={(e) => setCurrentDebt({ ...currentDebt, balance: e.target.value })}
                className={errors.balance ? "border-red-500" : ""}
              />
              {errors.balance && <p className="text-red-500 text-xs">{errors.balance}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apr" className="flex items-center">
                <Percent className="w-4 h-4 mr-2" /> Interest Rate (APR)
              </Label>
              <Input
                id="apr"
                placeholder="18.99"
                value={currentDebt.apr}
                onChange={(e) => setCurrentDebt({ ...currentDebt, apr: e.target.value })}
                className={errors.apr ? "border-red-500" : ""}
              />
              {errors.apr && <p className="text-red-500 text-xs">{errors.apr}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimum_payment" className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" /> Minimum Payment
              </Label>
              <Input
                id="minimum_payment"
                placeholder="150.00"
                value={currentDebt.minimum_payment}
                onChange={(e) => setCurrentDebt({ ...currentDebt, minimum_payment: e.target.value })}
                className={errors.minimum_payment ? "border-red-500" : ""}
              />
              {errors.minimum_payment && <p className="text-red-500 text-xs">{errors.minimum_payment}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment_day" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Payment Due Day
              </Label>
              <Input
                id="payment_day"
                placeholder="15"
                value={currentDebt.payment_day}
                onChange={(e) => setCurrentDebt({ ...currentDebt, payment_day: e.target.value })}
                className={errors.payment_day ? "border-red-500" : ""}
              />
              {errors.payment_day && <p className="text-red-500 text-xs">{errors.payment_day}</p>}
              <p className="text-xs text-muted-foreground">Day of month (1-31)</p>
            </div>
          </div>

          <Button onClick={handleAddDebt} className="mt-6 bg-green-600 hover:bg-green-700 w-full">
            <Plus className="mr-2 h-4 w-4" /> Add This Debt
          </Button>
        </CardContent>
      </Card>

      {/* List of added debts */}
      {debts.length > 0 && (
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Your Debts</h2>
          {debts.map((debt, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeDebt(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Debt Name</p>
                    <p className="font-medium">{debt.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last 4 Digits</p>
                    <p className="font-medium">{debt.last_four}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="font-medium">
                      $
                      {Number(debt.balance).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">APR</p>
                    <p className="font-medium">{Number(debt.apr).toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Minimum Payment</p>
                    <p className="font-medium">
                      $
                      {Number(debt.minimum_payment).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Due Day</p>
                    <p className="font-medium">{debt.payment_day}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {errors.general && (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-500">{errors.general}</p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button onClick={() => setCurrentStep("debt-intro")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">Don't worry, you can always come back and edit these later.</p>
      </div>
    </div>
  )
}
