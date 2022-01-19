<template>
  <div class="box">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" scoped>
.box {
  @apply py-8
      px-8
      inline-flex
      mx-auto
      bg-white
      dark:bg-gray-400 dark:bg-opacity-10
      rounded-xl
      shadow-md
      space-y-2;
}
</style>
