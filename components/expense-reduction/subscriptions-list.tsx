"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ExternalLink, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock subscription data
const mockSubscriptions = [
  {
    id: "netflix",
    name: "Netflix",
    amount: 15.99,
    frequency: "monthly",
    lastCharge: "2023-04-01",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/netflix.com",
    usage: "high",
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    amount: 9.99,
    frequency: "monthly",
    lastCharge: "2023-04-05",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/spotify.com",
    usage: "high",
  },
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    amount: 52.99,
    frequency: "monthly",
    lastCharge: "2023-04-10",
    category: "Software",
    logo: "https://logo.clearbit.com/adobe.com",
    usage: "medium",
  },
  {
    id: "hbo",
    name: "HBO Max",
    amount: 14.99,
    frequency: "monthly",
    lastCharge: "2023-04-03",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/hbomax.com",
    usage: "low",
  },
  {
    id: "nyt",
    name: "New York Times",
    amount: 4.99,
    frequency: "monthly",
    lastCharge: "2023-04-07",
    category: "News",
    logo: "https://logo.clearbit.com/nytimes.com",
    usage: "low",
  },
  {
    id: "gym",
    name: "Planet Fitness",
    amount: 24.99,
    frequency: "monthly",
    lastCharge: "2023-04-01",
    category: "Health",
    logo: "https://logo.clearbit.com/planetfitness.com",
    usage: "none",
  },
  {
    id: "disney",
    name: "Disney+",
    amount: 7.99,
    frequency: "monthly",
    lastCharge: "2023-04-12",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/disneyplus.com",
    usage: "medium",
  },
  {
    id: "amazon",
    name: "Amazon Prime",
    amount: 14.99,
    frequency: "monthly",
    lastCharge: "2023-04-15",
    category: "Shopping",
    logo: "https://logo.clearbit.com/amazon.com",
    usage: "high",
  },
  {
    id: "apple",
    name: "Apple Music",
    amount: 9.99,
    frequency: "monthly",
    lastCharge: "2023-04-02",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/apple.com",
    usage: "none",
  },
  {
    id: "dropbox",
    name: "Dropbox Plus",
    amount: 11.99,
    frequency: "monthly",
    lastCharge: "2023-04-08",
    category: "Software",
    logo: "https://logo.clearbit.com/dropbox.com",
    usage: "low",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    amount: 11.99,
    frequency: "monthly",
    lastCharge: "2023-04-05",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/youtube.com",
    usage: "medium",
  },
  {
    id: "hulu",
    name: "Hulu",
    amount: 7.99,
    frequency: "monthly",
    lastCharge: "2023-04-11",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/hulu.com",
    usage: "low",
  },
]

export function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)
  const [filter, setFilter] = useState("all")
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null)

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0)

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (filter === "all") return true
    if (filter === "low-usage") return sub.usage === "low" || sub.usage === "none"
    if (filter === "entertainment") return sub.category === "Entertainment"
    return true
  })

  const handleCancelSubscription = (subscription: any) => {
    setSelectedSubscription(subscription)
    setCancelDialogOpen(true)
  }

  const confirmCancelSubscription = () => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== selectedSubscription.id))
    setCancelDialogOpen(false)
  }

  const getUsageBadge = (usage: string) => {
    switch (usage) {
      case "high":
        return <Badge className="bg-green-500">High Usage</Badge>
      case "medium":
        return <Badge className="bg-blue-500">Medium Usage</Badge>
      case "low":
        return <Badge className="bg-yellow-500">Low Usage</Badge>
      case "none":
        return <Badge className="bg-red-500">Not Used</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Your Subscriptions</h2>
          <p className="text-muted-foreground">
            You're spending <span className="font-medium">${totalMonthly.toFixed(2)}/month</span> on subscriptions
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button
            variant={filter === "low-usage" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("low-usage")}
          >
            Low Usage
          </Button>
          <Button
            variant={filter === "entertainment" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("entertainment")}
          >
            Entertainment
          </Button>
        </div>
      </div>

      {filter === "low-usage" && (
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
            <p className="text-amber-700 text-sm">
              We've identified <strong>{filteredSubscriptions.length} subscriptions</strong> with low or no usage.
              Canceling these could save you{" "}
              <strong>${filteredSubscriptions.reduce((sum, sub) => sum + sub.amount, 0).toFixed(2)}/month</strong>.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredSubscriptions.map((subscription) => (
          <Card key={subscription.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                    {subscription.logo ? (
                      <img src={subscription.logo || "/placeholder.svg"} alt={subscription.name} className="w-6 h-6" />
                    ) : (
                      <div className="w-6 h-6 bg-slate-300 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{subscription.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm font-medium">
                        ${subscription.amount.toFixed(2)}/{subscription.frequency}
                      </p>
                      <span className="text-muted-foreground text-xs">•</span>
                      <p className="text-xs text-muted-foreground">{subscription.category}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getUsageBadge(subscription.usage)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleCancelSubscription(subscription)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel {selectedSubscription?.name}?</DialogTitle>
            <DialogDescription>
              This will help you track this subscription for cancellation. We'll provide instructions on how to cancel.
            </DialogDescription>
          </DialogHeader>

          {selectedSubscription && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                      {selectedSubscription.logo ? (
                        <img
                          src={selectedSubscription.logo || "/placeholder.svg"}
                          alt={selectedSubscription.name}
                          className="w-6 h-6"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-slate-300 rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedSubscription.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${selectedSubscription.amount.toFixed(2)}/{selectedSubscription.frequency}
                      </p>
                    </div>
                  </div>
                  {getUsageBadge(selectedSubscription.usage)}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">How to cancel:</h4>
                <ol className="space-y-2 text-sm">
                  <li>1. Log in to your {selectedSubscription.name} account</li>
                  <li>2. Go to Account Settings or Subscription Management</li>
                  <li>3. Look for "Cancel Subscription" option</li>
                  <li>4. Follow the prompts to confirm cancellation</li>
                </ol>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={() =>
                      window.open(
                        `https://${selectedSubscription.name.toLowerCase().replace(/\s+/g, "")}.com`,
                        "_blank",
                      )
                    }
                  >
                    Visit {selectedSubscription.name} <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCancelSubscription} className="bg-red-600 hover:bg-red-700">
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-medium text-green-700">Subscription Savings Tips</h3>
        <ul className="mt-2 space-y-2 text-sm text-green-600">
          <li>• Consider rotating streaming services instead of subscribing to all at once</li>
          <li>• Look for annual plans which often offer discounts compared to monthly billing</li>
          <li>• Check if you qualify for student, family, or bundle discounts</li>
          <li>• For services you use occasionally, consider sharing accounts with family members</li>
        </ul>
      </div>
    </div>
  )
}
