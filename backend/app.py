from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyA07FmZueVLgK_ceH-CIh_PtbuQfMGw9Rg")

model = genai.GenerativeModel("models/gemini-1.5-pro")

@app.route("/explain", methods=["POST"])
def explain():
    data = request.get_json()
    topic = data.get("prompt")

    prompt = f"""Explain the topic "{topic}" at three different levels:

    🧸 For a 5-year-old:
    <KIDS>

    🧑‍🎓 For a High Schooler:
    <TEEN>

    👩‍🏫 For a College Student:
    <EXPERT>

    Please replace <KIDS>, <TEEN>, and <EXPERT> with clear, engaging explanations.
    """

    try:
        response = model.generate_content(prompt)
        text = response.text

        # Debug print
        print("🔍 Raw Response:\n", text)

        # Parse sections
        def extract_section(tag, text):
            import re
            match = re.search(f"{tag}:(.*?)(🧑‍🎓|👩‍🏫|$)", text, re.DOTALL)
            return match.group(1).strip() if match else ""

        kids = extract_section("🧸 For a 5-year-old", text)
        teen = extract_section("🧑‍🎓 For a High Schooler", text)
        expert = extract_section("👩‍🏫 For a College Student", text)

        return jsonify({
            "kids": kids,
            "teen": teen,
            "expert": expert
        })
           
    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500


@app.route('/explain-dyslexia', methods=['POST'])
def explain_dyslexia():
    data = request.json
    topic = data.get('prompt')
    format_type = data.get('format', 'simple')

    prompt = f"""
You are a specialist in accessible learning. Explain the topic "{topic}" in a way that helps people with dyslexia understand easily, using the "{format_type}" style.

📚 Instructions:
- Use short sentences and simple words.
- Use high-contrast text (e.g., dark blue on off-white).
- Use readable fonts like OpenDyslexic or Arial.
- Avoid italic or underlined text. Use bold for emphasis.
- Structure the output **according to the selected format below**.

🧩 Format: "{format_type}"

👉 Guidelines:
1. If format is **simple**, write 3-4 short and clear paragraphs using plain language.
2. If format is **steps**, use numbered bullet points. Each step should be 1-2 lines long.
3. If format is **qa**, follow this structure:
   Q: [Question 1]  
   A: [Short answer]  
   Q: [Question 2]  
   A: [Short answer]  
4. If format is **story**, create a short story with a character learning about the topic, using simple language and short paragraphs.

✳️ End your response cleanly without trailing sentences.
"""

    try:
        response = model.generate_content(prompt)
        return jsonify({ "response": response.text })
    except Exception as e:
        print("❌ Error:", e)
        return jsonify({ "error": str(e) }), 500



if __name__ == "__main__":
    app.run(debug=True)
