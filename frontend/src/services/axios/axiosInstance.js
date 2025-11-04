import { baseUrl } from "@/boot";
import axios from "axios";

// Create an instance
const axiosInstance = axios.create({
    baseURL:baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle success globally (you can also log here)
        return response;
    },
    (error) => {
        const { response, request, message } = error;

        // No response from server (network error)
        if (!response) {
            console.error("🚨 Network Error:", message);
            // You can show a global toast notification here
            return Promise.reject({
                message: "Network error, please check your internet connection.",
            });
        }

        const status = response.status;

        switch (status) {
            case 400:
                console.warn("⚠️ Bad Request:", response.data?.message || "Bad request");
                break;

            case 401:
                console.warn("🔒 Unauthorized:", response.data?.message || "Unauthorized");
                // Optional: Token expired or invalid
                // logoutUser(); // Clear token from localStorage
                // window.location.href = "/login";
                break;

            case 403:
                console.warn("⛔ Forbidden:", response.data?.message || "Access denied");
                break;

            case 404:
                console.warn("❌ Not Found:", response.data?.message || "Resource not found");
                break;

            case 500:
                console.error("💥 Server Error:", response.data?.message || "Internal server error");
                break;

            default:
                console.error(`⚠️ Unhandled Error (${status}):`, response.data?.message || "Unexpected error");
                break;
        }

        // Optional: Show toast notification using toast library like react-toastify

        return Promise.reject(error);
    }
);

export default axiosInstance;
