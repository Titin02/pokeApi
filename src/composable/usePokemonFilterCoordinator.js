import { watch } from "vue"

export function usePokemonFilterCoordinator({
	selectedGeneration,
	selectedTypes,
	clearTypes,
	resetPagination,
	setPokemonList,
	fetchMorePokemon,
}) {
	function handleClearTypes() {
		clearTypes()

		if (selectedGeneration.value === 0) {
			resetPagination()
			setPokemonList([])
			fetchMorePokemon()
		}
	}

	function setupWatchers(searchGeneration, isFilterByGeneration) {
		watch(selectedGeneration, (newGen) => {
			if (newGen === 0) {
				isFilterByGeneration.value = false
				setPokemonList([])
				resetPagination()
				fetchMorePokemon()
			} else {
				searchGeneration(newGen)
			}
		})
	}

	return {
		handleClearTypes,
		setupWatchers,
	}
}
