<template>
    <div class="space-y-4">
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
            <button 
                v-for="type in pokemonTypes" 
                :key="type" 
                @click="$emit('update:selectedType', type)" 
                :class="[
					'flex items-center gap-2 px-3 py-1 rounded-lg text-md font-medium hover:shadow-md cursor-pointer text-white transition-all duration-300',
                    typeColors[type]?.tw || 'bg-gray-400 text-white',
                    selectedTypes.includes(type) ? 'font-bold' : 'brightness-75'
				]" 
                type="button"
            >
                <img 
                    :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`"
                    :alt="type" 
                    class="w-5 h-5"
                />
                <span class="capitalize">
                    {{ type }}
                </span>
            </button>
        </div>
        <div 
            v-if="selectedTypes.length" 
            class="text-center"
        >
            <button 
                @click="$emit('clear')" 
                type="button"
                class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-300 text-stone-600 text-sm font-medium bg-white hover:bg-stone-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpiar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const pokemonTypes = ref([
    'normal',
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
])
const typeColors = {
    normal:     { hex: '#A8A878', tw: 'bg-gray-400' },
    fire:       { hex: '#F08030', tw: 'bg-orange-500' },
    water:      { hex: '#6890F0', tw: 'bg-blue-400' },
    grass:      { hex: '#78C850', tw: 'bg-green-400' },
    electric:   { hex: '#F8D030', tw: 'bg-yellow-400' },
    ice:        { hex: '#98D8D8', tw: 'bg-cyan-200' },
    fighting:   { hex: '#C03028', tw: 'bg-red-700' },
    poison:     { hex: '#A040A0', tw: 'bg-purple-600' },
    ground:     { hex: '#E0C068', tw: 'bg-yellow-600' },
    flying:     { hex: '#A890F0', tw: 'bg-indigo-300' },
    psychic:    { hex: '#F85888', tw: 'bg-pink-400' },
    bug:        { hex: '#A8B820', tw: 'bg-lime-500' },
    rock:       { hex: '#B8A038', tw: 'bg-yellow-700' },
    ghost:      { hex: '#705898', tw: 'bg-purple-800' },
    dragon:     { hex: '#7038F8', tw: 'bg-indigo-600' },
    dark:       { hex: '#705848', tw: 'bg-stone-700' },
    steel:      { hex: '#B8B8D0', tw: 'bg-gray-300' },
    fairy:      { hex: '#F0B6BC', tw: 'bg-pink-200' }
}

defineProps({
	selectedTypes: {
		type: Array,
		default: () => [],
	},
})

defineEmits(["update:selectedType", "clear"])
</script>