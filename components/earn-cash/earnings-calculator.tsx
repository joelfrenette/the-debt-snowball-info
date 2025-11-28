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
  const monthsToPayoff5k = 5000 / monthlyNet
  const monthsToPayoff10k = 10000 / monthlyNet
  const monthsToPayoff20k = 20000 / monthlyNet

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Side Hustle Earnings Calculator</h2>
        <p className="text-muted-foreground mt-1">
          Estimate how much you could earn from a side hustle and how it could impact your debt payoff
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="side-hustle-type">Type of Side Hustle</Label>
                <Select value={sideHustleType} onValueChange={setSideHustleType}>
                  <SelectTrigger id="side-hustle-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freelance">Freelance Work</SelectItem>
                    <SelectItem value="gig">Gig Economy</SelectItem>
                    <SelectItem value="part-time">Part-Time Job</SelectItem>
                    <SelectItem value="online">Online Business</SelectItem>
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
                  max={100}
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
                  max={40}
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Estimated Earnings</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Weekly (Gross)</p>
                  <p className="text-xl font-bold text-green-600">${weeklyEarnings.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Weekly (Net)</p>
                  <p className="text-xl font-bold">${weeklyNet.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly (Gross)</p>
                  <p className="text-xl font-bold text-green-600">${monthlyEarnings.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly (Net)</p>
                  <p className="text-xl font-bold">${monthlyNet.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Yearly (Gross)</p>
                  <p className="text-xl font-bold text-green-600">${yearlyEarnings.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Yearly (Net)</p>
                  <p className="text-xl font-bold">${yearlyNet.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium text-green-700">Debt Payoff Impact</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">$5,000 Debt</span>
                    <span className="font-medium text-green-700">{monthsToPayoff5k.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">$10,000 Debt</span>
                    <span className="font-medium text-green-700">{monthsToPayoff10k.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">$20,000 Debt</span>
                    <span className="font-medium text-green-700">{monthsToPayoff20k.toFixed(1)} months</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-3">
                  These estimates assume you apply all your side hustle earnings to debt repayment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start">
          <Calculator className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-700">Calculator Tips</h3>
            <p className="text-sm text-blue-600 mt-1">
              Even a small side hustle can have a big impact on your debt payoff timeline. Just ${monthlyNet.toFixed(2)}{" "}
              per month could help you become debt-free years sooner and save thousands in interest.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="bg-green-600 hover:bg-green-700">
          Find Opportunities <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
