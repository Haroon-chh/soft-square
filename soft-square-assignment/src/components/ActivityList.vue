<template>
  <div class="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
    <div v-if="activities.length === 0" class="p-12 text-center">
      <span class="material-icons text-6xl text-white/20 mb-4">task_alt</span>
      <p class="text-white/60 text-lg">Your task list is empty. Start by adding a new task above.</p>
    </div>
    
    <TransitionGroup 
      name="task-list" 
      tag="div" 
      class="divide-y divide-white/10"
    >
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="group relative"
      >
        <!-- Removed the absolute positioned element that might be overlapping -->
        <div class="p-6 flex items-center justify-between hover:bg-white/5 transition-all duration-300 border-l-4 border-transparent group-hover:border-amber-500" 
             :class="{ 'border-emerald-500': activity.completed }">
          <div class="flex items-center space-x-4">
            <button
              @click="toggleStatus(activity.id)"
              type="button"
              :class="[
                'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 z-10',
                activity.completed 
                  ? 'bg-emerald-500 border-0' 
                  : 'border-2 border-white/30 hover:border-amber-500'
              ]"
            >
              <span v-if="activity.completed" class="material-icons text-white text-sm">check</span>
            </button>
            <div>
              <span
                :class="{
                  'line-through text-white/40': activity.completed,
                  'text-white': !activity.completed
                }"
                class="font-medium text-lg"
              >
                {{ activity.title }}
              </span>
              <div class="flex items-center mt-1 text-xs text-white/40 space-x-2">
                <span class="material-icons text-xs">event</span>
                <span>{{ formatDate(activity.createdAt) }}</span>
              </div>
            </div>
          </div>
          
          <button
            @click="deleteActivity(activity.id)"
            type="button"
            class="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all duration-300 z-10"
          >
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  activities: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle-status', 'delete-activity'])

const toggleStatus = (id) => {
  emit('toggle-status', id)
}

const deleteActivity = (id) => {
  emit('delete-activity', id)
}

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.task-list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.task-list-move {
  transition: transform 0.5s ease;
}
</style>