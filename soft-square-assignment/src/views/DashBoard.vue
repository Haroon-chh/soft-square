<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-center mb-12">
        <div class="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full inline-flex items-center">
          <span class="material-icons text-amber-400 mr-3">schedule</span>
          <h1 class="text-3xl font-light text-white">
            Activity Manager
          </h1>
        </div>
      </div>
      
      <ActivityForm @add-activity="addActivity" />
      
      <div class="mt-10">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div class="flex items-center gap-3">
            <div class="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg text-white">
              <span class="font-medium">{{ pendingCount }}</span> pending
            </div>
            <div class="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg text-white">
              <span class="font-medium">{{ completedCount }}</span> completed
            </div>
          </div>
          
          <div class="bg-white/5 backdrop-blur-lg rounded-lg p-1 flex">
            <button 
              @click="filter = 'all'"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                filter === 'all' ? 'bg-amber-500 text-slate-900' : 'text-white hover:bg-white/10'
              ]"
            >
              All
            </button>
            <button 
              @click="filter = 'active'"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                filter === 'active' ? 'bg-amber-500 text-slate-900' : 'text-white hover:bg-white/10'
              ]"
            >
              Active
            </button>
            <button 
              @click="filter = 'completed'"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                filter === 'completed' ? 'bg-amber-500 text-slate-900' : 'text-white hover:bg-white/10'
              ]"
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
  activities.value.unshift({
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