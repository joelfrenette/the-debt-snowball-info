"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  CreditCard,
  DollarSign,
  Percent,
  type LucideIcon,
  PiggyBank,
  Snowflake,
  TrendingDown,
} from "lucide-react"

function SnowballMethodSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const slides = [
    {
      title: "Step 1: List All Your Debts",
      description: "Write down all your debts from smallest to largest balance, regardless of interest rate.",
      icon: <CreditCard className="h-16 w-16 text-green-600 mb-4" />,
      visual: (
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Credit Card A</span>
            <span className="font-bold">$1,500</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Personal Loan</span>
            <span className="font-bold">$5,000</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Credit Card B</span>
            <span className="font-bold">$8,000</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Car Loan</span>
            <span className="font-bold">$12,000</span>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Make Minimum Payments on All Debts",
      description: "Continue making minimum payments on all your debts to avoid late fees and penalties.",
      icon: <Percent className="h-16 w-16 text-green-600 mb-4" />,
      visual: (
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Credit Card A</span>
            <span className="font-bold text-green-600">$50 min payment</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Personal Loan</span>
            <span className="font-bold text-green-600">$150 min payment</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Credit Card B</span>
            <span className="font-bold text-green-600">$200 min payment</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Car Loan</span>
            <span className="font-bold text-green-600">$300 min payment</span>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: Pay Extra on Smallest Debt",
      description: "Put any extra money toward the smallest debt until it's completely paid off.",
      icon: <PiggyBank className="h-16 w-16 text-green-600 mb-4" />,
      visual: (
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between p-3 bg-green-100 rounded-lg border-2 border-green-500">
            <span className="font-medium">Credit Card A</span>
            <div className="text-right">
              <div className="font-bold">$1,500</div>
              <div className="text-green-600 font-bold">+$300 extra</div>
            </div>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Personal Loan</span>
            <span className="font-bold">Min payment only</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Credit Card B</span>
            <span className="font-bold">Min payment only</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Car Loan</span>
            <span className="font-bold">Min payment only</span>
          </div>
        </div>
      ),
    },
    {
      title: "Step 4: Roll Over and Repeat",
      description:
        "Once the smallest debt is paid off, add that payment to the next smallest debt, creating a larger payment.",
      icon: <Snowflake className="h-16 w-16 text-green-600 mb-4" />,
      visual: (
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-dashed border-green-500">
            <span className="font-medium text-green-600">Credit Card A</span>
            <span className="font-bold text-green-600">PAID OFF! ✓</span>
          </div>
          <div className="flex justify-between p-3 bg-green-100 rounded-lg border-2 border-green-500">
            <span className="font-medium">Personal Loan</span>
            <div className="text-right">
              <div className="font-bold">$5,000</div>
              <div className="text-green-600 font-bold">+$350 ($50+$300)</div>
            </div>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Credit Card B</span>
            <span className="font-bold">Min payment only</span>
          </div>
          <div className="flex justify-between p-3 bg-white rounded-lg border">
            <span className="font-medium">Car Loan</span>
            <span className="font-bold">Min payment only</span>
          </div>
        </div>
      ),
    },
    {
      title: "The Snowball Effect",
      description:
        "As each debt is paid off, your 'snowball' grows larger, helping you pay off debts faster and stay motivated with quick wins.",
      icon: <TrendingDown className="h-16 w-16 text-green-600 mb-4" />,
      visual: (
        <div className="relative h-64 w-full max-w-sm mx-auto">
          <div className="absolute bottom-0 left-0 w-full h-12 bg-green-600 rounded-t-lg flex items-center justify-center text-white font-bold">
            Starting Payment
          </div>
          <div className="absolute bottom-0 left-[20%] w-[80%] h-24 bg-green-500 rounded-t-lg flex items-center justify-center text-white font-bold">
            After 1st Debt
          </div>
          <div className="absolute bottom-0 left-[40%] w-[60%] h-36 bg-green-400 rounded-t-lg flex items-center justify-center text-white font-bold">
            After 2nd Debt
          </div>
          <div className="absolute bottom-0 left-[60%] w-[40%] h-48 bg-green-300 rounded-t-lg flex items-center justify-center text-white font-bold">
            After 3rd Debt
          </div>
          <div className="absolute bottom-0 left-[80%] w-[20%] h-64 bg-green-200 rounded-t-lg flex items-center justify-center text-green-800 font-bold">
            Debt Free!
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {slides[currentSlide].icon}
            <h3 className="text-2xl font-bold">{slides[currentSlide].title}</h3>
            <p className="text-muted-foreground">{slides[currentSlide].description}</p>

            <div className="w-full py-6 flex items-center justify-center">{slides[currentSlide].visual}</div>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-green-600" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white"
        onClick={goToPrevSlide}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white"
        onClick={goToNextSlide}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Debt Snowball Method Explainer Section - Now at the top */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The Debt Snowball Method Explained
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how this proven strategy helps you pay off debt faster and stay motivated throughout your journey.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl mt-8">
            <SnowballMethodSlideshow />
          </div>
        </div>
      </section>

      {/* Hero Section - Now second */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The Debt Snowball Method
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A proven strategy to help you pay off debt faster and stay motivated throughout your debt-free journey.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is the Debt Snowball Method */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
                  The Basics
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What is the Debt Snowball Method?
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The debt snowball method is a debt reduction strategy where you pay off debts in order of smallest to
                  largest, gaining momentum as each balance is paid off.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Created by personal finance expert Dave Ramsey, this method focuses on behavior change and quick wins
                  to keep you motivated. While mathematically it may not be the fastest way to pay off debt (compared to
                  the avalanche method which targets high-interest debt first), research shows people are more likely to
                  stick with the snowball method and successfully become debt-free.
                </p>
                <p>
                  The psychological boost from completely eliminating individual debts creates momentum that helps you
                  stay committed to your debt-free journey.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
                        <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-medium">Psychological Wins</h3>
                        <p className="text-sm text-muted-foreground">Builds motivation through quick wins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
                        <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-medium">Simple to Follow</h3>
                        <p className="text-sm text-muted-foreground">Easy to understand and implement</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
                        <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-medium">Proven Success</h3>
                        <p className="text-sm text-muted-foreground">Higher completion rates than other methods</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
                        <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <h3 className="font-medium">Builds Momentum</h3>
                        <p className="text-sm text-muted-foreground">Each debt paid creates more money for the next</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How the Debt Snowball Works */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
                Step by Step
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                How the Debt Snowball Method Works
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Follow these simple steps to implement the debt snowball method and start your journey to financial
                freedom.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-4">
            <StepCard
              number={1}
              title="List All Your Debts"
              description="Write down all your debts (except your mortgage) from smallest to largest balance, regardless of interest rate."
              icon={CreditCard}
            />
            <StepCard
              number={2}
              title="Make Minimum Payments"
              description="Continue making minimum payments on all your debts to avoid late fees and penalties."
              icon={DollarSign}
            />
            <StepCard
              number={3}
              title="Pay Extra on Smallest Debt"
              description="Put any extra money toward the smallest debt until it's completely paid off."
              icon={PiggyBank}
            />
            <StepCard
              number={4}
              title="Roll Over and Repeat"
              description="Once the smallest debt is paid off, add that payment to the next smallest debt, creating a larger payment."
              icon={Snowflake}
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <p className="max-w-3xl mx-auto text-muted-foreground">
              As you pay off each debt, your payment "snowball" grows larger, allowing you to pay off each remaining
              debt faster than the previous one.
            </p>
          </div>
        </div>
      </section>

      {/* Example Scenario */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
                Real-World Example
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                See the Snowball Method in Action
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Let's look at a practical example of how the debt snowball method works with real numbers.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl mt-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Example Scenario</h3>
                <p className="mb-6">
                  Sarah has four debts and can afford to pay $1,000 total per month toward her debt. Here's how she
                  would apply the debt snowball method:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left">Debt</th>
                        <th className="py-2 px-4 text-left">Balance</th>
                        <th className="py-2 px-4 text-left">Min. Payment</th>
                        <th className="py-2 px-4 text-left">Interest Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">Credit Card A</td>
                        <td className="py-2 px-4">$1,500</td>
                        <td className="py-2 px-4">$50</td>
                        <td className="py-2 px-4">18%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">Personal Loan</td>
                        <td className="py-2 px-4">$5,000</td>
                        <td className="py-2 px-4">$150</td>
                        <td className="py-2 px-4">10%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">Credit Card B</td>
                        <td className="py-2 px-4">$8,000</td>
                        <td className="py-2 px-4">$200</td>
                        <td className="py-2 px-4">22%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Car Loan</td>
                        <td className="py-2 px-4">$12,000</td>
                        <td className="py-2 px-4">$300</td>
                        <td className="py-2 px-4">7%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 space-y-6">
                  <div>
                    <h4 className="font-medium">Step 1: Make minimum payments on all debts</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sarah pays the minimum on all debts: $50 + $150 + $200 + $300 = $700
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Step 2: Put extra money toward smallest debt</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sarah has $300 extra ($1,000 - $700) to put toward Credit Card A (smallest debt)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Step 3: Pay off first debt and roll over</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      After paying off Credit Card A, Sarah now has $350 ($50 + $300) to put toward the Personal Loan
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Step 4: Continue the snowball</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      After paying off the Personal Loan, Sarah has $500 ($150 + $350) to put toward Credit Card B
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      After paying off Credit Card B, Sarah has $700 ($200 + $500) to put toward the Car Loan
                    </p>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-green-50 rounded-lg dark:bg-green-950">
                  <h4 className="font-medium text-green-700 dark:text-green-300">Result</h4>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    By using the debt snowball method, Sarah pays off all her debt in approximately 28 months and saves
                    over $2,000 in interest compared to making only minimum payments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
                Why It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Benefits of the Debt Snowball Method
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The debt snowball method offers several advantages that make it an effective debt repayment strategy.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <BenefitCard
              title="Psychological Motivation"
              description="Quick wins from paying off smaller debts create momentum and motivation to continue your debt-free journey."
              icon={TrendingDown}
            />
            <BenefitCard
              title="Simple to Implement"
              description="The straightforward approach makes it easy to follow without complex calculations or strategies."
              icon={CheckCircle}
            />
            <BenefitCard
              title="Visible Progress"
              description="Eliminating entire debts provides clear, measurable progress that keeps you engaged in the process."
              icon={BarChart3}
            />
          </div>
        </div>
      </section>

      {/* Snowball vs. Avalanche */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
                Comparison
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Snowball vs. Avalanche Method</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Understanding the difference between the two most popular debt repayment strategies.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
                      <Snowflake className="h-6 w-6 text-green-700 dark:text-green-300" />
                    </div>
                    <h3 className="text-xl font-bold">Debt Snowball</h3>
                  </div>
                  <div className="space-y-4">
                    <p>
                      <strong>Focus:</strong> Smallest balance to largest
                    </p>
                    <p>
                      <strong>Advantage:</strong> Psychological wins and motivation
                    </p>
                    <p>
                      <strong>Best for:</strong> Those who need motivation to stay on track
                    </p>
                    <p>
                      <strong>Research shows:</strong> Higher completion rates due to behavioral psychology
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800/30">
                      <TrendingDown className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold">Debt Avalanche</h3>
                  </div>
                  <div className="space-y-4">
                    <p>
                      <strong>Focus:</strong> Highest interest rate to lowest
                    </p>
                    <p>
                      <strong>Advantage:</strong> Mathematically optimal, saves more money
                    </p>
                    <p>
                      <strong>Best for:</strong> Those who are highly disciplined
                    </p>
                    <p>
                      <strong>Research shows:</strong> Lower completion rates despite mathematical advantage
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Which method is right for you?</h4>
              <p className="text-muted-foreground">
                While the avalanche method saves more money mathematically, studies show that people are more likely to
                successfully become debt-free using the snowball method due to the psychological benefits of quick wins.
                Our platform uses a hybrid approach that optimizes for both psychological motivation and interest
                savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-green-50 dark:from-background dark:to-green-950">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to start your debt-free journey?
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines the psychological benefits of the debt snowball method with AI optimization to
                help you become debt-free faster.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface StepCardProps {
  number: number
  title: string
  description: string
  icon: LucideIcon
}

function StepCard({ number, title, description, icon: Icon }: StepCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300">
        {number}
      </div>
      <div className="space-y-2">
        <div className="flex justify-center">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

interface BenefitCardProps {
  title: string
  description: string
  icon: LucideIcon
}

function BenefitCard({ title, description, icon: Icon }: BenefitCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
      <div className="rounded-full bg-green-100 p-3 dark:bg-green-800/30">
        <Icon className="h-6 w-6 text-green-700 dark:text-green-300" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
