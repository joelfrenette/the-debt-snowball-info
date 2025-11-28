"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OpportunitiesList } from "./opportunities-list"
import { SkillsAssessment } from "./skills-assessment"
import { EarningsCalculator } from "./earnings-calculator"
import { DollarSign, Star, ArrowRight } from "lucide-react"

export function EarnCashDashboard() {
  const [activeTab, setActiveTab] = useState("opportunities")
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
          <DollarSign className="mr-2 h-5 w-5 text-green-600" />
          Earn Extra Cash
        </CardTitle>
        <CardDescription>
          Find legitimate side hustles and work-from-home opportunities to boost your income
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="opportunities" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
            <TabsTrigger value="calculator">Earnings Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-4 mt-4">
            {!hasCompletedAssessment ? (
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-700">Personalize Your Opportunities</h3>
                    <p className="text-sm text-amber-600 mt-1">
                      Take our quick skills assessment to get personalized side hustle recommendations based on your
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
          All opportunities are vetted for legitimacy. We never promote MLMs, pyramid schemes, or scams.
        </p>
      </CardFooter>
    </Card>
  )
}
