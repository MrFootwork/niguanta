<template>
  <div class="form-wrapper">
    <h2>Contact Niguanta</h2>
    <form @submit.prevent="submitForm">
      <div
        class="input-wrapper"
        style="grid-area: name"
      >
        <label for="name">Name</label>
        <div class="input-field-wrapper">
          <input
            id="name"
            v-model="form.name"
            class="input-field"
            type="text"
            required
          >
        </div>
      </div>

      <div
        class="input-wrapper"
        style="grid-area: email;"
      >
        <label for="email">E-mail</label>
        <div class="input-field-wrapper">
          <input
            id="email"
            v-model="form.email"
            class="input-field"
            type="email"
            required
          >
        </div>
      </div>

      <div
        class="input-wrapper"
        style="grid-area: topic;"
      >
        <label for="topic">Topic</label>
        <div class="input-field-wrapper">
          <input
            id="topic"
            v-model="form.topic"
            class="input-field"
            type="text"
            required
          >
        </div>
      </div>

      <div
        class="input-wrapper"
        style="grid-area: message;"
      >
        <label for="message">Your Message</label>
        <div class="input-field-wrapper">
          <textarea
            id="message"
            v-model="form.message"
            class="input-field"
            required
          />
        </div>
      </div>

      <div
        class="button-wrapper"
        style="grid-area: button;"
      >
        <button
          type="submit"
        >
          Send
        </button>
      </div>
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
  topic: '',
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
  return
}
</script>

<style scoped lang="scss">
.form-wrapper {
  border: 1px solid black;
  border-radius: var(--border-radius-contact-form__form);
  background-color: var(--color-contact-form__background-color);
  padding: 2rem;

  h2 {
    padding-bottom: 1rem;
    font-size: 2rem;
  }

  form {
    display: grid;
    grid-template-areas:
      "name email"
      "topic topic"
      "message message"
      "button .";
    gap: 1rem;

    .input-wrapper {
      display: flex;
      flex-flow: column;

      label {
        padding-bottom: .5rem;
      }

      .input-field-wrapper {
        border: 1px solid black;
        border-radius: var(--border-radius-contact-form__input-field);
        padding: 2px 10px;
        background-color: var(--color-contact-form__input-field);

        input, textarea {
          border: none;
          width: 100%;
        }

        .input-field {
          background-color: var(--color-contact-form__input-field);
        }
      }

    }

    button {
      margin-top: 10px;
      background-color: var(--color-contact-form__button-send);
      border: 1px solid black;
      border-radius: 5rem;
      padding: .25rem .5rem;
      font-size: 1.2rem
    }
  }
}
</style>
