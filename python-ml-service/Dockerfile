FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY src ./src

RUN mkdir -p models

ENV PYTHONPATH="/app/src/processing:${PYTHONPATH}"

EXPOSE 8000

RUN python src/processing/pipeline.py

CMD ["uvicorn", "src.processing.prediction:app", "--host", "0.0.0.0", "--port", "8000"]