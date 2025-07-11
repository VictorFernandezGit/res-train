import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">YourSaaS</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </Link>
          <Link
            href="#use-cases"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Use cases
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#enterprise"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Enterprise
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </Link>
          <Button className="rounded-full" size="sm">
            Sign up <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto">
              Everything You Need.
              <br />
              Before You Ask.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              YourSaaS is the multi-tenant platform that streamlines your workflow, enhances collaboration, and scales
              with your business needs — all in real time.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                Book a Demo
              </Button>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-4xl rounded-xl border bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                width={1200}
                height={600}
                alt="Dashboard preview"
                className="w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Powerful Features for Modern Teams
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your multi-tenant environment efficiently and securely.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-background rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your business needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-background rounded-xl p-8 shadow-sm border ${
                    plan.popular ? "ring-2 ring-primary relative" : ""
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/{plan.billing}</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">{plan.description}</p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`mt-8 w-full ${plan.popular ? "" : "variant-outline"}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Need a custom plan for your enterprise?{" "}
                <Link href="/contact" className="font-medium text-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-8 md:p-12 text-primary-foreground">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to transform your business?</h2>
                <p className="mt-4 text-lg text-primary-foreground/90">
                  Join thousands of companies using YourSaaS to scale their operations.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="rounded-full px-8">
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 rounded-full px-8"
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="font-bold text-xl mb-4">YourSaaS</div>
              <p className="text-muted-foreground">The multi-tenant platform for modern businesses.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} YourSaaS, Inc. All rights reserved.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Multi-tenant Architecture",
    description: "Securely manage multiple clients with isolated data and customizable experiences.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
        <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
        <path d="M3 9h18"></path>
      </svg>
    ),
  },
  {
    title: "Seamless Scalability",
    description: "Grow your business without worrying about infrastructure limitations.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.25"></path>
        <path d="M21 3v9h-9"></path>
      </svg>
    ),
  },
  {
    title: "Customizable Workflows",
    description: "Tailor processes to match your unique business requirements and client needs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
        <path d="M12 2v2"></path>
        <path d="M12 22v-2"></path>
        <path d="m17 20.66-1-1.73"></path>
        <path d="M11 10.27 7 3.34"></path>
        <path d="m20.66 17-1.73-1"></path>
        <path d="m3.34 7 1.73 1"></path>
        <path d="M14 12h8"></path>
        <path d="M2 12h2"></path>
        <path d="m20.66 7-1.73 1"></path>
        <path d="m3.34 17 1.73-1"></path>
        <path d="m17 3.34-1 1.73"></path>
        <path d="m7 20.66 1-1.73"></path>
      </svg>
    ),
  },
  {
    title: "Advanced Analytics",
    description: "Gain insights into usage patterns and performance metrics across all tenants.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M3 3v18h18"></path>
        <path d="m19 9-5 5-4-4-3 3"></path>
      </svg>
    ),
  },
  {
    title: "Robust Security",
    description: "Enterprise-grade security with role-based access control and data encryption.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    title: "Seamless Integration",
    description: "Connect with your existing tools and services through our extensive API.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    ),
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: 49,
    billing: "month",
    description: "Perfect for small teams just getting started.",
    features: [
      "Up to 5 team members",
      "3 tenant environments",
      "Basic analytics",
      "24-hour support response time",
      "1GB storage per tenant",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 99,
    billing: "month",
    description: "Ideal for growing businesses with multiple clients.",
    features: [
      "Up to 20 team members",
      "10 tenant environments",
      "Advanced analytics",
      "4-hour support response time",
      "10GB storage per tenant",
      "Custom branding options",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 249,
    billing: "month",
    description: "For large organizations with complex requirements.",
    features: [
      "Unlimited team members",
      "Unlimited tenant environments",
      "Enterprise analytics suite",
      "1-hour support response time",
      "100GB storage per tenant",
      "Custom integrations",
      "Dedicated account manager",
    ],
    popular: false,
  },
]
