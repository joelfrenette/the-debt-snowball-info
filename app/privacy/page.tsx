import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Debt Snowball",
  description: "Privacy policy for the Debt Snowball debt repayment platform",
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: April 4, 2025</p>
        </div>

        <div className="space-y-4">
          <p>
            Debt Snowball ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you use our website and application
            (collectively, the "Service").
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have
            read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with
            our policies and practices, do not use our Service.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">1. Information We Collect</h2>
          <p>We collect several types of information from and about users of our Service, including:</p>
          <h3 className="text-xl font-semibold mt-4">1.1 Personal Information</h3>
          <p>When you create an account, we collect personal information that can be used to identify you, such as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Google account information (when using Google Sign-In)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">1.2 Financial Information</h3>
          <p>
            To provide our debt repayment optimization services, we collect financial information that you voluntarily
            provide, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Debt balances</li>
            <li>Interest rates</li>
            <li>Minimum payment amounts</li>
            <li>Payment due dates</li>
            <li>Credit card last four digits (for identification purposes only)</li>
            <li>Credit offers and their terms</li>
          </ul>
          <p>
            <strong>Note:</strong> We do not collect or store full credit card numbers, bank account numbers, or other
            sensitive financial account information.
          </p>

          <h3 className="text-xl font-semibold mt-4">1.3 Usage Information</h3>
          <p>We automatically collect certain information about how you interact with our Service, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Operating system</li>
            <li>Pages visited and features used</li>
            <li>Time and date of your visit</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">2. How We Use Your Information</h2>
          <p>We use the information we collect about you for various purposes, including to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our Service</li>
            <li>Create and manage your account</li>
            <li>Generate personalized debt repayment plans and recommendations</li>
            <li>Process and complete transactions</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
            <li>Detect, prevent, and address technical issues, fraud, and other illegal activities</li>
            <li>Protect the rights, property, and safety of our users and the public</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">3. How We Share Your Information</h2>
          <p>We may share your information in the following circumstances:</p>
          <h3 className="text-xl font-semibold mt-4">3.1 Service Providers</h3>
          <p>
            We may share your information with third-party vendors, service providers, contractors, or agents who
            perform services for us or on our behalf, such as data storage, database management, web analytics, and
            payment processing.
          </p>

          <h3 className="text-xl font-semibold mt-4">3.2 Compliance with Laws</h3>
          <p>
            We may disclose your information where required to do so by law or subpoena or if we believe that such
            action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the
            security or integrity of our Service.
          </p>

          <h3 className="text-xl font-semibold mt-4">3.3 Business Transfers</h3>
          <p>
            If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may
            be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our
            Service of any change in ownership or uses of your information.
          </p>

          <h3 className="text-xl font-semibold mt-4">3.4 With Your Consent</h3>
          <p>We may share your information with your consent or at your direction.</p>

          <h3 className="text-xl font-semibold mt-4">3.5 Aggregated or De-identified Data</h3>
          <p>
            We may share aggregated or de-identified information, which cannot reasonably be used to identify you, for
            various purposes including improving our services and understanding user trends.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">4. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the
            security of any personal information we process. However, despite our safeguards and efforts to secure your
            information, no electronic transmission over the Internet or information storage technology can be
            guaranteed to be 100% secure.
          </p>
          <p>
            We use industry-standard encryption to protect your data in transit and at rest. Your financial information
            is stored in secure databases with restricted access. We regularly review our information collection,
            storage, and processing practices to guard against unauthorized access.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">5. Your Data Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Access:</strong> You can request copies of your personal information that we hold.
            </li>
            <li>
              <strong>Correction:</strong> You can ask us to correct inaccurate personal information.
            </li>
            <li>
              <strong>Deletion:</strong> You can ask us to delete your personal information in certain circumstances.
            </li>
            <li>
              <strong>Restriction:</strong> You can ask us to restrict the processing of your personal information.
            </li>
            <li>
              <strong>Data Portability:</strong> You can ask us to transfer your personal information to another
              organization or to you.
            </li>
            <li>
              <strong>Objection:</strong> You can object to our processing of your personal information.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided in the "Contact Us"
            section below. We may need to verify your identity before responding to your request.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Service and hold certain
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To maintain your authenticated session and secure access to your account</li>
            <li>To remember your preferences and settings</li>
            <li>To analyze how you use our Service to improve functionality and user experience</li>
            <li>To understand the effectiveness of our features and content</li>
          </ul>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">7. Third-Party Services</h2>
          <p>
            Our Service may contain links to other websites, applications, or services that are not operated by us. If
            you click on a third-party link, you will be directed to that third party's site. We strongly advise you to
            review the Privacy Policy of every site you visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the content, privacy policies, or practices of any
            third-party sites or services.
          </p>
          <p>
            Our Service uses Google Sign-In for authentication. When you use Google Sign-In, Google's Privacy Policy
            applies to the information collected by Google during the authentication process.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">8. Children's Privacy</h2>
          <p>
            Our Service is not intended for use by children under the age of 18. We do not knowingly collect personally
            identifiable information from children under 18. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact us. If we become aware that we have
            collected personal information from children without verification of parental consent, we take steps to
            remove that information from our servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">10. Data Retention</h2>
          <p>
            We will retain your personal information only for as long as is necessary for the purposes set out in this
            Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal
            obligations, resolve disputes, and enforce our policies.
          </p>
          <p>
            If you request deletion of your account, we will delete your personal information from our active databases.
            However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with
            investigations, enforce our Terms of Use, or comply with legal requirements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="font-medium">privacy@snowballapp.com</p>
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
