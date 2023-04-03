<template>
    <div role="list" class="flex flex-1 flex-col" v-if="link.title">
        <div v-if="link.children" class="text-xs font-semibold leading-6 text-gray-400">{{ link.title }}</div>
        <NuxtLink v-else :to="link._path"
            class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
            <span
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-small text-gray-400 group-hover:text-white">{{
                    link.title.substring(0, 1) }}</span>
            <span class="truncate">{{ link.title }}</span>
        </NuxtLink>
        <ul v-if="link.children" role="list" class="ml-3 mt-2 space-y-1">
            <li v-for="child in link.children">
                <RecursiveExplorer :link="child" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue'
const props = defineProps(['link']);
</script>