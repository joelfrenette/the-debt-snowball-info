"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, ArrowRight } from "lucide-react"

export function EarningsCalculator() {
  const [sideHustleType, setSideHustleType] = useState("freelance")
  const [hourlyRate, setHourlyRate] = useState(20)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [expensePercentage, setExpensePercentage] = useState(10)
  const [debtAmount, setDebtAmount] = useState(10000)
  const [interestRate, setInterestRate] = useState(18)
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState(300)

  // Calculate earnings
  const weeklyEarnings = hourlyRate * hoursPerWeek
  const monthlyEarnings = weeklyEarnings * 4.33 // Average weeks in a month
  const yearlyEarnings = monthlyEarnings * 12

  // Calculate expenses
  const weeklyExpenses = weeklyEarnings * (expensePercentage / 100)
  const monthlyExpenses = monthlyEarnings * (expensePercentage / 100)
  const yearlyExpenses = yearlyEarnings * (expensePercentage / 100)

  // Calculate net earnings
  const weeklyNet = weeklyEarnings - weeklyExpenses
  const monthlyNet = monthlyEarnings - monthlyExpenses
  const yearlyNet = yearlyEarnings - yearlyExpenses

  // Calculate debt impact
  // Function to calculate months to pay off debt with a given monthly payment
  const calculateMonthsToPayoff = (principal: number, annualRate: number, monthlyPayment: number) => {
    const monthlyRate = annualRate / 100 / 12
    return Math.log(monthlyPayment / (monthlyPayment - principal * monthlyRate)) / Math.log(1 + monthlyRate)
  }

  // Calculate months to pay off with current payment
  const currentMonthsToPayoff = calculateMonthsToPayoff(debtAmount, interestRate, currentMonthlyPayment)

  // Calculate months to pay off with current payment + side hustle income
  const enhancedMonthsToPayoff = calculateMonthsToPayoff(debtAmount, interestRate, currentMonthlyPayment + monthlyNet)

  // Calculate time saved
  const monthsSaved = currentMonthsToPayoff - enhancedMonthsToPayoff
  const yearsSaved = monthsSaved / 12

  // Calculate interest saved
  const currentTotalPaid = currentMonthlyPayment * currentMonthsToPayoff
  const currentInterestPaid = currentTotalPaid - debtAmount

  const enhancedTotalPaid = (currentMonthlyPayment + monthlyNet) * enhancedMonthsToPayoff
  const enhancedInterestPaid = enhancedTotalPaid - debtAmount

  const interestSaved = currentInterestPaid - enhancedInterestPaid

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="side-hustle-type">Type of Work</Label>
            <Select value={sideHustleType} onValueChange={setSideHustleType}>
              <SelectTrigger id="side-hustle-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freelance">Freelance Work</SelectItem>
                <SelectItem value="transcription">Transcription</SelectItem>
                <SelectItem value="teaching">Online Teaching</SelectItem>
                <SelectItem value="testing">User Testing</SelectItem>
                <SelectItem value="writing">Content Writing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="hourly-rate">Hourly Rate</Label>
              <span className="text-sm text-muted-foreground">${hourlyRate}/hour</span>
            </div>
            <Slider
              id="hourly-rate"
              min={5}
              max={50}
              step={1}
              value={[hourlyRate]}
              onValueChange={(value) => setHourlyRate(value[0])}
            />
            <div className="flex items-center mt-1">
              <Input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-20"
                min={5}
                max={100}
              />
              <span className="ml-2 text-sm text-muted-foreground">$/hour</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="hours-per-week">Hours Per Week</Label>
              <span className="text-sm text-muted-foreground">{hoursPerWeek} hours</span>
            </div>
            <Slider
              id="hours-per-week"
              min={1}
              max={30}
              step={1}
              value={[hoursPerWeek]}
              onValueChange={(value) => setHoursPerWeek(value[0])}
            />
            <div className="flex items-center mt-1">
              <Input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-20"
                min={1}
                max={40}
              />
              <span className="ml-2 text-sm text-muted-foreground">hours/week</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="expense-percentage">Expenses/Taxes</Label>
              <span className="text-sm text-muted-foreground">{expensePercentage}%</span>
            </div>
            <Slider
              id="expense-percentage"
              min={0}
              max={40}
              step={1}
              value={[expensePercentage]}
              onValueChange={(value) => setExpensePercentage(value[0])}
            />
            <div className="flex items-center mt-1">
              <Input
                type="number"
                value={expensePercentage}
                onChange={(e) => setExpensePercentage(Number(e.target.value))}
                className="w-20"
                min={0}
                max={40}
              />
              <span className="ml-2 text-sm text-muted-foreground">% of earnings</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Include taxes, supplies, software, transportation, etc.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="debt-amount">Current Debt Amount</Label>
            <Input
              id="debt-amount"
              type="number"
              value={debtAmount}
              onChange={(e) => setDebtAmount(Number(e.target.value))}
              min={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min={0}
              max={100}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-payment">Current Monthly Payment</Label>
            <Input
              id="current-payment"
              type="number"
              value={currentMonthlyPayment}
              onChange={(e) => setCurrentMonthlyPayment(Number(e.target.value))}
              min={1}
            />
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-medium">Estimated Earnings</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Weekly (Net)</p>
                  <p className="text-xl font-bold text-green-600">${weeklyNet.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly (Net)</p>
                  <p className="text-xl font-bold text-green-600">${monthlyNet.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Yearly (Net)</p>
                  <p className="text-xl font-bold text-green-600">${yearlyNet.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">After Taxes/Expenses</p>
                  <p className="text-xl font-bold">${(yearlyNet * 0.9).toFixed(2)}/year</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium text-green-700">Debt Payoff Impact</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Current Payoff Time</span>
                    <span className="font-medium text-green-700">
                      {Math.floor(currentMonthsToPayoff / 12)} years, {Math.ceil(currentMonthsToPayoff % 12)} months
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">With Side Hustle Income</span>
                    <span className="font-medium text-green-700">
                      {Math.floor(enhancedMonthsToPayoff / 12)} years, {Math.ceil(enhancedMonthsToPayoff % 12)} months
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-green-600">Time Saved</span>
                    <span className="text-green-700">
                      {yearsSaved.toFixed(1)} years ({Math.round(monthsSaved)} months)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-green-200">
                    <span className="text-green-600">Interest Saved</span>
                    <span className="text-green-700">${interestSaved.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <div className="flex items-start">
              <Calculator className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-700">Calculator Tips</h3>
                <p className="text-sm text-blue-600 mt-1">
                  Even a small side hustle can have a big impact on your debt payoff timeline. Just $
                  {monthlyNet.toFixed(2)} per month could help you become debt-free {yearsSaved.toFixed(1)} years sooner
                  and save ${interestSaved.toFixed(2)} in interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700">
        Find Opportunities Matching Your Criteria <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
