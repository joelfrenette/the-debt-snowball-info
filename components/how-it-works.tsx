import { CheckCircle2 } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Three simple steps to financial freedom
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to create a personalized debt repayment plan that works for you.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300">
              1
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Enter Your Debts</h3>
              <p className="text-muted-foreground">
                Add all your debts including credit cards, loans, and other balances with their interest rates.
              </p>
            </div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Credit card balances</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Personal loans</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Student loans</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300">
              2
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Add Credit Offers</h3>
              <p className="text-muted-foreground">
                Enter any balance transfer or low-interest credit offers you've received.
              </p>
            </div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>0% APR offers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Balance transfer options</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Low-interest credit lines</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300">
              3
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Get Your Plan</h3>
              <p className="text-muted-foreground">
                Our AI generates an optimized repayment plan to save you money and time.
              </p>
            </div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Personalized strategy</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Month-by-month plan</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Interest savings calculation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
