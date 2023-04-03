<template>
    <TransitionRoot :show="open" as="template" @after-leave="query = ''" appear>
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95">
                    <DialogPanel
                        class="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all">
                        <Combobox @update:modelValue="onSelect">
                            <div class="relative">
                                <MagnifyingGlassIcon
                                    class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-500"
                                    aria-hidden="true" />
                                <ComboboxInput
                                    class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white focus:ring-0 sm:text-sm"
                                    placeholder="Search..." @change="query = $event.target.value" />
                            </div>

                            <ComboboxOptions v-if="query === '' || filteredProjects.length > 0" static
                                class="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto">
                                <li class="p-2">
                                    <h2 v-if="query === ''" class="mb-2 mt-4 px-3 text-xs font-semibold text-gray-200">
                                        Frequently searched</h2>
                                    <ul class="text-sm text-gray-400">
                                        <ComboboxOption v-for="project in query === '' ? recent : filteredProjects"
                                            :key="project.id" :value="project" as="template" v-slot="{ active }">
                                            <li
                                                :class="['flex cursor-default select-none items-center rounded-md px-3 py-2', active && 'bg-gray-800 text-white']">
                                                <DocumentIcon
                                                    :class="['h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-500']"
                                                    aria-hidden="true" />
                                                <span class="ml-3 flex-auto truncate">{{ project.title }}</span>
                                                <span v-if="active" class="ml-3 flex-none text-gray-400">Go to...</span>
                                            </li>
                                        </ComboboxOption>
                                    </ul>
                                </li>
                            </ComboboxOptions>

                            <div v-if="query !== '' && filteredProjects.length === 0"
                                class="px-6 py-14 text-center sm:px-14">
                                <FolderIcon class="mx-auto h-6 w-6 text-gray-500" aria-hidden="true" />
                                <p class="mt-4 text-sm text-gray-200">We couldn't find any pages with that term. Please
                                    try again.</p>
                            </div>
                        </Combobox>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { DocumentIcon, FolderIcon, } from '@heroicons/vue/24/outline'
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { useMagicKeys } from '@vueuse/core'
import Fuse from 'fuse.js';

const projects = await queryContent().find();
const recent = projects.filter((e) => { return e._dir == 'guides' });
const open = ref(false);
const query = ref('');

const fuse = new Fuse(projects, {
    keys: ['title', 'description']
})

const filteredProjects = computed(() =>
    query.value === ''
        ? []
        : fuse.search(query.value.toLowerCase()).map((e) => e.item)
);

function onSelect(item) {
    useRouter().push(item._path);
}

const { shift, space } = useMagicKeys()

watchEffect(() => {
    if (shift.value && space.value)
        open.value = !open.value;
})

</script>