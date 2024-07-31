<template>
    <div class="cardPokemon">
        <header class="pokemonHeader">
            <img :src="pokemonImage" class="pokemonImage" alt="Pokemon Image" />
        </header>
        <div class="nombre">
            <h2>{{ pokemonData.name }}</h2>
        </div>
        <div>
            <p class="pokemonIndex">N°: {{ pokemonData.id }}</p>
            <p class="pokemonAltura">Altura: {{ pokemonData.height }}</p>
            <p class="pokemonAnchura">Anchura: {{ pokemonData.weight }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pokemonData: {
            type: Object,
            required: true
        }
    },
    computed: {
        pokemonImage() {
            return `src/assets/pokemones/${this.pokemonData.id}.gif`
        }
    }
}
</script>

<style scoped>
.pokemonHeader {
    height: 6rem;
    margin-top: -7rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
}

.cardPokemon {
    display: grid;
    justify-content: center;
    border-radius: 1rem;
    width: 12rem;
    height: 12rem;
    border: 2px solid rgba(155, 155, 155, 0.9);
    color: #000;
    cursor: pointer;
    font-size: 14px;
    font-family: cursive;
    object-fit: cover;
    padding-top: 4rem;
    transition: transform 0.5s;
    background: #fff;
}

.cardPokemon:hover {
    transform: scale(1.2);
}
</style>