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

if __name__ == "__main__":
    app.run(debug=True)
