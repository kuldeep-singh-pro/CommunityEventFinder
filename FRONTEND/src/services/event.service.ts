import axios from "axios"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const getEvents = async (params: any) => {
  const response = await axios.get(`${API}/events`, { params })
  return response.data.data
}

export const getPopularEvents = async (limit: number = 10) => {
  const response = await axios.get(`${API}/events/popular`, { params: { limit } })
  return response.data.data
}