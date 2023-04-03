<template>
    <NuxtLayout>
        <div class="lg:grid lg:grid-cols-4 m-4 sm:m-6 lg:m-8">
            <div class="lg:col-span-3 p-4 prose max-w-none">
                <ContentRenderer :key="page._id" :value="page">
                    <template #empty>
                        <p>No content found.</p>
                    </template>
                </ContentRenderer>
            </div>
            <div class="hidden lg:block">
                <nav v-if="toc && toc.links" class="space-y-1 fixed top-10 w-full bg-white" aria-label="Sidebar">
                    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                        <h3 class="text-base font-semibold leading-6 text-gray-900">Table of Contents</h3>
                    </div>
                    <a v-for="link in toc.links" :key="link.text" :href="`#${link.id}`"
                        class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center rounded-md px-3 py-2 text-sm font-medium">
                        <span class="truncate">{{ link.text }}</span>
                    </a>
                </nav>
                <div class="fixed bottom-5 rounded-md bg-blue-50 p-4 w-full">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
                        </div>
                        <div class="ml-3 flex-1 md:flex md:justify-between">
                            <p class="text-sm text-blue-700">Search the wiki with Shift + Space</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
  
<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
const { page, toc, navigation } = useContent();
useHead({
    title: page.value.title,
})
</script>