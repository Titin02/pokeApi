import { ref } from "vue"

export function usePokemonLoader(setPokemonList, sortedPokemon) {
	const offset = ref(0)
	const loading = ref(false)
	const endOfList = ref(false)
	const totalLoaded = ref(0)
	const limit = ref(30)
	const maxPokemon = ref(1025)

	const allPokemonList = ref([])

	async function loadLocalPokemonList() {
		if (allPokemonList.value.length === 0) {
			const res = await fetch("/data/pokemonFullList.json")
			allPokemonList.value = await res.json()
		}
	}

	async function fetchMorePokemon() {
		loading.value = true

		await loadLocalPokemonList()

		const start = offset.value
		const end = Math.min(start + limit.value, maxPokemon.value)
		const batch = allPokemonList.value.slice(start, end)

		const details = await Promise.all(
			batch.map(async (pokemon) => {
				try {
					const res = await fetch(pokemon.url)
					const data = await res.json()

					let generation = "unknown"
					try {
						const speciesRes = await fetch(
							`https://pokeapi.co/api/v2/pokemon-species/${data.id}`
						)
						const speciesData = await speciesRes.json()
						generation = speciesData.generation.name
					} catch (e) {
						console.warn(
							"No se encontró el generation para:",
							data.name
						)
					}

					return {
						...data,
						generation,
					}
				} catch (e) {
					console.error("Error al obtener detalles:", e)
					return null
				}
			})
		)

		const filtered = details.filter(Boolean)

		setPokemonList([...sortedPokemon.value, ...filtered])
		totalLoaded.value += filtered.length
		offset.value += limit.value

		if (totalLoaded.value >= maxPokemon.value) {
			endOfList.value = true
		}

		loading.value = false
	}

	function resetPagination() {
		offset.value = 0
		totalLoaded.value = 0
		endOfList.value = false
		loading.value = false
	}

	return {
		fetchMorePokemon,
		resetPagination,
		endOfList,
		loading,
		allPokemonList,
	}
}
