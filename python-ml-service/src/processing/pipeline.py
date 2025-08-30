import numpy as np
import pandas as pd
import seaborn as sns
import joblib

from matplotlib import pyplot as plt

from utils import download_clean_separate
from training_utils import train_model

def ml_pipeline():
    causes, outcomes = download_clean_separate()
    model, metrics = train_model(causes, outcomes)
    joblib.dump(model, 'model.pkl')
    return metrics