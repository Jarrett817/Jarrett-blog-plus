<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>
<script lang="ts">
export default { name: 'SvgIcon' };
</script>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  prefix?: string;
  name: string;
  color: string;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  name: '',
  color: '#333',
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="postcss" scoped>
.svg-icon {
  width: 1rem;
  height: 1rem;
}
</style>
