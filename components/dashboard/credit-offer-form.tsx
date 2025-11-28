"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  apr: z.coerce.number().min(0).max(100),
  intro_apr: z.coerce.number().min(0).max(100).optional().nullable(),
  intro_period_months: z.coerce.number().min(0).max(60).optional().nullable(),
  transfer_fee_percent: z.coerce.number().min(0).max(10).optional().nullable(),
  credit_limit: z.coerce.number().min(0),
  rewards_program: z.string().optional().nullable(),
  rewards_rate: z.coerce.number().min(0).max(10).optional().nullable(),
  rewards_category: z.string().optional().nullable(),
  annual_fee: z.coerce.number().min(0).optional().nullable(),
})

interface CreditOfferFormProps {
  defaultValues?: z.infer<typeof formSchema>
  onSubmit: (values: z.infer<typeof formSchema>) => void
  onCancel: () => void
}

export function CreditOfferForm({ defaultValues, onSubmit, onCancel }: CreditOfferFormProps) {
  const [activeTab, setActiveTab] = useState("details")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      apr: 0,
      intro_apr: null,
      intro_period_months: null,
      transfer_fee_percent: null,
      credit_limit: 0,
      rewards_program: null,
      rewards_rate: null,
      rewards_category: null,
      annual_fee: null,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Card Details</TabsTrigger>
            <TabsTrigger value="rewards">Rewards & Benefits</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chase Sapphire Preferred" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="apr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>APR (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="credit_limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Limit ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="intro_apr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intro APR (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        value={field.value === null ? "" : field.value}
                        onChange={(e) =>
                          field.onChange(e.target.value === "" ? null : Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>Leave blank if not applicable</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="intro_period_months"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intro Period (months)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="12"
                        {...field}
                        value={field.value === null ? "" : field.value}
                        onChange={(e) => field.onChange(e.target.value === "" ? null : Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="transfer_fee_percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance Transfer Fee (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="3.00"
                      {...field}
                      value={field.value === null ? "" : field.value}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number.parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Leave blank if not applicable</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="rewards_program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rewards Program</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rewards type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash Back">Cash Back</SelectItem>
                        <SelectItem value="Travel Points">Travel Points</SelectItem>
                        <SelectItem value="Airline Miles">Airline Miles</SelectItem>
                        <SelectItem value="Hotel Points">Hotel Points</SelectItem>
                        <SelectItem value="Flexible Points">Flexible Points</SelectItem>
                        <SelectItem value="Store Rewards">Store Rewards</SelectItem>
                        <SelectItem value="None">No Rewards</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Type of rewards this card offers</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rewards_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Rewards Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="1.5"
                      {...field}
                      value={field.value === null ? "" : field.value}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number.parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Base percentage earned on regular purchases</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rewards_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Rewards Categories</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dining, Travel, Gas"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>Categories where this card earns the most rewards</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="annual_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Fee ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      value={field.value === null ? "" : field.value}
                      onChange={(e) => field.onChange(e.target.value === "" ? null : Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Card</Button>
        </div>
      </form>
    </Form>
  )
}
