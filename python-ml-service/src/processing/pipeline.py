import joblib
import os

from utils import download_clean_separate
from training_utils import train_model

def ml_pipeline():
    causes, outcomes = download_clean_separate()
    model, metrics = train_model(causes, outcomes)

    os.makedirs('models',exist_ok=True)
    os.makedirs('preprocessors',exist_ok=True)

    joblib.dump(model, 'models/model.pkl')
    return metrics

if __name__ == "__main__":
    metrics = ml_pipeline()
    print(metrics)