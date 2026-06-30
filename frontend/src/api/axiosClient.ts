import axios from "axios"

const API_BASE_URL = "http://localhost:8080/api"

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to inject JWT token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bmt-jwt")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for handling global errors (like 401 Unauthorized)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("bmt-jwt")
      // window.location.href = "/login" // Redirect to login, optional based on UX
    }
    return Promise.reject(error)
  }
)
