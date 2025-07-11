export async function fetchPokemonById(pokemonID) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        )
        console.log(response)
        if (!response.ok) {
            throw new Error(`La respuesta de la api no es correcta: ${response.status}`)
        }
        return await response.json()
    } catch (e) {
        console.error(e)
        throw e 
    }
}
