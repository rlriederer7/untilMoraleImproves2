@echo off

start cmd /k "cd backend && call mvnw spring-boot:run"

start cmd /k "cd frontend && npm start"

call .venv\Scripts\activate.bat
python python-ml-service\src\processing\prediction.py