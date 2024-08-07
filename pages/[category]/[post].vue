<template>
    <div>
        <h1>Post</h1>
        <span v-html="post"></span>
    </div>
</template>

<script setup lang="ts">
import type { WP_REST_API_Posts } from 'wp-types';

const { data } = await useAsyncData('posts', () => $fetch('/api/posts'))
const posts = data.value as unknown as WP_REST_API_Posts
const post = posts[0].content.rendered
</script>

<style scoped></style>