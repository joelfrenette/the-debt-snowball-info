"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionsList } from "./subscriptions-list"
import { SavingsSummary } from "./savings-summary"
import { BillsList } from "./bills-list"
import { DollarSign, CreditCard, Wallet, ArrowRight } from "lucide-react"

export function ExpenseReductionDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const handleConnectAccount = (accountType: string) => {
    // In a real app, this would trigger an OAuth flow or similar
    // For demo purposes, we'll just add the account to our list
    if (!connectedAccounts.includes(accountType)) {
      setConnectedAccounts([...connectedAccounts, accountType])
    }
  }

  const handleAnalyzeExpenses = () => {
    setIsAnalyzing(true)
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-green-600" />
          Expense Reduction
        </CardTitle>
        <CardDescription>
          Find and eliminate unnecessary expenses to free up money for your debt repayment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-700">Find Hidden Money</h3>
              <p className="text-sm text-green-600 mt-1">
                The average person saves $720 per year by canceling unused subscriptions and negotiating bills. That's
                money you could put toward your debt!
              </p>
            </div>

            {connectedAccounts.length === 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connect Your Accounts</h3>
                <p className="text-muted-foreground">
                  Connect your financial accounts to automatically detect recurring expenses and subscriptions. Don't
                  worry, we use bank-level encryption and can't move your money.
                </p>
                <div className="space-y-4">
                  {["checking", "paypal", "venmo"].map((accountType) => (
                    <Card key={accountType} className="cursor-pointer hover:border-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-slate-100 p-2 rounded-full">
                              {accountType === "checking" && <CreditCard className="h-6 w-6 text-blue-500" />}
                              {accountType === "paypal" && <Wallet className="h-6 w-6 text-blue-600" />}
                              {accountType === "venmo" && <DollarSign className="h-6 w-6 text-blue-400" />}
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {accountType === "checking"
                                  ? "Bank Account"
                                  : accountType.charAt(0).toUpperCase() + accountType.slice(1)}
                              </h3>
                              <p className="text-sm text-muted-foreground">Connect to find recurring charges</p>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => handleConnectAccount(accountType)}>
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : !analysisComplete ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Accounts Connected ({connectedAccounts.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {connectedAccounts.map((account) => (
                    <div
                      key={account}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {account === "checking" && <CreditCard className="mr-1 h-3 w-3" />}
                      {account === "paypal" && <Wallet className="mr-1 h-3 w-3" />}
                      {account === "venmo" && <DollarSign className="mr-1 h-3 w-3" />}
                      {account.charAt(0).toUpperCase() + account.slice(1)}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleAnalyzeExpenses}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing Your Expenses..." : "Analyze My Expenses"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium">Subscriptions</h3>
                      <p className="text-3xl font-bold text-green-600 mt-2">12</p>
                      <p className="text-sm text-muted-foreground">Monthly recurring charges</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-green-600 mt-2"
                        onClick={() => setActiveTab("subscriptions")}
                      >
                        Review Subscriptions <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium">Bills</h3>
                      <p className="text-3xl font-bold text-green-600 mt-2">8</p>
                      <p className="text-sm text-muted-foreground">Regular bill payments</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-green-600 mt-2"
                        onClick={() => setActiveTab("bills")}
                      >
                        Review Bills <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium">Potential Savings</h3>
                      <p className="text-3xl font-bold text-green-600 mt-2">$187/mo</p>
                      <p className="text-sm text-muted-foreground">If you cut unnecessary expenses</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-green-600 mt-2"
                        onClick={() => setActiveTab("savings")}
                      >
                        View Savings Plan <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg mt-4">
                  <h3 className="font-medium text-amber-700">Did You Know?</h3>
                  <p className="text-sm text-amber-600 mt-1">
                    Adding $187/month to your debt payments could help you become debt-free
                    <span className="font-bold"> 2 years and 3 months sooner</span> and save
                    <span className="font-bold"> $3,245 in interest</span>!
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-4">
            <SubscriptionsList />
          </TabsContent>

          <TabsContent value="bills" className="mt-4">
            <BillsList />
          </TabsContent>

          <TabsContent value="savings" className="mt-4">
            <SavingsSummary />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <p className="text-sm text-muted-foreground">
          Your financial data is encrypted and secure. We use read-only access and cannot move your money.
        </p>
      </CardFooter>
    </Card>
  )
}
