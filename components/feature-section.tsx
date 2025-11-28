import { CreditCard, PiggyBank, TrendingUp, BarChart4, Zap, Shield } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to optimize your debt repayment
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides powerful tools to help you understand your debt and create a personalized plan to
              pay it off faster.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
              <CreditCard className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Debt Tracking</h3>
              <p className="text-muted-foreground">
                Easily track all your debts in one place, including credit cards, loans, and more.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
              <PiggyBank className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Interest Savings</h3>
              <p className="text-muted-foreground">
                See how much you can save in interest by following our optimized repayment plan.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
              <TrendingUp className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Payoff Projections</h3>
              <p className="text-muted-foreground">
                Get detailed projections of when you'll be debt-free with different repayment strategies.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
              <BarChart4 className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Visual Analytics</h3>
              <p className="text-muted-foreground">
                Visualize your debt payoff journey with interactive charts and graphs.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
              <Zap className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">AI Optimization</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your debts and credit offers to find the most efficient repayment strategy.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4 rounded-lg border p-6">
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/30">
              <Shield className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your financial data is encrypted and secure. We never store full credit card numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
