export async function fetchPokemonById(pokemonID) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        );
        if (!response.ok) {
            throw new Error(`La respuesta de la api no es correcta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        throw e; 
    }
}
