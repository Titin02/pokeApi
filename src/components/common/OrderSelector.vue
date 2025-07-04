<template>
    <div class="inline-block relative w-full max-w-xs">
        <select 
            :value="modelValue" 
            @change="onChange"
            @focus="isFocused = true"
            @blur="isFocused = false"
            class="block appearance-none w-full bg-white border border-gray-300 rounded-lg hover:border-yellow-400 px-4 py-1 shadow-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-100 cursor-pointer transition"    
        >
            <option  
                v-for="option in options" 
                :key="option.value" 
                :value="option.value"
            >
                    {{ option.label }}
            </option>
        </select>   
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 transition-transform duration-300" :class="{ 'rotate-180': isFocused}">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.5 7l4.5 4.5L14.5 7H5.5z" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isFocused: false,
        }
    },
    methods: {
        onChange(e) {
            const selected = e.target.value
            this.$emit("update:modelValue", selected)
            this.$emit("change", selected)
            e.target.blur()
        }
    }
}
</script>