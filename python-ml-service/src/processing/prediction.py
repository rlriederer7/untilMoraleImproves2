from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import logging
import pandas as pd
from utils import scale_prediction, clean_telco_data

app = FastAPI(title='Predict-o-matic')

try:
    model = joblib.load('models/model.pkl')
    scaler = joblib.load('preprocessors/scaler.pkl')
    label_encoders = joblib.load('preprocessors/label_encoders.pkl')
except Exception as e:
    logging.error(e)

class PredictionRequest(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

@app.post("/predict")
async def predict_churn(request: PredictionRequest):
    predictable = pd.DataFrame([request.model_dump()])

    prediction_data = scale_prediction(clean_telco_data(predictable))

    probability = model.predict_proba(prediction_data)[0][1]

    return {"churn_probability": float(probability)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)