<template>
  <div class="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
    <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <span class="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
          edit_calendar
        </span>
        <input
          v-model="newActivity"
          type="text"
          placeholder="What do you need to accomplish?"
          class="w-full bg-white/10 border-0 rounded-lg pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500/50 focus:bg-white/20 transition-all duration-300"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg px-6 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-amber-500/20 sm:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="material-icons" v-if="!isSubmitting">add_task</span>
        <span class="material-icons animate-spin" v-else>refresh</span>
        <span>{{ isSubmitting ? 'Adding...' : 'Add Task' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useActivityStore } from '@/stores/activityStore'
import { nanoid } from 'nanoid'

const activityStore = useActivityStore()
const newActivity = ref('')
const currentOperation = ref('')

const isSubmitting = computed(() => 
  currentOperation.value && activityStore.isOperationPending(currentOperation.value)
)

const handleSubmit = async () => {
  if (newActivity.value.trim() && !isSubmitting.value) {
    try {
      currentOperation.value = 'add-' + nanoid(4)
      await activityStore.addActivity(newActivity.value.trim())
      newActivity.value = ''
    } catch (error) {
      // Error is already handled in the store
    } finally {
      currentOperation.value = ''
    }
  }
}
</script>