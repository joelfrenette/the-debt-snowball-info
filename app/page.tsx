import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { ChromeIcon as Google } from "lucide-react"
import { redirect } from "next/navigation"

// This is a server component that will handle the code parameter
export default function Home({ searchParams }: { searchParams: { code?: string } }) {
  // If there's a code parameter, redirect to the callback route
  if (searchParams.code) {
    console.log("Code detected in root URL, redirecting to callback handler")
    redirect(`/auth/callback?code=${searchParams.code}`)
  }

  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <Testimonials />
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to start saving?</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create your personalized debt repayment plan today and start saving money on interest.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Google className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
