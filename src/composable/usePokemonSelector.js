import { ref, computed } from "vue"

export function usePokemonSelector() {
	const pokemonList = ref([])
	const selectedGeneration = ref(0)
	const sortOption = ref("number")
	const sortOrder = ref("asc")

	const sortedPokemon = computed(() => {
		const sorted = [...pokemonList.value]
		if (sortOption.value === "name") {
			sorted.sort((a, b) =>
				sortOrder.value === "asc"
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			)
		} else {
			sorted.sort((a, b) =>
				sortOrder.value === "asc" ? a.id - b.id : b.id - a.id
			)
		}
		return sorted
	})

	function setPokemonList(pokemons) {
		pokemonList.value = pokemons
	}

	function toggleSortOrder() {
		sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc"
	}

	return {
		selectedGeneration,
		sortOption,
		sortOrder,
		sortedPokemon,
		setPokemonList,
		toggleSortOrder,
	}
}
