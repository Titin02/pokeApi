<template>
    <div>
        <!-- <popUp/> -->
        <searchForm @search="searchPokemon" />
        <div>
            {{ errorMessage }}
        </div>
        <div class="container" v-if="pokemonSearch">
            <div class="pokemonForCards">
                <CardPokemon :pokemonData="pokemonData" />
                <button @click="resetSearch">volver</button>
            </div>
        </div>
        <div class="container" v-else>
            <div class="pokemonForCards" v-for="pokemon in pokemonDataGenerationI" :key="pokemon.name">
                <CardPokemon :pokemonData="pokemon" />
            </div>
        </div>
    </div>
</template>

<script>
import CardPokemon from './components/common/CardPokemon.vue'
import { fetchPokemon } from './services/searchPokemon.js'
import { generationI } from './services/Igeneration.js'
import searchForm from './components/search/formSearchPokemon.vue'
import popUp from './components/popUp.vue'


export default {
    components: {
        CardPokemon,
        searchForm,
        popUp
    },
    data() {
        return {
            pokemonData: {},
            pokemonID: '',
            pokemonDataGenerationI: {},
            pokemonSearch: false,
            errorMessage: ''
        }
    },
    methods: {
        async searchPokemon(id) {
            if (!id) {
                this.errorMessage = 'Por favor, ingresa un ID o nombre de Pokémon.';
                this.pokemonSearch = false;
                return;
            }

            const data = await fetchPokemon(id)
            try {
                if (data) {
                    this.pokemonData = data
                    this.pokemonSearch = true
                    this.errorMessage = ''
                } else {
                    this.pokemonSearch = false
                    this.errorMessage = 'Pokemon no encontrado'
                }
            } catch (e) {
                this.errorMessage = 'Error al buscar el pokemon. Id o nombre incorrectos.';
                this.pokemonSearch = false;
                console.error('Error al buscar el pokemon:', e);
            }
        },

        async searchGenerationI() {
            try {
                const data = await generationI()
                const pokemonDetail = data.results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url)
                    return response.json()
                })
                this.pokemonDataGenerationI = await Promise.all(pokemonDetail)
                this.pokemonSearch = false
            } catch (e) {
                console.error('Error al buscar el pokemon:', e)
            }
        },

        resetSearch() {
            this.pokemonID = ''
            this.pokemonData = {}
            this.pokemonSearch = false
            this.errorMessage = '';
        }
    },
    mounted() {
        this.searchGenerationI()
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    justify-content: center;
}

.pokemonForCards {
    padding: 4rem 2rem 0 2rem;
}
</style>