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
      
      <!-- Error message -->
      <div v-if="activityStore.error" class="mb-6 bg-red-500/20 border border-red-500 text-white p-4 rounded-lg">
        <div class="flex items-center">
          <span class="material-icons mr-2">error</span>
          <span>{{ activityStore.error }}</span>
        </div>
      </div>
      
      <ActivityForm />
      
      <div class="mt-10">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div class="flex items-center gap-3">
            <div class="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg text-white">
              <span class="font-medium">{{ activityStore.pendingCount }}</span> pending
            </div>
            <div class="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-lg text-white">
              <span class="font-medium">{{ activityStore.completedCount }}</span> completed
            </div>
          </div>
          
          <div class="bg-white/5 backdrop-blur-lg rounded-lg p-1 flex">
            <button 
              @click="activityStore.setFilter('all')"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                activityStore.filter === 'all' ? 'bg-amber-500 text-slate-900' : 'text-white hover:bg-white/10'
              ]"
            >
              All
            </button>
            <button 
              @click="activityStore.setFilter('active')"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                activityStore.filter === 'active' ? 'bg-amber-500 text-slate-900' : 'text-white hover:bg-white/10'
              ]"
            >
              Active
            </button>
            <button 
              @click="activityStore.setFilter('completed')"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                activityStore.filter === 'completed' ? 'bg-amber-500 text-slate-900' : 'text-white hover:bg-white/10'
              ]"
            >
              Completed
            </button>
          </div>
        </div>
        
        <ActivityList
          :activities="activityStore.filteredActivities"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useActivityStore } from '@/stores/activityStore'
import ActivityForm from '@/components/ActivityForm.vue'
import ActivityList from '@/components/ActivityList.vue'

const activityStore = useActivityStore()

onMounted(async () => {
  try {
    await activityStore.fetchActivities()
  } catch (error) {
    // Error is already handled in the store
  }
})
</script>