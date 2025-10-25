import api from "@/utils/api";

export const createLead = async (lead) => {
    try {
        const response = await api.post("/leads", lead);
        return response.data;
    } catch (error) {
        console.error("Error creating lead:", error);
        throw error;
    }
}
