<template>
  <transition-group name="fade-transform" mode="out-in">
    <inner-link
      v-for="(item, index) in tagsViewStore.iframeViews"
      v-show="route.path === item.path"
      :key="item.path"
      :iframe-id="'iframe' + index"
      :src="(item.meta.link as any)"
    />
  </transition-group>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import InnerLink from '../InnerLink/index.vue'
import useTagsViewStore from '@/store/modules/tagsView'

const route = useRoute()
const tagsViewStore = useTagsViewStore()
</script>
