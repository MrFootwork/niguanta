<template>
    <div>
        Category Index
        <div v-for="post in posts">
            <h3 class="title" v-html="post.title.rendered"></h3>

        </div>
    </div>
</template>

<script setup lang="ts">
import type { WP_REST_API_Posts } from 'wp-types';

const { categoryId } = useRoute().query

const { data } = await useAsyncData('posts', () => $fetch(`/api/posts?categoryId=${categoryId}`))
const posts = data.value as unknown as WP_REST_API_Posts

</script>

<style scoped>
.title {
    font-weight: 100;
    color: tomato;
}
</style>