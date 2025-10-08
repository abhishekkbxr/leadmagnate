import api from "@/utils/api";

export const createOrganisation = async (organisation) => {
    try {
        const response = await api.post("/organisations?module_id=3&action=create", { organisation });
        console.log("Create Organisation Response:", response);
        return response.data;
    } catch (error) {
        console.error("Error creating organisation:", error);
        throw error;
    }
}

export const getOrganisations = async () => {
    try {
        const response = await api.get("/organisations?module_id=3&action=read");
        console.log("Get Organisations Response:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching organisations:", error);
        throw error;
    }
}

export const getOrganisationById = async (id) => {
    try {
        const response = await api.get(`/organisations/${id}?module_id=3&action=read`);
        return response.data;
    } catch (error) {
        console.error("Error fetching organisation by id:", error);
        throw error;
    }
}

export const updateOrganisation = async (id, organisation) => {
    try {
        const response = await api.put(`/organisations/${id}?module_id=3&action=update`, { organisation });
        return response.data;
    } catch (error) {
        console.error("Error updating organisation:", error);
        throw error;
    }
}

export const deleteOrganisation = async (id) => {
    try {
        const response = await api.delete(`/organisations/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting organisation:", error);
        throw error;
    }
}
