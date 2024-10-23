import axios from "axios";
import {
  adminToken,
  clientToken,
  currentAdmin,
  currentUser,
  isSuperAdmin,
} from "./localStorageKeys";

export const baseUrlExport =
  "http://HF-Bac-MyALB-v5G3lE42ysVp-462563829.ap-south-1.elb.amazonaws.com/api/v1/";
export const baseUrlExport1 = "http://52.66.89.229:5000/";
export const baseUrlExportNgRok = "https://53fe-106-222-237-121.ngrok-free.app";
export const localBackend = "http://localhost:5000/";

const instance = axios.create({
  baseURL: localBackend,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "123",
  },
});

// Request Interceptor (unchanged)
instance.interceptors.request.use(
  (config) => {
    const token = "";
      /*Cookies.get(currentUser) === currentAdmin
        ? Cookies.get(adminToken)
        : Cookies.get(clientToken);
        */

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/*
// Response Interceptor (modified)
instance.interceptors.response.use(
  (response) => {
    return response; // Return successful responses
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // Remove all cookies if status code is 403 (Forbidden)
      const location =
        Cookies.get(currentUser) === currentAdmin ? "/admin" : "/";
      Cookies.remove(currentUser);
      Cookies.remove(adminToken);
      Cookies.remove(currentAdmin);
      Cookies.remove(isSuperAdmin);
      window.location.href = location;
    }
    return Promise.reject(error);
  }
);
*/
export default instance;
