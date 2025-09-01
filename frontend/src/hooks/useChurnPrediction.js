import { useState } from "react";
import {predictionService} from "../services/predictionService";

export const useChurnPrediction = () => {
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null)

    const predictChurn = async (churnData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await predictionService.predictCustomer(churnData)
            setPrediction(response.data);
            return { success: true, data: response.data }
        } catch (error) {
            setError(error.message)
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }

    const clearPrediction = () => {
        setPrediction(null);
        setError(null);
    }

    return {
        prediction,
        loading,
        error,
        predictChurn,
        clearPrediction,
    }
}