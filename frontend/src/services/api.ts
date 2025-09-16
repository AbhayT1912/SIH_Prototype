/// <reference types="vite/client" />
import axios from 'axios';
import { User, Farm, Crop, Disease, SoilTest, WeatherData, MarketPrice } from '../types/api';

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
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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
        apiClient.get<MarketPrice[]>('/market/prices/current', { params }),
    
    getPriceHistory: (cropId: number, days: number = 30) => 
        apiClient.get<MarketPrice[]>(`/market/prices/history/${cropId}`, {
            params: { days }
        }),
    
    getMarkets: () => 
        apiClient.get<string[]>('/market/markets'),
    
    getMarketTrends: (cropId: number) => 
        apiClient.get<{
            trend: string;
            current_price: number;
            average_price: number;
            price_change: number;
            forecast: string;
        }>(`/market/trends/${cropId}`)
};

export default {
    auth: authApi,
    farms: farmApi,
    crops: cropApi,
    weather: weatherApi,
    market: marketApi
};