import Link from "next/link"
import { Button } from "@/components/ui/button"
import BrainAnimation from "@/components/brain-animation"
import { ArrowRight, Brain, Activity, Users, Award, MessageSquare, Phone, Mail } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section with 3D Brain */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <BrainAnimation />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">PsyAI</h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md max-w-2xl mx-auto">
            Your one step solution for anxiety and mental wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/screening">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-purple-600" />}
              title="AI-Powered Analysis"
              description="Advanced machine learning algorithms to analyze your mental health patterns and provide personalized recommendations."
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-purple-600" />}
              title="Real-time Monitoring"
              description="Connect with IoT devices to track physiological indicators of stress and anxiety in real-time."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-purple-600" />}
              title="Mood-Based Quotes"
              description="Receive uplifting quotes and motivational content tailored to your current emotional state."
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Trusted By Many</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="PsyAI helped me understand my anxiety triggers and develop effective coping strategies."
              author="Sarah J."
            />
            <TestimonialCard
              quote="The VR therapy sessions were incredibly immersive and calming. A game-changer for my stress management."
              author="Michael T."
            />
            <TestimonialCard
              quote="The real-time monitoring with my wearable device gave me insights I never had before about my stress patterns."
              author="Priya K."
            />
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <TrustBadge icon={<Users className="h-6 w-6" />} text="10,000+ Users" />
            <TrustBadge icon={<Award className="h-6 w-6" />} text="Award-Winning Platform" />
            <TrustBadge icon={<Activity className="h-6 w-6" />} text="99.9% Uptime" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Mental Wellness?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their mental health with PsyAI's innovative approach.
          </p>
          <Link href="/screening">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PsyAI</h3>
              <p className="text-gray-400">Your one step solution for anxiety and mental wellness</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/screening" className="text-gray-400 hover:text-white">
                    Mental Health Screening
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/vr-therapy" className="text-gray-400 hover:text-white">
                    VR Therapy
                  </Link>
                </li>
                <li>
                  <Link href="/iot-analysis" className="text-gray-400 hover:text-white">
                    IoT Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/quotes" className="text-gray-400 hover:text-white">
                    Mood Quotes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="text-gray-400">
                <p>Email: debangshuchatterjee2005@gmail.com</p>
                <p>Phone: +91 6290277345</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PsyAI. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Disclaimer: This platform is for informational purposes only and is not a substitute for professional
              medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <p className="font-semibold">— {author}</p>
    </div>
  )
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  )
}

