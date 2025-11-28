"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Trash2 } from "lucide-react"
import type { CreditOffer } from "@/lib/local-storage"
import { deleteCreditOffer } from "@/lib/local-storage"

interface CreditOfferListProps {
  creditOffers: CreditOffer[]
  onDataChange: () => void
}

export function CreditOfferList({ creditOffers, onDataChange }: CreditOfferListProps) {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this credit offer?")) {
      deleteCreditOffer(id)
      onDataChange()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Credit Card Offers
        </CardTitle>
        <CardDescription>Track balance transfer and credit card offers</CardDescription>
      </CardHeader>
      <CardContent>
        {creditOffers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No credit offers added yet</p>
            <p className="text-sm mt-1">Add your first offer to see recommendations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {creditOffers.map((offer) => (
              <div key={offer.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{offer.name}</h4>
                      {offer.rewards_program && (
                        <Badge variant="secondary" className="text-xs">
                          {offer.rewards_program}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Credit Limit:</span>
                        <span className="font-medium">${offer.credit_limit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Intro APR:</span>
                        <span className="font-medium">
                          {offer.intro_apr}% for {offer.intro_period_months} months
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Regular APR:</span>
                        <span className="font-medium">{offer.regular_apr}%</span>
                      </div>
                      {offer.rewards_rate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rewards:</span>
                          <span className="font-medium">{offer.rewards_rate}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(offer.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
