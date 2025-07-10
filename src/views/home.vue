<template>
	<div class="bg-[#f9f9f9] min-h-screen px-4 py-6 font-mono">
		<div class="flex justify-center items-center mb-2">
			<img src="../assets/Logo.png" alt="Logo" class="w-16 h-16 object-contain" />
			<h1 class="text-5xl font-bold tracking-tight">PokeDex</h1>
		</div>
		<div class="max-w-6xl mx-auto space-y-6">
			<!-- Buscar -->
			<div class="flex justify-center">
				<div class="bg-white p-4 rounded-2xl shadow-md w-full max-w-2xl">
					<searchForm @search="searchPokemon" />
				</div>
			</div>
			<!-- Generacion y filtro -->
			<div class="bg-white p-4 rounded-xl shadow-md">
				<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
					<!-- Selector Generaciones -->
					<div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
						<span class="text-sm font-semibold text-gray-600">
							Generación:
						</span>
						<GenerationSelector v-model="selectedGeneration" :generations="generations" />
					</div>
					<!-- Selector Orden -->
					<div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
						<div class="mb-2 sm:mb-0">
							<button 
								@click="filter" 
								:class="[
									'px-2 py-1 rounded-lg border border-gray-300 shadow-md transition cursor-pointer',
									showFilterType 
										? 'bg-gray-300 border-1 border-gray-400' 
										: 'bg-white hover:bg-gray-50'
								]"
							>
								Tipos
							</button>
						</div>
						<div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
							<span class="text-sm font-semibold text-gray-600 sm:mb-0 mb-1 whitespace-nowrap">
								Ordenar por:
							</span>
							<div class="flex items-center gap-1">
								<OrderSelector 
									v-model="sortOption" 
									:options="[
										{ value: 'number', label: 'Número' },
										{ value: 'name', label: 'Nombre' },
									]" 
								/>
								<button 
									@click="toggleSortOrder"
									class="p-2 rounded-r-lg bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition cursor-pointer"
									title="Cambiar orden">
									<svg class="text-gray-500 w-4 h-4 transform transition-transform duration-300 lucide lucide-arrow-up-down" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<path d="m21 16-4 4-4-4"></path>
										<path d="M17 20V4"></path>
										<path d="m3 8 4-4 4 4"></path>
										<path d="M7 4v16"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="showFilterType" class="bg-white p-4 rounded-xl shadow-md">
				<TypeFilter 
					:selectedTypes="selectedTypes" 
					@update:selectedType="toggleType"
					@clear="handleClearTypes"
				/>
			</div>
			<!-- Card pokemon busqueda -->
			<div v-if="pokemonSearch" class="bg-white p-6 rounded-xl shadow-md">
				<div class="flex flex-col items-center space-y-4">
					<router-link :to="`/detallePokemon/${pokemonData.name}`" class="block">
						<CardPokemon :pokemonData="pokemonData" />
					</router-link>
					<div class="flex flex-wrap gap-4">
						<button @click="resetSearch"
							class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm shadow cursor-pointer">
							Volver
						</button>
					</div>
				</div>
			</div>
			<!-- Lista de pokemones -->
			<div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
				<div 
					v-for="pokemon in pokemonListToDisplay" 
					:key="pokemon.name" 
					class="flex justify-center"
				>
					<router-link :to="`/detallePokemon/${pokemon.name}`" class="block">
						<CardPokemon :pokemonData="pokemon" :generationName="pokemon.generation" />
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Vue core
import { ref, onMounted, computed } from "vue"
// Components
import CardPokemon from "../components/common/CardPokemon.vue"
import searchForm from "../components/search/formSearchPokemon.vue"
import GenerationSelector from "../components/common/GenerationSelector.vue"
import OrderSelector from "../components/common/OrderSelector.vue"
import TypeFilter from "../components/common/TypeFilter.vue"
// Composables
import { usePokemonSelector } from "../composable/usePokemonSelector.js"
import { usePokemonLoader } from "../composable/usePokemonLoader.js"
import { usePokemonGeneration } from "../composable/usePokemonGeneration.js"
import { usePokemonTypeFilter } from "../composable/usePokemonTypeFilter.js"
import { usePokemonFilterCoordinator } from "../composable/usePokemonFilterCoordinator.js"
import { usePokemonSearch } from '../composable/usePokemonSearch.js'
import { useInfiniteScroll } from '../composable/useInfiniteScroll.js'

const generations = [
	{ id: 0, name: "Todas" },
	{ id: 1, name: "Generación I" },
	{ id: 2, name: "Generación II" },
	{ id: 3, name: "Generación III" },
	{ id: 4, name: "Generación IV" },
	{ id: 5, name: "Generación V" },
	{ id: 6, name: "Generación VI" },
	{ id: 7, name: "Generación VII" },
	{ id: 8, name: "Generación VIII" },
	{ id: 9, name: "Generación IX" },
]

const {
	selectedGeneration,
	sortOption,
	sortedPokemon,
	setPokemonList,
	toggleSortOrder,
} = usePokemonSelector()

const { 
	fetchMorePokemon, 
	resetPagination, 
	endOfList, 
	loading,
	allPokemonList,
} =	usePokemonLoader(setPokemonList, sortedPokemon)

const { 
	searchGeneration, 
	isFilterByGeneration,
} = usePokemonGeneration(
	setPokemonList,
	generations,
)

const { 
	selectedTypes, 
	filteredByType, 
	toggleType, 
	clearTypes,
} =	usePokemonTypeFilter()

const {
	handleClearTypes,
	setupWatchers,
} = usePokemonFilterCoordinator({
	selectedGeneration,
	selectedTypes,
	clearTypes,
	resetPagination,
	setPokemonList,
	fetchMorePokemon,
})

const {
	pokemonData,
	pokemonSearch,
	searchPokemon,
	resetSearch,
} = usePokemonSearch(
	setPokemonList, 
	fetchMorePokemon, 
	resetPagination, 
	isFilterByGeneration,
	clearTypes,
	selectedGeneration,
)

useInfiniteScroll({
  fetchMore: fetchMorePokemon,
  loading,
  endOfList,
  disabled: isFilterByGeneration,
})

const showFilterType = ref(false)

const pokemonListToDisplay = computed(() => {
	if(selectedGeneration.value === 0 && selectedTypes.value.length > 0) {
		return filteredByType(allPokemonList.value)
	}
	return filteredByType(sortedPokemon.value)
})

function filter() {
	showFilterType.value = !showFilterType.value
}

onMounted(() => {
	fetchMorePokemon()
	setupWatchers(searchGeneration, isFilterByGeneration)
})
</script>