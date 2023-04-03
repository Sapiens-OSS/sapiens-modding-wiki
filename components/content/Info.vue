<template>
    <div class="not-prose rounded-md bg-blue-50 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <InformationCircleIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800">{{ $props.title || "INFO" }}</h3>
                <div class="mt-2 text-sm text-blue-700">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
defineProps(['title'])
</script>