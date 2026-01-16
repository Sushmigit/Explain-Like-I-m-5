OVERVIEW 

User Input Flow: Users enter a topic in the main input field.
• Prompt Construction: The backend dynamically builds a structured prompt using level-
specific tags.
• AI Communication: Gemini 1.5 Pro processes the prompt and returns age-specific 
explanations.
• Display Logic: The frontend parses and animates these responses using React 
components and Framer Motion.
• Error Handling: Alert-based fallbacks for failed API calls.
• Audio Support: Users can optionally listen to explanations via AudioCompanion (age-
specific tone/speed) or in a fun way using EntertainingVoices (e.g., wizard, comedian, RJ 
modes).
• Accessibility: A DyslexiaPage provides alternate explanation formats such as Simple, 
Steps, Q&A, and Story, enhancing inclusivity.

IMPLEMENTATION DETAILS

Frontend (React)
• Users input a topic via text field.
• On clicking “Explain,” a POST request is triggered to the Flask backend.
• Responses are displayed in animated cards based on age group.
• If the API call fails, a popup alert() is triggered.
• Audio Features: AudioCompanion: Text-to-speech with tone/speed based on selected age group.
• EntertainingVoices: Adds fun character voices like wizard, comedian, and RJ for an engaging experience.
• DyslexiaPage: A dedicated view where users can select among four alternate reading formats for accessibility:
• Simple, Steps, Q&A, Story.

Backend (Flask)Receives topic and constructs structured prompt with custom tags ([KIDS], [TEENS], [EXPERTS]).
• Sends the prompt to Gemini 1.5 Pro via API and receives the multi-sectioned response.
• Uses regex to extract responses for each category.
• Returns a structured JSON containing content for:
• Explanation Cards (Kids, Teens, Experts)
• AudioCompanion playback
• DyslexiaPage formatted variations

Gemini AI Layer
• Gemini 1.5 Pro processes the prompt and provides contextualized, natural-language explanations for each target age 
group.
• The model's output is designed to maintain clarity, age-appropriateness, and tone consistency across all layers, 
including:
• Audio narration (AudioCompanion, EntertainingVoices)
• Alternate explanation structures (DyslexiaPage)
