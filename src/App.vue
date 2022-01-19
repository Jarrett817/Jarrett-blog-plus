<template>
  <Layout>
    <template v-slot:nav>
      <TopBar title="Jarrett" :header-config="headerConfig" />
    </template>
    <div v-if="isHome" id="pixi" class="absolute -z-1 left-0 top-0"></div>
    <router-view />
    <template v-slot:main-right>
      <!-- <ul class="flex flex-col"> -->
      <!-- <Card
          v-for="route in avaliableRoutes"
          :key="route.name"
          class="h-xl w-11/12 my-8"
        >
          <MindMap
            :data="preOrder(route.meta.toc, route.name)"
            @node-click="handleNodeClick"
          />
        </Card> -->
      <!-- </ul> -->
      <img :src="imgSrc" class="bg-cover h-full max-w-none" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout.vue';
import TopBar from '@/components/top-bar.vue';
import Card from '@/components/card.vue';
import MindMap from '@/components/mind-map.vue';
import { useRouter, RouteRecordNormalized, useRoute } from 'vue-router';
import { CatalogNode } from '@/types/tree';
import { MindMapNode } from '@/types/mind-map';
import { computed, ref, onMounted } from 'vue';
import { jsonp } from '@/utils/jsonp';
import { drawSky } from '@/packages/';

const headerConfig = [
  { label: 'blog', icon: 'Blog', link: '/docs/blog' },
  { label: 'notes', icon: 'Notebook', link: '/docs/note' },
];

const router = useRouter();
const routes = router.getRoutes() as {
  meta: { toc: MindMapNode };
} & RouteRecordNormalized[];

const avaliableRoutes = computed(() => {
  return routes.filter(item => item.meta.toc);
});

const route = useRoute();
console.log(route);
const isHome = computed(() => {
  return route.name === 'home';
});
// 前序遍历n叉树，改造成mindMap需要的数据
const preOrder = (
  root: CatalogNode & MindMapNode,
  routeName: string
): MindMapNode | null => {
  if (!root) return null;
  root.topic = root.name;
  root.expanded = true;
  root.routeName = routeName;
  if (root.id === 'root') {
    root.root = true;
  }
  if (root?.children) {
    root.children.forEach(item => {
      preOrder(item, routeName);
    });
  }
  return root;
};

const handleNodeClick = (node: MindMapNode) => {
  console.log(node);

  router.push({ name: node.routeName });
};

const imgSrc = ref<string>('');
jsonp('https://bing.ioliu.cn/v1/?d=1&w=1920&h=1080').then(
  res => (imgSrc.value = res.data.url)
);

onMounted(() => {
  // import('@/packages/lightning');
  drawSky('#pixi');
});
</script>
<style lang="postcss">
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}
.layout {
  color: white;
  fill: white;
}
</style>
