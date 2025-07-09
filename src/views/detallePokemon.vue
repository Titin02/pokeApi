<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <pokemonInfo />
        <detallePokemon />
    </div>
</template>
<script setup>
import detallePokemon from '../components/pokemonDetails/Details.vue'
import PokemonInfo from '../components/pokemonDetails/PokemonInfo.vue'
</script>