import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for you and start your journey to better mental wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            title="Basic"
            price="Free"
            description="Essential tools for mental wellness"
            features={[
              { included: true, text: "Mental Health Screening" },
              { included: true, text: "Basic Mood Tracking" },
              { included: true, text: "Daily Quote Generation" },
              { included: false, text: "VR Therapy Sessions" },
              { included: false, text: "IoT Device Integration" },
              { included: false, text: "Personalized AI Recommendations" },
              { included: false, text: "Priority Support" },
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
          />

          <PricingCard
            title="Premium"
            price="$9.99"
            period="per month"
            description="Advanced features for comprehensive support"
            features={[
              { included: true, text: "Mental Health Screening" },
              { included: true, text: "Advanced Mood Tracking" },
              { included: true, text: "Personalized Quote Generation" },
              { included: true, text: "5 VR Therapy Sessions/month" },
              { included: true, text: "Basic IoT Device Integration" },
              { included: true, text: "Personalized AI Recommendations" },
              { included: false, text: "Priority Support" },
            ]}
            buttonText="Subscribe Now"
            buttonVariant="default"
            highlighted={true}
          />

          <PricingCard
            title="Professional"
            price="$19.99"
            period="per month"
            description="Complete mental wellness solution"
            features={[
              { included: true, text: "Mental Health Screening" },
              { included: true, text: "Advanced Mood Tracking" },
              { included: true, text: "Personalized Quote Generation" },
              { included: true, text: "Unlimited VR Therapy Sessions" },
              { included: true, text: "Advanced IoT Device Integration" },
              { included: true, text: "Personalized AI Recommendations" },
              { included: true, text: "Priority Support" },
            ]}
            buttonText="Subscribe Now"
            buttonVariant="default"
          />
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FaqCard
              question="Can I cancel my subscription at any time?"
              answer="Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
            />
            <FaqCard
              question="Is my data secure and private?"
              answer="Absolutely. We use industry-standard encryption and security practices to protect your data. Your privacy is our top priority."
            />
            <FaqCard
              question="Can I switch between plans?"
              answer="Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle."
            />
            <FaqCard
              question="Do you offer a free trial for paid plans?"
              answer="Yes, we offer a 7-day free trial for both our Premium and Professional plans so you can experience all the features before committing."
            />
            <FaqCard
              question="What devices are compatible with the IoT integration?"
              answer="We currently support Arduino Nano 33 BLE and select wearable devices with heart rate and GSR sensors. More devices are being added regularly."
            />
            <FaqCard
              question="Is this a substitute for professional mental health care?"
              answer="No, PsyAI is designed to complement, not replace, professional mental health care. If you're experiencing severe symptoms, please consult a healthcare provider."
            />
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer enterprise plans for organizations looking to provide mental wellness support for their teams.
          </p>
          <Button size="lg">Contact Sales</Button>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ title, price, period, description, features, buttonText, buttonVariant, highlighted = false }) {
  return (
    <Card className={`relative ${highlighted ? "border-purple-500 shadow-lg" : ""}`}>
      {highlighted && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-gray-500 ml-2">{period}</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-gray-300 mr-2 mt-0.5" />
              )}
              <span className={feature.included ? "" : "text-gray-500"}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${highlighted ? "bg-purple-600 hover:bg-purple-700" : ""}`} variant={buttonVariant}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

function FaqCard({ question, answer }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{answer}</p>
      </CardContent>
    </Card>
  )
}

