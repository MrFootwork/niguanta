<template>
  <div>
    <h5>MEDIA</h5>
    <pre>media count {{ mediaStore.media?.length }}</pre>

    <div class="media-container">
      <div
        v-for="image in mediaStore.media.slice(100, 110)"
        :key="image.id"
        class="image-container"
      >
        <img
          :src="image.guid.rendered"
          :alt="image.alt_text"
        >
        <label for="">{{ image.id }}</label>
      </div>
    </div>

    <pre>{{ mediaStore.media }}</pre>
  </div>
</template>

<script setup lang="ts">
const mediaStore = useMediaStore()
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
    position: relative;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & label {
      position: relative;
      top: -200px;
      left: 0;
      color: white;
      background-color: rgb(34, 24, 34, .5);
    }
  }
}
</style>
