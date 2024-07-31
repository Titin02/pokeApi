export async function fetchPokemon(pokemonID) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
        );
        if (!response.ok) {
            throw new Error("La respuesta de la api no es correcta");
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error al obtener datos de Pokemon:", e);
        throw e; 
    }
}
