import api from "@/utils/api";

export const getFacebookConfigs = async (params = {}) => {
    try {
        const response = await api.get("/facebook-configs", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching Facebook configs:", error);
        throw error;
    }
};

export const getFacebookConfigById = async (id) => {
    try {
        const response = await api.get(`/facebook-configs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Facebook config:", error);
        throw error;
    }
};

export const createFacebookConfig = async (payload) => {
    try {
        const response = await api.post("/facebook-configs", payload);
        return response.data;
    } catch (error) {
        console.error("Error creating Facebook config:", error);
        throw error;
    }
};

export const updateFacebookConfig = async (id, payload) => {
    try {
        const response = await api.put(`/facebook-configs/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error("Error updating Facebook config:", error);
        throw error;
    }
};

export const deleteFacebookConfig = async (id) => {
    try {
        const response = await api.delete(`/facebook-configs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting Facebook config:", error);
        throw error;
    }
};
