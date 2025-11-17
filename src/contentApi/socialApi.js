import { axiosInstance } from "@/utils/axios";

export const getSocialConfigs = async () => {
    const response = await axiosInstance.get('/facebook-configs');
    return response.data.data;
};

export const getSocialConfigById = async (id) => {
    const response = await axiosInstance.get(`/facebook-configs/${id}`);
    return response.data.data;
};

export const createSocialConfig = async (data) => {
    const response = await axiosInstance.post('/facebook-configs', data);
    return response.data.data;
};

export const updateSocialConfig = async (id, data) => {
    const response = await axiosInstance.put(`/facebook-configs/${id}`, data);
    return response.data.data;
};

export const deleteSocialConfig = async (id) => {
    const response = await axiosInstance.delete(`/facebook-configs/${id}`);
    return response.data;
};
