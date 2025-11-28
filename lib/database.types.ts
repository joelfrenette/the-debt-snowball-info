export interface Debt {
  id?: string
  name: string
  last_four: string
  balance: number
  apr: number
  minimum_payment: number
  payment_day: number
  created_at?: string
}

export interface CreditOffer {
  id?: string
  name: string
  apr: number
  intro_apr: number | null
  intro_period_months: number | null
  transfer_fee_percent: number | null
  credit_limit: number
  rewards_program?: string | null
  rewards_rate?: number | null
  rewards_category?: string | null
  annual_fee?: number | null
  created_at?: string
}

export interface RepaymentPlan {
  id?: string
  name: string
  total_savings: number
  months_to_payoff: number
  created_at?: string
}

export interface RepaymentStep {
  id?: string
  plan_id: string
  month: number
  debt_name: string
  payment_amount: number
  remaining_balance: number
  created_at?: string
}
