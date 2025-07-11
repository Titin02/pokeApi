<template>
    <div
        class="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-4"
    >
    	<div class="flex items-center justify-between mb-4">
			<div class="text-2xl capitalize font-bold">{{ route.params.id }}</div>
		</div>
        <img
            :src="pokemonImageUrl"
            @load="isLoaded = true"
            @error="hasError = true"
            v-show="isLoaded && !hasError"
            class="w-[200px]" alt="Pokemon Image" 
        />
        <img 
            v-if="!isLoaded"
            :src="spinnerPokeball" 
            alt="Cargando..." 
            class="w-8 h-8 animate-spin" 
		/>
        <div class="flex gap-2">
            <div
                v-for="tipo in types"
                :key="tipo"
                class="flex flex-wrap px-4 py-1 rounded-full text-black text-sm font-semibold"
                :style="{backgroundColor: typeColors[tipo], color: 'white'}">
                <img
                    :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"

                    :alt="tipo"
                    class="w-5 h-5"
                />
            </div>
        </div>

        <div class="w-full bg-gray-100 rounded-xl p-4">
            <div class="font-semibold mb-2">Informacion:</div>
            <ul class="text-sm space-y-1 text-gray-700">
                <li>Altura: {{ height }}</li>
                <li>Peso: {{ weight }}</li>
                <li>Experiencia base: {{ baseExperience }}</li>
                <li>Generación: {{ generation }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { PokemonType } from '../../services/pokemonType'
import spinnerPokeball from '../../assets/spinnerPokeball.png'
import { onMounted } from 'vue'
import { ref } from 'vue'



const isLoaded = ref(false)
const hasError = ref(false)
const route = useRoute()
const pokemonID = route.params.id
const height = ref('')
const weight = ref('')
const generation = ref('')
const baseExperience = ref(0)
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#F0B6BC'
}

const {
  pokemonImageUrl,
  types,
  loadPokemonType
} = PokemonType()



onMounted(async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    const data = await res.json()

    height.value = data.height / 10 + ' m'
    weight.value = data.weight / 10 + ' kg'
    baseExperience.value = data.base_experience

    const listRes = await fetch('/data/pokemonFullList.json')
    const pokemonFullList = await listRes.json()
    const match = pokemonFullList.find(p => p.name === data.name)

    
    generation.value = match?.generation.replace('generation-', '').toUpperCase() ?? 'N/A'
    loadPokemonType(pokemonID)
})
</script>
