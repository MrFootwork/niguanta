<script setup lang="ts">
import { Html, Text, Head } from '@vue-email/components'

defineProps({
  title: String,
  name: String,
  email: String,
  message: String,
})
</script>

<template>
  <Html lang="en">
    <Head>
      <title>{{ title }}</title>
    </Head>
    <body>
      <Text>Name: {{ name }}</Text>
      <Text>E-Mail: {{ email }}</Text>
      <Text>Message: {{ message }}</Text>
    </body>
  </Html>
</template>
