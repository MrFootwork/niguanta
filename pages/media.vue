<template>
  <div>
    <h5>MEDIA</h5>
    <pre>media count {{ media?.length }}</pre>
    <pre>{{ media }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { WP_REST_API_Attachments } from 'wp-types'

const { data, error } = await useFetch(`/api/media`)
const media = data as unknown as WP_REST_API_Attachments

if (error.value) {
  console.error('Error fetching media:', error.value)
}
</script>

<style scoped>
.card {
    margin: 1rem 0;
}
</style>
