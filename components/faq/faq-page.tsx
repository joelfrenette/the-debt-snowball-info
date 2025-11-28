"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "What is the debt snowball method?",
    answer:
      'The debt snowball method is a debt reduction strategy where you pay off debts in order of smallest to largest balance, regardless of interest rate. As each debt is paid off, you roll that payment into the next smallest debt, creating a "snowball effect" of larger payments.',
  },
  {
    question: "How does balance transfer work?",
    answer:
      "A balance transfer moves high-interest debt from one credit card to another card with a lower interest rate, often 0% for an introductory period. This can help you save money on interest and pay off debt faster. Be aware of balance transfer fees, typically 3-5% of the transferred amount.",
  },
  {
    question: "Will using this tool affect my credit score?",
    answer:
      "Simply using our tool to track debts and plan repayment does not affect your credit score. However, actions you take based on the recommendations (like applying for balance transfer cards or paying off debts) may impact your score positively or negatively in the short term.",
  },
  {
    question: "How accurate are the savings estimates?",
    answer:
      "Our savings estimates are based on the information you provide about your debts and credit offers. They assume you make consistent payments and follow the recommended plan. Actual savings may vary based on changes to interest rates, payment amounts, or the repayment timeline.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, all your financial data is stored locally in your browser and is never sent to our servers. This means your sensitive information stays private and secure on your device. You can clear your data at any time by clearing your browser data.",
  },
  {
    question: "What if I have more questions?",
    answer:
      "If you have additional questions or need personalized advice, we recommend consulting with a certified financial advisor who can provide guidance specific to your situation.",
  },
]

export function FAQPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about debt repayment and our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
