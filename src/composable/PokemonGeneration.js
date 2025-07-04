import { ref } from "vue"
import { generation } from '../services/generation.js'

export function PokemonGeneration(setPokemonList, generations) {
    const isFilterByGeneration = ref(false)

    async function searchGeneration(gen) {
        const generationId = typeof gen === "object" ? Number(gen.target.value) : gen

        try {
            isFilterByGeneration.value = true

            const selectedGen = generations.find(g => g.id === generationId)
            const generationName = selectedGen ? selectedGen.name : `Generación ${generationId}`

            const data = await generation(generationId)
            const pokemonDetail = data.pokemon_species.map(
                async (pokemon) => {
                    const urlPart = pokemon.url.split("/").filter(Boolean)
                    const id = urlPart[urlPart.length - 1]
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    const pokemonDatails = await response.json()
                    return {
                        ...pokemonDatails,
                        generation: generationName
                    }
                }
            )
            const allPokemon = (await Promise.all(pokemonDetail)).filter(Boolean)
            setPokemonList(allPokemon)
        } catch (e) {
            console.error("Error al buscar la generación:", e)
        }
    }

    return {
        searchGeneration,
        isFilterByGeneration,
    }
}