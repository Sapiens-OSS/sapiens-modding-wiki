<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                    leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div
                                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                <NuxtLink to="/" class="flex h-16 shrink-0 items-center text-white font-medium font-semibold">
                                    <img class="h-8 w-auto" src="@/assets/logo.png" alt="Sapiens Modding Community" />
                                    <span class="ml-2">
                                        Sapiens Modding Wiki
                                    </span>
                                </NuxtLink>
                                <nav class="flex flex-1 flex-col">
                                    <ContentNavigation v-slot="{ navigation }">
                                        <RecursiveExplorer
                                            :link="{ title: 'Sapiens Modding Wiki', children: navigation, _path: '/' }" />
                                    </ContentNavigation>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                <NuxtLink to="/" class="flex h-16 shrink-0 items-center text-white font-medium font-semibold">
                    <img class="h-8 w-auto" src="@/assets/logo.png" alt="Sapiens Modding Community logo" />
                    <span class="ml-2">
                        Sapiens Modding Wiki
                    </span>
                </NuxtLink>
                <nav class="flex flex-1 flex-col">
                    <ContentNavigation v-slot="{ navigation }">
                        <RecursiveExplorer :link="{ title: 'Sapiens Modding Wiki', children: navigation, _path: '/' }" />
                    </ContentNavigation>
                </nav>
            </div>
        </div>
        <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden" @click="sidebarOpen = true">
                <span class="sr-only">Open sidebar</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
            <div class="flex-1 text-sm font-semibold leading-6 text-white">{{ content.title }}</div>
        </div>

        <main class="lg:pl-72">
            <slot :content="content" />
        </main>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'

const sidebarOpen = ref(false);
const content = await queryContent(useRoute().path).findOne();
</script>