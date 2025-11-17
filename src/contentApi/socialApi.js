import { axiosInstance } from "@/utils/axios";

export const getSocialConfigs = async () => {
    const response = await axiosInstance.get('/api/facebook-configs');
    return response.data;
};

export const getSocialConfigById = async (id) => {
    const response = await axiosInstance.get(`/api/facebook-configs/${id}`);
    return response.data;
};

export const createSocialConfig = async (data) => {
    const response = await axiosInstance.post('/api/facebook-configs', data);
    return response.data;
};

export const updateSocialConfig = async (id, data) => {
    const response = await axiosInstance.put(`/api/facebook-configs/${id}`, data);
    return response.data;
};

export const deleteSocialConfig = async (id) => {
    const response = await axiosInstance.delete(`/api/facebook-configs/${id}`);
    return response.data;
};
