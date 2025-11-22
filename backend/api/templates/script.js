// Character counter
const textarea = document.getElementById('userText');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', () => {
    charCount.textContent = textarea.value.length;
});

// Sentiment analysis function
async function analyzeSentiment() {
    const text = textarea.value.trim();
    const resultContainer = document.getElementById('result');
    const resultEmoji = document.getElementById('resultEmoji');
    const sentimentText = document.getElementById('sentimentText');
    const analyzeBtn = document.getElementById('analyzeBtn');

    // Validation
    if (!text) {
        showError("Please enter some text to analyze.");
        return;
    }

    // Show loading state
    analyzeBtn.classList.add('loading');
    resultContainer.classList.add('hidden');
    resultContainer.classList.remove('positive', 'negative', 'neutral');

    try {
        const response = await fetch('/api/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayResult(data.label);
    } catch (error) {
        console.error('Error:', error);
        showError("An error occurred while analyzing sentiment. Please try again.");
    } finally {
        analyzeBtn.classList.remove('loading');
    }
}

// Display result with animation and color coding
function displayResult(sentiment) {
    const resultContainer = document.getElementById('result');
    const resultEmoji = document.getElementById('resultEmoji');
    const sentimentText = document.getElementById('sentimentText');

    // Normalize sentiment
    const normalizedSentiment = sentiment.toLowerCase();

    // Set emoji and styling based on sentiment
    let emoji = '😊';
    let sentimentClass = 'neutral';
    let displayText = sentiment;

    if (normalizedSentiment.includes('positive')) {
        emoji = '😊';
        sentimentClass = 'positive';
        displayText = 'Positive';
    } else if (normalizedSentiment.includes('negative')) {
        emoji = '😔';
        sentimentClass = 'negative';
        displayText = 'Negative';
    } else if (normalizedSentiment.includes('neutral')) {
        emoji = '😐';
        sentimentClass = 'neutral';
        displayText = 'Neutral';
    }

    // Update content
    resultEmoji.textContent = emoji;
    sentimentText.textContent = displayText;

    // Show result with animation
    setTimeout(() => {
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add(sentimentClass);
    }, 100);
}

// Show error message
function showError(message) {
    const resultContainer = document.getElementById('result');
    const resultEmoji = document.getElementById('resultEmoji');
    const sentimentText = document.getElementById('sentimentText');

    resultEmoji.textContent = '⚠️';
    sentimentText.textContent = message;
    sentimentText.style.fontSize = '1.1rem';

    resultContainer.classList.remove('hidden', 'positive', 'negative', 'neutral');

    setTimeout(() => {
        sentimentText.style.fontSize = '';
    }, 3000);
}

// Allow Enter key to submit (with Shift+Enter for new line)
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        analyzeSentiment();
    }
});
