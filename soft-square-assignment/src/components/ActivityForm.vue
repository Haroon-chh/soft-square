<template>
  <div class="bg-white shadow-lg rounded-xl p-6 backdrop-blur-lg bg-opacity-80">
    <form @submit.prevent="handleSubmit" class="flex gap-4">
      <input
        v-model="newActivity"
        type="text"
        placeholder="✍️ Add new activity..."
        class="flex-1 rounded-lg border-2 border-purple-100 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-purple-300 focus:ring-purple-300 transition-all duration-200"
        required
      />
      <button
        type="submit"
        class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
      >
        <span class="material-icons text-xl">add_task</span>
        <span>Add</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-activity'])
const newActivity = ref('')

const handleSubmit = () => {
  if (newActivity.value.trim()) {
    emit('add-activity', newActivity.value.trim())
    newActivity.value = ''
  }
}
</script>