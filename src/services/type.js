export async function TypePokemon(pokemonID) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/type/${pokemonID}/`
        );
        if (!response.ok) {
            throw new Error("La respuesta de la api no es correcta");
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (e) {
        console.error("Error al obtener datos de Pokemon:", e);
        throw e; 
    }
}
