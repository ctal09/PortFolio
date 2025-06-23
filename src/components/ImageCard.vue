<template>
  <div>
    <div class="rounded-lg bg-white">
      <div class="flex items-center justify-center p-6 pt-12">
        <img
          src="https://thumbs.dreamstime.com/b/cool-guy-sunglasses-tipping-hat-80178881.jpg"
          alt="Profile Image"
          class="rounded-xl md:w-50 md:h-50 md:rounded-full border-4 border-white shadow-lg"
        />
      </div>
      <div class="p-4 flex flex-col items-center">
        <p class="text-4xl"><strong>Sital Dulal</strong></p>
        <span class="">shital1356@gmail.com</span>
        <div class="flex flex-col items-center">
          Connect With me On:
          <div class="flex gap-4 mt-2">
            <p>f</p>
            <p>G+</p>
            <p>Y</p>
            <p>X</p>
          </div>
        </div>
        <button
          class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Leave a Message
        </button>
      </div>
    </div>
    <div class="hidden md:block md:mt-1">
      <Skills />
    </div>
  </div>
</template>
<script setup>
import Skills from './Skills.vue'
</script>
