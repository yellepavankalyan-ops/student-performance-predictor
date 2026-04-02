from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["studentDB"]
collection = db["records"]

# Load model
model = pickle.load(open("model.pkl", "rb"))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    name = data.get('name')
    roll = data.get('roll')
    marks = data['marks']
    attendance = data['attendance']
    cgpa = data['cgpa']

    prediction = model.predict([[marks, attendance, cgpa]])[0]

    # SMART suggestions (main logic)
    suggestions = []

    if marks < 50:
        suggestions.append("Focus on core subjects and practice daily")
    if attendance < 75:
        suggestions.append("Attend classes regularly to improve understanding")
    if cgpa < 6:
        suggestions.append("Revise concepts and improve consistency")

    if not suggestions:
        suggestions.append("Keep maintaining your performance!")

    # Save to MongoDB
    record = {
        "name": name,
        "roll": roll,
        "marks": marks,
        "attendance": attendance,
        "cgpa": cgpa,
        "prediction": prediction,
        "suggestions": suggestions
    }

    collection.insert_one(record)

    return jsonify({
        "suggestions": suggestions
    })


@app.route('/get_records', methods=['GET'])
def get_records():
    records = list(collection.find({}, {"_id": 0}))
    return jsonify(records)


if __name__ == "__main__":
    app.run(debug=True)