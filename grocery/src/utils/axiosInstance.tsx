import axios from "axios";



export const localBackend = "http://192.168.31.90:5000/";

const instance = axios.create({
  baseURL: localBackend,
  headers: {
    "Content-Type": "application/json",
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
