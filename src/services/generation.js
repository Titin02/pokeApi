export async function generation(gen) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/generation/${gen}/`
        );
        if (!response.ok) {
            throw new Error(`Conexion con la api: ${response.status}`);
        }
        return await response.json();;
    } catch (e) {
        console.error(e);
        throw e; 
    }
}
