"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Coins } from "lucide-react"

interface WelcomeOnboardingProps {
  userName: string
}

export function WelcomeOnboarding({ userName }: WelcomeOnboardingProps) {
  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full">
            <Coins className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <CardTitle>Welcome to Debt Snowball, {userName}!</CardTitle>
            <CardDescription>Let's get started on your journey to financial freedom</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p>
          It looks like you're new here! To get the most out of Debt Snowball, let's set up your personalized debt
          repayment plan. Our guided onboarding process will help you:
        </p>

        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
              <span className="text-green-700 text-xs font-bold">1</span>
            </div>
            <span>Track all your debts in one place</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
              <span className="text-green-700 text-xs font-bold">2</span>
            </div>
            <span>Identify opportunities to save on interest</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
              <span className="text-green-700 text-xs font-bold">3</span>
            </div>
            <span>Create an optimized debt snowball plan</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-100 rounded-full p-1 mr-2 mt-0.5">
              <span className="text-green-700 text-xs font-bold">4</span>
            </div>
            <span>Set a clear path to becoming debt-free</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Link href="/dashboard/onboarding" className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Start Onboarding <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
