<template>
	<div class="bg-amber-100 px-4 py-6">
		<div class="text-center font-bold text-4xl">PokeDex</div>
		<div class="max-w-6xl mx-auto space-y-6">
			<!-- Buscar -->
			<div class="flex justify-center">
				<div class="p-4 rounded-xl w-full max-w-sm">
					<searchForm @search="searchPokemon" />
				</div>
			</div>
			<!-- Generacion y filtro -->
			<div class="bg-white p-2 rounded-xl shadow-md">
				<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
					<!-- Selector Generaciones -->
					<div
						class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
					>
						<label
							class="font-semibold text-gray-700 mb-2 sm:mb-0 text-sm min-w-max"
						>
							Generación:
						</label>
						<GenerationSelector
							v-model="selectedGeneration"
							:generations="generations"
						/>
					</div>
					<!-- Selector Orden -->
					<div
						class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
					>
					<div >
						<button 
							@click="filter" 
							:class="[
								'px-2 py-1 rounded-lg border border-gray-300 shadow-md transition cursor-pointer',
								filterType ? 'bg-gray-300 border-1 border-gray-400' : 'bg-white hover:bg-gray-50'
							]"
						>
							Tipos
						</button>
					</div>
						<label
							class="font-semibold text-gray-700 mb-2 sm:mb-0 text-sm min-w-max"
						>
							Ordenar por:
						</label>
							<div class="flex items-center">							<OrderSelector
								v-model="sortOption"
								:options="[
									{ value: 'number', label: 'Número' },
									{ value: 'name', label: 'Nombre' },
								]"
							/>
							<button
								@click="toggleSortOrder"
								class="p-2 rounded-r-lg bg-white border border-gray-300 shadow-md hover:bg-gray-50 transition cursor-pointer"
								title="Cambiar orden"
							>
								<svg
									class="text-gray-500 w-4 h-4 transform transition-transform duration-300 lucide lucide-arrow-up-down"
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
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
			<div v-if="filterType" class="bg-white p-2 rounded-xl shadow-md">
				<TypeFilter
					:selectedTypes="selectedTypes"
					@update:selectedType="toggleType"
					@clear="handleClearTypes"
				/>
			</div>
			<!-- Card pokemon busqueda -->
			<div v-if="pokemonSearch" class="bg-white p-6 rounded-xl shadow-md">
				<div class="flex flex-col items-center space-y-4">
					<router-link
						:to="`/detallePokemon/${pokemonData.name}`"
						class="block"
					>
						<CardPokemon :pokemonData="pokemonData" />
					</router-link>
					<div class="flex flex-wrap gap-4">
						<button
							@click="resetSearch"
							class="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer hover:scale-95"
						>
							Volver
						</button>
					</div>
				</div>
			</div>
			<!-- Lista de pokemones -->
			<div
				v-else
				class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
			>
				<div
					v-for="pokemon in pokemonListToDisplay"
					:key="pokemon.name"
					class="flex justify-center"
				>
					<router-link
						:to="`/detallePokemon/${pokemon.name}`"
						class="block"
					>
						<CardPokemon
							:pokemonData="pokemon"
							:generationName="pokemon.generation"
						/>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Vue core
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue"
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
	allPokemonList,
} =	usePokemonLoader(setPokemonList, sortedPokemon)

const { 
	searchGeneration, 
	isFilterByGeneration 
} = usePokemonGeneration(
	setPokemonList,
	generations
)

const { 
	selectedTypes, 
	filteredByType, 
	toggleType, 
	clearTypes,
} =	usePokemonTypeFilter()

const {
	handleClearTypes,
	setupWatchers
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
	resetSearch
} = usePokemonSearch(
	setPokemonList, 
	fetchMorePokemon, 
	resetPagination, 
	isFilterByGeneration
)

const filterType = ref(false)

const pokemonListToDisplay = computed(() => {
	if (selectedGeneration.value === 0 && selectedTypes.value.length > 0) {
		return filteredByType(allPokemonList.value)
	}
	return filteredByType(sortedPokemon.value)
})

function handleScroll() {
	if (isFilterByGeneration.value) return

	const scrollTop = window.scrollY
	const windowHeight = window.innerHeight
	const documentHeight = document.body.offsetHeight

	if (
		scrollTop + windowHeight >= documentHeight - 10 &&
		!loading.value &&
		!endOfList.value
	) {
		loading.value = true
		fetchMorePokemon()
	}
}

function filter() {
	filterType.value = !filterType.value
}

onMounted(() => {
	window.addEventListener("scroll", handleScroll)
	fetchMorePokemon()
})

onMounted(() => {
	setupWatchers(searchGeneration, isFilterByGeneration)
})

onBeforeUnmount(() => {
	window.removeEventListener("scroll", handleScroll)
})
</script>