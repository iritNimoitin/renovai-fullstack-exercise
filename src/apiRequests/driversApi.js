import axios from "axios";
const API_BASE_URL = 'http://localhost:3001/api';

export const getAllDrivers = async () => {
    try {
        const allAssignments = await axios.get(`${API_BASE_URL}/drivers/getDrivers`);
        return allAssignments.data;
    } catch (error) {
        throw error;
    }
};