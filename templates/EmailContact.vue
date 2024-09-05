<script setup lang="ts">
import { Html, Text, Heading, Img } from '@vue-email/components'

defineProps({
  title: String,
  name: String,
  email: String,
  message: String,
})
</script>

<template>
  <Html lang="en">
    <body>
      <Img
        src="/bird-brings-mail.gif"
        alt="bird brings mail"
        width="100%"
      />
      <Heading as="h2">
        {{ title }}
      </heading>
      <Text>Name: {{ name }}</Text>
      <Text>E-Mail: {{ email }}</Text>
      <Text>Message: {{ message }}</Text>
    </body>
  </Html>
</template>
