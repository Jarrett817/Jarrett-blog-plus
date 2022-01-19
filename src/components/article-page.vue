<template>
  <article class="article-page">
    <slot />
  </article>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style lang="postcss" scoped>
.article-page {
  @apply h-full w-full overflow-auto px-20 py-10;
}
</style>
