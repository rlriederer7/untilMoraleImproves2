import kagglehub
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import os
import kagglehub
import joblib

def download_telco_data():
    path = kagglehub.dataset_download("blastchar/telco-customer-churn")
    return pd.read_csv(f"{path}/WA_Fn-UseC_-Telco-Customer-Churn.csv")

def clean_telco_data(df):
    yes_no_cols = ['Partner','Dependents','PhoneService','OnlineSecurity','OnlineBackup','DeviceProtection','TechSupport','StreamingTV','StreamingMovies','PaperlessBilling','Churn']
    for col in yes_no_cols:
        df[col] = df[col].replace({'Yes':1,'No':0})

    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df = df.dropna()

    return df

def separate_fit_scale(df):
    causes = df.drop('Churn', axis=1)
    outcomes = df['Churn']
    scaler = StandardScaler()

    numerical_cols = causes.select_dtypes(include=['float64', 'int64']).columns
    causes[numerical_cols] = scaler.fit_transform(causes[numerical_cols])

    label_encoders = {}
    categorical_cols = ['gender', 'Contract', 'PaymentMethod', 'InternetService']

    for col in categorical_cols:
        le = LabelEncoder()
        causes[col] = le.fit_transform(causes[col])
        label_encoders[col] = le

    joblib.dump(scaler, 'preprocessors/scaler.pkl')
    joblib.dump(label_encoders, 'preprocessors/label_encoders.pkl')

    return causes, outcomes

def scale_prediction(df):
    causes = df.copy()
    scaler = joblib.load('preprocessors/scaler.pkl')
    label_encoders = joblib.load('preprocessors/label_encoders.pkl')

    numerical_cols = causes.select_dtypes(include=['float64', 'int64']).columns
    causes[numerical_cols] = scaler.transform(causes[numerical_cols])

    categorical_cols = ['gender', 'Contract', 'PaymentMethod', 'InternetService']

    for col in categorical_cols:
        causes[col] = label_encoders[col].transform(causes[col])

    return causes


def download_clean_separate():
    df = download_telco_data()
    df = clean_telco_data(df)
    causes, outcomes = separate_fit_scale(df)
    return causes, outcomes

print(download_clean_separate())