import apiClient from './apiClient';


const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  delete apiClient.defaults.headers.common['Authorization'];
};

const authService = {
    async login(userName, password){
        try{
            const response = await apiClient.post('/api/auth/login',{
                userName,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userName', response.data.userName);

                setAuthToken(response.data.token)
            }

            return response.data
        } catch (error) {
            throw error.response?.data || 'login failed';
        }
    },

    async register(userName, password){
        try{
            const response = await apiClient.post('/api/auth/register',{
                userName,
                password
            });

            return response.data
        } catch (error) {
            throw error.response?.data || 'registration failed';
        }
    },

    async logout() {
        try{
            await apiClient.post('/api/auth/logout');
        }catch(error){
            console.error('Server logout failure: ', error);
        }finally{
            clearAuthData();
        }        
    },

    async getCurrentUser(){
        try{
            const response = await apiClient.get('/api/auth/me');
            return response.data;
        } catch (error) {
            if (error.response?.status === 401){
                await this.logout();
            }
            throw error.response?.data
        }
    },

    async refreshToken() {
        try{
            const response = await apiClient.post('/api/auth/refresh');
            if (response.data.token){
                localStorage.setItem('token', response.data.token);
                setAuthToken(response.data.token);
            }
            return response.data;
        } catch (error) {
            this.logout();
            throw error.response?.data || 'token refresh failure';
        }
    },

    isLoggedIn(){
        return !!localStorage.getItem('token');
    },

    async verifyAuthentication(){
        const token = this.getToken();
        if (!token){
            return false;
        }

        try{
            await this.getCurrentUser();
            return true;
        }catch (error) {
            await this.logout();
            return false;
        }
    },

    isTokenExpired(){
        const token = this.getToken();
        if (!token) return true;

        try{
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now()/1000;
            return payload.exp < currentTime;
        }catch (error){
            return true;
        }
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getCurrentUserInfo() {
        return {
            userId: localStorage.getItem('userId'),
            userName: localStorage.getItem('userName'),
            token: localStorage.getItem('token')
        };
    },

    initializeAuth() {
        const token = this.getToken();
        if (token) {
            setAuthToken(token);
        }
    }
};

export default authService;