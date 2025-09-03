import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, 'models', 'model.pkl')
scaler_path = os.path.join(BASE_DIR, 'preprocessors', 'scaler.pkl')
label_encoders_path = os.path.join(BASE_DIR, 'preprocessors', 'label_encoders.pkl')