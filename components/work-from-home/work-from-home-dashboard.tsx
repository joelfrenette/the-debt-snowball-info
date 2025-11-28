"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OpportunitiesList } from "./opportunities-list"
import { SkillsAssessment } from "./skills-assessment"
import { EarningsCalculator } from "./earnings-calculator"
import { FeaturedOpportunities } from "./featured-opportunities"
import { Briefcase, Star, ArrowRight } from "lucide-react"

export function WorkFromHomeDashboard() {
  const [activeTab, setActiveTab] = useState("featured")
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false)
  const [userSkills, setUserSkills] = useState<string[]>([])

  const handleCompleteAssessment = (skills: string[]) => {
    setUserSkills(skills)
    setHasCompletedAssessment(true)
    setActiveTab("opportunities")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-green-600" />
          Work from Home & Side Hustles
        </CardTitle>
        <CardDescription>
          Find legitimate work-from-home opportunities and side hustles to boost your income for debt repayment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="opportunities">All Opportunities</TabsTrigger>
            <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
            <TabsTrigger value="calculator">Earnings Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-4 mt-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Star className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-700">Top Opportunities This Week</h3>
                  <p className="text-sm text-green-600 mt-1">
                    These high-quality opportunities have been vetted for legitimacy and earning potential to help you
                    pay down debt faster.
                  </p>
                  {!hasCompletedAssessment && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-green-700 border-green-300 hover:bg-green-100"
                      onClick={() => setActiveTab("skills")}
                    >
                      Take Skills Assessment for Personalized Recommendations <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <FeaturedOpportunities userSkills={userSkills} hasCompletedAssessment={hasCompletedAssessment} />
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4 mt-4">
            {!hasCompletedAssessment ? (
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-700">Personalize Your Opportunities</h3>
                    <p className="text-sm text-amber-600 mt-1">
                      Take our quick skills assessment to get personalized work-from-home recommendations based on your
                      skills and experience.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-amber-700 border-amber-300 hover:bg-amber-100"
                      onClick={() => setActiveTab("skills")}
                    >
                      Take Skills Assessment <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-green-700">Personalized Recommendations</h3>
                    <p className="text-sm text-green-600 mt-1">
                      Based on your skills assessment, we've highlighted opportunities that match your skills in{" "}
                      {userSkills.slice(0, 3).join(", ")}
                      {userSkills.length > 3 ? ", and more" : ""}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <OpportunitiesList userSkills={userSkills} hasCompletedAssessment={hasCompletedAssessment} />
          </TabsContent>

          <TabsContent value="skills" className="mt-4">
            <SkillsAssessment onComplete={handleCompleteAssessment} />
          </TabsContent>

          <TabsContent value="calculator" className="mt-4">
            <EarningsCalculator />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <p className="text-sm text-muted-foreground">
          All opportunities are vetted for legitimacy. We never promote MLMs, pyramid schemes, or scams. Opportunities
          sourced from webjobs39.com and other trusted resources.
        </p>
      </CardFooter>
    </Card>
  )
}
