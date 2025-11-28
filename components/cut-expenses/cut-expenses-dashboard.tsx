"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, TrendingDown, DollarSign } from "lucide-react"

export function CutExpensesDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5" />
            Cut Your Expenses
          </CardTitle>
          <CardDescription>Find and eliminate unnecessary spending to accelerate your debt payoff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-blue-600" />
                  <CardTitle className="text-base">Subscription Audit</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Review and cancel unused subscriptions</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Audit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <CardTitle className="text-base">Bill Negotiation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Lower your monthly bills with our tips</p>
                <Button variant="outline" className="w-full bg-transparent">
                  View Tips
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Scissors className="h-4 w-4 text-red-600" />
                  <CardTitle className="text-base">Savings Calculator</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">See how much you can save monthly</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Calculate
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
