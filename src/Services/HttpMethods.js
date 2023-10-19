import { AxiosInstance } from "../config/AxiosInstance";

// todo: GET
export const getRequest = async (url) => {
    try {
        const res = await AxiosInstance.get(`${url}`);
        return res;
    } catch (error) {
        console.log("🚀 ~ file: HttpMethods.js:9 ~ getRequest ~ error:", error)
    }
};

// todo: POST
export const postRequest = async (url, payload) => {
    try {
        const res = AxiosInstance.post(`${url}`, payload);
        //console.log("Post try: ", res);
        return res;
    } catch (error) {
        console.log("🚀 ~ file: HttpMethods.js:19 ~ postRequest ~ error:", error)
        return error;
    }
};

// todo: PUT
export const putRequest = async (url, payload) => {
    try {
        const res = AxiosInstance.put(`${url}`, payload);
        return res;
    } catch (error) {
        console.log("🚀 ~ file: HttpMethods.js:29 ~ putRequest ~ error:", error)
    }
};

// todo: DELETE
export const deleteRequest = async (url) => {
    try {
        const res = AxiosInstance.delete(`${url}`);
        return res;
    } catch (error) {
        console.log("🚀 ~ file: HttpMethods.js:39 ~ deleteRequest ~ error:", error)
    }
};

// todo: PATCH
export const patchRequest = async (url, payload) => {
    try {
        const res = AxiosInstance.patch(`${url}`, payload);
        return res;
    } catch (error) {
        console.log("🚀 ~ file: HttpMethods.js:49 ~ patchRequest ~ error:", error)
    }
};
