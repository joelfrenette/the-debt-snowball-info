import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | Debt Snowball",
  description: "Terms and conditions for using the Debt Snowball debt repayment platform",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Terms & Conditions</h1>
          <p className="mt-2 text-muted-foreground">Last updated: April 4, 2025</p>
        </div>

        <div className="space-y-4">
          <p>
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Debt
            Snowball website and application (the "Service") operated by Debt Snowball ("us", "we", or "our").
          </p>
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
            These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the terms, then you may not access the Service.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">1. Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at
            all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
            your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities
            or actions under your password, whether your password is with our Service or a third-party service.
          </p>
          <p>
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming
            aware of any breach of security or unauthorized use of your account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">2. Financial Information</h2>
          <p>
            Our Service allows you to enter and track financial information, including but not limited to debt balances,
            interest rates, and payment information. You acknowledge that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The financial information you provide is accurate to the best of your knowledge.</li>
            <li>
              The Service provides recommendations based on the information you provide, but these recommendations do
              not constitute financial advice.
            </li>
            <li>
              You are solely responsible for your financial decisions and actions taken based on information provided by
              the Service.
            </li>
            <li>
              We do not guarantee specific financial outcomes or savings as results may vary based on individual
              circumstances and actions.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">3. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of Debt Snowball and its licensors. The Service is protected by copyright, trademark, and other laws of both
            the United States and foreign countries. Our trademarks and trade dress may not be used in connection with
            any product or service without the prior written consent of Debt Snowball.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">4. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Debt
            Snowball.
          </p>
          <p>
            Debt Snowball has no control over, and assumes no responsibility for, the content, privacy policies, or
            practices of any third-party web sites or services. You further acknowledge and agree that Debt Snowball
            shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be
            caused by or in connection with the use of or reliance on any such content, goods, or services available on
            or through any such web sites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or
            services that you visit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">5. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
            account, you may simply discontinue using the Service or contact us to request account deletion.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">6. Limitation of Liability</h2>
          <p>
            In no event shall Debt Snowball, nor its directors, employees, partners, agents, suppliers, or affiliates,
            be liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>
              Unauthorized access, use, or alteration of your transmissions or content, whether based on warranty,
              contract, tort (including negligence), or any other legal theory, whether or not we have been informed of
              the possibility of such damage.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">7. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
            basis. The Service is provided without warranties of any kind, whether express or implied, including, but
            not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement,
            or course of performance.
          </p>
          <p>Debt Snowball, its subsidiaries, affiliates, and its licensors do not warrant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The Service will function uninterrupted, secure, or available at any particular time or location;</li>
            <li>Any errors or defects will be corrected;</li>
            <li>The Service is free of viruses or other harmful components; or</li>
            <li>The results of using the Service will meet your requirements.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">8. Financial Advice Disclaimer</h2>
          <p>
            The content provided through our Service is for informational purposes only and is not intended to be
            financial or investment advice. The Service provides tools and recommendations based on mathematical
            calculations and the debt snowball methodology, but these do not constitute personalized financial advice.
          </p>
          <p>
            Before making any financial decisions, we recommend consulting with a qualified financial advisor who can
            provide advice tailored to your specific situation. Debt Snowball is not a financial institution, credit
            counseling service, or financial advisory firm.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard
            to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us
            regarding our Service, and supersede and replace any prior agreements we might have between us regarding the
            Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">10. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="font-medium">support@snowballapp.com</p>
        </section>

        <div className="border-t pt-8">
          <Link href="/" className="text-green-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
