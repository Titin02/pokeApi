import { ref } from "vue"
import { fetchPokemonById } from "../services/searchPokemon.js"

export function usePokemonSearch(
	setPokemonList,
	fetchMorePokemon,
	resetPagination,
	isFilterByGeneration,
	clearTypes,
	selectedGeneration,
) {
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

		clearTypes()
		selectedGeneration.value = 0
		
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

	return {
		pokemonData,
		pokemonSearch,
		searchPokemon,
		resetSearch,
	}
}
