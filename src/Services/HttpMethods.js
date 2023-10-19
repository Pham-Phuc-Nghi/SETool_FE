import { AxiosInstance } from "../config/AxiosInstance";
import handleError from "../config/axiosError";

// todo: GET
export const getRequest = async (url) => {
    try {
        const res = await AxiosInstance.get(`${url}`);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

// todo: POST
export const postRequest = async (url, payload) => {
    try {
        const res = AxiosInstance.post(`${url}`, payload);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

// todo: PUT
export const putRequest = async (url, payload) => {
    try {
        const res = AxiosInstance.put(`${url}`, payload);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

// todo: DELETE
export const deleteRequest = async (url) => {
    try {
        const res = AxiosInstance.delete(`${url}`);
        return res;
    } catch (error) {
        return handleError(error);
    }
};

// todo: PATCH
export const patchRequest = async (url, payload) => {
    try {
        const res = AxiosInstance.patch(`${url}`, payload);
        return res;
    } catch (error) {
        return handleError(error);
    }
};
