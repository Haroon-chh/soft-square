import mitt from 'mitt'
export const emitter = mitt()

export const showSnackbar = (message, type = 'success') => {
  emitter.emit('showSnackbar', { message, type })
}