<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2  gap-6">
            <pokemonInfo />
            <detallePokemon />
        </div>
    </div>


</template>
<script setup>
import detallePokemon from '../components/pokemonDetails/Details.vue'
import PokemonInfo from '../components/pokemonDetails/PokemonInfo.vue'
</script>