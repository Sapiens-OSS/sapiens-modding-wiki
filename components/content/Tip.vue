<template>
    <div class="not-prose rounded-md bg-green-50 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <LightBulbIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">{{ $props.title || "TIP" }}</h3>
                <div class="mt-2 text-sm text-green-700">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { LightBulbIcon } from '@heroicons/vue/24/outline'
defineProps(['title'])
</script>