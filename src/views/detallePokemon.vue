<template>
    <div class="p-4">
        <router-link to="/" class="block">
            <button
                class="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer hover:scale-95">
                Volver
            </button>
        </router-link>
        <h1 class="text-2xl font-bold">Detalles de: {{ route.params.id }}</h1>
        <div v-if="doubleDamageFrom && doubleDamageFrom.length">
            <p><strong>Es débil contra:</strong></p>
            <ul>
                <li v-for="tipo in doubleDamageFrom" :key="tipo">
                    {{ tipo }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { TypePokemon } from '../services/type.js';
import { onMounted } from 'vue';
import { ref } from 'vue';


const route = useRoute()
const pokemonID = route.params.id
const doubleDamageFrom = ref([])

async function loadPokemonType(pokemon) {
    try {
        const pokemonData = await TypePokemon(pokemon);
        const typeUrls = pokemonData.types.map(t => t.type.url);
        const typeDataArray = await Promise.all(
            typeUrls.map(url => fetch(url).then(res => res.json()))
        );
        const typeNames = typeDataArray.map(data => data.damage_relations.double_damage_from);
        const allNames = typeNames.flat().map(type => type.name);

         doubleDamageFrom.value = [...new Set(allNames)];
    } catch (e) {
        console.error("error al cargar:", e);
    }
}

onMounted(() => {
    loadPokemonType(pokemonID)
})
</script>