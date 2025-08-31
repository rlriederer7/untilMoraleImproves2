import joblib
import os

from utils import download_clean_separate
from training_utils import train_model

def ml_pipeline():

    os.makedirs('models',exist_ok=True)
    os.makedirs('preprocessors',exist_ok=True)

    causes, outcomes = download_clean_separate()
    model, metrics = train_model(causes, outcomes)

    joblib.dump(model, 'models/model.pkl')
    return metrics

if __name__ == "__main__":
    metrics = ml_pipeline()
    print(metrics)