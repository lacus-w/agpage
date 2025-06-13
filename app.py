from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Sample data for assignments
assignments_data = [
    {"id": 1, "title": "Week 1 Homework", "description": "Complete exercises on basic JavaScript."},
    {"id": 2, "title": "Week 2 Project", "description": "Build a simple web application using React."}
]

@app.route('/assignments', methods=['GET'])
def get_assignments():
    return jsonify(assignments_data)

@app.route('/assignments/<int:assignment_id>', methods=['GET'])
def get_assignment(assignment_id):
    assignment = next((a for a in assignments_data if a['id'] == assignment_id), None)
    if assignment is not None:
        return jsonify(assignment)
    else:
        abort(404, description="Assignment not found")

@app.route('/assignments', methods=['POST'])
def add_assignment():
    if not request.json or 'title' not in request.json or 'description' not in request.json:
        abort(400, description="Bad Request")
    new_assignment = {
        "id": assignments_data[-1]['id'] + 1 if assignments_data else 1,
        "title": request.json['title'],
        "description": request.json['description']
    }
    assignments_data.append(new_assignment)
    return jsonify(new_assignment), 201

@app.route('/assignments/<int:assignment_id>/run_tests', methods=['POST'])
def run_tests(assignment_id):
    assignment = next((a for a in assignments_data if a['id'] == assignment_id), None)
    if assignment is None:
        abort(404, description="Assignment not found")
    
    test_count = random.randint(3, 7)  # Random number of tests between 3 and 7
    results = "Running tests...\n\n"
    for i in range(1, test_count + 1):
        passed = random.choice([True, False])  # Randomly pass or fail each test
        results += f"Test {i}: {'Passed' if passed else 'Failed'}\n"
    
    return jsonify({"results": results})

@app.route('/assignments/<int:assignment_id>/automate_grading', methods=['POST'])
def automate_grading(assignment_id):
    assignment = next((a for a in assignments_data if a['id'] == assignment_id), None)
    if assignment is None:
        abort(404, description="Assignment not found")
    
    score = random.randint(0, 100)  # Random score between 0 and 100
    comments = ["Good job!", "Needs improvement.", "Excellent work!", "Try harder next time.", "Keep it up!"]
    comment = random.choice(comments)  # Random comment
    
    return jsonify({"score": score, "comment": comment})

if __name__ == '__main__':
    app.run(debug=True)



