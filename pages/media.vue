<template>
  <div>
    <h5>MEDIA</h5>
    <pre>media count {{ media?.length }}</pre>

    <div class="media-container">
      <div
        v-for="image in media"
        :key="image.id"
        class="image-container"
      >
        <img
          :src="image.guid.rendered"
          :alt="image.alt_text"
        >
      </div>
    </div>

    <pre>{{ media[0] }}</pre>
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

<style scoped lang="scss">
.media-container {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;

  .image-container {
    width: 300px;
    height: 200px;
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
