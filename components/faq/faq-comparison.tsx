"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export function FaqComparison() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Strategy</TableHead>
            <TableHead>How It Works</TableHead>
            <TableHead>Best For</TableHead>
            <TableHead>Credit Impact</TableHead>
            <TableHead>Time to Results</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Debt Snowball</TableCell>
            <TableCell>Pay minimum on all debts, extra on smallest balance first</TableCell>
            <TableCell>Those who need motivation and quick wins</TableCell>
            <TableCell className="text-green-600">
              <div className="flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Positive
              </div>
            </TableCell>
            <TableCell>Medium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Debt Avalanche</TableCell>
            <TableCell>Pay minimum on all debts, extra on highest interest rate first</TableCell>
            <TableCell>Those who want to minimize interest costs</TableCell>
            <TableCell className="text-green-600">
              <div className="flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Positive
              </div>
            </TableCell>
            <TableCell>Medium</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Debt Consolidation</TableCell>
            <TableCell>Combine multiple debts into a single loan with better terms</TableCell>
            <TableCell>Those with good credit and multiple high-interest debts</TableCell>
            <TableCell className="text-amber-600">
              <div className="flex items-center">
                <AlertCircle className="mr-1 h-4 w-4" />
                Short-term dip, long-term positive
              </div>
            </TableCell>
            <TableCell>Quick</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Debt Management Plan</TableCell>
            <TableCell>Work with credit counselor to create payment plan with reduced rates</TableCell>
            <TableCell>Those struggling with minimum payments who need structure</TableCell>
            <TableCell className="text-amber-600">
              <div className="flex items-center">
                <AlertCircle className="mr-1 h-4 w-4" />
                Minor negative
              </div>
            </TableCell>
            <TableCell>3-5 years</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Debt Settlement</TableCell>
            <TableCell>Negotiate to pay less than full balance in lump sum</TableCell>
            <TableCell>Those in severe financial hardship who can't pay full amount</TableCell>
            <TableCell className="text-red-600">
              <div className="flex items-center">
                <XCircle className="mr-1 h-4 w-4" />
                Severe negative
              </div>
            </TableCell>
            <TableCell>1-3 years</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Bankruptcy</TableCell>
            <TableCell>Legal process to discharge or restructure debts</TableCell>
            <TableCell>Those with overwhelming debt and no other options</TableCell>
            <TableCell className="text-red-600">
              <div className="flex items-center">
                <XCircle className="mr-1 h-4 w-4" />
                Severe negative
              </div>
            </TableCell>
            <TableCell>3-6 months (Ch. 7) or 3-5 years (Ch. 13)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
