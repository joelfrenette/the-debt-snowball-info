"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator } from "lucide-react"

export function FaqCalculator() {
  const [totalDebt, setTotalDebt] = useState(10000)
  const [interestRate, setInterestRate] = useState(18)
  const [monthlyPayment, setMonthlyPayment] = useState(300)
  const [strategy, setStrategy] = useState("minimum")
  const [calculationDone, setCalculationDone] = useState(false)

  // Calculate results for different strategies
  const calculateResults = () => {
    // Minimum payment calculation (typically 2-4% of balance)
    const minimumPayment = Math.max(totalDebt * 0.02, 25)

    // Months to pay off with minimum payments
    const minimumMonths = calculateMonthsToPayoff(totalDebt, interestRate, minimumPayment)
    const minimumInterest = calculateTotalInterest(totalDebt, interestRate, minimumMonths, minimumPayment)

    // Months to pay off with specified payment
    const specifiedMonths = calculateMonthsToPayoff(totalDebt, interestRate, monthlyPayment)
    const specifiedInterest = calculateTotalInterest(totalDebt, interestRate, specifiedMonths, monthlyPayment)

    // Months to pay off with snowball/avalanche (assuming 15% faster due to optimization)
    const snowballMonths = Math.ceil(specifiedMonths * 0.85)
    const snowballInterest = calculateTotalInterest(totalDebt, interestRate, snowballMonths, monthlyPayment)

    // Months to pay off with consolidation (assuming 30% lower interest rate)
    const consolidationRate = interestRate * 0.7
    const consolidationMonths = calculateMonthsToPayoff(totalDebt, consolidationRate, monthlyPayment)
    const consolidationInterest = calculateTotalInterest(
      totalDebt,
      consolidationRate,
      consolidationMonths,
      monthlyPayment,
    )

    return {
      minimum: {
        payment: minimumPayment.toFixed(2),
        months: minimumMonths,
        interest: minimumInterest.toFixed(2),
        total: (minimumPayment * minimumMonths + minimumInterest).toFixed(2),
      },
      specified: {
        payment: monthlyPayment.toFixed(2),
        months: specifiedMonths,
        interest: specifiedInterest.toFixed(2),
        total: (monthlyPayment * specifiedMonths).toFixed(2),
      },
      snowball: {
        payment: monthlyPayment.toFixed(2),
        months: snowballMonths,
        interest: snowballInterest.toFixed(2),
        total: (monthlyPayment * snowballMonths).toFixed(2),
      },
      consolidation: {
        payment: monthlyPayment.toFixed(2),
        months: consolidationMonths,
        interest: consolidationInterest.toFixed(2),
        total: (monthlyPayment * consolidationMonths).toFixed(2),
        rate: consolidationRate.toFixed(2),
      },
    }
  }

  // Helper function to calculate months to payoff
  const calculateMonthsToPayoff = (principal: number, rate: number, payment: number) => {
    const monthlyRate = rate / 100 / 12
    // Formula for number of months to pay off a loan
    const months = Math.ceil(Math.log(payment / (payment - principal * monthlyRate)) / Math.log(1 + monthlyRate))
    return isNaN(months) || !isFinite(months) ? 0 : months
  }

  // Helper function to calculate total interest paid
  const calculateTotalInterest = (principal: number, rate: number, months: number, payment: number) => {
    const totalPaid = payment * months
    return totalPaid - principal > 0 ? totalPaid - principal : 0
  }

  const results = calculateResults()

  const handleCalculate = () => {
    setCalculationDone(true)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="total-debt">Total Debt Amount ($)</Label>
            <Input
              id="total-debt"
              type="number"
              value={totalDebt}
              onChange={(e) => setTotalDebt(Number(e.target.value))}
              min={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest-rate">Average Interest Rate (%)</Label>
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
            <Label htmlFor="monthly-payment">Monthly Payment ($)</Label>
            <Input
              id="monthly-payment"
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(Number(e.target.value))}
              min={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="strategy">Preferred Strategy</Label>
            <Select value={strategy} onValueChange={setStrategy}>
              <SelectTrigger id="strategy">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimum">Minimum Payments</SelectItem>
                <SelectItem value="specified">Fixed Payment</SelectItem>
                <SelectItem value="snowball">Debt Snowball/Avalanche</SelectItem>
                <SelectItem value="consolidation">Debt Consolidation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Repayment Plan
          </Button>
        </div>

        <div>
          {calculationDone && (
            <Tabs defaultValue={strategy} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="minimum">Minimum</TabsTrigger>
                <TabsTrigger value="specified">Fixed</TabsTrigger>
                <TabsTrigger value="snowball">Snowball</TabsTrigger>
                <TabsTrigger value="consolidation">Consolidation</TabsTrigger>
              </TabsList>

              <TabsContent value="minimum">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-2xl font-bold">${results.minimum.payment}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Time to Pay Off</p>
                      <p className="text-2xl font-bold">
                        {results.minimum.months} months ({Math.floor(results.minimum.months / 12)} years,{" "}
                        {results.minimum.months % 12} months)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                      <p className="text-2xl font-bold text-red-600">${results.minimum.interest}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Amount Paid</p>
                      <p className="text-xl font-bold">${results.minimum.total}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specified">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-2xl font-bold">${results.specified.payment}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Time to Pay Off</p>
                      <p className="text-2xl font-bold">
                        {results.specified.months} months ({Math.floor(results.specified.months / 12)} years,{" "}
                        {results.specified.months % 12} months)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                      <p className="text-2xl font-bold text-red-600">${results.specified.interest}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Amount Paid</p>
                      <p className="text-xl font-bold">${results.specified.total}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="snowball">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-2xl font-bold">${results.snowball.payment}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Time to Pay Off</p>
                      <p className="text-2xl font-bold">
                        {results.snowball.months} months ({Math.floor(results.snowball.months / 12)} years,{" "}
                        {results.snowball.months % 12} months)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                      <p className="text-2xl font-bold text-red-600">${results.snowball.interest}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Amount Paid</p>
                      <p className="text-xl font-bold">${results.snowball.total}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg mt-2">
                      <p className="text-sm text-green-700">
                        <span className="font-medium">Savings vs. Minimum:</span> $
                        {(Number(results.minimum.interest) - Number(results.snowball.interest)).toFixed(2)} and{" "}
                        {results.minimum.months - results.snowball.months} months
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consolidation">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-2xl font-bold">${results.consolidation.payment}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Consolidated Interest Rate</p>
                      <p className="text-2xl font-bold">{results.consolidation.rate}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Time to Pay Off</p>
                      <p className="text-2xl font-bold">
                        {results.consolidation.months} months ({Math.floor(results.consolidation.months / 12)} years,{" "}
                        {results.consolidation.months % 12} months)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                      <p className="text-2xl font-bold text-red-600">${results.consolidation.interest}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg mt-2">
                      <p className="text-sm text-green-700">
                        <span className="font-medium">Savings vs. Minimum:</span> $
                        {(Number(results.minimum.interest) - Number(results.consolidation.interest)).toFixed(2)} and{" "}
                        {results.minimum.months - results.consolidation.months} months
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {!calculationDone && (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Enter your details</h3>
              <p className="text-muted-foreground mt-2">
                Fill in your debt information and click Calculate to see your repayment options
              </p>
            </div>
          )}
        </div>
      </div>

      {calculationDone && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-700">Strategy Comparison</h3>
          <p className="text-sm text-blue-600 mt-2">
            Based on your inputs, the{" "}
            {Number(results.minimum.interest) - Number(results.snowball.interest) >
            Number(results.minimum.interest) - Number(results.consolidation.interest)
              ? "Debt Snowball/Avalanche"
              : "Debt Consolidation"}{" "}
            strategy would save you the most money. The Debt Snowball method provides psychological benefits by paying
            off smaller debts first, while the Avalanche method minimizes interest by targeting high-interest debts
            first. Consolidation works best if you can secure a significantly lower interest rate.
          </p>
        </div>
      )}
    </div>
  )
}
