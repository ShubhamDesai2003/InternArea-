import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const axiosClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers:{
        "Content-Type": "application/json"
    }
})

