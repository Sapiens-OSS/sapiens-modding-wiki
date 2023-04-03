<template>
    <Disclosure as="div" class="p-3 my-3 rounded-lg bg-gray-100" v-slot="{ open }">
        <dt>
            <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                <span class="text-base font-semibold leading-7">{{ $props.title || "Details" }}</span>
                <span class="ml-6 flex h-7 items-center">
                    <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                    <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
            </DisclosureButton>
        </dt>
        <DisclosurePanel as="dd" class="mt-2 pr-12">
            <slot />
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
defineProps(['title'])
</script>