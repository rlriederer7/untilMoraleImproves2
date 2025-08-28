import kagglehub
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import os
import kagglehub

def download_telco_data():
    path = kagglehub.dataset_download("blastchar/telco-customer-churn")
    return pd.read_csv(f"{path}/WA_Fn-UseC_-Telco-Customer-Churn.csv")

def clean_telco_data(df):
    yes_no_cols = ['Partner','Dependents','PhoneService','OnlineSecurity','OnlineBackup','DeviceProtection','TechSupport','StreamingTV','StreamingMovies','PaperlessBilling','Churn']
    for col in yes_no_cols:
        df[col] = df[col].replace({'Yes':1,'No':0})

    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df = df.dropna()

    for col in df:
        print(df[col].value_counts())
    return df

def separate_causes_and_outcomes(df):
    causes = df.drop('Churn', axis=1)
    outcomes = df['Churn']

df = clean_telco_data(download_telco_data())
print(df.shape)