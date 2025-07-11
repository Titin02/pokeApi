export async function generation(gen) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/generation/${gen}/`
        );
        if (!response.ok) {
            throw new Error(`La respuesta de la api no es correcta: ${response.status}`);
        }
        return await response.json();;
    } catch (e) {
        console.error(e);
        throw e; 
    }
}
