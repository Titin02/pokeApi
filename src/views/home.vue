<template>
	<div class="bg-amber-100 px-4 py-6">
		<div class="max-w-6xl mx-auto space-y-6">
			<!-- Buscar -->
			 <div class="flex justify-center">
				 <div class="p-4 rounded-xl w-full max-w-sm">
					 <searchForm @search="searchPokemon" />
				 </div>
			 </div>
			<!-- Generacion y filtro -->
			<div class="bg-white p-2 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<div class="flex items-center gap-3">
					<label class="font-semibold text-gray-700 mb-2 sm:mb-0 text-sm">
						Seleccione Generación:
					</label>
					<GenerationSelector 
						v-model="selectedGeneration"
						:generations="generations"
					/>
				</div>
				<div class="flex items-center">
					<label class="font-semibold text-gray-700 mb-2 sm:mb-0 text-sm">
						Ordenar por:
					</label>
					<OrderSelector 
						v-model="sortOption"
						:options="[
							{value: 'number', label: 'Número'},
							{value: 'name', label: 'Nombre'},
						]"
					/>
					<button
						@click="toggleSortOrder"
						class="p-2 rounded-r-lg bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition cursor-pointer"
						title="Cambiar orden"
					>
						<svg class="w-4 h-4 transform transition-transform duration-300" :class="{ 'rotate-180': sortOrder === 'desc' }" fill="currentColor" viewBox="0 0 20 20">
							<path d="M5.5 7l4.5 4.5L14.5 7H5.5z" />
						</svg>
					</button>
				</div>
			</div>
			<!-- Card pokemon busqueda -->
			<div v-if="pokemonSearch" class="bg-white p-6 rounded-xl shadow-md">
				<div class="flex flex-col items-center space-y-4">
					<router-link
						:to="`/detallePokemon/${pokemo.name}`"
						class="block"
					>
						<CardPokemon :pokemonData="pokemonData" />
					</router-link>
					<div class="flex flex-wrap gap-4">
						<button @click="resetSearch" class="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer hover:scale-95">
							Volver
						</button>
					</div>
				</div>
			</div>
			<!-- Lista de pokemones -->
			<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<div v-for="pokemon in sortedPokemon" :key="pokemon.name" class="flex justify-center">
					<router-link
						:to="`/detallePokemon/${pokemon.name}`"
						class="block"
					>
						<CardPokemon :pokemonData="pokemon" :generationName="pokemon.generation" />
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Vue core
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
// Components
import CardPokemon from '../components/common/CardPokemon.vue'
import searchForm from '../components/search/formSearchPokemon.vue'
import GenerationSelector from '../components/common/GenerationSelector.vue'
import OrderSelector from '../components/common/OrderSelector.vue'
// Services
import { fetchPokemonById } from '../services/searchPokemon.js'
// Composables
import { usePokemonSelector } from '../composable/usePokemonSelector.js'
import { usePokemonLoader } from '../composable/usePokemonLoader.js'
import { usePokemonGeneration } from '../composable/usePokemonGeneration.js'

const generations = [
	{ id: 0, name: "All"},
	{ id: 1, name: "Generación I"},
	{ id: 2, name: "Generación II"},
	{ id: 3, name: "Generación III"},
	{ id: 4, name: "Generación IV"},
	{ id: 5, name: "Generación V"},
	{ id: 6, name: "Generación VI"},
	{ id: 7, name: "Generación VII"},
	{ id: 8, name: "Generación VIII"},
	{ id: 9, name: "Generación IX"}
]

const {
	selectedGeneration,
	sortOption,
	sortOrder,
	sortedPokemon,
	setPokemonList,
	toggleSortOrder,
} = usePokemonSelector()

const {
	fetchMorePokemon,
	resetPagination,
	endOfList,
	loading,
} = usePokemonLoader(setPokemonList, sortedPokemon)

const {
	searchGeneration,
	isFilterByGeneration,
} = usePokemonGeneration(setPokemonList, generations)

const pokemonData = ref({})
const pokemonSearch = ref(false)

function normalizeText(text) {
	return text
		.trim()
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
}

async function searchPokemon(id) {
	const cleanId = normalizeText(id)
	if (!cleanId) {
		pokemonSearch.value = false
		return
	}
	const data = await fetchPokemonById(cleanId)
	if (data) {
		pokemonData.value = data
		pokemonSearch.value = true
	} else {
		pokemonSearch.value = false
	}
}

function resetSearch() {
	pokemonData.value = {}
	pokemonSearch.value = false
	isFilterByGeneration.value = false
	resetPagination()
	setPokemonList([])
	fetchMorePokemon()
}

function handleScroll() {
	if (isFilterByGeneration.value) return

	const scrollTop = window.scrollY
	const windowHeight = window.innerHeight
	const documentHeight = document.body.offsetHeight

	if (scrollTop + windowHeight >= documentHeight - 10 && !loading.value && !endOfList.value) {
		loading.value = true
		fetchMorePokemon()
	}
}

onMounted(() => {
	window.addEventListener("scroll", handleScroll)
	fetchMorePokemon()
})

onBeforeUnmount(() => {
	window.removeEventListener("scroll", handleScroll)
})

watch(selectedGeneration, (newGen) => {
	if(newGen === 0) {
		isFilterByGeneration.value = false
		setPokemonList([])
		resetPagination()
		fetchMorePokemon()
	} else {
		searchGeneration(newGen)
	}
})
</script>