<template>
  <div class="bg-red-300 w-full p-2">
    <div class="bg-white rounded-lg shadow-md p-4">
      <p class="text-center">Things I have Worked on!!!</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div v-for="project in projects">
        <div class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-xl font-bold">{{ project.title }}</h3>
          <p class="mt-2">
            {{ project.description }}
          </p>
          <div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-1 grid-center">
            <div class="">
              <img :src="project.image" alt="text" />
            </div>
            <div class="text-center">
              <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                <a :href="project.redirect">Review it in Github</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const projects = [
  {
    title: 'VueLearn',
    description:
      'A personal portfolio website to showcase my work and skills. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque et voluptate sint quae velit consectetur libero, quo quam quaerat iste!',
    image: 'https://download.logo.wine/logo/GitHub/GitHub-Logo.wine.png',
    redirect: 'https://github.com/ctal09/VerySImpleProjects',
  },
  {
    title: 'LearnNew',
    description:
      'A personal portfolio website to showcase my work and skills. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque et voluptate sint quae velit consectetur libero, quo quam quaerat iste!',
    image: 'https://download.logo.wine/logo/GitHub/GitHub-Logo.wine.png',
    redirect: 'https://github.com/ctal09/BlogPost',
  },
  {
    title: 'HumptyDupty',
    description:
      'A personal portfolio website to showcase my work and skills. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque et voluptate sint quae velit consectetur libero, quo quam quaerat iste!',
    image: 'https://download.logo.wine/logo/GitHub/GitHub-Logo.wine.png',
    redirect: 'https://github.com/ctal09/Cinema',
  },
]
</script>
