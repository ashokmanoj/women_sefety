import axios from "axios";
import AppClient from "../util/AppClient.ts";

const API_BASE_URL = 'https://women-safety-server-side.onrender.com/api/emergency/';
// const API_BASE_URL = "http://localhost:5002/api/emergency/";

/*export const emergencyApi = {
    sendEmergencyAlert: async (data: {
        userId: string;
        location: string;
        timestamp: string;
    }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}save`, data);
            return response.data;
        } catch (error) {
            console.error('Error sending emergency alert:', error);
            throw error;
        }
    },

}*/

export const emergencyApi = {
    sendEmergencyAlert: async (data: {
        userId: string;
        contacts: any[];
        lastLocation: {
            latitude: number;
            longitude: number;
        };
        panicMode: {
            active: boolean;
            recording: boolean;
        };
    }) => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            const response = await axiosInstance.post(`${API_BASE_URL}/save`, data);
            return response.data;
        } catch (error) {
            console.error('Error sending emergency alert:', error);
            throw error;
        }
    },
};
