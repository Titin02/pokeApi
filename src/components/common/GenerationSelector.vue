<template>
    <div class="inline-block relative sm:w-42 w-full">
        <select 
            :value="modelValue" 
            @change="onChange"
            @focus="isFocused = true"
            @blur="isFocused = false"
            class="block appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-1 shadow-sm text-gray-700 focus:outline-none cursor-pointer transition"    
        >
            <option  
                v-for="gen in generations" 
                :key="gen.id" 
                :value="gen.id"
            >
                    {{ gen.name }}
            </option>
        </select>   
        <div 
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400 
            transition-transform duration-300" 
            :class="{ 'rotate-180': isFocused}">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.5 7l4.5 4.5L14.5 7H5.5z" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
    modelValue: {
        type: [Number, String],
        required: true,
    },
    generations: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits(["update:modelValue", "change"])

const isFocused = ref(false)

function onChange(e) {
    const selected = Number(e.target.value)
    emit("update:modelValue", selected)
    emit("change", selected)
    e.target.blur()
}
</script>