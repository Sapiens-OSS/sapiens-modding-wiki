<template>
    <div class="not-prose rounded-md bg-orange-50 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <ExclamationTriangleIcon class="h-5 w-5 text-orange-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-orange-800">{{ $props.title || "WARNING" }}</h3>
                <div class="mt-2 text-sm text-orange-700">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
defineProps(['title'])
</script>