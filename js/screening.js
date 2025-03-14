import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Questions data
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
      category: "depression",
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
      category: "depression",
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
      category: "depression",
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
      category: "depression",
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
      category: "anxiety",
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
      category: "anxiety",
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
      category: "anxiety",
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
      category: "anxiety",
    },
  ]

  // Sample quotes for mood uplift
  const moodQuotes = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier. - Mother Teresa",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  ]

  // Elements
  const questionNumberEl = document.getElementById("question-number")
  const questionTextEl = document.getElementById("question-text")
  const progressBarEl = document.getElementById("progress-bar")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const optionsContainer = document.querySelector(".options-container")

  const questionnaireSection = document.getElementById("questionnaire-section")
  const resultsSection = document.getElementById("results-section")

  const depressionScoreEl = document.getElementById("depression-score")
  const anxietyScoreEl = document.getElementById("anxiety-score")
  const depressionProgressEl = document.getElementById("depression-progress")
  const anxietyProgressEl = document.getElementById("anxiety-progress")
  const recommendationsContainer = document.getElementById("recommendations-container")
  const quoteTextEl = document.getElementById("quote-text")
  const journalTextEl = document.getElementById("journal-text")
  const generateQuoteBtn = document.getElementById("generate-quote-btn")
  const resetBtn = document.getElementById("reset-btn")
  const downloadBtn = document.getElementById("download-btn")

  // State
  let currentQuestionIndex = 0
  let answers = {}

  // Initialize
  function init() {
    showQuestion(currentQuestionIndex)
    setupEventListeners()
  }

  // Show question
  function showQuestion(index) {
    const question = questions[index]
    questionNumberEl.textContent = `Question ${index + 1} of ${questions.length}`
    questionTextEl.textContent = question.text

    // Update progress bar
    const progress = ((index + 1) / questions.length) * 100
    progressBarEl.style.width = `${progress}%`

    // Clear options
    optionsContainer.innerHTML = ""

    // Add options
    question.options.forEach((option, i) => {
      const optionHTML = `
                <div class="option">
                    <input type="radio" id="option-${i}" name="answer" value="${option.value}" ${answers[question.id] === Number.parseInt(option.value) ? "checked" : ""}>
                    <label for="option-${i}">${option.label}</label>
                </div>
            `
      optionsContainer.insertAdjacentHTML("beforeend", optionHTML)
    })

    // Add event listeners to options
    document.querySelectorAll(".option input").forEach((input) => {
      input.addEventListener("change", handleOptionChange)
    })

    // Update button states
    prevBtn.disabled = index === 0
    nextBtn.disabled = answers[question.id] === undefined

    // Update next button text for last question
    if (index === questions.length - 1) {
      nextBtn.innerHTML = 'Submit <i class="fas fa-arrow-right"></i>'
    } else {
      nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>'
    }
  }

  // Handle option change
  function handleOptionChange(e) {
    const questionId = questions[currentQuestionIndex].id
    answers[questionId] = Number.parseInt(e.target.value)
    nextBtn.disabled = false
  }

  // Setup event listeners
  function setupEventListeners() {
    prevBtn.addEventListener("click", handlePrevious)
    nextBtn.addEventListener("click", handleNext)
    resetBtn.addEventListener("click", handleReset)
    downloadBtn.addEventListener("click", handleDownload)
    generateQuoteBtn.addEventListener("click", handleGenerateQuote)
  }

  // Handle previous button click
  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--
      showQuestion(currentQuestionIndex)
    }
  }

  // Handle next button click
  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++
      showQuestion(currentQuestionIndex)
    } else {
      showResults()
    }
  }

  // Show results
  function showResults() {
    // Calculate scores
    let depressionScore = 0
    let anxietyScore = 0

    questions.forEach((question) => {
      if (question.category === "depression") {
        depressionScore += answers[question.id] || 0
      } else if (question.category === "anxiety") {
        anxietyScore += answers[question.id] || 0
      }
    })

    // Update score elements
    depressionScoreEl.textContent = depressionScore
    anxietyScoreEl.textContent = anxietyScore

    // Update progress bars
    depressionProgressEl.style.width = `${(depressionScore / 12) * 100}%`
    anxietyProgressEl.style.width = `${(anxietyScore / 12) * 100}%`

    // Generate recommendations
    const recommendations = generateRecommendations(depressionScore, anxietyScore)

    // Clear recommendations container
    recommendationsContainer.innerHTML = ""

    // Add recommendations
    recommendations.forEach((rec) => {
      const recHTML = `
                <div class="recommendation">
                    <h4>${rec.title}</h4>
                    <p>${rec.content}</p>
                </div>
            `
      recommendationsContainer.insertAdjacentHTML("beforeend", recHTML)
    })

    // Set random quote
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)]
    quoteTextEl.textContent = randomQuote

    // Create chart
    createResultsChart(depressionScore, anxietyScore)

    // Hide questionnaire, show results
    questionnaireSection.style.display = "none"
    resultsSection.style.display = "block"

    // Scroll to top
    window.scrollTo(0, 0)
  }

  // Generate recommendations based on scores
  function generateRecommendations(depressionScore, anxietyScore) {
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

  // Create results chart
  function createResultsChart(depressionScore, anxietyScore) {
    const ctx = document.getElementById("results-chart").getContext("2d")

    // Destroy existing chart if it exists
    if (window.resultsChart) {
      window.resultsChart.destroy()
    }

    window.resultsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Depression", "Anxiety"],
        datasets: [
          {
            label: "Score",
            data: [depressionScore, anxietyScore],
            backgroundColor: ["rgba(139, 92, 246, 0.7)", "rgba(99, 102, 241, 0.7)"],
            borderColor: ["rgba(139, 92, 246, 1)", "rgba(99, 102, 241, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 12,
            ticks: {
              stepSize: 3,
            },
          },
        },
      },
    })
  }

  // Handle reset button click
  function handleReset() {
    currentQuestionIndex = 0
    answers = {}

    // Reset form
    showQuestion(currentQuestionIndex)

    // Show questionnaire, hide results
    questionnaireSection.style.display = "block"
    resultsSection.style.display = "none"

    // Clear journal text
    journalTextEl.value = ""
  }

  // Handle download button click
  function handleDownload() {
    alert("In a production environment, this would generate and download a PDF report of your results.")
  }

  // Handle generate quote button click
  function handleGenerateQuote() {
    const journalText = journalTextEl.value.trim()

    if (journalText) {
      // In a real implementation, this would analyze the text and generate a personalized quote
      // For now, just show a random quote
      const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)]
      quoteTextEl.textContent = randomQuote

      alert("In a production environment, this would analyze your text and generate a personalized response.")
    }
  }

  // Initialize the app
  init()
})

