/// <reference types="vite/client" />
import axios, { 
    AxiosError, 
    AxiosResponse, 
    InternalAxiosRequestConfig,
    AxiosRequestConfig
} from 'axios';
import { User, Farm, Crop, Disease, SoilTest, WeatherData, MarketPrice } from '../types/api';

// Error interface for backend responses
interface ApiError {
    detail: string;
    status_code?: number;
}

const API_BASE_URL = (() => {
    const envUrl = import.meta.env.VITE_API_BASE_URL?.trim();
    if (envUrl && envUrl !== '') {
        return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    }
    return 'http://localhost:8000/api/v1';
})();

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Clear token and redirect to login if refresh fails
            const handleAuthError = () => {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(error);
            };

            // Try to refresh token
            try {
                // TODO: Implement proper token refresh mechanism
                // const response = await authApi.refreshToken();
                // const { access_token } = response.data;
                // localStorage.setItem('accessToken', access_token);
                // originalRequest.headers.Authorization = `Bearer ${access_token}`;
                // return apiClient(originalRequest);
                return handleAuthError();
            } catch (refreshError) {
                return handleAuthError();
            }
        }

        // Handle other errors
        const errorMessage = error.response?.data?.detail || error.message;
        console.error('API Error:', errorMessage);
        return Promise.reject(error);
    }
);

// Auth API
export const authApi = {
    register: (userData: Omit<User, 'id'>) => 
        apiClient.post<User>('/auth/register', userData),
    
    login: (email: string, password: string) =>
        apiClient.post<{ access_token: string, token_type: string }>('/auth/token', 
            new URLSearchParams({ username: email, password })),
    
    getCurrentUser: () => 
        apiClient.get<User>('/auth/me')
};

// Farm API
export const farmApi = {
    getAllFarms: () => 
        apiClient.get<Farm[]>('/farms'),
    
    getFarmById: (id: number) => 
        apiClient.get<Farm>(`/farms/${id}`),
    
    createFarm: (farmData: Omit<Farm, 'id'>) => 
        apiClient.post<Farm>('/farms', farmData),
    
    updateFarm: (id: number, farmData: Partial<Farm>) => 
        apiClient.put<Farm>(`/farms/${id}`, farmData),
    
    deleteFarm: (id: number) => 
        apiClient.delete(`/farms/${id}`),
    
    getFarmSoilTests: (farmId: number) => 
        apiClient.get<SoilTest[]>(`/farms/${farmId}/soil-tests`)
};

// Crop API
export const cropApi = {
    detectDisease: (image: File) => {
        const formData = new FormData();
        formData.append('image', image);
        return apiClient.post<Disease>('/crops/disease-detection', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    getCropRecommendations: (params: { 
        soil_type: string, 
        season: string, 
        location: string 
    }) => apiClient.post('/crops/recommendation', params),
    
    predictYield: (params: {
        crop_id: number,
        area: number,
        soil_type: string,
        irrigation_type: string,
        season: string
    }) => apiClient.post('/crops/yield-prediction', params)
};

// Weather API
export const weatherApi = {
    getCurrentWeather: (location: string) => 
        apiClient.get<WeatherData>(`/weather/current/${location}`),
    
    getWeatherForecast: (location: string, days: number = 7) => 
        apiClient.get<WeatherData[]>(`/weather/forecast/${location}`, {
            params: { days }
        }),
    
    getWeatherHistory: (location: string, days: number = 30) => 
        apiClient.get<WeatherData[]>(`/weather/history/${location}`, {
            params: { days }
        })
};

// Market API
export const marketApi = {
    getCurrentPrices: (params?: { market?: string, crop_id?: number }) => 
        apiClient.get<MarketPrice[]>('/market/prices/current', { params })
            .then(response => response.data)
            .catch((error: AxiosError<ApiError>) => {
                console.error('Error fetching current prices:', error.response?.data?.detail);
                throw error;
            }),
    
    getPriceHistory: (cropId: number, days: number = 30) => 
        apiClient.get<MarketPrice[]>(`/market/prices/history/${cropId}`, {
            params: { days }
        })
            .then(response => response.data)
            .catch((error: AxiosError<ApiError>) => {
                console.error('Error fetching price history:', error.response?.data?.detail);
                throw error;
            }),
    
    getMarkets: () => 
        apiClient.get<string[]>('/market/markets')
            .then(response => response.data)
            .catch((error: AxiosError<ApiError>) => {
                console.error('Error fetching markets:', error.response?.data?.detail);
                throw error;
            }),
    
    getMarketTrends: (cropId: number) => 
        apiClient.get<{
            trend: string;
            current_price: number;
            average_price: number;
            price_change: number;
            forecast: string;
        }>(`/market/trends/${cropId}`)
            .then(response => response.data)
            .catch((error: AxiosError<ApiError>) => {
                console.error('Error fetching market trends:', error.response?.data?.detail);
                throw error;
            })
};

export default {
    auth: authApi,
    farms: farmApi,
    crops: cropApi,
    weather: weatherApi,
    market: marketApi
};