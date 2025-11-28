"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Briefcase, Scale, CreditCard, AlertTriangle, HelpCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FaqComparison } from "@/components/faq/faq-comparison"
import { FaqCreditImpact } from "@/components/faq/faq-credit-impact"
import { FaqCalculator } from "@/components/faq/faq-calculator"

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // All FAQ items organized by category
  const faqItems = {
    general: [
      {
        question: "What is debt management?",
        answer:
          "Debt management refers to the process of taking control of your debt through various strategies and techniques. It involves creating a plan to repay your debts in a systematic way, often with the goal of becoming debt-free as quickly as possible while minimizing interest costs. Effective debt management may include budgeting, prioritizing debts, negotiating with creditors, consolidating debts, or working with debt management professionals.",
        tags: ["basics", "definition"],
      },
      {
        question: "How much debt is too much?",
        answer:
          "The appropriate amount of debt varies based on individual circumstances, but financial experts often recommend keeping your debt-to-income ratio (monthly debt payments divided by monthly gross income) below 36%. If you're spending more than 15-20% of your take-home pay on non-mortgage debt payments, struggling to make minimum payments, or using credit to cover basic expenses, these are signs you may have too much debt.",
        tags: ["basics", "planning"],
      },
      {
        question: "What's the difference between good debt and bad debt?",
        answer:
          "Good debt is generally considered to be debt that is an investment in your future and has the potential to increase your net worth or income. Examples include mortgages, student loans, and business loans. Bad debt typically refers to debt used to purchase items that quickly lose value or don't generate income, such as credit card debt for discretionary spending or auto loans for rapidly depreciating vehicles. However, the distinction isn't always clear-cut and depends on individual circumstances and how the debt is managed.",
        tags: ["basics", "education"],
      },
      {
        question: "How does debt affect my credit score?",
        answer:
          "Debt affects your credit score in several ways. Payment history (whether you pay on time) accounts for about 35% of your score. Credit utilization (the percentage of available credit you're using) makes up about 30%. Having a mix of different types of credit (revolving and installment) can positively impact your score. Opening new debt accounts creates hard inquiries, which can temporarily lower your score. Managing debt responsibly by making on-time payments and keeping balances low generally improves your credit score over time.",
        tags: ["credit", "basics"],
      },
      {
        question: "Should I save money or pay off debt first?",
        answer:
          "This depends on your specific situation, but a balanced approach is often recommended. First, build an emergency fund of at least $1,000 (eventually growing to 3-6 months of expenses). Then, compare the interest rates on your debt to potential investment returns. Generally, it makes mathematical sense to pay off high-interest debt (typically above 6-8%) before investing, while maintaining minimum payments on all debts. However, if your employer offers a 401(k) match, consider contributing enough to get the full match while paying down debt, as this is essentially a 100% return on investment.",
        tags: ["planning", "strategy"],
      },
    ],
    strategies: [
      {
        question: "What is the Debt Snowball method?",
        answer:
          "The Debt Snowball method is a debt reduction strategy popularized by Dave Ramsey. With this approach, you pay minimum payments on all debts while putting extra money toward your smallest debt balance first, regardless of interest rate. Once that debt is paid off, you roll its payment (creating a 'snowball' effect) into paying off the next smallest debt, and so on. The psychological wins from completely paying off individual debts create momentum that helps many people stay motivated throughout their debt-free journey. Research shows people are more likely to stick with the snowball method and successfully become debt-free compared to other approaches.",
        tags: ["strategy", "snowball"],
      },
      {
        question: "What is the Debt Avalanche method?",
        answer:
          "The Debt Avalanche method is a debt reduction strategy where you pay minimum payments on all debts while putting extra money toward the debt with the highest interest rate first. Once that debt is paid off, you move to the debt with the next highest interest rate, and so on. This approach minimizes the total interest paid and is mathematically optimal for saving money. However, it may take longer to pay off your first debt compared to the Snowball method, which some people find demotivating. The Avalanche method works best for those who are highly disciplined and motivated by long-term financial optimization.",
        tags: ["strategy", "avalanche"],
      },
      {
        question: "What is debt consolidation?",
        answer:
          "Debt consolidation is the process of combining multiple debts into a single loan or credit line, ideally with a lower interest rate. This can simplify your finances by giving you just one payment to manage instead of several. Common consolidation methods include balance transfer credit cards (especially those with 0% introductory rates), personal loans, home equity loans or lines of credit, and debt consolidation loans. Effective consolidation should lower your interest rate, reduce your monthly payment, or both. However, it's important to address the spending habits that led to the debt in the first place, or you risk accumulating new debt on top of the consolidated amount.",
        tags: ["strategy", "consolidation"],
      },
      {
        question: "What is debt settlement?",
        answer:
          "Debt settlement is a process where you negotiate with creditors to pay a lump sum that's less than the full amount you owe to satisfy the debt. This typically happens when you're significantly behind on payments and the creditor believes getting something is better than nothing. You can negotiate directly with creditors yourself or work with a debt settlement company. While settlement can reduce your total debt, it usually severely damages your credit score, may result in taxable income (as forgiven debt over $600 is often considered taxable), and can involve fees if you use a settlement company. It's generally considered a last resort before bankruptcy.",
        tags: ["strategy", "settlement", "negotiation"],
      },
      {
        question: "What is debt management plan (DMP)?",
        answer:
          "A Debt Management Plan (DMP) is a structured repayment plan arranged by a credit counseling agency. The agency works with your creditors to potentially secure lower interest rates, waived fees, and create a consolidated monthly payment that you make to the agency, which then distributes payments to your creditors. DMPs typically last 3-5 years and work best for unsecured debts like credit cards. While in a DMP, you generally can't use your credit cards or apply for new credit. DMPs have less negative impact on your credit than debt settlement or bankruptcy, but may still be noted on your credit report. Most legitimate credit counseling agencies are non-profits and charge modest fees for this service.",
        tags: ["strategy", "counseling", "DMP"],
      },
    ],
    consolidation: [
      {
        question: "How does debt consolidation work?",
        answer:
          "Debt consolidation works by combining multiple debts into a single loan or credit line. The process typically involves applying for a new loan or credit card with sufficient limits to cover your existing debts. Once approved, you use the funds to pay off your original debts, leaving you with just one loan to repay. The goal is to secure a lower interest rate than your original debts, simplify your payments, and potentially lower your monthly payment amount. Consolidation doesn't reduce the principal amount you owe, but it can save you money on interest and help you pay off debt faster if you maintain or increase your payment amount.",
        tags: ["consolidation", "process"],
      },
      {
        question: "What are the best ways to consolidate debt?",
        answer:
          "The best debt consolidation method depends on your specific situation, but common options include: 1) Balance transfer credit cards: Ideal for those with good credit who can pay off the debt during the 0% introductory period (typically 12-21 months). 2) Personal loans: Good for consolidating high-interest debt when you need a fixed repayment schedule. 3) Home equity loans or lines of credit: Offer low interest rates but put your home at risk if you can't repay. 4) 401(k) loans: Allow you to borrow from yourself but risk retirement savings and tax penalties if not repaid. 5) Debt consolidation programs: Offered by credit counseling agencies to help negotiate lower rates and payments. The best option depends on your credit score, amount of debt, types of debt, and overall financial situation.",
        tags: ["consolidation", "options"],
      },
      {
        question: "What are the pros and cons of debt consolidation?",
        answer:
          "Pros of debt consolidation include: 1) Simplifying finances with a single payment, 2) Potentially lower interest rates, 3) Possibly lower monthly payments, 4) A clear payoff date with fixed-rate loans, and 5) Potential credit score improvement over time. Cons include: 1) Potential fees for balance transfers or loan origination, 2) Risk of accumulating more debt if spending habits don't change, 3) Possible extended repayment period, which could mean more interest over time despite lower rates, 4) Risk to collateral with secured loans like home equity, and 5) Temporary negative impact on credit score from the application process. Consolidation works best when combined with a budget and plan to avoid future debt.",
        tags: ["consolidation", "pros and cons"],
      },
      {
        question: "Will debt consolidation hurt my credit score?",
        answer:
          "Debt consolidation may cause a short-term dip in your credit score due to the hard inquiry when you apply for a new loan or credit card. If you're consolidating with a new credit card, opening a new account will temporarily lower your average account age. However, in the long run, consolidation often improves your credit score if it helps you make on-time payments and reduce your credit utilization ratio. Closing old accounts after consolidation can negatively impact your credit history length and utilization ratio, so it's often better to keep them open with zero balances. The overall impact depends on your specific credit profile and how you manage the consolidated debt.",
        tags: ["consolidation", "credit"],
      },
      {
        question: "What's the difference between debt consolidation and debt refinancing?",
        answer:
          "Debt consolidation specifically refers to combining multiple debts into a single loan or credit line, while debt refinancing involves replacing an existing loan with a new loan that has different terms. Consolidation is focused on simplifying multiple payments, while refinancing is about changing the terms of a specific debt. However, in practice, these terms are often used interchangeably because consolidation typically involves refinancing multiple debts into a new loan. Both strategies aim to secure better terms, such as lower interest rates or monthly payments, but consolidation has the added benefit of streamlining multiple debts into one payment.",
        tags: ["consolidation", "refinancing", "definition"],
      },
    ],
    negotiation: [
      {
        question: "How can I negotiate with creditors on my own?",
        answer:
          "To negotiate with creditors directly: 1) Prepare by understanding your financial situation and what you can realistically afford to pay. 2) Contact the creditor's hardship or customer assistance department. 3) Explain your situation honestly and propose a specific solution (reduced interest rate, extended term, settlement amount, etc.). 4) Get any agreement in writing before making payments. 5) Follow through with all agreed terms. Be polite but persistent, and don't be afraid to escalate to supervisors if necessary. The best time to negotiate is before you fall severely behind, but creditors may be more willing to settle once an account is several months delinquent. Keep records of all communications and agreements.",
        tags: ["negotiation", "DIY", "process"],
      },
      {
        question: "What is debt settlement and how does it work?",
        answer:
          "Debt settlement is negotiating with creditors to pay a lump sum that's less than the full balance to satisfy the debt. The process typically works like this: 1) You stop making payments to the creditor, instead saving money for a potential settlement. 2) After several months of non-payment (typically 3-6 months), you or a settlement company contacts the creditor to negotiate a reduced payoff amount. 3) If the creditor agrees, you pay the negotiated amount in a lump sum or short-term payment plan. 4) The creditor then reports the debt as settled or paid as agreed. This strategy can reduce your total debt but significantly damages your credit score, may result in tax liability for forgiven debt, and risks lawsuits from creditors during the non-payment period.",
        tags: ["settlement", "negotiation", "process"],
      },
      {
        question: "What are the risks of debt settlement?",
        answer:
          "Debt settlement carries several significant risks: 1) Severe damage to your credit score (typically 100+ points) from missed payments and settled status. 2) Tax liability, as forgiven debt over $600 is generally considered taxable income by the IRS. 3) Potential lawsuits from creditors during the non-payment period. 4) Late fees and interest that continue to accumulate while you're not paying, potentially increasing your total debt. 5) No guarantee that creditors will agree to settle. 6) High fees if using a settlement company (typically 15-25% of the enrolled debt). 7) Emotional stress from collection calls and uncertain outcomes. Settlement should generally be considered only when you're unable to pay your debts through other means and are trying to avoid bankruptcy.",
        tags: ["settlement", "risks", "negotiation"],
      },
      {
        question: "What's the difference between debt settlement and debt management?",
        answer:
          "Debt settlement and debt management are fundamentally different approaches. Debt settlement involves negotiating to pay less than the full amount owed, typically requires stopping payments to creditors, severely damages credit, and is generally a last resort before bankruptcy. Debt management, often through a Debt Management Plan (DMP) with a credit counseling agency, involves repaying the full debt amount but with potentially reduced interest rates and fees. With a DMP, you make regular payments, minimize credit damage, and work with creditors rather than against them. Settlement may provide immediate debt reduction but with serious consequences, while management provides a structured path to paying off the full amount with fewer negative impacts.",
        tags: ["settlement", "management", "comparison"],
      },
      {
        question: "How do I know if a debt settlement company is legitimate?",
        answer:
          "To identify legitimate debt settlement companies: 1) Verify they're accredited by industry organizations like the American Fair Credit Council (AFCC) or International Association of Professional Debt Arbitrators (IAPDA). 2) Check for complaints with the Consumer Financial Protection Bureau (CFPB), Better Business Bureau (BBB), and your state's attorney general office. 3) Avoid companies that guarantee results, promise to stop collection calls immediately, or charge upfront fees before settling any debts (which is illegal under FTC regulations). 4) Look for transparent fee structures (typically 15-25% of enrolled debt or 25-35% of saved amount). 5) Ensure they provide clear disclosures about the risks to your credit score and potential tax implications. 6) Be wary of high-pressure sales tactics or companies that contact you unsolicited.",
        tags: ["settlement", "companies", "scams"],
      },
    ],
    bankruptcy: [
      {
        question: "What is bankruptcy and how does it work?",
        answer:
          "Bankruptcy is a legal process that provides debt relief for individuals or businesses who cannot repay their debts. The two most common types for individuals are Chapter 7 (liquidation) and Chapter 13 (reorganization). In Chapter 7, non-exempt assets are sold to pay creditors, and remaining eligible debts are discharged. This process typically takes 3-6 months. In Chapter 13, you keep your assets but enter a court-approved repayment plan lasting 3-5 years, paying all or a portion of your debts based on income and expenses. Bankruptcy provides an 'automatic stay' that immediately stops most collection actions. The process requires credit counseling, filing detailed financial paperwork, attending a meeting of creditors, and potentially appearing in court hearings.",
        tags: ["bankruptcy", "legal", "process"],
      },
      {
        question: "What's the difference between Chapter 7 and Chapter 13 bankruptcy?",
        answer:
          "Chapter 7 bankruptcy is known as 'liquidation' bankruptcy. It's typically faster (3-6 months), requires no repayment plan, and discharges most unsecured debts. However, you must pass a means test to qualify, non-exempt assets may be sold to pay creditors, and it remains on your credit report for 10 years. Chapter 13 bankruptcy is 'reorganization' bankruptcy. It involves a 3-5 year repayment plan, allows you to keep your assets, can stop foreclosure and provide time to catch up on mortgage payments, and stays on your credit report for 7 years. Chapter 13 requires regular income and debt limits ($465,275 unsecured, $1,395,875 secured as of 2023). Chapter 7 is generally better for low-income filers with few assets, while Chapter 13 works better for those with regular income who want to protect assets or catch up on secured debt payments.",
        tags: ["bankruptcy", "chapter 7", "chapter 13", "comparison"],
      },
      {
        question: "What debts can and cannot be discharged in bankruptcy?",
        answer:
          "Debts typically dischargeable in bankruptcy include: credit card debt, medical bills, personal loans, utility bills, business debts, and old tax debts (over 3 years). Debts that generally cannot be discharged include: recent tax debts (less than 3 years old), student loans (except in rare cases of 'undue hardship'), alimony and child support, court-ordered restitution or criminal fines, and debts not listed in your bankruptcy filing. Additionally, secured debts like mortgages and car loans aren't technically discharged—while you may no longer be personally liable for the debt, the creditor retains the right to repossess the collateral. Some debts, like those incurred through fraud or luxury purchases made shortly before filing, may be challenged by creditors and potentially ruled non-dischargeable by the court.",
        tags: ["bankruptcy", "discharge", "legal"],
      },
      {
        question: "How will bankruptcy affect my credit and for how long?",
        answer:
          "Bankruptcy severely impacts your credit score, typically causing a drop of 150-240 points. Chapter 7 bankruptcy remains on your credit report for 10 years from the filing date, while Chapter 13 remains for 7 years. During this time, obtaining new credit will be difficult and expensive, with higher interest rates and fees. However, the impact diminishes over time, and you can begin rebuilding credit immediately after discharge. Many people see credit score improvements within 1-2 years if they maintain positive financial habits. Some lenders specialize in post-bankruptcy financing, though terms will be less favorable. Employment may be affected for jobs requiring security clearances or financial responsibility, and insurance rates might increase. Housing can be challenging, as many landlords check credit, though the impact lessens with time since filing.",
        tags: ["bankruptcy", "credit", "impact"],
      },
      {
        question: "When should I consider bankruptcy as an option?",
        answer:
          "Consider bankruptcy when: 1) You're unable to pay basic living expenses while making minimum debt payments. 2) Your debt would take more than 5 years to repay even with aggressive budgeting. 3) Collection actions, wage garnishments, or lawsuits are imminent or ongoing. 4) You're using credit cards for necessities because you can't afford them otherwise. 5) The stress of debt is severely affecting your mental health, relationships, or ability to function. Before filing, explore alternatives like debt management plans, debt settlement, or negotiating directly with creditors. Bankruptcy should generally be viewed as a last resort due to its long-term impact on your credit and financial options. Consulting with both a credit counselor and a bankruptcy attorney can help you make an informed decision based on your specific situation.",
        tags: ["bankruptcy", "decision", "timing"],
      },
    ],
    credit: [
      {
        question: "How will different debt strategies affect my credit score?",
        answer:
          "Different debt strategies have varying impacts on your credit score. The Debt Snowball and Avalanche methods, when executed with on-time payments, gradually improve your credit score as you reduce balances and establish a positive payment history. Debt consolidation may cause a temporary dip from the credit inquiry and new account, but often improves scores long-term by reducing utilization and simplifying payments. Debt management plans have minimal negative impact if payments are made on time, though accounts may be closed or marked as being in a DMP. Debt settlement significantly damages your credit (100+ points) due to missed payments and settled status notations. Bankruptcy has the most severe impact (150-240 point drop), remaining on your credit report for 7-10 years. Generally, strategies that involve paying as agreed (snowball, avalanche, consolidation, management) are better for your credit than those involving partial payment or non-payment (settlement, bankruptcy).",
        tags: ["credit", "impact", "comparison"],
      },
      {
        question: "How long will negative information stay on my credit report?",
        answer:
          "Negative information remains on your credit report for specific timeframes: Late payments stay for 7 years from the date of the delinquency. Collection accounts remain for 7 years from the date the account first became delinquent and wasn't brought current. Charge-offs stay for 7 years from the date the account was charged off. Chapter 13 bankruptcy remains for 7 years from the filing date. Chapter 7 bankruptcy stays for 10 years from the filing date. Completed debt settlements typically remain for 7 years from the date the account was settled, showing as 'settled' or 'paid settled' rather than 'paid in full.' Tax liens may remain for 7 years from the date they're paid. The impact of these items on your credit score diminishes over time, especially if you establish positive credit habits after the negative event.",
        tags: ["credit", "report", "timeline"],
      },
      {
        question: "How can I rebuild my credit after debt problems?",
        answer:
          "To rebuild credit after debt problems: 1) Ensure all existing accounts are current and make all payments on time going forward. 2) Consider a secured credit card with a small deposit if you can't qualify for traditional credit. 3) Become an authorized user on a responsible person's credit card. 4) Apply for a credit-builder loan through a credit union or online lender. 5) Keep credit card balances below 30% of your limit (ideally below 10%). 6) Don't close old accounts in good standing, as they contribute to your credit history length. 7) Apply for new credit sparingly to minimize hard inquiries. 8) Check your credit reports regularly and dispute any errors. 9) Consider Experian Boost or UltraFICO to get credit for utility and banking history. 10) Be patient—rebuilding credit takes time, but consistent positive behavior will gradually improve your score.",
        tags: ["credit", "rebuilding", "recovery"],
      },
      {
        question: "What is a debt validation letter and when should I use it?",
        answer:
          "A debt validation letter is a formal written request asking a debt collector to provide proof that you owe a debt and that they have the right to collect it. Under the Fair Debt Collection Practices Act (FDCPA), you have the right to request validation within 30 days of first being contacted about a debt. The collector must then cease collection activities until they provide verification. You should send a validation letter when: 1) You don't recognize the debt, 2) You believe the amount is incorrect, 3) The debt is old and potentially beyond the statute of limitations, 4) You suspect the collector may not have proper documentation, or 5) You believe the debt may have already been paid or discharged. The letter should include your personal information, the account number, a statement that you're disputing the debt, and a request for specific documentation proving the debt's validity.",
        tags: ["credit", "collections", "rights"],
      },
      {
        question: "What is the statute of limitations on debt?",
        answer:
          "The statute of limitations on debt is the time period during which a creditor can legally sue you to collect a debt. Once this period expires, the debt becomes 'time-barred,' meaning creditors lose their right to sue for payment, though they can still attempt to collect. The timeframe varies by state and debt type, typically ranging from 3-10 years for most consumer debts. The clock generally starts from the date of your last payment or acknowledgment of the debt. Important cautions: Making even a small payment or acknowledging the debt in writing can restart the clock in many states. Debt collectors may still attempt to collect after the statute expires, but they cannot legally threaten to sue. The debt can still appear on your credit report for up to 7 years from the date of first delinquency, regardless of the statute of limitations. If sued for a time-barred debt, you must appear in court and raise the statute of limitations as a defense.",
        tags: ["credit", "legal", "collections"],
      },
    ],
    taxes: [
      {
        question: "Is forgiven debt considered taxable income?",
        answer:
          "Yes, in most cases, forgiven or canceled debt is considered taxable income by the IRS. When a creditor forgives debt over $600, they typically issue a Form 1099-C (Cancellation of Debt), and you must report this amount as income on your tax return. However, there are important exceptions: 1) Debts discharged in bankruptcy are not taxable. 2) If you were insolvent (your total debts exceeded your total assets) immediately before the cancellation, you may exclude some or all of the forgiven amount from income. 3) Certain student loans forgiven after working in specific professions are non-taxable. 4) Some mortgage debt forgiven on a primary residence may be excluded under specific circumstances. 5) The American Rescue Plan Act made student loan forgiveness tax-free through 2025. Consult with a tax professional if you've had debt forgiven, as the tax implications can be complex.",
        tags: ["taxes", "forgiveness", "settlement"],
      },
      {
        question: "Can I deduct debt interest on my taxes?",
        answer:
          "The deductibility of debt interest depends on the type of debt: Mortgage interest on your primary or secondary residence is generally deductible if you itemize deductions, subject to limits (interest on up to $750,000 of mortgage debt for loans taken after Dec. 15, 2017, or $1 million for earlier loans). Student loan interest is deductible up to $2,500 per year as an 'above-the-line' deduction (no itemizing required), though this phases out at higher income levels. Business debt interest is typically deductible as a business expense. Investment interest may be deductible up to your net investment income if you itemize. However, personal debt interest (credit cards, personal loans, auto loans) is generally NOT tax-deductible. Home equity loan interest is only deductible if the loan was used to buy, build, or substantially improve the home securing the loan. Tax laws change frequently, so consult a tax professional for current rules applicable to your situation.",
        tags: ["taxes", "deductions", "interest"],
      },
      {
        question: "How do I handle tax debt?",
        answer:
          "To handle tax debt: 1) File your returns on time even if you can't pay in full—this avoids failure-to-file penalties, which are higher than failure-to-pay penalties. 2) Pay as much as you can by the deadline to reduce interest and penalties. 3) Consider an IRS installment agreement—you can apply online for debts under $50,000 with up to 72 months to pay. 4) For larger amounts or financial hardship, explore an Offer in Compromise to settle for less than the full amount. 5) If you're experiencing temporary financial difficulty, request Currently Not Collectible status. 6) For severe hardship cases, bankruptcy may discharge older income tax debts meeting specific criteria. 7) The IRS Fresh Start program offers various relief options for taxpayers struggling with tax debt. 8) Consider professional help from a tax attorney, CPA, or Enrolled Agent for complex situations. Unlike other creditors, the IRS has extensive collection powers, including liens, levies, and wage garnishment without a court order, so addressing tax debt promptly is crucial.",
        tags: ["taxes", "IRS", "government"],
      },
    ],
  }

  // Flatten all FAQ items for searching
  const allFaqItems = [
    ...faqItems.general,
    ...faqItems.strategies,
    ...faqItems.consolidation,
    ...faqItems.negotiation,
    ...faqItems.bankruptcy,
    ...faqItems.credit,
    ...faqItems.taxes,
  ]

  // Filter FAQ items based on search query and active tab
  const filteredFaqItems = allFaqItems.filter((item) => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesQuestion = item.question.toLowerCase().includes(query)
      const matchesAnswer = item.answer.toLowerCase().includes(query)
      const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(query))

      if (!(matchesQuestion || matchesAnswer || matchesTags)) {
        return false
      }
    }

    // Apply category filter
    if (activeTab !== "all") {
      switch (activeTab) {
        case "general":
          return faqItems.general.includes(item)
        case "strategies":
          return faqItems.strategies.includes(item)
        case "consolidation":
          return faqItems.consolidation.includes(item)
        case "negotiation":
          return faqItems.negotiation.includes(item)
        case "bankruptcy":
          return faqItems.bankruptcy.includes(item)
        case "credit":
          return faqItems.credit.includes(item)
        case "taxes":
          return faqItems.taxes.includes(item)
        default:
          return true
      }
    }

    return true
  })

  return (
    <div className="container max-w-6xl mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Debt Management FAQ</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive answers to common questions about debt management strategies
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto h-auto p-0 bg-transparent space-x-2">
            <TabsTrigger
              value="all"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All Topics
            </TabsTrigger>
            <TabsTrigger
              value="general"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="strategies"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Strategies
            </TabsTrigger>
            <TabsTrigger
              value="consolidation"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Consolidation
            </TabsTrigger>
            <TabsTrigger
              value="negotiation"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Negotiation
            </TabsTrigger>
            <TabsTrigger
              value="bankruptcy"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Bankruptcy
            </TabsTrigger>
            <TabsTrigger
              value="credit"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Credit
            </TabsTrigger>
            <TabsTrigger
              value="taxes"
              className="px-3 py-1.5 bg-white border rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Taxes
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-6">
          {searchQuery && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredFaqItems.length} results found for "{searchQuery}"
              </p>
            </div>
          )}

          {filteredFaqItems.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or browse by category</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("")
                  setActiveTab("all")
                }}
              >
                Clear search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.general
              .filter((item) =>
                searchQuery
                  ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  : true,
              )
              .map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </TabsContent>

        {/* Similar TabsContent blocks for other categories */}
        <TabsContent value="strategies" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.strategies
              .filter((item) =>
                searchQuery
                  ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  : true,
              )
              .map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Debt Reduction Strategy Comparison</CardTitle>
              <CardDescription>Compare different approaches to find the best fit for your situation</CardDescription>
            </CardHeader>
            <CardContent>
              <FaqComparison />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Additional tabs for other categories */}
        <TabsContent value="consolidation" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.consolidation
              .filter((item) =>
                searchQuery
                  ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  : true,
              )
              .map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="negotiation" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.negotiation
              .filter((item) =>
                searchQuery
                  ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  : true,
              )
              .map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          <div className="bg-amber-50 p-4 rounded-lg mt-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-700">Debt Settlement Warning</h3>
                <p className="text-sm text-amber-600 mt-1">
                  Debt settlement can severely damage your credit score and may result in tax liability for forgiven
                  debt. Many debt settlement companies charge high fees and make promises they can't keep. Consider all
                  alternatives before pursuing debt settlement.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bankruptcy" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.bankruptcy
              .filter((item) =>
                searchQuery
                  ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  : true,
              )
              .map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          <div className="bg-amber-50 p-4 rounded-lg mt-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-700">Bankruptcy Considerations</h3>
                <p className="text-sm text-amber-600 mt-1">
                  Bankruptcy should generally be considered a last resort after exploring other debt relief options. The
                  process can be complex, and the long-term impacts on your credit and financial options are
                  significant. We strongly recommend consulting with a bankruptcy attorney before making any decisions.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="credit" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.credit
              .filter((item) =>
                searchQuery
                  ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  : true,
              )
              .map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Credit Impact Comparison</CardTitle>
              <CardDescription>See how different debt strategies affect your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <FaqCreditImpact />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.taxes
              .filter((item) =>
                searchQuery
                  ? item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
                  : true,
              )
              .map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p className="whitespace-pre-line">{item.answer}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-700">Tax Disclaimer</h3>
                <p className="text-sm text-blue-600 mt-1">
                  Tax laws change frequently and vary by location. The information provided here is general in nature
                  and may not apply to your specific situation. Always consult with a qualified tax professional for
                  advice tailored to your circumstances.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Debt Repayment Calculator</h2>
          <p className="text-muted-foreground mt-2">
            Compare different debt repayment strategies to find the best approach for your situation
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <FaqCalculator />
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-bold">Additional Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Briefcase className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium">Credit Counseling</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Find accredited non-profit credit counseling agencies that can provide personalized advice.
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 mt-2"
                    onClick={() => window.open("https://www.nfcc.org/", "_blank")}
                  >
                    National Foundation for Credit Counseling <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Scale className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium">Consumer Protection</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn about your rights and file complaints about debt collectors or financial companies.
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 mt-2"
                    onClick={() => window.open("https://www.consumerfinance.gov/", "_blank")}
                  >
                    Consumer Financial Protection Bureau <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <CreditCard className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium">Free Credit Reports</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get your free credit reports from all three major credit bureaus.
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 mt-2"
                    onClick={() => window.open("https://www.annualcreditreport.com/", "_blank")}
                  >
                    AnnualCreditReport.com <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/dashboard">
          <Button variant="outline">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
