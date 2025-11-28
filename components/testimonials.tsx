export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-800/30 dark:text-green-300">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What our users are saying</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Thousands of people have used Debt Snowball to optimize their debt repayment and save money.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
              </div>
              <p className="text-muted-foreground">
                "I was drowning in credit card debt with high interest rates. Debt Snowball helped me create a plan that
                saved me over $4,000 in interest and I'll be debt-free 2 years sooner!"
              </p>
            </div>
            <div>
              <p className="font-medium">Sarah T.</p>
              <p className="text-sm text-muted-foreground">Paid off $22,000 in debt</p>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
              </div>
              <p className="text-muted-foreground">
                "The balance transfer recommendations were a game-changer. I didn't realize how much I could save by
                strategically moving my debt to lower interest offers."
              </p>
            </div>
            <div>
              <p className="font-medium">Michael R.</p>
              <p className="text-sm text-muted-foreground">Saved $3,500 in interest</p>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
              </div>
              <p className="text-muted-foreground">
                "I love how easy it is to track my progress. Seeing the debt go down each month keeps me motivated to
                stick with the plan. Best financial decision I've made!"
              </p>
            </div>
            <div>
              <p className="font-medium">Jennifer L.</p>
              <p className="text-sm text-muted-foreground">On track to be debt-free in 18 months</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
