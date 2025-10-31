import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://internarea-backend.onrender.com";

export const axiosClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers:{
        "Content-Type": "application/json"
    }
})

