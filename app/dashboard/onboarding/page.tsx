import { OnboardingProvider } from "@/components/onboarding/onboarding-provider"
import { OnboardingContainer } from "@/components/onboarding/onboarding-container"

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContainer />
    </OnboardingProvider>
  )
}
