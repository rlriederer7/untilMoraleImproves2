from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from utils import scale_prediction, clean_telco_data
from shared import model_path, scaler_path, label_encoders_path
import logging
from pipeline import ml_pipeline

app = FastAPI(title='Predict-o-matica')

logger = logging.getLogger("uvicorn.error")

try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    label_encoders = joblib.load(label_encoders_path)
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

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/train")
async def train_model():
    try:
        metrics = ml_pipeline()
        global model, scaler, label_encoders
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        label_encoders = joblib.load(label_encoders_path)

        return {
            "status": "success",
            "message": "Training complete",
            "metrics": metrics
        }

    except Exception as e:
        logger.error(f"model training error {e}")
        raise HTTPException(status_code=500, detail = f"training error {str(e)}")


@app.post("/predict")
async def predict_churn(request: PredictionRequest):
    logger.info(f"Incoming request: {request}")
    predictable = pd.DataFrame([request.model_dump()])
    logger.info(f"Predictable dataframe: {predictable}")
    prediction_data = scale_prediction(clean_telco_data(predictable))

    probability = model.predict_proba(prediction_data)[0][1]

    return {"churn_probability": float(probability)}

@app.get("/coefficients")
async def get_coefficients():
    try:
        feature_names = [
            'gender', 'SeniorCitizen', 'Partner', 'Dependents', 'tenure',
            'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity',
            'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV',
            'StreamingMovies', 'Contract', 'PaperlessBilling', 'PaymentMethod',
            'MonthlyCharges', 'TotalCharges'
        ]

        coefficients = model.coef_[0]
        intercept = model.intercept_[0]

        coeff_dict = {}
        for i, feature in enumerate(feature_names):
            coeff_dict[feature] = float(coefficients[i])

        sorted_coeffs = sorted(coeff_dict.items(), key=lambda x: abs(x[1]), reverse=True)

        response = {
            "intercept": float(intercept),
            "coefficients": coeff_dict,
            "feature_ranking": [
                {
                    "feature":feature,
                    "coefficient":coeff,
                    "impact": "Increases churn" if coeff > 0 else "Decreases churn",
                    "magnitude": abs(coeff)
                }
                for feature, coeff in sorted_coeffs
            ]
        }

        return response

    except Exception as e:
        logger.error(f"Error getting coefficients: {e}")
        raise HTTPException(status_code=500, detail="Error fetching coefficients")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)