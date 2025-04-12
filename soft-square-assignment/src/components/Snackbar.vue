<template>
  <Transition name="snackbar">
    <div v-if="visible" 
         :class="[
           'fixed bottom-4 right-4 min-w-[300px] max-w-[600px] z-50 rounded-lg shadow-lg',
           type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
         ]">
      <div class="p-4 pr-12 text-white flex items-center">
        <span class="material-icons mr-2">
          {{ type === 'success' ? 'check_circle' : 'error' }}
        </span>
        <span>{{ message }}</span>
        <button 
          @click="hide"
          class="absolute right-2 top-2 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <span class="material-icons text-sm">close</span>
        </button>
      </div>
      <div 
        class="h-1 bg-white/30 rounded-b-lg overflow-hidden"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { emitter } from '@/utils/eventBus'

const visible = ref(false)
const message = ref('')
const type = ref('success')
const progress = ref(100)
let timeoutId = null
let progressInterval = null

const show = ({ message: msg, type: t }) => {
  message.value = msg
  type.value = t
  visible.value = true
  progress.value = 100
  
  // Clear existing timers
  if (timeoutId) clearTimeout(timeoutId)
  if (progressInterval) clearInterval(progressInterval)
  
  // Set up progress bar
  const duration = 5000
  const steps = 100
  const stepDuration = duration / steps
  
  progressInterval = setInterval(() => {
    progress.value -= 100 / steps
  }, stepDuration)
  
  // Hide after duration
  timeoutId = setTimeout(hide, duration)
}

const hide = () => {
  visible.value = false
  if (progressInterval) clearInterval(progressInterval)
  if (timeoutId) clearTimeout(timeoutId)
}

onMounted(() => {
  emitter.on('showSnackbar', show)
})

onUnmounted(() => {
  emitter.off('showSnackbar', show)
  if (timeoutId) clearTimeout(timeoutId)
  if (progressInterval) clearInterval(progressInterval)
})
</script>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>