import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChromeIcon as Google } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Pay off debt faster with the Debt Snowball Method
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our AI-powered debt optimizer creates a personalized repayment plan to help you save money and become
                debt-free sooner.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Google className="mr-2 h-4 w-4" />
                  Sign in with Google
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span className="font-medium">4.9/5</span>
                <div className="flex">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                </div>
              </div>
              <div className="text-muted-foreground">Based on 1,000+ reviews</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[400px] rounded-lg border bg-background p-4 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">Debt Overview</div>
                  <div className="text-sm text-muted-foreground">Total: $25,000</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-3/4 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-md border p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">Credit Card A</div>
                    <div className="font-medium">$8,000</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">18.99% APR</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-1.5 w-1/3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">Personal Loan</div>
                    <div className="font-medium">$12,000</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">9.5% APR</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-1.5 w-1/2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="flex justify-between">
                    <div className="font-medium">Credit Card B</div>
                    <div className="font-medium">$5,000</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">22.99% APR</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-1.5 w-1/4 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-md bg-green-50 p-3 dark:bg-green-950">
                <div className="font-medium text-green-700 dark:text-green-300">Optimized Plan</div>
                <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                  Save $3,245 in interest and be debt-free 16 months sooner!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
