
import React, { useState } from "react";
import { useChurnPrediction } from "../hooks/useChurnPrediction";

const ChurnPredictionPage = () => {
    const { prediction, loading, error, predictChurn, clearPrediction } = useChurnPrediction();

    const [formData, setFormData] = useState({
        gender: '',
        SeniorCitizen: 0,
        Partner: '',
        Dependents: '',
        tenure: 0,
        PhoneService: '',
        MultipleLines: '',
        InternetService: '',
        OnlineSecurity: '',
        OnlineBackup: '',
        DeviceProtection: '',
        TechSupport: '',
        StreamingTV: '',
        StreamingMovies: '',
        Contract: '',
        PaperlessBilling: '',
        PaymentMethod: '',
        MonthlyCharges: 0,
        TotalCharges: 0
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await predictChurn(formData);
    };

    const handleReset = () => {
        setFormData({
            gender: '',
            SeniorCitizen: 0,
            Partner: '',
            Dependents: '',
            tenure: 0,
            PhoneService: '',
            MultipleLines: '',
            InternetService: '',
            OnlineSecurity: '',
            OnlineBackup: '',
            DeviceProtection: '',
            TechSupport: '',
            StreamingTV: '',
            StreamingMovies: '',
            Contract: '',
            PaperlessBilling: '',
            PaymentMethod: '',
            MonthlyCharges: 0,
            TotalCharges: 0
        });
        clearPrediction();
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h2>Customer Churn Prediction</h2>

            {error && (
                <div style={{
                    color: 'red',
                    margin: '10px 0',
                    padding: '10px',
                    border: '1px solid red',
                    borderRadius: '4px',
                    backgroundColor: '#ffeeee'
                }}>
                    Error: {error}
                </div>
            )}

            {prediction && (
                <div style={{
                    margin: '20px 0',
                    padding: '15px',
                    border: '2px solid #000000',
                    borderRadius: '8px',
                    backgroundColor: '#00ff00'
                }}>
                    <h3>Prediction Result</h3>
                    <p>Churn Probability: <strong>{(prediction.churn_probability * 100).toFixed(2)}%</strong></p>
                    <p>Risk Level: <strong>
                        {prediction.churn_probability > 0.7 ? 'High' :
                            prediction.churn_probability > 0.3 ? 'Medium' : 'Low'}
                    </strong></p>
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label>Gender:</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label>Senior Citizen:</label>
                        <select name="SeniorCitizen" value={formData.SeniorCitizen} onChange={handleInputChange} required>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>

                    <div>
                        <label>Partner:</label>
                        <select name="Partner" value={formData.Partner} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div>
                        <label>Dependents:</label>
                        <select name="Dependents" value={formData.Dependents} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div>
                        <label>Tenure (months):</label>
                        <input
                            type="number"
                            name="tenure"
                            value={formData.tenure}
                            onChange={handleInputChange}
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label>Phone Service:</label>
                        <select name="PhoneService" value={formData.PhoneService} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div>
                        <label>Multiple Lines:</label>
                        <select name="MultipleLines" value={formData.MultipleLines} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="No phone service">No phone service</option>
                        </select>
                    </div>

                    <div>
                        <label>Internet Service:</label>
                        <select name="InternetService" value={formData.InternetService} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="DSL">DSL</option>
                            <option value="Fiber optic">Fiber optic</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div>
                        <label>Contract:</label>
                        <select name="Contract" value={formData.Contract} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="Month-to-month">Month-to-month</option>
                            <option value="One year">One year</option>
                            <option value="Two year">Two year</option>
                        </select>
                    </div>

                    <div>
                        <label>Payment Method:</label>
                        <select name="PaymentMethod" value={formData.PaymentMethod} onChange={handleInputChange} required>
                            <option value="">Select...</option>
                            <option value="Electronic check">Electronic check</option>
                            <option value="Mailed check">Mailed check</option>
                            <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                            <option value="Credit card (automatic)">Credit card (automatic)</option>
                        </select>
                    </div>

                    <div>
                        <label>Monthly Charges ($):</label>
                        <input
                            type="number"
                            name="MonthlyCharges"
                            value={formData.MonthlyCharges}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label>Total Charges ($):</label>
                        <input
                            type="number"
                            name="TotalCharges"
                            value={formData.TotalCharges}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {['OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'PaperlessBilling'].map(field => (
                        <div key={field}>
                            <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                            <select name={field} value={formData[field]} onChange={handleInputChange} required>
                                <option value="">Select...</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                {field !== 'PaperlessBilling' && <option value="No internet service">No internet service</option>}
                            </select>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
                        {loading ? 'Predicting...' : 'Predict Churn'}
                    </button>
                    <button type="button" onClick={handleReset} style={{ padding: '10px 20px' }}>
                        Reset Form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChurnPredictionPage;