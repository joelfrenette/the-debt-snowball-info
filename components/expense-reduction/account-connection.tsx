"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, DollarSign, Wallet } from "lucide-react"

interface AccountConnectionProps {
  onConnectAccount: (accountType: string) => void
}

export function AccountConnection({ onConnectAccount }: AccountConnectionProps) {
  const accounts = [
    {
      id: "checking",
      name: "Bank Account",
      icon: <CreditCard className="h-6 w-6 text-blue-500" />,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <DollarSign className="h-6 w-6 text-blue-600" />,
    },
    {
      id: "venmo",
      name: "Venmo",
      icon: <Wallet className="h-6 w-6 text-blue-400" />,
    },
  ]

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <Card key={account.id} className="cursor-pointer hover:border-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-100 p-2 rounded-full">{account.icon}</div>
                <div>
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">Connect to find recurring charges</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => onConnectAccount(account.id)}>
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
