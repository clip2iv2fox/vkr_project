import axios from "axios";

// используемый адрес подключения к серверу
const baseURL = "http://192.168.56.1:8000";

const api = axios.create({
    baseURL,
});

// get time
export const get_time = async () => {
    try {
        const response = await api.get("/props?page=1&limit=999");
        return response.data;
    } catch (error) {
        console.error('Ошибка:' + error);
        throw error;
    }
};

// get data
export const get = async (page) => {
    try {
        const response = await api.get(`/${page}page=1&limit=999`);
        return response.data;
    } catch (error) {
        console.error('Ошибка:' + error);
        throw error;
    }
};

// get data by id
export const get_id = async (page) => {
    try {
        const response = await api.get(`/${page}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка:' + error);
        throw error;
    }
};

// delete
export const deleteFlightApi = async (page, id) => {
    try {
        const response = await api.delete(`/${page}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка:' + error);
        throw error;
    }
}

// put
export const change = async (page, id, data) => {
    try {
        const response = await api.put(`/${page}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Ошибка:' + error);
        throw error;
    }
};

//post
export const post = async (page, data) => {
    try {
        const response = await api.post(`/${page}`, data);
        return response.data;
    } catch (error) {
        console.error('Ошибка:' + error);
        throw error;
    };
}