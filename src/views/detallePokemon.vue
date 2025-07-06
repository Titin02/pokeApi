<template>
    <div class="min-h-screen bg-amber-100 px-4 py-6">
        <router-link to="/" class="block">
            <button
                class="px-4 p-2 rounded bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer hover:scale-95">
                Volver
            </button>
        </router-link>
        <div class="flex justify-end">
            <div class="w-1/2 shadow-md bg-white rounded-md border-red-500 overflow-auto break-words max-w-full">
                <div class="flex justify-center">
                    <div class="w-full inline-flex rounded-xl" role="group">
                        <button type="button"
                            class="w-full px-4 py-2 text-sm text-white bg-red-600 border-none border-red-700 hover:bg-red-700">
                            Evoluciones
                        </button>
                        <button type="button"
                            class="w-full px-4 py-2 text-sm text-white bg-red-600 border-t border-red-700 hover:bg-red-700">
                            habilidades
                        </button>
                        <button type="button"
                            class="w-full px-4 py-2 text-sm text-white bg-red-600 border border-red-700 hover:bg-red-700">
                            Stats
                        </button>
                        <button type="button"
                            class="w-full px-4 py-2 text-sm text-white bg-red-600 border border-red-700 hover:bg-red-700">
                            Debil y Fuerte
                        </button>
                    </div>
                </div>
                <h1 class="text-2xl font-mono text-center font-bold p-5">Detalles de: {{ route.params.id }}</h1>
                <div class="flex justify-between gap-10 flex-wrap p-4">
                    <div v-if="doubleDamageFrom && doubleDamageFrom.length">
                        <p><strong>Es débil contra estos tipos</strong></p>
                        <ul class="list-inside list-disc text-gray-900">
                            <li v-for="tipo in doubleDamageFrom" :key="tipo">
                                {{ tipo }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="doubleDamageUs && doubleDamageUs.length">
                        <p><strong>Es fuerte contra estos tipos</strong></p>
                        <ul class="list-inside list-disc text-gray-900">
                            <li v-for="tipo in doubleDamageUs" :key="tipo">
                                {{ tipo }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { TypePokemon } from '../services/type.js';
import { onMounted, ref, computed } from 'vue';



const route = useRoute()
const pokemonID = route.params.id
const doubleDamageFrom = ref([])
const doubleDamageUs = ref([])
const props = defineProps(['pokemonData']);
const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#F0B6BC'
};

const mainTypeColor = computed(() => {
    const mainType = props.pokemonData.types?.[0]?.type?.name;
    return typeColors[mainType] || "#000";
});


async function loadPokemonType(pokemon) {
    try {
        const pokemonData = await TypePokemon(pokemon);
        const typeUrls = pokemonData.types.map(t => t.type.url);
        const tipos = pokemonData.types.map(t => t.type.name);
        console.log(tipos)
        const typeDataArray = await Promise.all(typeUrls.map(url => fetch(url).then(res => res.json())));
        const typeNamesfrom = typeDataArray.map(data => data.damage_relations.double_damage_from);
        const typeNamesto = typeDataArray.map(data => data.damage_relations.double_damage_to);
        const allNamesfrom = typeNamesfrom.flat().map(type => type.name);
        const allNamesto = typeNamesto.flat().map(type => type.name);

        doubleDamageFrom.value = [...new Set(allNamesfrom)];
        doubleDamageUs.value = [...new Set(allNamesto)];
    } catch (e) {
        console.error("error al cargar:", e);
    }
}

onMounted(() => {
    loadPokemonType(pokemonID)
})
</script>