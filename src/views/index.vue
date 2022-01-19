<template>
  <router-view />
</template>
<route>
{
  name: "home",
  meta: {requiresAuth: false}
}
</route>
<script setup lang="ts"></script>

<style lang="postcss" scoped></style>
