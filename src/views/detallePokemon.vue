<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold">Detalles de: {{ $route.params.id }}</h1>
        <!-- Aquí luego cargarás la info del Pokémon con fetch si quieres -->
    </div>
</template>

<script>
import { TypePokemon } from '../services/type.js';
export default {
    id: "DetallePokemon",
    methods: {
        async loadPokemonType(pokemon) {
            try {
                const pokemonData = await TypePokemon(pokemon);
                const typeUrls = pokemonData.types.map(t => t.type.url);

                const allTypes = [];

                // Hacemos fetch a cada URL de tipo y se guarda la información de las relaciones de daño de cada tipo en un array(allTypes)
                for (const url of typeUrls) {
                    const res = await fetch(url);
                    const typeData = await res.json();
                    allTypes.push(typeData.damage_relations.double_damage_from);
                }

                // aplanamos y eliminamos duplicados por nombre
                const flat = allTypes.flat();
                const unique = [...new Map(flat.map(t => [t.name, t])).values()];

                this.typeData = unique;
                console.log("Es débil contra:", unique.map(t => t.name));
            } catch (e) {
                console.error("error al cargar:", e);
            }
        },
    }
};
</script>