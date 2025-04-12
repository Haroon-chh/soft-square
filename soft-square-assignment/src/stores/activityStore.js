import { defineStore } from 'pinia'
import { activityService } from '@/services/activityService'
import { nanoid } from 'nanoid'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    filter: 'all',
    loading: false,
    error: null,
    pendingOperations: new Set()
  }),
  
  getters: {
    filteredActivities: (state) => {
      switch (state.filter) {
        case 'active':
          return state.activities.filter(a => !a.completed)
        case 'completed':
          return state.activities.filter(a => a.completed)
        default:
          return state.activities
      }
    },
    pendingCount: (state) => state.activities.filter(a => !a.completed).length,
    completedCount: (state) => state.activities.filter(a => a.completed).length,
    isOperationPending: (state) => (operationId) => state.pendingOperations.has(operationId)
  },
  
  actions: {
    setFilter(filter) {
      this.filter = filter
    },
    
    async fetchActivities() {
      const operationId = 'fetch-' + nanoid(4)
      this.pendingOperations.add(operationId)
      this.error = null
      
      try {
        const data = await activityService.getAll()
        this.activities = data
        return data
      } catch (error) {
        this.error = error.message || 'Failed to fetch activities'
        console.error('Error fetching activities:', error)
        throw error
      } finally {
        this.pendingOperations.delete(operationId)
      }
    },
    
    async addActivity(title) {
      const operationId = 'add-' + nanoid(4)
      this.pendingOperations.add(operationId)
      this.error = null
      
      // Create temporary ID for optimistic update
      const tempId = nanoid(4)
      
      // Create new activity object
      const newActivity = {
        id: tempId,
        title,
        completed: false,
        createdAt: new Date().toISOString()
      }
      
      // Optimistically add to state
      this.activities.unshift(newActivity)
      
      try {
        // Make API call
        const savedActivity = await activityService.create(newActivity)
        
        // Replace temp activity with the one from server
        const index = this.activities.findIndex(a => a.id === tempId)
        if (index !== -1) {
          this.activities[index] = savedActivity
        }
        
        return savedActivity
      } catch (error) {
        // Revert optimistic update on error
        this.activities = this.activities.filter(a => a.id !== tempId)
        this.error = error.message || 'Failed to add activity'
        console.error('Error adding activity:', error)
        throw error
      } finally {
        this.pendingOperations.delete(operationId)
      }
    },
    
    async toggleActivityStatus(id) {
      const operationId = 'toggle-' + id
      this.pendingOperations.add(operationId)
      this.error = null
      
      // Find activity in state
      const activity = this.activities.find(a => a.id === id)
      if (!activity) {
        this.pendingOperations.delete(operationId)
        return
      }
      
      // Store original state for rollback
      const originalState = { ...activity }
      
      // Optimistically update state
      activity.completed = !activity.completed
      
      try {
        // Make API call
        const updatedActivity = await activityService.update(id, activity)
        
        // Update with server response
        const index = this.activities.findIndex(a => a.id === id)
        if (index !== -1) {
          this.activities[index] = updatedActivity
        }
        
        return updatedActivity
      } catch (error) {
        // Revert optimistic update on error
        const index = this.activities.findIndex(a => a.id === id)
        if (index !== -1) {
          this.activities[index] = originalState
        }
        
        this.error = error.message || 'Failed to update activity'
        console.error('Error updating activity:', error)
        throw error
      } finally {
        this.pendingOperations.delete(operationId)
      }
    },
    
    async deleteActivity(id) {
      const operationId = 'delete-' + id
      this.pendingOperations.add(operationId)
      this.error = null
      
      // Store activities for rollback
      const originalActivities = [...this.activities]
      
      // Optimistically update state
      this.activities = this.activities.filter(a => a.id !== id)
      
      try {
        // Make API call
        await activityService.delete(id)
      } catch (error) {
        // Revert optimistic update on error
        this.activities = originalActivities
        
        this.error = error.message || 'Failed to delete activity'
        console.error('Error deleting activity:', error)
        throw error
      } finally {
        this.pendingOperations.delete(operationId)
      }
    }
  }
})