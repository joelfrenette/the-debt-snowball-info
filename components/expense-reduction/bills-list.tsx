"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PhoneCall, Wifi, Zap, Home, ShoppingBag, ArrowDown } from "lucide-react"

// Mock bills data
const mockBills = [
  {
    id: "phone",
    name: "Verizon Wireless",
    amount: 89.99,
    frequency: "monthly",
    lastCharge: "2023-04-01",
    category: "Phone",
    logo: "https://logo.clearbit.com/verizon.com",
    savingsPotential: "high",
    icon: <PhoneCall className="h-5 w-5" />,
  },
  {
    id: "internet",
    name: "Comcast Xfinity",
    amount: 79.99,
    frequency: "monthly",
    lastCharge: "2023-04-03",
    category: "Internet",
    logo: "https://logo.clearbit.com/xfinity.com",
    savingsPotential: "medium",
    icon: <Wifi className="h-5 w-5" />,
  },
  {
    id: "electricity",
    name: "PG&E",
    amount: 124.5,
    frequency: "monthly",
    lastCharge: "2023-04-10",
    category: "Utilities",
    logo: "https://logo.clearbit.com/pge.com",
    savingsPotential: "low",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "rent",
    name: "Apartment Rent",
    amount: 1850.0,
    frequency: "monthly",
    lastCharge: "2023-04-01",
    category: "Housing",
    logo: null,
    savingsPotential: "none",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: "insurance",
    name: "State Farm Insurance",
    amount: 110.75,
    frequency: "monthly",
    lastCharge: "2023-04-15",
    category: "Insurance",
    logo: "https://logo.clearbit.com/statefarm.com",
    savingsPotential: "high",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    id: "water",
    name: "City Water",
    amount: 45.3,
    frequency: "monthly",
    lastCharge: "2023-04-05",
    category: "Utilities",
    logo: null,
    savingsPotential: "low",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "gas",
    name: "SoCalGas",
    amount: 35.25,
    frequency: "monthly",
    lastCharge: "2023-04-08",
    category: "Utilities",
    logo: "https://logo.clearbit.com/socalgas.com",
    savingsPotential: "low",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "cable",
    name: "DirecTV",
    amount: 69.99,
    frequency: "monthly",
    lastCharge: "2023-04-12",
    category: "Entertainment",
    logo: "https://logo.clearbit.com/directv.com",
    savingsPotential: "high",
    icon: <Wifi className="h-5 w-5" />,
  },
]

export function BillsList() {
  const [bills] = useState(mockBills)
  const [filter, setFilter] = useState("all")
  const [negotiateDialogOpen, setNegotiateDialogOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState<any>(null)

  const totalMonthly = bills.reduce((sum, bill) => sum + bill.amount, 0)

  const filteredBills = bills.filter((bill) => {
    if (filter === "all") return true
    if (filter === "high-savings") return bill.savingsPotential === "high"
    if (filter === "utilities") return bill.category === "Utilities"
    return true
  })

  const handleNegotiateBill = (bill: any) => {
    setSelectedBill(bill)
    setNegotiateDialogOpen(true)
  }

  const getSavingsBadge = (potential: string) => {
    switch (potential) {
      case "high":
        return <Badge className="bg-green-500">High Savings Potential</Badge>
      case "medium":
        return <Badge className="bg-blue-500">Medium Savings Potential</Badge>
      case "low":
        return <Badge className="bg-yellow-500">Low Savings Potential</Badge>
      case "none":
        return <Badge className="bg-gray-500">No Savings Potential</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Your Bills</h2>
          <p className="text-muted-foreground">
            You're spending <span className="font-medium">${totalMonthly.toFixed(2)}/month</span> on bills
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button
            variant={filter === "high-savings" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("high-savings")}
          >
            High Savings
          </Button>
          <Button
            variant={filter === "utilities" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("utilities")}
          >
            Utilities
          </Button>
        </div>
      </div>

      {filter === "high-savings" && (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex">
            <ArrowDown className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <p className="text-green-700 text-sm">
              We've identified <strong>{filteredBills.length} bills</strong> with high savings potential. Negotiating
              these could save you <strong>$45-75/month</strong>.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredBills.map((bill) => (
          <Card key={bill.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    {bill.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{bill.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm font-medium">
                        ${bill.amount.toFixed(2)}/{bill.frequency}
                      </p>
                      <span className="text-muted-foreground text-xs">•</span>
                      <p className="text-xs text-muted-foreground">{bill.category}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getSavingsBadge(bill.savingsPotential)}
                  {bill.savingsPotential !== "none" && (
                    <Button variant="outline" size="sm" onClick={() => handleNegotiateBill(bill)}>
                      Negotiate
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={negotiateDialogOpen} onOpenChange={setNegotiateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Negotiate {selectedBill?.name}</DialogTitle>
            <DialogDescription>Here are tips to help you negotiate a lower rate for this bill.</DialogDescription>
          </DialogHeader>

          {selectedBill && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      {selectedBill.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedBill.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${selectedBill.amount.toFixed(2)}/{selectedBill.frequency}
                      </p>
                    </div>
                  </div>
                  {getSavingsBadge(selectedBill.savingsPotential)}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Negotiation Tips:</h4>
                <ol className="space-y-2 text-sm">
                  <li>1. Research competitor rates before calling</li>
                  <li>2. Mention how long you've been a customer</li>
                  <li>3. Ask specifically for the retention department</li>
                  <li>4. Mention competitor offers and ask if they can match</li>
                  <li>5. Be polite but persistent</li>
                </ol>

                <div className="bg-green-50 p-3 rounded-lg mt-4">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Potential Savings:</span> You could save approximately $
                    {(selectedBill.amount * 0.15).toFixed(2)}-${(selectedBill.amount * 0.25).toFixed(2)} per month.
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={() => window.open(`tel:+1800${Math.floor(Math.random() * 9000000) + 1000000}`, "_blank")}
                  >
                    Call {selectedBill.name} <PhoneCall className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setNegotiateDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setNegotiateDialogOpen(false)} className="bg-green-600 hover:bg-green-700">
              Mark as Negotiated
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-700">Bill Negotiation Tips</h3>
        <ul className="mt-2 space-y-2 text-sm text-blue-600">
          <li>• Call during weekday business hours for best results</li>
          <li>• Always be polite and friendly with customer service representatives</li>
          <li>• Ask about loyalty discounts or promotions you might qualify for</li>
          <li>• Consider bundling services for additional discounts</li>
          <li>• Set a calendar reminder to negotiate bills annually</li>
        </ul>
      </div>
    </div>
  )
}
