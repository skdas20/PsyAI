import random

def generate_quote(options=None):
    """
    Generate a quote based on options.
    
    Args:
        options: Dictionary with mood, topic, length, and style
        
    Returns:
        A quote string
    """
    if options is None:
        options = {}
    
    mood = options.get('mood', 'positive')
    topic = options.get('topic', 'general')
    length = options.get('length', 'medium')
    style = options.get('style', 'inspirational')
    
    # Sample quotes database
    quotes = {
        'positive': {
            'general': {
                'inspirational': [
                    "Believe you can and you're halfway there. - Theodore Roosevelt",
                    "The only way to do great work is to love what you do. - Steve Jobs",
                    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis"
                ],
                'philosophical': [
                    "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
                    "The purpose of our lives is to be happy. - Dalai Lama",
                    "Life is really simple, but we insist on making it complicated. - Confucius"
                ],
                'practical': [
                    "Small steps every day lead to big changes over time. - Unknown",
                    "Progress, not perfection, is what we should be asking of ourselves. - Simon Sinek",
                    "The secret of getting ahead is getting started. - Mark Twain"
                ]
            },
            'anxiety': {
                'inspirational': [
                    "Anxiety is a thin stream of fear trickling through the mind. If encouraged, it cuts a channel into which all other thoughts are drained. - Arthur Somers Roche",
                    "You don't have to control your thoughts. You just have to stop letting them control you. - Dan Millman",
                    "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength. - Charles Spurgeon"
                ],
                'philosophical': [
                    "The greatest weapon against stress is our ability to choose one thought over another. - William James",
                    "Life is ten percent what you experience and ninety percent how you respond to it. - Dorothy M. Neddermeyer",
                    "Nothing diminishes anxiety faster than action. - Walter Anderson"
                ],
                'practical': [
                    "Take a deep breath. It's just a bad day, not a bad life. - Unknown",
                    "Worry is like a rocking chair: it gives you something to do but never gets you anywhere. - Erma Bombeck",
                    "Just when the caterpillar thought the world was ending, he turned into a butterfly. - Proverb"
                ]
            },
            'depression': {
                'inspirational': [
                    "Even the darkest night will end and the sun will rise. - Victor Hugo",
                    "There is hope, even when your brain tells you there isn't. - John Green",
                    "You're not a mess. You're brave for trying. - Unknown"
                ],
                'philosophical': [
                    "The wound is the place where the Light enters you. - Rumi",
                    "In the midst of winter, I found there was, within me, an invincible summer. - Albert Camus",
                    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela"
                ],
                'practical': [
                    "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
                    "Sometimes the bravest thing you can do is just get out of bed. - Unknown",
                    "Recovery is not one and done. It is one day at a time. - Unknown"
                ]
            }
        },
        'neutral': {
            'general': {
                'inspirational': [
                    "Life is what happens when you're busy making other plans. - John Lennon",
                    "The journey of a thousand miles begins with one step. - Lao Tzu",
                    "Every moment is a fresh beginning. - T.S. Eliot"
                ],
                'philosophical': [
                    "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
                    "The unexamined life is not worth living. - Socrates",
                    "Life can only be understood backwards; but it must be lived forwards. - Søren Kierkegaard"
                ],
                'practical': [
                    "Do what you can, with what you have, where you are. - Theodore Roosevelt",
                    "It does not matter how slowly you go as long as you do not stop. - Confucius",
                    "The best way to predict the future is to create it. - Peter Drucker"
                ]
            }
        },
        'negative': {
            'general': {
                'inspirational': [
                    "This too shall pass. - Persian Sufi Poets",
                    "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. - Henry Ford",
                    "Rock bottom became the solid foundation on which I rebuilt my life. - J.K. Rowling"
                ],
                'philosophical': [
                    "In the middle of difficulty lies opportunity. - Albert Einstein",
                    "The darkest hour has only sixty minutes. - Morris Mandel",
                    "What we achieve inwardly will change outer reality. - Plutarch"
                ],
                'practical': [
                    "When you can't control what's happening, challenge yourself to control the way you respond to what's happening. - Unknown",
                    "Sometimes you win, sometimes you learn. - John Maxwell",
                    "Difficult roads often lead to beautiful destinations. - Unknown"
                ]
            }
        }
    }
    
    # Select appropriate quotes based on options
    available_quotes = quotes.get(mood, {}).get('general', {}).get(style, quotes['positive']['general']['inspirational'])
    
    # If topic-specific quotes are available, use those instead
    if topic != 'general' and topic in quotes.get(mood, {}):
        if style in quotes[mood][topic]:
            available_quotes = quotes[mood][topic][style]
    
    # Filter by length if specified
    filtered_quotes = available_quotes
    if length == 'short':
        filtered_quotes = [q for q in available_quotes if len(q) < 60]
    elif length == 'long':
        filtered_quotes = [q for q in available_quotes if len(q) > 100]
    
    # If no quotes match the length criteria, fall back to the original set
    if not filtered_quotes:
        filtered_quotes = available_quotes
    
    # Return a random quote from the filtered list
    return random.choice(filtered_quotes)

def generate_personalized_quote(text):
    """
    Generate a personalized quote based on text input.
    
    Args:
        text: Text to analyze
        
    Returns:
        A personalized quote string
    """
    # This is a simplified demonstration
    # In a real implementation, this would use sentiment analysis and NLP
    
    # Simple keyword-based mood detection
    positive_words = ['happy', 'good', 'great', 'excellent', 'joy', 'love', 'positive', 'wonderful', 'amazing']
    negative_words = ['sad', 'bad', 'terrible', 'awful', 'depressed', 'anxious', 'worried', 'stress', 'negative']
    anxiety_words = ['anxious', 'nervous', 'worry', 'stress', 'panic', 'fear', 'tense', 'uneasy']
    depression_words = ['depressed', 'sad', 'hopeless', 'empty', 'worthless', 'tired', 'exhausted']
    
    words = text.lower().split()
    
    positive_count = 0
    negative_count = 0
    anxiety_count = 0
    depression_count = 0
    
    for word in words:
        if word in positive_words:
            positive_count += 1
        if word in negative_words:
            negative_count += 1
        if word in anxiety_words:
            anxiety_count += 1
        if word in depression_words:
            depression_count += 1
    
    # Determine mood and topic
    if positive_count > negative_count:
        mood = 'positive'
    elif negative_count > positive_count:
        mood = 'negative'
    else:
        mood = 'neutral'
    
    topic = 'general'
    if anxiety_count > depression_count and anxiety_count > 0:
        topic = 'anxiety'
    elif depression_count > anxiety_count and depression_count > 0:
        topic = 'depression'
    
    # Generate quote based on detected mood and topic
    return generate_quote({'mood': mood, 'topic': topic, 'style': 'inspirational'})

def generate_daily_quotes(count=3):
    """
    Generate a set of quotes for daily inspiration.
    
    Args:
        count: Number of quotes to generate
        
    Returns:
        List of quote strings
    """
    quotes = []
    styles = ['inspirational', 'philosophical', 'practical']
    
    for i in range(count):
        style = styles[i % len(styles)]
        quotes.append(generate_quote({'style': style}))
    
    return quotes

