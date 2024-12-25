from flask import Flask, request, jsonify
# from flask_cors import CORS

import google.generativeai as genai

# Set up the API key
genai.configure(api_key="AIzaSyD6mhNXd_jncSCIUtLP_kSGznr9c_RrzFc")
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes and origins


@app.route('/processquery', methods=['GET'])
def process_query():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is required!"}), 400

    try:
        # Use the correct method for generating text
        response = model.generate_content(query + "explain in just 20 words")
        generated_text = response.text  # Extract the generated text
        print(generated_text)
        return jsonify({"response": generated_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
