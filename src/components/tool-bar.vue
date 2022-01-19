<template>
  <IconConfigProvider size="34">
    <div class="tool-bar">
      <div class="arrows">
        <Icon> <ArrowUp /> </Icon>
        <div class="split-line mt-4 mb-4 -mr-50"></div>
        <Icon> <ArrowDown /></Icon>
      </div>
      <div class="description">
        <p class="w-24 transform-gpu -rotate-90">SOCAIL</p>
        <svg-icon stroke="#fff" name="wave-line" class="wave-line" />
      </div>
      <div class="social-links">
        <svg-icon
          v-for="icon in icons"
          :key="icon"
          :name="icon"
          color="#fff"
          class="external-link mt-4"
        ></svg-icon>
      </div>
    </div>
  </IconConfigProvider>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@vicons/carbon';

const icons = ['juejin', 'zhihu', 'github'];
</script>

<style lang="postcss" scoped>
$right: 5%;
.tool-bar {
  font-size: 8.5px;
  .arrows {
    position: fixed;
    top: 50%;
    right: $right;
    @apply transform  -translate-y-1/2 translate-x-1/2;
    .split-line {
      border-top: 0.5px solid #fff;
      height: 0.5px;
      /* width: 100px; */
    }
  }
  .social-links {
    position: fixed;
    top: 80%;
    right: $right;
    @apply transform  translate-x-1/2;
    .external-link {
      width: 20px;
      height: 20px;
    }
  }
  .description {
    top: 60%;
    right: $right;
    width: 20px;
    overflow: hidden;
    @apply select-none transform translate-x-1/2 fixed flex flex-col items-center justify-center overflow-hidden;

    .wave-line {
      width: 56px;
      height: 168px;

      @apply transform-gpu rotate-90;
    }
  }
}
</style>
