#config.py 

import google.generativeai as genai

# ---------------- CONFIG ----------------
API_KEY = "YOUR_GEMINI_KEY"
genai.configure(api_key=API_KEY)

# Model name
LLM_MODEL = "gemini-1.5-flash"
