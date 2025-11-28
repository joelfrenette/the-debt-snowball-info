"use client"

export function FaqCreditImpact() {
  const strategies = [
    {
      name: "Debt Snowball/Avalanche",
      impact: "Positive",
      description: "Gradual improvement as balances decrease and payment history builds",
      score: 80,
      color: "bg-green-500",
    },
    {
      name: "Debt Consolidation",
      impact: "Mixed",
      description: "Initial small drop from credit inquiry, then improvement as utilization decreases",
      score: 60,
      color: "bg-blue-500",
    },
    {
      name: "Debt Management Plan",
      impact: "Slightly Negative",
      description: "Accounts may be closed or marked as in a DMP, but on-time payments help",
      score: 40,
      color: "bg-amber-500",
    },
    {
      name: "Debt Settlement",
      impact: "Significantly Negative",
      description: "Accounts show as settled for less than full amount, missed payments during negotiation",
      score: -60,
      color: "bg-red-500",
    },
    {
      name: "Bankruptcy",
      impact: "Severely Negative",
      description: "Major negative impact, stays on credit report for 7-10 years",
      score: -90,
      color: "bg-red-700",
    },
  ]

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Different debt strategies have varying impacts on your credit score. This visualization shows the relative
        impact of each approach, from positive to severely negative.
      </p>

      <div className="space-y-6">
        {strategies.map((strategy, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{strategy.name}</span>
              <span
                className={`text-sm ${
                  strategy.score > 0 ? "text-green-600" : strategy.score > -50 ? "text-amber-600" : "text-red-600"
                }`}
              >
                {strategy.impact}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex items-center justify-center h-2 bg-slate-200 rounded">
                <div
                  className={`absolute h-2 ${strategy.color} rounded ${strategy.score < 0 ? "right-1/2" : "left-1/2"}`}
                  style={{
                    width: `${Math.abs(strategy.score) / 2}%`,
                  }}
                ></div>
                <div className="absolute w-2 h-6 bg-slate-400 rounded" style={{ left: "calc(50% - 4px)" }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Negative Impact</span>
                <span>Positive Impact</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{strategy.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mt-4">
        <p className="text-sm text-blue-700">
          <span className="font-medium">Note:</span> The actual impact on your credit score will vary based on your
          specific credit profile, the details of your debt, and how you implement each strategy. This visualization
          provides a general comparison of relative impacts.
        </p>
      </div>
    </div>
  )
}
