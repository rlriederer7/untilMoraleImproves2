import { useState, useEffect, createContext, useContext } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            try {
                authService.initializeAuth();

                if (authService.isLoggedIn() && !authService.isTokenExpired()){
                    const isValid = awaitService.verifyAuthentication();
                    if (isValid) {
                        const userData = await authService.getCurrentUser();
                        setUser(userData);
                        setIsAuthenticated(true);
                    }
                } else if (authService.isLoggedIn()){
                    await authService.logout();
                }

            } catch (error) {
                console.error('Auth init failed: ', error);
                await authService.logout();
                setIsAuthenticated(false);
                setUser(null);
            }finally{
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (userName, password) => {
        try {
            setLoading(true);
            const response  = await authService.login(userName, password);

            const userData = await authService.getCurrentUser();
            setUser(userData);
            setIsAuthenticated(true);

            return response;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const register = async (userName, password) => {
        try {
            setLoading(true);
            const response = await authService.register(userName, password);
            return response;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await authService.refreshToken();
            return response;
        } catch (error) {
            await logout();
            throw error;
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        refreshToken,
        getCurrentUser: authService.getCurrentUser,
        isLoggedIn: authService.isLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth only works when wrapped by AuthProvider')
    }
    return context;
};