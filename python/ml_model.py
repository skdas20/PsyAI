# This is a simplified demonstration of how a machine learning model might be implemented
# In a real implementation, this would use libraries like scikit-learn, TensorFlow, or PyTorch

def analyze_responses(responses):
    """
    Analyze mental health screening responses.
    
    Args:
        responses: List of dictionaries with questionId and value
        
    Returns:
        Dictionary with analysis results
    """
    # Map questions to their respective categories
    question_categories = {
        'depression': [1, 2, 3, 4],
        'anxiety': [5, 6, 7, 8]
    }
    
    # Calculate scores for each category
    depression_score = 0
    anxiety_score = 0
    
    for response in responses:
        question_id = response.get('questionId')
        value = response.get('value', 0)
        
        if question_id in question_categories['depression']:
            depression_score += value
        elif question_id in question_categories['anxiety']:
            anxiety_score += value
    
    # Determine stress level
    total_score = depression_score + anxiety_score
    max_possible_score = (len(question_categories['depression']) + len(question_categories['anxiety'])) * 3
    score_percentage = (total_score / max_possible_score) * 100
    
    if score_percentage < 30:
        stress_level = 'low'
    elif score_percentage < 70:
        stress_level = 'moderate'
    else:
        stress_level = 'high'
    
    # Generate recommendations
    recommendations = generate_recommendations(depression_score, anxiety_score, stress_level)
    
    return {
        'depressionScore': depression_score,
        'anxietyScore': anxiety_score,
        'stressLevel': stress_level,
        'recommendations': recommendations
    }

def generate_recommendations(depression_score, anxiety_score, stress_level):
    """
    Generate personalized recommendations based on scores.
    
    Args:
        depression_score: Score for depression indicators
        anxiety_score: Score for anxiety indicators
        stress_level: Overall stress level (low, moderate, high)
        
    Returns:
        List of recommendation dictionaries
    """
    recommendations = []
    
    # Add general recommendation
    recommendations.append({
        'title': 'Professional Support',
        'content': 'Remember that this screening tool is not a diagnostic instrument. If you\'re concerned about your mental health, please consult with a qualified mental health professional.'
    })
    
    # Add specific recommendations based on scores and stress level
    if stress_level == 'high':
        recommendations.append({
            'title': 'Stress Management',
            'content': 'Your responses suggest you may be experiencing significant stress. Consider practicing daily mindfulness meditation and seeking support from a mental health professional.'
        })
    elif stress_level == 'moderate':
        recommendations.append({
            'title': 'Stress Reduction',
            'content': 'Your responses indicate moderate stress levels. Regular physical activity, adequate sleep, and limiting caffeine and alcohol can help manage these symptoms.'
        })
    else:
        recommendations.append({
            'title': 'Maintaining Wellness',
            'content': 'Your responses suggest minimal symptoms of stress. Continue practicing good self-care, including regular exercise, healthy eating, adequate sleep, and social connection.'
        })
    
    # Add depression-specific recommendations
    if depression_score >= 8:
        recommendations.append({
            'title': 'Depression Support Strategies',
            'content': 'Your responses suggest you may be experiencing significant depressive symptoms. Establishing a daily routine, setting small achievable goals, and social connection can be helpful.'
        })
    elif depression_score >= 4:
        recommendations.append({
            'title': 'Mood Enhancement',
            'content': 'Your responses indicate some mild depressive symptoms. Regular exposure to sunlight, physical activity, and engaging in activities you previously enjoyed can help improve your mood.'
        })
    
    # Add anxiety-specific recommendations
    if anxiety_score >= 8:
        recommendations.append({
            'title': 'Anxiety Management Techniques',
            'content': 'Your responses suggest you may be experiencing significant anxiety symptoms. Consider practicing deep breathing exercises, progressive muscle relaxation, and limiting exposure to stressful situations when possible.'
        })
    elif anxiety_score >= 4:
        recommendations.append({
            'title': 'Mild Anxiety Support',
            'content': 'Your responses indicate some mild anxiety symptoms. Techniques such as the 5-4-3-2-1 grounding exercise and regular mindfulness practice can help manage these symptoms.'
        })
    
    return recommendations

def analyze_text(text):
    """
    Analyze text for sentiment and emotion detection.
    
    Args:
        text: Text to analyze
        
    Returns:
        Dictionary with analysis results
    """
    # This is a simplified demonstration
    # In a real implementation, this would use a natural language processing library
    
    # Simple keyword-based sentiment analysis
    positive_words = ['happy', 'good', 'great', 'excellent', 'joy', 'love', 'positive', 'wonderful', 'amazing']
    negative_words = ['sad', 'bad', 'terrible', 'awful', 'depressed', 'anxious', 'worried', 'stress', 'negative']
    
    words = text.lower().split()
    
    positive_count = 0
    negative_count = 0
    
    for word in words:
        if word in positive_words:
            positive_count += 1
        if word in negative_words:
            negative_count += 1
    
    if positive_count > negative_count:
        sentiment = 'positive'
    elif negative_count > positive_count:
        sentiment = 'negative'
    else:
        sentiment = 'neutral'
    
    # Simple emotion detection
    emotions = {
        'joy': 0,
        'sadness': 0,
        'anger': 0,
        'fear': 0,
        'surprise': 0
    }
    
    # Map keywords to emotions
    emotion_keywords = {
        'joy': ['happy', 'joy', 'excited', 'glad', 'pleased'],
        'sadness': ['sad', 'unhappy', 'depressed', 'down', 'blue'],
        'anger': ['angry', 'mad', 'frustrated', 'annoyed', 'irritated'],
        'fear': ['afraid', 'scared', 'anxious', 'worried', 'nervous'],
        'surprise': ['surprised', 'shocked', 'amazed', 'astonished', 'unexpected']
    }
    
    # Count emotion keywords
    for word in words:
        for emotion, keywords in emotion_keywords.items():
            if word in keywords:
                emotions[emotion] += 1
    
    # Normalize emotion scores
    total_emotion_count = sum(emotions.values())
    if total_emotion_count > 0:
        for emotion in emotions:
            emotions[emotion] = emotions[emotion] / total_emotion_count
    
    # Generate recommended quotes based on sentiment and emotions
    recommended_quotes = generate_quotes(sentiment, emotions)
    
    return {
        'sentiment': sentiment,
        'emotions': emotions,
        'recommendedQuotes': recommended_quotes
    }

def generate_quotes(sentiment, emotions):
    """
    Generate quotes based on sentiment and emotions.
    
    Args:
        sentiment: Detected sentiment (positive, neutral, negative)
        emotions: Dictionary of emotion scores
        
    Returns:
        List of recommended quotes
    """
    quotes = []
    
    # Sample quotes for different sentiments and emotions
    quote_bank = {
        'positive': [
            "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
            "The most wasted of all days is one without laughter. - E.E. Cummings",
            "Happiness is when what you think, what you say, and what you do are in harmony. - Mahatma Gandhi"
        ],
        'neutral': [
            "Life is what happens when you're busy making other plans. - John Lennon",
            "The purpose of our lives is to be happy. - Dalai Lama",
            "Life is really simple, but we insist on making it complicated. - Confucius"
        ],
        'negative': [
            "This too shall pass. - Persian Sufi Poets",
            "You are not your emotions. You are the observer of your emotions. - Unknown",
            "The darkest hour has only sixty minutes. - Morris Mandel"
        ],
        'joy': [
            "Find joy in the journey. - Unknown",
            "Joy is the simplest form of gratitude. - Karl Barth",
            "The joy that you give to others is the joy that comes back to you. - John Greenleaf Whittier"
        ],
        'sadness': [
            "Sadness is but a wall between two gardens. - Kahlil Gibran",
            "The word 'happiness' would lose its meaning if it were not balanced by sadness. - Carl Jung",
            "Tears are words the heart can't express. - Unknown"
        ],
        'anger': [
            "For every minute you remain angry, you give up sixty seconds of peace of mind. - Ralph Waldo Emerson",
            "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured. - Mark Twain",
            "Speak when you are angry and you will make the best speech you will ever regret. - Ambrose Bierce"
        ],
        'fear': [
            "Fear is only as deep as the mind allows. - Japanese Proverb",
            "Everything you want is on the other side of fear. - Jack Canfield",
            "The only thing we have to fear is fear itself. - Franklin D. Roosevelt"
        ],
        'surprise': [
            "Life is full of surprises and serendipity. - Shonda Rhimes",
            "The best things in life are unexpected - because there were no expectations. - Eli Khamarov",
            "Sometimes the most scenic roads in life are the detours you didn't mean to take. - Angela N. Blount"
        ]
    }
    
    # Add quotes based on sentiment
    quotes.append(random.choice(quote_bank[sentiment]))
    
    # Find dominant emotion
    dominant_emotion = 'neutral'
    max_score = 0
    
    for emotion, score in emotions.items():
        if score > max_score:
            max_score = score
            dominant_emotion = emotion
    
    # Add quotes based on dominant emotion if available
    if dominant_emotion in quote_bank and max_score > 0:
        quotes.append(random.choice(quote_bank[dominant_emotion]))
    
    return quotes

