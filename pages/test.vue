<template>
    <div>
        this is test
        <span v-html="post"></span>
    </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('posts', () => $fetch('/api/posts'))
const posts = data.value
const post = posts[0].content.rendered

</script>

<style scoped></style>