import google.generativeai as genai

# Replace with your actual API key
genai.configure(api_key="AIzaSyB4NrFSjYAsrFNQjALFis0fjYhuuiv0UzI")

# List all available models and their generation methods
for m in genai.list_models():
    print(m.name, "-", m.supported_generation_methods)
