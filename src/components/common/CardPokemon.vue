<template>
    <div class="grid justify-center rounded-xl w-36 sm:w-48 h-60 sm:h-48 text-black cursor-pointer text-sm font-[cursive] transition-transform duration-500 bg-white shadow-md hover:scale-105">
        <header class="flex items-end justify-around">
            <img :src="pokemonImage" class="w-[90px]" alt="Pokemon Image" />
        </header>
        <div class="text-center">
            <div class="capitalize">
                <h2>{{ pokemonData.name }}</h2>
                <p class="text-xs">
                    N°: {{ pokemonData.id }}
                </p>
            </div>
            <div class="flex justify-center flex-wrap gap-2 mt-1 mb-1.5">
                <div
                    v-for="(typeObj, index) in pokemonData.types"
                    :key="index"
                    class="flex items-center gap-1 px-2 py-1 rounded text-xs"
                    :style="{backgroundColor: typeColors[typeObj.type.name], color: 'white'}"
                >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeObj.type.name}.svg`"
                        :alt="typeObj.type.name"
                        class="w-5 h-5"
                    />
                    <span class="capitalize">{{ typeObj.type.name }}</span>
                </div>
            </div>
            <span 
                class="text-xs" 
                :style="{color: mainTypeColor}" 
                v-if="generationName"
            >
                {{ formattedGeneration  }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'


const props = defineProps({
    pokemonData: {
        type: Object,
        required: true,
    },
    generationName: {
        type: String,
        required: false,
        default: "",
    }
})

const {pokemonData, generationName} = toRefs(props)

const typeColors = {
    normal:     '#A8A878',
    fire:       '#F08030',
    water:      '#6890F0',
    grass:      '#78C850',
    electric:   '#F8D030',
    ice:        '#98D8D8',
    fighting:   '#C03028',
    poison:     '#A040A0',
    ground:     '#E0C068',
    flying:     '#A890F0',
    psychic:    '#F85888',
    bug:        '#A8B820',
    rock:       '#B8A038',
    ghost:      '#705898',
    dragon:     '#7038F8',
    dark:       '#705848',
    steel:      '#B8B8D0',
    fairy:      '#F0B6BC'
}

const pokemonImage = computed(() => 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonData.value.id}.png`
)

const formattedGeneration = computed(() => {
    const map = {
        "generation-i":     "Generación I",
        "generation-ii":    "Generación II",
        "generation-iii":   "Generación III",
        "generation-iv":    "Generación IV",
        "generation-v":     "Generación V",
        "generation-vi":    "Generación VI",
        "generation-vii":   "Generación VII",
        "generation-viii":  "Generación VIII",
        "generation-ix":    "Generación IX",
    }
    return map[generationName.value] || generationName.value
})

const mainTypeColor = computed(() => {
    const mainType = pokemonData.value.types?.[0]?.type?.name
    return typeColors[mainType] || "#000"
})
</script>