// This is a simplified demonstration of a quote generation system
// In a real implementation, this would use more sophisticated NLP techniques

export interface QuoteOptions {
  mood?: "positive" | "neutral" | "negative"
  topic?: string
  length?: "short" | "medium" | "long"
  style?: "inspirational" | "philosophical" | "practical"
}

export function generateQuote(options: QuoteOptions = {}): string {
  const { mood = "positive", topic = "general", length = "medium", style = "inspirational" } = options

  // Sample quotes database
  const quotes = {
    positive: {
      general: {
        inspirational: [
          "Believe you can and you're halfway there. - Theodore Roosevelt",
          "The only way to do great work is to love what you do. - Steve Jobs",
          "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
        ],
        philosophical: [
          "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
          "The purpose of our lives is to be happy. - Dalai Lama",
          "Life is really simple, but we insist on making it complicated. - Confucius",
        ],
        practical: [
          "Small steps every day lead to big changes over time. - Unknown",
          "Progress, not perfection, is what we should be asking of ourselves. - Simon Sinek",
          "The secret of getting ahead is getting started. - Mark Twain",
        ],
      },
      anxiety: {
        inspirational: [
          "Anxiety is a thin stream of fear trickling through the mind. If encouraged, it cuts a channel into which all other thoughts are drained. - Arthur Somers Roche",
          "You don't have to control your thoughts. You just have to stop letting them control you. - Dan Millman",
          "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength. - Charles Spurgeon",
        ],
        philosophical: [
          "The greatest weapon against stress is our ability to choose one thought over another. - William James",
          "Life is ten percent what you experience and ninety percent how you respond to it. - Dorothy M. Neddermeyer",
          "Nothing diminishes anxiety faster than action. - Walter Anderson",
        ],
        practical: [
          "Take a deep breath. It's just a bad day, not a bad life. - Unknown",
          "Worry is like a rocking chair: it gives you something to do but never gets you anywhere. - Erma Bombeck",
          "Just when the caterpillar thought the world was ending, he turned into a butterfly. - Proverb",
        ],
      },
      depression: {
        inspirational: [
          "Even the darkest night will end and the sun will rise. - Victor Hugo",
          "There is hope, even when your brain tells you there isn't. - John Green",
          "You're not a mess. You're brave for trying. - Unknown",
        ],
        philosophical: [
          "The wound is the place where the Light enters you. - Rumi",
          "In the midst of winter, I found there was, within me, an invincible summer. - Albert Camus",
          "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
        ],
        practical: [
          "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
          "Sometimes the bravest thing you can do is just get out of bed. - Unknown",
          "Recovery is not one and done. It is one day at a time. - Unknown",
        ],
      },
    },
    neutral: {
      general: {
        inspirational: [
          "Life is what happens when you're busy making other plans. - John Lennon",
          "The journey of a thousand miles begins with one step. - Lao Tzu",
          "Every moment is a fresh beginning. - T.S. Eliot",
        ],
        philosophical: [
          "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
          "The unexamined life is not worth living. - Socrates",
          "Life can only be understood backwards; but it must be lived forwards. - Søren Kierkegaard",
        ],
        practical: [
          "Do what you can, with what you have, where you are. - Theodore Roosevelt",
          "It does not matter how slowly you go as long as you do not stop. - Confucius",
          "The best way to predict the future is to create it. - Peter Drucker",
        ],
      },
    },
    negative: {
      general: {
        inspirational: [
          "This too shall pass. - Persian Sufi Poets",
          "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. - Henry Ford",
          "Rock bottom became the solid foundation on which I rebuilt my life. - J.K. Rowling",
        ],
        philosophical: [
          "In the middle of difficulty lies opportunity. - Albert Einstein",
          "The darkest hour has only sixty minutes. - Morris Mandel",
          "What we achieve inwardly will change outer reality. - Plutarch",
        ],
        practical: [
          "When you can't control what's happening, challenge yourself to control the way you respond to what's happening. - Unknown",
          "Sometimes you win, sometimes you learn. - John Maxwell",
          "Difficult roads often lead to beautiful destinations. - Unknown",
        ],
      },
    },
  }

  // Select appropriate quotes based on options
  let availableQuotes = quotes[mood]?.general?.[style] || quotes.positive.general.inspirational

  // If topic-specific quotes are available, use those instead
  if (topic !== "general" && quotes[mood]?.[topic]?.[style]) {
    availableQuotes = quotes[mood][topic][style]
  }

  // Filter by length if specified
  let filteredQuotes = availableQuotes
  if (length === "short") {
    filteredQuotes = availableQuotes.filter((quote) => quote.length < 60)
  } else if (length === "long") {
    filteredQuotes = availableQuotes.filter((quote) => quote.length > 100)
  }

  // If no quotes match the length criteria, fall back to the original set
  if (filteredQuotes.length === 0) {
    filteredQuotes = availableQuotes
  }

  // Return a random quote from the filtered list
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
}

// Generate a personalized quote based on text input
export function generatePersonalizedQuote(text: string): string {
  // This is a simplified demonstration
  // In a real implementation, this would use sentiment analysis and NLP

  // Simple keyword-based mood detection
  const positiveWords = ["happy", "good", "great", "excellent", "joy", "love", "positive", "wonderful", "amazing"]
  const negativeWords = ["sad", "bad", "terrible", "awful", "depressed", "anxious", "worried", "stress", "negative"]
  const anxietyWords = ["anxious", "nervous", "worry", "stress", "panic", "fear", "tense", "uneasy"]
  const depressionWords = ["depressed", "sad", "hopeless", "empty", "worthless", "tired", "exhausted"]

  const words = text.toLowerCase().split(/\W+/)

  let positiveCount = 0
  let negativeCount = 0
  let anxietyCount = 0
  let depressionCount = 0

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++
    if (negativeWords.includes(word)) negativeCount++
    if (anxietyWords.includes(word)) anxietyCount++
    if (depressionWords.includes(word)) depressionCount++
  })

  // Determine mood and topic
  let mood: "positive" | "neutral" | "negative"
  if (positiveCount > negativeCount) {
    mood = "positive"
  } else if (negativeCount > positiveCount) {
    mood = "negative"
  } else {
    mood = "neutral"
  }

  let topic = "general"
  if (anxietyCount > depressionCount && anxietyCount > 0) {
    topic = "anxiety"
  } else if (depressionCount > anxietyCount && depressionCount > 0) {
    topic = "depression"
  }

  // Generate quote based on detected mood and topic
  return generateQuote({ mood, topic, style: "inspirational" })
}

// Generate a set of quotes for daily inspiration
export function generateDailyQuotes(count = 3): string[] {
  const quotes = []
  const styles: ("inspirational" | "philosophical" | "practical")[] = ["inspirational", "philosophical", "practical"]

  for (let i = 0; i < count; i++) {
    const style = styles[i % styles.length]
    quotes.push(generateQuote({ style }))
  }

  return quotes
}

