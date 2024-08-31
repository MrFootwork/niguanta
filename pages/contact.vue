<template>
  <div>
    <h2>Contact Us</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
        >
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
        >
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model="form.message"
          required
        />
      </div>
      <button type="submit">
        Send Message
      </button>
    </form>

    <div v-if="successMessage">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const successMessage = ref('')
const errorMessage = ref('')

async function submitForm() {
  const { data, error } = await $fetch('/api/send', {
    method: 'POST',
    body: form.value,
    onResponseError({ request, options, response }) {
      console.log('🚀 ~ onResponseError ~ request, options, response:', request, options, response)

      if (!response.ok) {
        // TODO handle errors
        // https://nuxt.com/docs/getting-started/error-handling
        successMessage.value = ''
        errorMessage.value = response.status === 403
          ? 'The sender\'s mail domain is not verified. ' + error
          : 'There was an error sending your message.'
        throw createError(response._data.message)
      }
    },
  })

  console.log('after fetch ', data, error)

  successMessage.value = 'Your message has been sent successfully!'
  errorMessage.value = ''
  // form.value = { name: '', email: '', message: '' }
  return
}
</script>

<style scoped>
/* Add some basic styles */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  margin-top: 10px;
}
</style>
