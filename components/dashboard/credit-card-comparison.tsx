"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, CreditCard, DollarSign, Gift, Percent, Star } from "lucide-react"

interface CreditCardComparisonProps {
  creditOffers: any[]
}

export function CreditCardComparison({ creditOffers }: CreditCardComparisonProps) {
  const [comparisonType, setComparisonType] = useState<"rates" | "rewards">("rates")

  // Sort cards by APR (lowest first) for rate comparison
  const cardsByRate = [...creditOffers].sort((a, b) => {
    // If card has intro APR, use that for comparison
    const aRate = a.intro_apr !== null ? a.intro_apr : a.apr
    const bRate = b.intro_apr !== null ? b.intro_apr : b.apr
    return aRate - bRate
  })

  // Sort cards by rewards value (highest first) for rewards comparison
  const cardsByRewards = [...creditOffers].sort((a, b) => {
    // If no rewards rate, put at the bottom
    if (a.rewards_rate === null && b.rewards_rate === null) return 0
    if (a.rewards_rate === null) return 1
    if (b.rewards_rate === null) return -1

    // Compare by rewards rate
    return b.rewards_rate - a.rewards_rate
  })

  // Get the best card for each category
  const getBestCard = (category: string) => {
    return creditOffers
      .filter((card) => card.rewards_category && card.rewards_category.toLowerCase().includes(category.toLowerCase()))
      .sort((a, b) => (b.rewards_rate || 0) - (a.rewards_rate || 0))[0]
  }

  const bestForDining = getBestCard("dining")
  const bestForTravel = getBestCard("travel")
  const bestForGas = getBestCard("gas")
  const bestForGroceries = getBestCard("groceries")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Credit Card Optimization
        </CardTitle>
        <CardDescription>Compare your cards by rates and rewards programs</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={comparisonType} onValueChange={(value) => setComparisonType(value as "rates" | "rewards")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rates">
              <Percent className="h-4 w-4 mr-2" />
              Best Rates
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Gift className="h-4 w-4 mr-2" />
              Best Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Best for Balance Transfers</h3>
                {cardsByRate.slice(0, 3).map((card, index) => (
                  <div key={card.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Badge className="bg-green-500">Best</Badge>}
                      <span>{card.name}</span>
                    </div>
                    <div className="text-right">
                      {card.intro_apr !== null ? (
                        <div className="text-green-600 font-medium">
                          {card.intro_apr}% for {card.intro_period_months} mo
                        </div>
                      ) : (
                        <div>{card.apr}% APR</div>
                      )}
                      {card.transfer_fee_percent !== null && (
                        <div className="text-xs text-muted-foreground">{card.transfer_fee_percent}% transfer fee</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Best for New Purchases</h3>
                {cardsByRate.slice(0, 3).map((card, index) => (
                  <div
                    key={`purchase-${card.id}`}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      {index === 0 && <Badge className="bg-green-500">Best</Badge>}
                      <span>{card.name}</span>
                    </div>
                    <div>
                      {card.intro_apr !== null ? (
                        <div className="text-green-600 font-medium">
                          {card.intro_apr}% for {card.intro_period_months} mo
                        </div>
                      ) : (
                        <div>{card.apr}% APR</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Best Overall Rewards</h3>
                {cardsByRewards.slice(0, 3).map((card, index) => (
                  <div
                    key={`rewards-${card.id}`}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      {index === 0 && <Badge className="bg-purple-500">Best</Badge>}
                      <span>{card.name}</span>
                    </div>
                    <div className="text-right">
                      {card.rewards_rate !== null ? (
                        <div className="font-medium">
                          {card.rewards_rate}% {card.rewards_program}
                        </div>
                      ) : (
                        <div className="text-muted-foreground">No rewards</div>
                      )}
                      {card.annual_fee !== null && card.annual_fee > 0 && (
                        <div className="text-xs text-amber-600">${card.annual_fee} annual fee</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Best for Categories</h3>

                  {bestForDining && (
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Dining</span>
                      </div>
                      <div className="text-sm font-medium">{bestForDining.name}</div>
                    </div>
                  )}

                  {bestForTravel && (
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Travel</span>
                      </div>
                      <div className="text-sm font-medium">{bestForTravel.name}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">&nbsp;</h3>

                  {bestForGas && (
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Gas</span>
                      </div>
                      <div className="text-sm font-medium">{bestForGas.name}</div>
                    </div>
                  )}

                  {bestForGroceries && (
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Groceries</span>
                      </div>
                      <div className="text-sm font-medium">{bestForGroceries.name}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Rewards Analysis
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
