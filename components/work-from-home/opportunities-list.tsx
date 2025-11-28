"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink, Search, Star, Clock, DollarSign, CheckCircle2 } from "lucide-react"

interface OpportunitiesListProps {
  userSkills: string[]
  hasCompletedAssessment: boolean
}

export function OpportunitiesList({ userSkills, hasCompletedAssessment }: OpportunitiesListProps) {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null)

  // Mock opportunities data from webjobs39.com and the spreadsheet
  const opportunities = [
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
    {
      id: "proofreading-proofreadanywhere",
      title: "Proofreader at Proofread Anywhere",
      description: "Proofread and edit documents for grammar, spelling, and punctuation errors",
      earnings: "$15-30/hour",
      timeCommitment: "Flexible",
      category: "Editing",
      requirements: ["Excellent grammar skills", "Attention to detail", "English proficiency"],
      skills: ["editing", "attention to detail", "language skills"],
      source: "webjobs39.com",
      applicationLink: "https://proofreadanywhere.com/",
      featured: false,
      difficulty: "medium",
      timeToEarn: "Hourly or per-page rates, depending on client",
      paymentMethod: "Varies by client, typically PayPal or direct deposit",
      getStarted: [
        "Take the free workshop at Proofread Anywhere",
        "Consider enrolling in their training course",
        "Build a portfolio of work samples",
        "Find clients through job boards or freelance platforms",
      ],
    },
    {
      id: "customer-service-alorica",
      title: "Remote Customer Service at Alorica",
      description: "Provide customer support via phone, email, or chat from home",
      earnings: "$12-18/hour",
      timeCommitment: "Part-time or Full-time",
      category: "Customer Service",
      requirements: ["Customer service experience", "Computer with high-speed internet", "Quiet workspace"],
      skills: ["communication", "problem solving", "patience"],
      source: "Google Spreadsheet",
      applicationLink: "https://www.alorica.com/careers/work-at-home/",
      featured: false,
      difficulty: "easy",
      timeToEarn: "Hourly pay, typically bi-weekly payments",
      paymentMethod: "Direct deposit",
      getStarted: [
        "Apply on Alorica's website",
        "Complete virtual interview process",
        "Undergo paid training (typically 2-4 weeks)",
        "Begin taking customer service calls from home",
      ],
    },
    {
      id: "social-media-manager",
      title: "Social Media Manager on Fiverr",
      description: "Manage social media accounts for businesses and individuals",
      earnings: "$20-50/hour",
      timeCommitment: "Flexible to Part-time",
      category: "Marketing",
      requirements: ["Social media knowledge", "Content creation skills", "Basic graphic design abilities"],
      skills: ["social media", "communication", "creativity"],
      source: "webjobs39.com",
      applicationLink: "https://www.fiverr.com/",
      featured: false,
      difficulty: "medium",
      timeToEarn: "Project-based, payment upon completion",
      paymentMethod: "Fiverr payment system, various withdrawal options",
      getStarted: [
        "Create a seller profile on Fiverr",
        "Set up gigs offering social media management services",
        "Start with competitive pricing to attract first clients",
        "Deliver quality work to earn positive reviews",
      ],
    },
    {
      id: "tutoring-chegg",
      title: "Online Tutor at Chegg",
      description: "Tutor students in your area of expertise",
      earnings: "$20-30/hour",
      timeCommitment: "Flexible",
      category: "Education",
      requirements: ["College degree or current enrollment", "Subject matter expertise", "Teaching ability"],
      skills: ["teaching", "subject expertise", "communication"],
      source: "Google Spreadsheet",
      applicationLink: "https://www.chegg.com/tutors/become-a-tutor/",
      featured: false,
      difficulty: "medium",
      timeToEarn: "Payment per minute of tutoring, weekly payments",
      paymentMethod: "PayPal or direct deposit",
      getStarted: [
        "Apply on Chegg Tutors website",
        "Complete subject tests in your areas of expertise",
        "Create your tutor profile",
        "Set your availability and begin accepting tutoring sessions",
      ],
    },
    {
      id: "translation-gengo",
      title: "Translator at Gengo",
      description: "Translate documents, websites, and content between languages",
      earnings: "$15-25/hour depending on language pair",
      timeCommitment: "Flexible",
      category: "Translation",
      requirements: ["Fluency in at least two languages", "Cultural knowledge", "Attention to detail"],
      skills: ["translation", "language skills", "cultural knowledge"],
      source: "webjobs39.com",
      applicationLink: "https://gengo.com/translators/",
      featured: false,
      difficulty: "medium",
      timeToEarn: "Payment per word, rates vary by language pair",
      paymentMethod: "PayPal, Payoneer, or direct deposit",
      getStarted: [
        "Apply on Gengo's website",
        "Take language proficiency tests",
        "Begin with smaller translation jobs",
        "Work at your own pace, accepting jobs that fit your schedule",
      ],
    },
    {
      id: "bookkeeping-accountant",
      title: "Virtual Bookkeeper",
      description: "Manage financial records and bookkeeping for small businesses",
      earnings: "$20-50/hour",
      timeCommitment: "Part-time or Full-time",
      category: "Finance",
      requirements: ["Bookkeeping experience", "Knowledge of accounting software", "Attention to detail"],
      skills: ["accounting", "organization", "math"],
      source: "Google Spreadsheet",
      applicationLink: "https://www.upwork.com/",
      featured: false,
      difficulty: "hard",
      timeToEarn: "Hourly or monthly retainer, payment terms vary by client",
      paymentMethod: "Varies by platform or client",
      getStarted: [
        "Get bookkeeping certification (recommended but not required)",
        "Create profiles on freelance platforms like Upwork",
        "Develop a niche (e.g., bookkeeping for restaurants)",
        "Start with competitive rates to build your client base",
      ],
    },
    {
      id: "web-testing-testlio",
      title: "Software Tester at Testlio",
      description: "Test apps and websites to identify bugs and usability issues",
      earnings: "$15-25/hour",
      timeCommitment: "Flexible, project-based",
      category: "Tech",
      requirements: ["Attention to detail", "Basic technical knowledge", "Multiple devices preferred"],
      skills: ["testing", "attention to detail", "tech savvy"],
      source: "webjobs39.com",
      applicationLink: "https://testlio.com/for-testers/",
      featured: false,
      difficulty: "medium",
      timeToEarn: "Project-based, payment bi-weekly",
      paymentMethod: "PayPal or direct deposit",
      getStarted: [
        "Apply on Testlio's website",
        "Complete sample testing assignments",
        "Join testing cycles based on your availability",
        "Report bugs and issues through their platform",
      ],
    },
  ]

  // Filter opportunities based on user selection and search query
  const filteredOpportunities = opportunities.filter((opp) => {
    // Apply category filter
    if (filter !== "all" && opp.category.toLowerCase() !== filter.toLowerCase()) return false

    // Apply search filter
    if (
      searchQuery &&
      !opp.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opp.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opp.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Sort opportunities - featured first, then by skill match if assessment completed
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    // Featured opportunities come first
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    // If user has completed assessment, sort by skill match
    if (hasCompletedAssessment && userSkills.length > 0) {
      const aMatches = a.skills.filter((skill) => userSkills.includes(skill)).length
      const bMatches = b.skills.filter((skill) => userSkills.includes(skill)).length

      if (aMatches > bMatches) return -1
      if (aMatches < bMatches) return 1
    }

    return 0
  })

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All
          </Button>
          <Button variant={filter === "writing" ? "default" : "outline"} size="sm" onClick={() => setFilter("writing")}>
            Writing
          </Button>
          <Button
            variant={filter === "transcription" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("transcription")}
          >
            Transcription
          </Button>
          <Button
            variant={filter === "teaching" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("teaching")}
          >
            Teaching
          </Button>
          <Button variant={filter === "tech" ? "default" : "outline"} size="sm" onClick={() => setFilter("tech")}>
            Tech
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedOpportunities.map((opportunity) => (
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

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No opportunities found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setFilter("all")
              setSearchQuery("")
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

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
