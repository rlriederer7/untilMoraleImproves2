import joblib
import os

from utils import download_clean_separate
from training_utils import train_model

from shared import BASE_DIR, model_path

def ml_pipeline():

    os.makedirs(os.path.join(BASE_DIR, 'models'),exist_ok=True)
    os.makedirs(os.path.join(BASE_DIR, 'preprocessors'),exist_ok=True)

    causes, outcomes = download_clean_separate()
    model, metrics = train_model(causes, outcomes)

    joblib.dump(model, model_path)
    return metrics

if __name__ == "__main__":
    metrics = ml_pipeline()
    print(metrics)