npm install && npm run build

npm run start

###################
python -m venv venv
source venv/bin/activate  # 在Windows上使用 `venv\Scripts\activate`

pip install Flask flask-cors

python app.py

# http://localhost:5000

#test:
curl http://localhost:5000/assignments

curl http://localhost:5000/assignments/1

curl -X POST http://localhost:5000/assignments -H "Content-Type: application/json" -d '{"title": "lab1", "description": "Description of lab1"}'

curl -X POST http://localhost:5000/assignments/1/run_tests

curl -X POST http://localhost:5000/assignments/1/automate_grading