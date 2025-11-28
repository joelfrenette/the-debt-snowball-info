"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

interface SkillsAssessmentProps {
  onComplete: (skills: string[]) => void
}

export function SkillsAssessment({ onComplete }: SkillsAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  // Define the assessment steps
  const steps = [
    {
      title: "Professional Skills",
      description: "Select the professional skills you have experience with:",
      skills: [
        { id: "writing", label: "Writing & Content Creation" },
        { id: "editing", label: "Editing & Proofreading" },
        { id: "research", label: "Research & Analysis" },
        { id: "customer service", label: "Customer Service" },
        { id: "sales", label: "Sales & Negotiation" },
        { id: "marketing", label: "Marketing & Promotion" },
        { id: "project management", label: "Project Management" },
        { id: "accounting", label: "Accounting & Bookkeeping" },
        { id: "teaching", label: "Teaching & Instruction" },
        { id: "translation", label: "Translation & Language" },
      ],
    },
    {
      title: "Technical Skills",
      description: "Select the technical skills you have experience with:",
      skills: [
        { id: "coding", label: "Programming & Coding" },
        { id: "web design", label: "Web Design" },
        { id: "graphic design", label: "Graphic Design" },
        { id: "video editing", label: "Video Editing" },
        { id: "data analysis", label: "Data Analysis" },
        { id: "social media", label: "Social Media Management" },
        { id: "seo", label: "SEO & Digital Marketing" },
        { id: "photography", label: "Photography" },
        { id: "audio production", label: "Audio Production" },
        { id: "software knowledge", label: "Software Proficiency" },
      ],
    },
    {
      title: "Personal Attributes",
      description: "Select the personal attributes that describe you:",
      skills: [
        { id: "organization", label: "Highly Organized" },
        { id: "communication", label: "Strong Communicator" },
        { id: "attention to detail", label: "Detail-Oriented" },
        { id: "creativity", label: "Creative Thinker" },
        { id: "problem solving", label: "Problem Solver" },
        { id: "time management", label: "Good Time Management" },
        { id: "reliability", label: "Reliable & Dependable" },
        { id: "adaptability", label: "Adaptable to Change" },
        { id: "self-motivation", label: "Self-Motivated" },
        { id: "teamwork", label: "Team Player" },
      ],
    },
    {
      title: "Resources & Availability",
      description: "Select the resources you have available:",
      skills: [
        { id: "computer", label: "Computer with Internet" },
        { id: "smartphone", label: "Smartphone" },
        { id: "car", label: "Car or Vehicle" },
        { id: "quiet space", label: "Quiet Workspace" },
        { id: "evenings", label: "Evening Availability" },
        { id: "weekends", label: "Weekend Availability" },
        { id: "daytime", label: "Daytime Availability" },
        { id: "flexible schedule", label: "Flexible Schedule" },
        { id: "10+ hours weekly", label: "10+ Hours Weekly" },
        { id: "20+ hours weekly", label: "20+ Hours Weekly" },
      ],
    },
  ]

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(selectedSkills)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">{currentStepData.title}</h2>
        <p className="text-muted-foreground mt-1">{currentStepData.description}</p>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-muted-foreground">{selectedSkills.length} skills selected</span>
      </div>
      <Progress value={progress} className="h-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentStepData.skills.map((skill) => (
          <Card
            key={skill.id}
            className={`cursor-pointer transition-colors ${
              selectedSkills.includes(skill.id) ? "border-green-500 bg-green-50" : ""
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-2" onClick={() => handleToggleSkill(skill.id)}>
                <Checkbox
                  id={skill.id}
                  checked={selectedSkills.includes(skill.id)}
                  onCheckedChange={() => handleToggleSkill(skill.id)}
                />
                <Label htmlFor={skill.id} className="cursor-pointer flex-1">
                  {skill.label}
                </Label>
                {selectedSkills.includes(skill.id) && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
          {currentStep < steps.length - 1 ? (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Complete Assessment <CheckCircle2 className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
