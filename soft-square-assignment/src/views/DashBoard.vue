<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-8 text-center p-2">
        ✨ Activity Manager
      </h1>
      
      <ActivityForm @add-activity="addActivity" />
      
      <div class="mt-8">
        <div class="flex justify-between items-center mb-6">
          <div class="text-sm font-medium text-gray-600">
            {{ pendingCount }} pending, {{ completedCount }} completed
          </div>
          <div class="flex gap-2">
            <button 
              @click="filter = 'all'"
              :class="['px-3 py-1 rounded-full text-sm', 
                filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600']"
            >
              All
            </button>
            <button 
              @click="filter = 'active'"
              :class="['px-3 py-1 rounded-full text-sm', 
                filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600']"
            >
              Active
            </button>
            <button 
              @click="filter = 'completed'"
              :class="['px-3 py-1 rounded-full text-sm', 
                filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600']"
            >
              Completed
            </button>
          </div>
        </div>
        
        <ActivityList
          :activities="filteredActivities"
          @toggle-status="toggleActivityStatus"
          @delete-activity="deleteActivity"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ActivityForm from '@/components/ActivityForm.vue'
import ActivityList from '@/components/ActivityList.vue'

const activities = ref([])
const filter = ref('all')

const filteredActivities = computed(() => {
  switch (filter.value) {
    case 'active':
      return activities.value.filter(a => !a.completed)
    case 'completed':
      return activities.value.filter(a => a.completed)
    default:
      return activities.value
  }
})

const pendingCount = computed(() => activities.value.filter(a => !a.completed).length)
const completedCount = computed(() => activities.value.filter(a => a.completed).length)

const loadActivities = () => {
  const stored = localStorage.getItem('activities')
  if (stored) {
    activities.value = JSON.parse(stored)
  }
}

const saveActivities = () => {
  localStorage.setItem('activities', JSON.stringify(activities.value))
}

const addActivity = (activity) => {
  activities.value.push({
    id: Date.now(),
    title: activity,
    completed: false,
    createdAt: new Date().toISOString()
  })
  saveActivities()
}

const toggleActivityStatus = (id) => {
  const activity = activities.value.find(a => a.id === id)
  if (activity) {
    activity.completed = !activity.completed
    saveActivities()
  }
}

const deleteActivity = (id) => {
  activities.value = activities.value.filter(a => a.id !== id)
  saveActivities()
}

onMounted(() => {
  loadActivities()
})
</script>