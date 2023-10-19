import axios from "axios";

let authToken = sessionStorage.getItem('token');

const AxiosInstance = axios.create({
    baseURL: "https://localhost:7254/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authToken ? `Bearer ${authToken}` : undefined,
    },
});

AxiosInstance.interceptors.request.use(
    (config) => {
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("🚀 ~ Response in Error (in AxiosInstance):", error);
        return error;
    }
);

const handleDangNhap = (newToken) => {
    authToken = newToken;
    console.log("🚀 ~ authToken:", authToken)
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    //sessionStorage.setItem('AccessToken', authToken);
}

const handleDangXuat = () => {
    sessionStorage.clear();
    AxiosInstance.defaults.headers.common['Authorization'] = undefined;
}

export { AxiosInstance, handleDangXuat, handleDangNhap };
