<template>
    <div class="w-1/2 flex flex-col gap-4">
        <div class="bg-white shadow rounded p-4 flex justify-center items-center">
            <img :src="pokemonImageUrl" class="w-[300px]" alt="Pokemon Image" />
        </div>

        <div class="bg-white shadow rounded p-4">
            <p class="text-lg font-bold">Información</p>
            <p class="text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor, purus facilisis tempus rhoncus, arcu nisl dictum ante, eget bibendum lectus libero id sem. Curabitur feugiat leo non feugiat pretium. Aliquam odio sapien, rhoncus ut neque quis, efficitur rhoncus elit. Aliquam finibus aliquam ex vel rutrum. Duis porttitor arcu ligula, quis sollicitudin est molestie quis. Maecenas placerat auctor libero ac volutpat. Ut faucibus dui ipsum, eget eleifend massa eleifend ac. Suspendisse eu ex eros.</p>
        </div>
    </div>
    <div class="w-1/2 shadow-md bg-white rounded-md overflow-auto break-words">
        <div class="flex justify-items-center">
            <div class="flex w-full  rounded-xl" role="group">
                <router-link to="/" class="block w-2/4 px-4 py-2 text-sm text-white bg-gray-600 border-none border-gray-700 hover:bg-gray-700">
                    <button>
                        Volver
                    </button>
                </router-link>
                <button
                    @click="activeTab = 'evoluciones'"
                    type="button"
                    class="flex justify-center w-full px-4 py-2 text-sm text-white bg-red-600 border-none border-red-700 hover:bg-red-700">
                    Evoluciones
                </button>
                <button
                    @click="activeTab = 'habilidades'"
                    type="button"
                    class="flex justify-center w-full px-4 py-2 text-sm text-white bg-red-600 border-none border-red-700 hover:bg-red-700">
                    habilidades
                </button>
                <button
                    @click="activeTab = 'stats'"
                    type="button"
                    class="flex justify-center w-full px-4 py-2 text-sm text-white bg-red-600 border-none border-red-700 hover:bg-red-700">
                    Stats
                </button>
                <button
                    @click="activeTab = 'debil y fuerte'"
                    type="button"
                    class="flex justify-center w-full px-4 py-2 text-sm text-white bg-red-600 border-none border-red-700 hover:bg-red-700">
                    Debil y Fuerte
                </button>
            </div>
        </div>
        <div class="flex justify-center gap-2 pt-4">
            <div
            v-for="tipo in types"
                :key="tipo"
                class="flex px-3 py-1 rounded text-black text-sm font-semibold"
                :style="{backgroundColor: typeColors[tipo], color: 'white'}">
                <img
                    :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"
                    :alt="tipo"
                    class="w-5 h-5"
                />
                <span>
                    {{ tipo }}
                </span>
            </div>
        </div>
        <h1 class="text-2xl font-mono text-center font-bold p-5">Detalles de: {{ route.params.id }}</h1>
        <div v-if="activeTab === 'evoluciones'">
            <h1 class="flex justify-center text-2xl">Evoluciones en proceso</h1>
        </div>
                <div v-if="activeTab === 'habilidades'">
            <h1 class="flex justify-center text-2xl">Habilidades en proceso</h1>
        </div>
                <div v-if="activeTab === 'stats'">
            <h1 class="flex justify-center text-2xl">Stats en proceso</h1>
        </div>
        <div v-if="activeTab === 'debil y fuerte'">
            <div class="flex flex-wrap gap-4 p-2" v-if="noDamageTo && noDamageTo.length">
                <p><strong>Sin dano a:</strong></p>
                <div v-for="tipo in noDamageTo"
                :key="tipo"
                class="flex px-3 py-1 rounded text-black text-sm font-semibold"
                :style="{backgroundColor: typeColors[tipo], color: 'white'}"
                >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"
                        :alt="tipo"
                        class="w-5 h-5"
                    />
                </div>
            </div>
            <div class="flex flex-wrap gap-4 p-2" v-if="halfDamageTo && halfDamageTo.length">
                <p><strong>Dano reducido a:</strong></p>
                <div v-for="tipo in halfDamageTo"
                    :key="tipo"
                    class="flex px-3 py-1 rounded text-black text-sm font-semibold"
                    :style="{backgroundColor: typeColors[tipo], color: 'white'}"
                    >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"
                        :alt="tipo"
                        class="w-5 h-5"
                    />
                </div>
            </div>
            <div class="flex flex-wrap gap-4 p-2" v-if="doubleDamageTo && doubleDamageTo.length">
                <p><strong>Dano aumentado a:</strong></p>
                <div v-for="tipo in doubleDamageTo"
                :key="tipo"
                class="flex px-3 py-1 rounded text-black text-sm font-semibold"
                :style="{backgroundColor: typeColors[tipo], color: 'white'}"
                >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"
                        :alt="tipo"
                        class="w-5 h-5"
                    />
                </div>
            </div>
            <div v-else>
                <p>No tiene dano en aumento</p>
            </div>
            <div class="flex flex-wrap gap-4 p-2" v-if="noDamageFrom && noDamageFrom.length">
                <p><strong>Inmune a:</strong></p>
                <div v-for="tipo in noDamageFrom"
                :key="tipo"
                class="flex px-3 py-1 rounded text-black text-sm font-semibold"
                :style="{backgroundColor: typeColors[tipo], color: 'white'}"
                >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"
                        :alt="tipo"
                        class="w-5 h-5"
                    />
                </div>
            </div>
            <div class="flex flex-wrap gap-4 p-2" v-if="halfDamageFrom && halfDamageFrom.length">
                <p><strong>Resiste a:</strong></p>
                <div v-for="tipo in halfDamageFrom"
                :key="tipo"
                class="flex px-3 py-1 rounded text-black text-sm font-semibold"
                :style="{backgroundColor: typeColors[tipo], color: 'white'}"
                >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"
                        :alt="tipo"
                        class="w-5 h-5"
                    />
                </div>
            </div>
            <div class="flex flex-wrap gap-4 p-2" v-if="doubleDamageFrom && doubleDamageFrom.length">
                <p><strong>Debil a:</strong></p>
                <div v-for="tipo in doubleDamageFrom"
                :key="tipo"
                class="flex px-3 py-1 rounded text-black text-sm font-semibold"
                :style="{backgroundColor: typeColors[tipo], color: 'white'}"
                >
                    <img
                        :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${tipo}.svg`"
                        :alt="tipo"
                        class="w-5 h-5"
                    />
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { TypePokemon } from '../../services/type'



const route = useRoute()
const pokemonID = route.params.id
const noDamageTo = ref([])
const halfDamageTo = ref([])
const doubleDamageTo = ref([])
const noDamageFrom = ref([])
const halfDamageFrom = ref([])
const doubleDamageFrom = ref([])
const types = ref([])
const pokemonImageUrl = ref('')
const activeTab = ref()

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

async function loadPokemonType(pokemon) {
    try {
        const pokemonData = await TypePokemon(pokemon)
        const id = pokemonData.id
        const typeUrls = pokemonData.types.map(t => t.type.url)
        const typeDataArray = await Promise.all(typeUrls.map(url => fetch(url).then(res => res.json())))
        const noDamageto = typeDataArray.map(data=> data.damage_relations.no_damage_to)
        const halfDamageto = typeDataArray.map(data=> data.damage_relations.half_damage_to)
        const doubleDamageto = typeDataArray.map(data=> data.damage_relations.double_damage_to)
        const noDamagefrom = typeDataArray.map(data=> data.damage_relations.no_damage_from)
        const halfDamagefrom = typeDataArray.map(data=> data.damage_relations.half_damage_from)
        const doubleDamagefrom = typeDataArray.map(data=> data.damage_relations.double_damage_from)
        const AllnoDamageto = noDamageto.flat().map(data => data.name)
        const AllhalfDamageto = halfDamageto.flat().map(data => data.name)
        const AlldoubleDamageto = doubleDamageto.flat().map(data => data.name)
        const AllnoDamagefrom = noDamagefrom.flat().map(data => data.name)
        const AllhalfDamagefrom = halfDamagefrom.flat().map(data => data.name)
        const AlldoubleDamagefrom = doubleDamagefrom.flat().map(data => data.name)


        types.value = pokemonData.types.map(t => t.type.name)
        noDamageTo.value = AllnoDamageto
        halfDamageTo.value = AllhalfDamageto
        doubleDamageTo.value = AlldoubleDamageto
        noDamageFrom.value = AllnoDamagefrom
        halfDamageFrom.value = AllhalfDamagefrom
        doubleDamageFrom.value = AlldoubleDamagefrom
        pokemonImageUrl.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    } catch (e) {
        console.error("error al cargar:", e)
    }
}

onMounted(() => {
    loadPokemonType(pokemonID)
})
</script>