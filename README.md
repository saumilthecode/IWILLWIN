# **Storybook: A Platform for ASD Social Skills Practice**  
🏆 *Winner – Most Socially Useful Hack*  
Available at: [**unfound.cloud**](https://www.unfound.cloud/) 🥰  api key removed
A few months after this project. google came up with a similar **feature** as one in this project (https://gemini.google/overview/storybook/), ours is geared towards individuals with ASD - allowing stories that include their interests to be included in the stories.


### Setup

```bash
# 1. Set up environment
# Create .env file in project root with your OpenAI key:
echo "openaikey=your-api-key-here" > .env

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
---

## **Overview**
By 2025, you’d think we would have leveraged technology better!!! to help individuals with **Autism Spectrum Disorder (ASD)** practice their social skills!!!  
Over **75 million people** (~1% of the population)!!! are diagnosed with ASD, yet digital support tools remain limited!  

We read a ton of research articles from universities like Stanford, John Hopkins, Harvard Med and so many many more and realised individuals with ASD often struggle to form **meaningful social connections** due to challenges such as:  
- Difficulty with social norms and nonverbal communication.  
- Trouble understanding social cues and using expressive/receptive language skills.  
- Difficulty conveying thoughts and emotions.  
- Challenges showing empathy to others and even themselves.  

---

## **Our Solution: Storybook**
**Storybook** is built on *scientific evidence* and designed to help users develop social skills in a safe, engaging, and personalized way.  

**3 core components** 

### **1. Read**
- Create your own story and answer guided follow-up questions to process the narrative.  
- Context-aware emoji backgrounds that adapt based on user interests/hyperfixations
- Uses **simple words**, **emojis**, and **careful coloring** to prevent overstimulation and sensory overload.  

### **2. Write**
- Acts as an *emotion journal*.  
- Detect user interests for personalized backgrounds  
- Suggests solutions and helps identify feelings.  

### **3. Emotion**
- Builds emotion recognition skills through quizzes.  
- Shows images of facial expressions and asks the user to identify the emotion.  
- Directly supports cognitive skill development practiced in therapy, now accessible online.  

Dashboard with CanvasJS charts for progress tracking
---

## **Why It Matters**
Storybook boosts cognitive skills using **scientifically proven methods**:
- Generating engaging stories.  
- Live journaling with emotional analysis.  
- Facial expression training.  
- **Progress dashboard** for tracking development over time.  

---

## **Tech Stack**
- **Frontend:** Astro 5.1.7, TypeScript, JavaScript 
- **AI/ML:** Google Gemini 2.5 Flash API (@google/generative-ai) for story generation, emotion analysis, and context detection.
- **Charts:** CanvasJS for dashboard visualizations.
- **Image Generation:** Satori, satori-html, @resvg/resvg-js for dynamic OG images.
- **Storage:** Browser localStorage for user context persistence.
---

PS - Website is purposefully made with important yet minimal details. We prioritised UX designs with our users with ASD in mind to prevent overstimulation or visual overload for users :)

![WakaTime Badge](https://waka.hackclub.com/api/badge/U078K08NN2Y/interval:any/project:IWILLWIN)
