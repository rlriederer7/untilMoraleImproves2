import { useState } from "react";
import { retrainService } from "../services/retrainService";

export const useRetrain = () => {
    const [loading, setLoading] = useState(false);
    const [accuracy, setAccuracy] = useState(null);
    const [error, setError] = useState(null)

    const fetchAccuracy = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await retrainService.retrainModel()
            setAccuracy(response.data);
            return { success: true, data: response.data }
        } catch (error) {
            setError(error.message)
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }

    const clearAccuracy = () => {
        setAccuracy(null);
        setError(null);
    }

    return {
        accuracy,
        loading,
        error,
        fetchAccuracy,
        clearAccuracy,
    }
}