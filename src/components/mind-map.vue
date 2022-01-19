<template>
  <div class="relative w-full h-full overflow-auto">
    <div :id="uuid" class="w-full h-full relative" />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import MindElixir from 'mind-elixir';
import { onMounted, ref } from 'vue';
import { MindMapNode } from '@/types/mind-map';
const uuid = 'mindMap' + uuidv4();
const emits = defineEmits(['node-click']);

interface Props {
  data: MindMapNode | null;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => null,
});

const isClicked = ref(false);

onMounted(() => {
  if (!props.data) return;
  const mind = new MindElixir({
    el: '#' + uuid,
    direction: MindElixir.RIGHT,
    data: {
      nodeData: props.data,
      linkData: {},
    },
    draggable: false, // default true
    contextMenu: false, // default true
    toolBar: true, // default true
    nodeMenu: false, // default true
    keypress: false, // default true
  });
  mind.bus.addListener('selectNode', (node: MindMapNode) => {
    emits('node-click', node);
  });
  mind.init();
});
</script>

<style lang="postcss">
.map-container .lt {
  width: 40px;
}
</style>
