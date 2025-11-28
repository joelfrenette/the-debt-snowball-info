"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink, Clock, DollarSign, Star, CheckCircle2, ArrowRight } from "lucide-react"

interface FeaturedOpportunitiesProps {
  userSkills: string[]
  hasCompletedAssessment: boolean
}

export function FeaturedOpportunities({ userSkills, hasCompletedAssessment }: FeaturedOpportunitiesProps) {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>("featured")

  // Featured opportunities from webjobs39.com and the spreadsheet
  const featuredOpportunities = [
    {
      id: "transcription-rev",
      title: "Transcriptionist at Rev",
      description: "Convert audio recordings into written text with high accuracy",
      earnings: "$15-25/hour",
      timeCommitment: "Flexible",
      category: "Transcription",
      requirements: ["Good listening skills", "Fast typing", "Attention to detail"],
      skills: ["typing", "listening", "attention to detail"],
      source: "webjobs39.com",
      applicationLink: "https://www.rev.com/freelancers",
      featured: true,
      difficulty: "easy",
      timeToEarn: "Payment per audio minute, typically $0.30-$1.10 per audio minute",
      paymentMethod: "PayPal, weekly payments",
      getStarted: [
        "Create an account on Rev.com",
        "Complete a grammar quiz and sample transcription",
        "Start accepting transcription jobs after approval",
        "Work on your own schedule, as much or as little as you want",
      ],
    },
    {
      id: "usertesting",
      title: "Website Tester at UserTesting",
      description: "Test websites and apps and provide feedback on user experience",
      earnings: "$10 per 15-20 minute test",
      timeCommitment: "Very Flexible",
      category: "User Testing",
      requirements: ["Computer with internet", "Microphone", "Ability to speak thoughts clearly"],
      skills: ["communication", "attention to detail", "tech savvy"],
      source: "Google Spreadsheet",
      applicationLink: "https://www.usertesting.com/get-paid-to-test",
      featured: true,
      difficulty: "easy",
      timeToEarn: "15-20 minutes per test, payment within 7 days",
      paymentMethod: "PayPal, weekly payments",
      getStarted: [
        "Sign up on UserTesting.com",
        "Complete a sample test to demonstrate your ability to think aloud",
        "Once approved, you'll receive test invitations based on your demographics",
        "Complete tests on your schedule, no minimum requirements",
      ],
    },
    {
      id: "teaching-vipkid",
      title: "Online English Teacher at VIPKid",
      description: "Teach English online to children in China",
      earnings: "$14-22/hour",
      timeCommitment: "Part-time, flexible scheduling",
      category: "Teaching",
      requirements: ["Bachelor's degree", "Teaching experience preferred", "ESL certification (preferred)"],
      skills: ["teaching", "communication", "patience"],
      source: "webjobs39.com",
      applicationLink: "https://www.vipkid.com/teach",
      featured: true,
      difficulty: "medium",
      timeToEarn: "Classes are 25 minutes, with 5-minute breaks between",
      paymentMethod: "Direct deposit, monthly payments",
      getStarted: [
        "Apply on VIPKid website with your resume",
        "Complete a demo lesson and interview",
        "Receive training and certification",
        "Set your own schedule and teach classes from home",
      ],
    },
    {
      id: "virtual-assistant",
      title: "Virtual Assistant on Upwork",
      description: "Provide administrative support to businesses remotely",
      earnings: "$15-30/hour",
      timeCommitment: "Part-time or Full-time",
      category: "Administrative",
      requirements: ["Organization skills", "Communication skills", "Basic computer proficiency"],
      skills: ["organization", "communication", "time management"],
      source: "Google Spreadsheet",
      applicationLink: "https://www.upwork.com/",
      featured: true,
      difficulty: "medium",
      timeToEarn: "Hourly or project-based, payment terms vary by client",
      paymentMethod: "Upwork payment system, various withdrawal options",
      getStarted: [
        "Create a profile on Upwork highlighting your administrative skills",
        "Start with smaller jobs to build your reputation",
        "Gradually increase your rates as you gain positive reviews",
        "Specialize in a niche to command higher rates",
      ],
    },
    {
      id: "content-writing",
      title: "Content Writer on Textbroker",
      description: "Write articles, blog posts, and web content for various clients",
      earnings: "$10-25/hour depending on skill level",
      timeCommitment: "Flexible",
      category: "Writing",
      requirements: ["Strong writing skills", "Research abilities", "Native English proficiency"],
      skills: ["writing", "research", "creativity"],
      source: "webjobs39.com",
      applicationLink: "https://www.textbroker.com/authors",
      featured: true,
      difficulty: "medium",
      timeToEarn: "Payment per word, typically $0.01-$0.05 per word",
      paymentMethod: "PayPal, payments available when balance reaches $10",
      getStarted: [
        "Sign up as an author on Textbroker",
        "Submit a writing sample for rating",
        "Begin accepting writing assignments at your rating level",
        "Improve your rating through quality work to access higher-paying assignments",
      ],
    },
    {
      id: "data-entry-clickworker",
      title: "Data Entry at Clickworker",
      description: "Complete small data entry and categorization tasks",
      earnings: "$8-12/hour",
      timeCommitment: "Very Flexible",
      category: "Data Entry",
      requirements: ["Basic computer skills", "Attention to detail", "Internet connection"],
      skills: ["typing", "attention to detail", "organization"],
      source: "Google Spreadsheet",
      applicationLink: "https://www.clickworker.com/",
      featured: true,
      difficulty: "easy",
      timeToEarn: "Payment per task, tasks typically take 1-15 minutes each",
      paymentMethod: "PayPal or SEPA transfer, monthly payments",
      getStarted: [
        "Register on Clickworker.com",
        "Complete qualification assessments to access more tasks",
        "Work on available tasks at your convenience",
        "No minimum time commitment required",
      ],
    },
  ]

  const handleViewDetails = (opportunity: any) => {
    setSelectedOpportunity(opportunity)
    setDetailsDialogOpen(true)
  }

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-green-500">Easy to Start</Badge>
      case "medium":
        return <Badge className="bg-blue-500">Moderate</Badge>
      case "hard":
        return <Badge className="bg-purple-500">Advanced</Badge>
      default:
        return null
    }
  }

  const getSkillMatchBadge = (skills: string[]) => {
    if (!hasCompletedAssessment || userSkills.length === 0) return null

    const matchCount = skills.filter((skill) => userSkills.includes(skill)).length
    const matchPercentage = (matchCount / skills.length) * 100

    if (matchPercentage >= 75) {
      return <Badge className="bg-green-500">Strong Match</Badge>
    } else if (matchPercentage >= 40) {
      return <Badge className="bg-blue-500">Good Match</Badge>
    } else if (matchPercentage > 0) {
      return <Badge className="bg-yellow-500">Partial Match</Badge>
    }

    return null
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className={`overflow-hidden ${opportunity.featured ? "border-green-200" : ""}`}>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{opportunity.title}</h3>
                  {opportunity.featured && <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{opportunity.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {getDifficultyBadge(opportunity.difficulty)}
                  {getSkillMatchBadge(opportunity.skills)}
                  <Badge variant="outline">{opportunity.category}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm">{opportunity.earnings}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm">{opportunity.timeCommitment}</span>
                  </div>
                </div>
              </div>

              <CardFooter className="bg-slate-50 p-3 border-t">
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(opportunity)}>
                  View Details
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={() => setActiveTab("opportunities")} className="w-full bg-green-600 hover:bg-green-700">
        View All Opportunities <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedOpportunity?.title}
              {selectedOpportunity?.featured && <Star className="h-4 w-4 text-yellow-500 ml-2" />}
            </DialogTitle>
            <DialogDescription>{selectedOpportunity?.description}</DialogDescription>
          </DialogHeader>

          {selectedOpportunity && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Potential Earnings</p>
                  <p className="font-medium flex items-center">
                    <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                    {selectedOpportunity.earnings}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Time Commitment</p>
                  <p className="font-medium flex items-center">
                    <Clock className="h-4 w-4 text-blue-500 mr-1" />
                    {selectedOpportunity.timeCommitment}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Time to Earn</p>
                  <p className="font-medium flex items-center">
                    <Clock className="h-4 w-4 text-purple-500 mr-1" />
                    {selectedOpportunity.timeToEarn}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium flex items-center">
                    <DollarSign className="h-4 w-4 text-orange-500 mr-1" />
                    {selectedOpportunity.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.requirements.map((req: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.skills.map((skill: string) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className={userSkills.includes(skill) ? "border-green-500 text-green-700 bg-green-50" : ""}
                    >
                      {userSkills.includes(skill) && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700">How to Get Started</h4>
                <ol className="mt-2 space-y-2 text-sm text-blue-600">
                  {selectedOpportunity.getStarted.map((step: string, index: number) => (
                    <li key={index}>
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>

              {hasCompletedAssessment && getSkillMatchBadge(selectedOpportunity.skills) && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-700">Skill Match</h4>
                  <p className="mt-1 text-sm text-green-600">
                    Based on your skills assessment, this opportunity is a good match for your skillset. You already
                    have {selectedOpportunity.skills.filter((skill: string) => userSkills.includes(skill)).length}
                    out of {selectedOpportunity.skills.length} required skills.
                  </p>
                </div>
              )}

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium text-amber-700">Debt Impact</h4>
                <p className="mt-1 text-sm text-amber-600">
                  Working{" "}
                  {selectedOpportunity.category === "User Testing" ? "just 5 hours per week" : "10 hours per week"} at
                  this opportunity could generate approximately $
                  {selectedOpportunity.category === "User Testing"
                    ? "150-200"
                    : selectedOpportunity.earnings.includes("-")
                      ? (Number.parseInt(selectedOpportunity.earnings.split("-")[1]) * 10).toString()
                      : (Number.parseInt(selectedOpportunity.earnings.replace(/\D/g, "")) * 10).toString()}{" "}
                  per month in extra income. Applied directly to your debt, this could help you become debt-free
                  {selectedOpportunity.category === "User Testing" ? " 8-12 months" : " 1-2 years"} sooner!
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                window.open(selectedOpportunity?.applicationLink, "_blank")
              }}
            >
              Apply Now <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
