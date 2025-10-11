import api from "@/utils/api";

export const createUser = async (user) => {
    try {
        const response = await api.post("/users?module_id=3&action=create", user);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await api.get("/users?module_id=1&action=read");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}?module_id=7&action=read`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw error;
    }
}

export const updateUser = async (id, user) => {
    try {
        const response = await api.put(`/users/${id}?module_id=3&action=update`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}?module_id=3&action=delete`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}