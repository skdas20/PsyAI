from flask import Flask, request, jsonify, render_template
import json
import random
from ml_model import analyze_responses, analyze_text
from quote_generator import generate_quote, generate_personalized_quote

app = Flask(__name__, static_folder='..', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/about')
def about():
    return app.send_static_file('about.html')

@app.route('/screening')
def screening():
    return app.send_static_file('screening.html')

@app.route('/vr-therapy')
def vr_therapy():
    return app.send_static_file('vr-therapy.html')

@app.route('/iot-analysis')
def iot_analysis():
    return app.send_static_file('iot-analysis.html')

@app.route('/pricing')
def pricing():
    return app.send_static_file('pricing.html')

@app.route('/login')
def login():
    return app.send_static_file('login.html')

@app.route('/register')
def register():
    return app.send_static_file('register.html')

@app.route('/api/analyze-screening', methods=['POST'])
def analyze_screening():
    data = request.json
    responses = data.get('responses', [])
    
    # Use the ML model to analyze responses
    result = analyze_responses(responses)
    
    return jsonify(result)

@app.route('/api/analyze-text', methods=['POST'])
def analyze_text_route():
    data = request.json
    text = data.get('text', '')
    
    # Use the ML model to analyze text
    result = analyze_text(text)
    
    return jsonify(result)

@app.route('/api/generate-quote', methods=['POST'])
def generate_quote_route():
    data = request.json
    options = data.get('options', {})
    
    # Generate a quote based on options
    quote = generate_quote(options)
    
    return jsonify({'quote': quote})

@app.route('/api/generate-personalized-quote', methods=['POST'])
def generate_personalized_quote_route():
    data = request.json
    text = data.get('text', '')
    
    # Generate a personalized quote based on text
    quote = generate_personalized_quote(text)
    
    return jsonify({'quote': quote})

if __name__ == '__main__':
    app.run(debug=True)

