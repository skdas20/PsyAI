'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Shield, Lightbulb } from "lucide-react"
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCard {
  title: string;
  description: string;
  features: string[];
}

const teamMembers = [
  {
    name: 'Sumit Kumar Das',
    role: 'UI/UX Designer & Frontend Developer',
    description: 'Led the design and development of the user interface, focusing on creating an intuitive and engaging experience. Implemented responsive design principles and optimized the application for various devices. Enhanced user experience through careful attention to visual hierarchy, accessibility, and interactive elements. Contributed to SEO optimization and final polish of the application.',
    image: '/sumit.jpg'
  },
  {
    name: 'Debangshu',
    role: 'Site Architect & AI Model Trainer',
    description: 'Architected the overall system structure and implemented the core AI functionality. Developed and trained the mental health assessment models, ensuring accurate and reliable results. Integrated various AI components seamlessly into the application while maintaining performance and scalability.',
    image: '/deb.png'
  },
  {
    name: 'Aranya',
    role: 'Backend Developer & Database Specialist',
    description: 'Built robust backend systems and managed database architecture. Implemented secure data handling and user authentication systems. Optimized database queries and ensured efficient data flow throughout the application.',
    image: '/aranya.jpg'
  },
  {
    name: 'Sristi Raj',
    role: 'Documentation & Quality Assurance',
    description: 'Created comprehensive documentation for the project, including user guides and technical specifications. Conducted thorough testing and quality assurance to ensure a bug-free experience. Managed project documentation and contributed to the final implementation of various features.',
    image: '/sristi.png'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About PsyAI</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're on a mission to revolutionize mental health care through innovative technology and compassionate
            support.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              The journey of PsyAI began as a second-year project for aspiring engineering sophomores. The initial goal was to create a basic AI/ML model with a simple web interface.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Over time, the project evolved into a comprehensive platform for mental health support. The team expanded their skills and knowledge, integrating advanced technologies like virtual reality and IoT.
            </p>
            <p className="text-lg text-gray-700">
              Today, PsyAI serves thousands of users worldwide, providing innovative tools for mental health screening and personalized recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Heart className="h-10 w-10 text-red-500" />}
              title="Compassion"
              description="We approach mental health with empathy and understanding, recognizing the unique experiences of each individual."
            />
            <ValueCard
              icon={<Brain className="h-10 w-10 text-purple-600" />}
              title="Innovation"
              description="We continuously explore new technologies and approaches to improve mental health support and outcomes."
            />
            <ValueCard
              icon={<Shield className="h-10 w-10 text-blue-600" />}
              title="Privacy"
              description="We prioritize the security and confidentiality of user data, maintaining the highest standards of privacy protection."
            />
          </div>
        </div>
      </div>

      {/* Our Solutions */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <SolutionCard
              title="Mental Health Assessment"
              description="Our AI-powered screening tool analyzes responses to evidence-based questionnaires and provides personalized insights and recommendations."
              features={[
                "Evidence-based screening questions",
                "Machine learning analysis",
                "Personalized recommendations",
                "Progress tracking over time",
              ]}
            />
            <SolutionCard
              title="VR Therapy Experiences"
              description="Immersive virtual reality environments designed to reduce anxiety, promote relaxation, and teach mindfulness techniques."
              features={[
                "360° therapeutic environments",
                "Guided meditation sessions",
                "Breathing exercises",
                "Progressive muscle relaxation",
              ]}
            />
            <SolutionCard
              title="IoT Stress Monitoring"
              description="Connect with compatible devices to track physiological indicators of stress and receive real-time feedback and interventions."
              features={[
                "Bluetooth device integration",
                "Real-time stress level monitoring",
                "Trend analysis and insights",
                "Automated intervention suggestions",
              ]}
            />
            <SolutionCard
              title="AI Mood Support"
              description="Our natural language processing system analyzes text entries and generates personalized motivational content to uplift your mood."
              features={[
                "Sentiment analysis",
                "Personalized quote generation",
                "Journaling with insights",
                "Cognitive reframing suggestions",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-purple-600 text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Us on Our Mission</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Together, we can create a world where everyone has access to the mental health support they need.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  )
}

function ValueCard({ icon, title, description }: Feature) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function SolutionCard({ title, description, features }: FeatureCard) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Lightbulb className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

