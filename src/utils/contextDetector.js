// src/utils/contextDetector.js
const API_KEY = 'AIzaSyB1YnVEN2iAEl4DprbHIq_DkRkoJSxPUns';

/**
 * Analyzes user input to detect interests/hyperfixations
 * Returns an object with topic and relevant emojis
 */
export async function detectUserContext(userInput) {
  if (!userInput || userInput.trim().length < 10) {
    return null;
  }

  try {
    const prompt = `Analyze this text from someone with autism and identify their main interest or hyperfixation topic. Respond ONLY with a JSON object in this exact format:
{
  "topic": "the main topic (e.g., trains, sushi, dinosaurs, space)",
  "emojis": ["emoji1", "emoji2", "emoji3", "emoji4", "emoji5"],
  "confidence": "high/medium/low"
}

Text: ${userInput}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) return null;

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const context = JSON.parse(jsonMatch[0]);
      return context;
    }
  } catch (error) {
    console.error('Context detection error:', error);
  }
  
  return null;
}

/**
 * Stores user context in localStorage
 */
export function saveUserContext(context) {
  if (!context) return;
  
  const existingContexts = JSON.parse(localStorage.getItem('userContexts') || '[]');
  
  // Add timestamp
  const contextWithTime = {
    ...context,
    timestamp: Date.now()
  };
  
  existingContexts.push(contextWithTime);
  
  // Keep only last 20 contexts (increased to track more mentions)
  const recentContexts = existingContexts.slice(-20);
  localStorage.setItem('userContexts', JSON.stringify(recentContexts));
  
  // Update current active context (most frequent, requires at least 2 mentions)
  updateActiveContext(recentContexts);
}

/**
 * Determines the most relevant active context based on frequency
 * Only activates if a topic is mentioned multiple times (showing constant interest)
 */
function updateActiveContext(contexts) {
  if (contexts.length === 0) return;
  
  // Count topic frequency
  const topicCounts = {};
  const topicData = {}; // Store full context data for each topic
  
  contexts.forEach(ctx => {
    const topic = ctx.topic.toLowerCase();
    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    
    // Store the most recent context for this topic
    if (!topicData[topic] || ctx.timestamp > topicData[topic].timestamp) {
      topicData[topic] = ctx;
    }
  });
  
  // Find most frequent topic (must be mentioned at least 2 times to show constant interest)
  const sortedTopics = Object.entries(topicCounts)
    .filter(([topic, count]) => count >= 2) // Require at least 2 mentions
    .sort((a, b) => {
      // Sort by frequency first, then by recency
      if (b[1] !== a[1]) return b[1] - a[1];
      return topicData[b[0]].timestamp - topicData[a[0]].timestamp;
    });
  
  if (sortedTopics.length > 0) {
    const mostFrequentTopic = sortedTopics[0][0];
    const activeContext = {
      ...topicData[mostFrequentTopic],
      mentionCount: topicCounts[mostFrequentTopic] // Add mention count for reference
    };
    localStorage.setItem('activeContext', JSON.stringify(activeContext));
    
    // Trigger update event
    window.dispatchEvent(new CustomEvent('activeContextUpdated'));
  } else {
    // Clear active context if no topic has enough mentions
    localStorage.removeItem('activeContext');
  }
}

/**
 * Gets the current active context
 */
export function getActiveContext() {
  const active = localStorage.getItem('activeContext');
  return active ? JSON.parse(active) : null;
}
