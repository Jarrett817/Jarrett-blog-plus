<template>
  <article :class="isDoc ? ['layout', '--read-mode'] : 'layout'">
    <div class="scroll-content">
      <nav class="nav-bar"><slot name="nav" /></nav>
      <div class="flex w-full rounded-3xl">
        <main class="h-full w-full flex-1"><slot /></main>
        <tool-bar />
      </div>
      <footer class="w-full"><slot name="footer" /></footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isDoc = computed(() => (route.name as string).includes('docs'));
</script>

<style lang="postcss" scoped>
.side-bar {
  width: 2rem;
}
.layout {
  @apply w-screen h-screen flex flex-col relative;
  .nav-bar {
    @apply w-full sticky top-5;
    z-index: 2;
  }
  &.--read-mode {
    background: url(../assets/images/paper.jpg) repeat 50%/400px 200px;
    &::before {
      content: '';
      position: fixed;
      left: 0;
      background: url(../assets/images/paper.jpg) repeat 50%/400px 200px;
      @apply -top-20 w-full h-40 filter blur-sm;
      z-index: 2;
    }
  }
}

.scroll-content {
  @apply scroll-smooth px-12 w-full h-full overflow-auto scrollbar
    scrollbar-thin scrollbar-thumb-gray-900;
}
</style>
