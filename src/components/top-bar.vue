<template>
  <div class="top-bar">
    <router-link to="/" class="select-none font-serif italic">
      {{ title || 'Jarrett' }}
    </router-link>
    <ul class="flex-1 flex justify-end">
      <li v-for="item in headerConfig" :key="item.label">
        <router-link :to="item.link" class="flex items-center">
          <Icon v-if="item.icon" class="mr-2 text-xl">
            <component :is="getIcon(item.icon)" />
          </Icon>
          <span class="select-none">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
interface Props {
  title?: string;
  headerConfig?: { label: string; icon?: string; link: string }[];
}
// const fontColor=computed(()=>)

withDefaults(defineProps<Props>(), {
  headerConfig: () => [],
});

const getIcon = (name: string) => {
  const icon = defineAsyncComponent(
    async () => await import('@vicons/carbon').then(res => res[name])
  );
  return icon;
};
</script>

<style lang="postcss" scoped>
.top-bar {
  font-size: 10px;
  display: flex;
  padding: 8px 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.17rem;
  color: v-bind(fontColor);
  @apply subpixel-antialiased;
  ul li {
    margin-left: 40px;
  }
}
</style>
