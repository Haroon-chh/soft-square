import axios from 'axios'

const API_URL = 'http://localhost:3000/activities'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const activityService = {
  async getAll() {
    const response = await apiClient.get('/')
    return response.data
  },
  
  async getById(id) {
    const response = await apiClient.get(`/${id}`)
    return response.data
  },
  
  async create(activity) {
    const response = await apiClient.post('/', activity)
    return response.data
  },
  
  async update(id, activity) {
    const response = await apiClient.put(`/${id}`, activity)
    return response.data
  },
  
  async delete(id) {
    await apiClient.delete(`/${id}`)
    return true
  }
}