import { Incident } from "../store/slices/incidentSlice";
import axios from "axios";
import Cookies from "js-cookie";
import AppClient from "../util/AppClient";

// Localhost API
// const API_BASE_URL = 'http://localhost:5002/api/incident/';
// For production, you can switch to:
const API_BASE_URL = 'https://women-safety-server-side.onrender.com/api/incident/';

export const incidentApi = {
    // Save a new incident
    saveIncident: async (data: Partial<Incident>): Promise<Incident> => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            const response = await axiosInstance.post<Incident>(`${API_BASE_URL}save`, data, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Server Error: ${error.response.data}`);
            } else if (error.request) {
                throw new Error("No response from server.");
            } else {
                throw new Error(`Error saving incident: ${error.message}`);
            }
        }
    },

    // Fetch incidents for the current user
    fetchIncidents: async (): Promise<Incident[]> => {
        try {
            const userId = Cookies.get('user_id');

            if (!userId) {
                throw new Error("User ID is missing from cookies.");
            }

            const response = await fetch(`${API_BASE_URL}incidents/${userId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${errorText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                const textResponse = await response.text();
                throw new Error(`Unexpected response format: ${textResponse}`);
            }
        } catch (error) {
            console.error("Error fetching incidents:", error);
            throw error;
        }
    },

    // Update an existing incident
    updateIncidents: async (incident: Incident): Promise<Incident> => {
        try {
            console.log(`[*] Updating incident with ID ${incident._id}:`, incident);
            const axiosInstance = AppClient.getAxiosInstance();
            const response = await axiosInstance.put(`${API_BASE_URL}update/${incident._id}`, incident);
            return response.data;
        } catch (error) {
            console.error("Error updating incident:", error);
            throw error;
        }
    },

    // Delete an incident by ID
    deleteIncidents: async (id: string): Promise<void> => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            await axiosInstance.delete(`${API_BASE_URL}delete/${id}`);
        } catch (error) {
            console.error("Error deleting incident:", error);
            throw error;
        }
    },
};
