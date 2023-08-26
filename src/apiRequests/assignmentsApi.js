import axios from "axios";

const API_BASE_URL = 'http://localhost:3001/api';

export const getAllAssignments = async () => {
    try {
        const allAssignments = await axios.get(`${API_BASE_URL}/tasks/getTasks`);
        return allAssignments.data;
    } catch (error) {
        throw error;
    }
};

