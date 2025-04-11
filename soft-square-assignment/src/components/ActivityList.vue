<template>
  <div class="bg-white shadow-lg rounded-xl backdrop-blur-lg bg-opacity-80">
    <div v-if="activities.length === 0" class="p-8 text-center">
      <span class="material-icons text-6xl text-gray-300 mb-4">task</span>
      <p class="text-gray-500">No activities yet. Start adding your tasks above!</p>
    </div>
    
    <TransitionGroup name="list" tag="div" class="divide-y divide-gray-100">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="p-4 flex items-center justify-between hover:bg-purple-50 transition-colors duration-200"
      >
        <div class="flex items-center space-x-4">
          <button
            @click="$emit('toggle-status', activity.id)"
            :class="[
              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              activity.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-purple-500'
            ]"
          >
            <span v-if="activity.completed" class="material-icons text-white text-sm">check</span>
          </button>
          <div>
            <span
              :class="{
                'line-through text-gray-400': activity.completed,
                'text-gray-700': !activity.completed
              }"
              class="font-medium"
            >
              {{ activity.title }}
            </span>
            <p class="text-xs text-gray-400">
              {{ new Date(activity.createdAt).toLocaleDateString() }}
            </p>
          </div>
        </div>
        
        <button
          @click="$emit('delete-activity', activity.id)"
          class="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
        >
          <span class="material-icons">delete_outline</span>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
defineProps({
  activities: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle-status', 'delete-activity'])
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>