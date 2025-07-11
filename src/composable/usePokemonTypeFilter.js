import { ref } from "vue"

export function usePokemonTypeFilter() {
	const selectedTypes = ref([])

	function toggleType(type) {
		if(selectedTypes.value.includes(type)) {
			selectedTypes.value = selectedTypes.value.filter(t => t !== type)
		} else {
			if(selectedTypes.value.length > 1) {
				selectedTypes.value.shift()
			}
			selectedTypes.value.push(type)
		}
	}

	function clearTypes() {
		selectedTypes.value = []
	}

	function filteredByType(pokemonList) {
		if (selectedTypes.value.length === 0) return pokemonList

		return pokemonList.filter((pokemon) => {
			const typeNames = pokemon.types.map((t) =>
				typeof t === 'string' ? t : t.type.name
			)

			if (selectedTypes.value.length === 1) {
				return typeNames.includes(selectedTypes.value[0])
			}

			return selectedTypes.value.every(type => typeNames.includes(type))
		})
	}

	return {
		selectedTypes,
		filteredByType,
		toggleType,
		clearTypes,
	}
}
