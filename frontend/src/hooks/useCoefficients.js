import { useState } from "react";
import { coefficientService } from "../services/coefficientService";

export const useCoefficients = () => {
    const [loading, setLoading] = useState(false);
    const [coefficients, setCoefficients] = useState(null);
    const [error, setError] = useState(null)

    const fetchCoefficients = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await coefficientService.getCoefficients()
            setCoefficients(response.data);
            return { success: true, data: response.data }
        } catch (error) {
            setError(error.message)
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }

    const clearCoefficients = () => {
        setCoefficients(null);
        setError(null);
    }

    return {
        coefficients,
        loading,
        error,
        fetchCoefficients,
        clearCoefficients,
    }
}