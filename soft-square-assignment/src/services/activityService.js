import axios from 'axios'
import { showSnackbar } from '@/utils/eventBus'

const API_URL = 'http://localhost:3000/activities'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const activityService = {
  async getAll() {
    try {
      const response = await apiClient.get('/')
      showSnackbar('Activities loaded successfully')
      return response.data
    } catch (error) {
      showSnackbar(error.message || 'Failed to load activities', 'error')
      throw error
    }
  },
  
  async create(activity) {
    try {
      const response = await apiClient.post('/', activity)
      showSnackbar('Activity created successfully')
      return response.data
    } catch (error) {
      showSnackbar(error.message || 'Failed to create activity', 'error')
      throw error
    }
  },
  
  async update(id, activity) {
    try {
      const response = await apiClient.put(`/${id}`, activity)
      showSnackbar('Activity updated successfully')
      return response.data
    } catch (error) {
      showSnackbar(error.message || 'Failed to update activity', 'error')
      throw error
    }
  },
  
  async delete(id) {
    try {
      await apiClient.delete(`/${id}`)
      showSnackbar('Activity deleted successfully')
      return true
    } catch (error) {
      showSnackbar(error.message || 'Failed to delete activity', 'error')
      throw error
    }
  }
}