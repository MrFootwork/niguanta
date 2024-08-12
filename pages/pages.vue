<template>
  <div>
    <h5>PAGES</h5>
    <pre>page count {{ pages.length }}</pre>
    <!-- <pre>{{ pages }}</pre> -->
    <div v-html="pages.find(page => page.id === 1564).content.rendered" />
    <!-- <div
        v-for="cat in categories"
        :key="cat.id"
        class="card"
      >
        <div>{{ cat.id }}</div>
        <div>{{ cat.name }}</div>
        <div>count: {{ cat.count }}</div>
      </div> -->
  </div>
</template>

<script setup lang="ts">
const pages = await $fetch(`${useRuntimeConfig().public.wpRestApiBaseUrl}/pages?per_page=30`)
</script>

<style scoped>
.card {
    margin: 1rem 0;
}
</style>
