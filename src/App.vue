<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

// Define layouts
import DefaultLayout from './layouts/default.vue'

const route = useRoute()

// Map layout name to actual component
const layoutMap = {
  default: DefaultLayout,
}

// Computed layout component
const layout = computed(() => {
  return layoutMap[route.meta.layout] || DefaultLayout
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
