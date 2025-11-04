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

export const bulkImportLeads = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post(`/leads/bulk-import?module_id=7&action=create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error bulk importing leads:', error);
        throw error;
    }
}
