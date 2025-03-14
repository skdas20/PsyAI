"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Download, ArrowRight, ArrowLeft, RefreshCw } from "lucide-react"
import {
  ChartContainer,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from "@/components/ui/chart"

// Sample questions for mental health screening
const questions = [
  {
    id: 1,
    text: "Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 2,
    text: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 3,
    text: "Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 4,
    text: "Over the past 2 weeks, how often have you felt tired or had little energy?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 5,
    text: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 6,
    text: "Over the past 2 weeks, how often have you not been able to stop or control worrying?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 7,
    text: "Over the past 2 weeks, how often have you had trouble relaxing?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 8,
    text: "Over the past 2 weeks, how often have you felt afraid as if something awful might happen?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
]

// Sample recommendations based on scores
const getRecommendations = (anxietyScore, depressionScore) => {
  const recommendations = []

  if (anxietyScore >= 8) {
    recommendations.push({
      title: "Anxiety Management Techniques",
      content:
        "Your responses suggest you may be experiencing significant anxiety symptoms. Consider practicing daily mindfulness meditation, deep breathing exercises, and progressive muscle relaxation.",
    })
  } else if (anxietyScore >= 4) {
    recommendations.push({
      title: "Mild Anxiety Support",
      content:
        "Your responses indicate some mild anxiety symptoms. Regular physical activity, adequate sleep, and limiting caffeine and alcohol can help manage these symptoms.",
    })
  }

  if (depressionScore >= 8) {
    recommendations.push({
      title: "Depression Support Strategies",
      content:
        "Your responses suggest you may be experiencing significant depressive symptoms. Establishing a daily routine, setting small achievable goals, and social connection can be helpful.",
    })
  } else if (depressionScore >= 4) {
    recommendations.push({
      title: "Mood Enhancement",
      content:
        "Your responses indicate some mild depressive symptoms. Regular exposure to sunlight, physical activity, and engaging in activities you previously enjoyed can help improve your mood.",
    })
  }

  if (anxietyScore < 4 && depressionScore < 4) {
    recommendations.push({
      title: "Maintaining Mental Wellness",
      content:
        "Your responses suggest minimal symptoms of anxiety and depression. Continue practicing good self-care, including regular exercise, healthy eating, adequate sleep, and social connection.",
    })
  }

  recommendations.push({
    title: "Professional Support",
    content:
      "Remember that this screening tool is not a diagnostic instrument. If you're concerned about your mental health, please consult with a qualified mental health professional.",
  })

  return recommendations
}

// Sample quotes for mood uplift
const moodQuotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "Spread love everywhere you go. Let no one ever come to you without leaving happier. - Mother Teresa",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "In the middle of difficulty lies opportunity. - Albert Einstein",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
]

export default function ScreeningPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  const [quote, setQuote] = useState("")
  const [journalText, setJournalText] = useState("")

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: Number.parseInt(value),
    })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate scores
      const depressionScore = (answers[1] || 0) + (answers[2] || 0) + (answers[3] || 0) + (answers[4] || 0)
      const anxietyScore = (answers[5] || 0) + (answers[6] || 0) + (answers[7] || 0) + (answers[8] || 0)

      // Get recommendations
      const recommendations = getRecommendations(anxietyScore, depressionScore)

      // Get random quote
      const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)]

      setResults({
        depressionScore,
        anxietyScore,
        recommendations,
      })

      setQuote(randomQuote)
      setCurrentStep(questions.length)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setResults(null)
    setQuote("")
    setJournalText("")
  }

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a PDF report
    alert("In a production environment, this would generate and download a PDF report of your results.")
  }

  const progress = (currentStep / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Mental Health Screening</h1>

        {currentStep < questions.length ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>
                Question {currentStep + 1} of {questions.length}
              </CardTitle>
              <CardDescription>
                This screening is for informational purposes only and is not a diagnostic tool.
              </CardDescription>
              <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{questions[currentStep].text}</p>
              <RadioGroup
                value={answers[questions[currentStep].id]?.toString() || ""}
                onValueChange={(value) => handleAnswer(questions[currentStep].id, value)}
              >
                {questions[currentStep].options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext} disabled={answers[questions[currentStep].id] === undefined}>
                {currentStep === questions.length - 1 ? "Submit" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          results && (
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Your Results</CardTitle>
                  <CardDescription>Based on your responses, we've generated the following insights.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Score Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="mb-2">Depression Indicators</p>
                        <Progress value={(results.depressionScore / 12) * 100} className="mb-1" />
                        <p className="text-sm text-gray-500">Score: {results.depressionScore}/12</p>
                      </div>
                      <div>
                        <p className="mb-2">Anxiety Indicators</p>
                        <Progress value={(results.anxietyScore / 12) * 100} className="mb-1" />
                        <p className="text-sm text-gray-500">Score: {results.anxietyScore}/12</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Visualization</h3>
                    <div className="h-[300px]">
                      <ChartContainer>
                        <ChartTitle text="Mental Health Indicators" />
                        <ChartLegend position="bottom" />
                        <ChartTooltip>
                          <ChartTooltipContent />
                        </ChartTooltip>
                        <ChartCategoryAxis>
                          <ChartCategoryAxisItem categories={["Depression", "Anxiety"]} />
                        </ChartCategoryAxis>
                        <ChartValueAxis>
                          <ChartValueAxisItem min={0} max={12} />
                        </ChartValueAxis>
                        <ChartSeries>
                          <ChartSeriesItem
                            type="column"
                            data={[results.depressionScore, results.anxietyScore]}
                            color={["#8b5cf6", "#6366f1"]}
                          />
                        </ChartSeries>
                      </ChartContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Personalized Recommendations</h3>
                    <div className="space-y-4">
                      {results.recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-medium text-purple-800 mb-2">{rec.title}</h4>
                          <p className="text-gray-700">{rec.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Start Over
                  </Button>
                  <Button onClick={handleDownloadPDF}>
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Daily Inspiration</CardTitle>
                  <CardDescription>A quote to uplift your mood and provide perspective.</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="italic text-lg border-l-4 border-purple-300 pl-4 py-2">{quote}</blockquote>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Express Your Feelings</CardTitle>
                  <CardDescription>
                    Writing about your emotions can help process them. Your entries are private and can be used to
                    generate personalized quotes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How are you feeling today?"
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                  ></textarea>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => {
                      // In a real implementation, this would analyze the text and generate a personalized quote
                      if (journalText.trim()) {
                        setQuote(moodQuotes[Math.floor(Math.random() * moodQuotes.length)])
                        alert(
                          "In a production environment, this would analyze your text and generate a personalized response.",
                        )
                      }
                    }}
                    disabled={!journalText.trim()}
                  >
                    Generate Personalized Response
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  )
}

