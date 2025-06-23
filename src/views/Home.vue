<template>
  <div class="w-full bg-red-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 p-4">
    <div class="lg:col-span-2">
      <ImageCard />
    </div>
    <div class="lg:col-span-5">
      <Description />
    </div>
    <div class="block md:hidden">
      <Skills />
    </div>
  </div>
</template>
<script setup>
import ImageCard from '../components/ImageCard.vue'
import Description from '../components/Description.vue'
import Skills from '../components/Skills.vue'
</script>
