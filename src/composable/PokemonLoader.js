import { ref } from "vue"

export function PokemonLoader(setPokemonList, sortedPokemon) {
    const offset = ref(0)
    const loading = ref(false)
    const endOfList = ref(false)
    const totalLoaded = ref(0)
    const limit = ref(30)
    const maxPokemon = ref(1025)

    async function fetchMorePokemon() {
        if(totalLoaded.value >= maxPokemon.value) {
            endOfList.value = true
            loading.value = false
            return
        }
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit.value}&offset=${offset.value}`)
        const data = await response.json()

        const pokemonDetail = data.results.map(async (pokemon) => {
            try {
                const res = await fetch(pokemon.url)
                const detail = await res.json()

                if(detail.id > maxPokemon.value) return null

                let generation = "unknown"
                try {
                    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${detail.id}`)
                    const speciesData = await speciesRes.json()
                    generation = speciesData.generation.name
                } catch (e) {
                    console.warn("No se encontro el pokemon: ", e)
                    return null
                }

                return {
                    ...detail,
                    generation
                }
            } catch (e) {
                console.error("Error en pokemon individual:", e)
                return null
            }
        })

        const fullDetail = (await Promise.all(pokemonDetail)).filter(Boolean)
        const remaining = maxPokemon.value - totalLoaded.value
        const toAdd = fullDetail.slice(0, remaining)

        setPokemonList([...sortedPokemon.value, ...toAdd])
        totalLoaded.value += toAdd.length
        offset.value += limit.value

        if(totalLoaded.value >= maxPokemon.value) {
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
	}
}