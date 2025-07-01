export async function generation(gen) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/generation/${gen}/`
        );
        if (!response.ok) {
            throw new Error("Error de conexion con la api");
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Error al obtener la data:", e);
        throw e; 
    }
}
