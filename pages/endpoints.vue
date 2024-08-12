<template>
  <div>
    <h5>ENDPOINTS</h5>
    <input
      id="endpoint"
      v-model="endpoint"
      type="text"
      name="endpoint"
      @keyup.enter="inspectEndpoint"
    >
    <input
      id="query"
      v-model="query"
      type="text"
      name="query"
      @keyup.enter="inspectEndpoint"
    >
    <pre>{{ `${endpoints.length} ${endpoint}` }}</pre>
    <pre>Query {{ query }}</pre>

    <div
      v-for="endpointItem in endpoints"
      :key="endpointItem.id"
      class="card"
    >
      <div>{{ endpointItem.id }}</div>
      <div>{{ endpointItem.name }}</div>
      <div>{{ endpointItem.title?.rendered }}</div>
      <div>{{ endpointItem.slug }}</div>
      <div>{{ endpointItem.link }}</div>
      <!-- <div>{{ endpointItem.content.rendered }}</div> -->
    </div>

    <pre>{{ endpoints[0] }}</pre>
  </div>
</template>

<script setup lang="ts">
const endpoint = ref('')
const endpoints = ref([])

const queryEndpoint = computed(() => {
  if (!endpoint.value) return ''
  return endpoint.value
})
const query = ref('')

async function inspectEndpoint() {
  try {
    endpoints.value = await $fetch(`${useRuntimeConfig().public.wpRestApiBaseUrl}/${queryEndpoint.value}${query.value}`)
  }
  catch (e) {
    console.log(e)
  }
}
</script>

  <style scoped>
  .card {
      margin: 1rem 0;
  }
  </style>
