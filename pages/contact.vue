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

const mail = useMail()

async function submitForm() {
  try {
    mail.send({
      from: form.value.name,
      subject: 'A reader wants to contact you!',
      recipient: form.value.email,
      text: `
        Name: ${form.value.name}
        \nEmail: ${form.value.email}
        \nMessage: ${form.value.message}`,
      // FIXME Try email templates via https://nuxt.com/modules/vue-email
      html: `<h1>My HTML</h1>
      <p>${form.value.message}</p>`,
    })

    successMessage.value = 'Your message has been sent successfully!'
    errorMessage.value = ''
    form.value = { name: '', email: '', message: '' }
  }
  catch (error) {
    successMessage.value = ''
    errorMessage.value = 'There was an error sending your message.' + error
  }
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
