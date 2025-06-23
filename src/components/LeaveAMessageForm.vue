<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="">
                  <div class="text-center w-full">
                    <h2 class="text-2xl">Kehna Kya CHate ho?</h2>
                    <p class="mt-2 text-sm text-gray-500">
                      Leave a message along with your contact details and I will get back to you as
                      soon as possible.
                    </p>
                  </div>
                  <div>
                    <form action="" class="">
                      <div class="grid-cols-1 pl-2 pr-2 md:grid-cols-2  grid md:gap-2">
                        <input
                          type="text"
                          placeholder="First Name"
                          class="w-full p-2 border border-gray-300 rounded-md mb-2 md:mb-0 "
                        />
                        <input
                          type="email"
                          placeholder="Last Name"
                          class="w-full p-2 border border-gray-300 rounded-md  "
                      </div>
                      <div class="p-2">
                        <input
                          type="email"
                          placeholder="Email"
                          class="w-full p-2 border border-gray-300 rounded-md"
                      </div>
                      <div class="p-2 w-full "> 
                        <textarea name="message" placeholder="Leave a Message" class="w-full h-auto p-1" ></textarea>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    @click="open = false"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="open = false"
                    ref="cancelButtonRef"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(true)
</script>
