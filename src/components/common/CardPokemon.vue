<template>
    <div class="cardPokemon">
        <header class="pokemonHeader">
            <img :src="pokemonImage" class="pokemonImage" alt="Pokemon Image" />
        </header>
        <div class="nombre">
            <h2>{{ pokemonData.name }}</h2>
        </div>
        <div class="pokemonInfo">
            <p class="pokemonIndex">N°: {{ pokemonData.id }}</p>
            <div class="pokemonTypes">
                <div
                    v-for="(typeObj, index) in pokemonData.types"
                    :key="index"
                    class="pokemonType"
                    :style="{backgroundColor: typeColors[typeObj.type.name], color: 'white'}"
                >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeObj.type.name}.svg`"
                        :alt="typeObj.type.name"
                        class="typeIcon"
                    />
                    <span class="typeName">{{ typeObj.type.name }}</span>
                </div>
            </div>
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
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.pokemonData.id}.png`
        },
        typeColors() {
            return {
                normal:     '#A8A878',
                fire:       '#F08030',
                water:      '#6890F0',
                grass:      '#78C850',
                electric:   '#F8D030',
                ice:        '#98D8D8',
                fighting:   '#C03028',
                poison:     '#A040A0',
                ground:     '#E0C068',
                flying:     '#A890F0',
                psychic:    '#F85888',
                bug:        '#A8B820',
                rock:       '#B8A038',
                ghost:      '#705898',
                dragon:     '#7038F8',
                dark:       '#705848',
                steel:      '#B8B8D0',
                fairy:      '#F0B6BC'
            };
        }
    },
}
</script>

<style scoped>
.pokemonHeader {
    margin-top: -7rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
}

.pokemonImage {
    width: 90px;
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

.pokemonTypes {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
}

.pokemonType {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    background-color: #eee;
    padding: 0.2rem 0.4rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
}

.typeIcon {
    width: 20px;
    height: 20px;
}

.typeName {
    text-transform: capitalize;
}
</style>