<template >
	<div class="min-h-screen bg-amber-100 p-6">
		<div class="flex items-center justify-between mb-4">
			<div class="text-2xl">Detalles de: {{ route.params.id }}</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div
				class="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-4"
			>
				<img :src="pokemonImageUrl" class="w-[200px]" alt="Pokemon Image" />
                 <div
                    v-for="tipo in types"
                    :key="tipo"
                    class="flex flex-wrap px-4 py-1 rounded text-black text-sm font-semibold"
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

				<div class="w-full bg-gray-100 rounded-xl p-4">
					<div class="font-semibold mb-2">Informacion:</div>
					<ul class="text-sm space-y-1 text-gray-700">
						<li>Altura: 1.0 m</li>
						<li>Peso: 6.9 kg</li>
						<li>Experiencia base: 64</li>
						<li>Generación: 1</li>
					</ul>
				</div>
			</div>

			<div class="lg:col-span-2 space-y-6">
				<div class="flex flex-wrap gap-3">
                    <router-link to="/">
                        <button
                            class="border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Atras
                        </button>
                    </router-link>
                    <button
                        @click="activeTab = 'estadisticas'"
                        type="button"
                        :class="[
                            'border px-4 py-2 rounded-lg text-sm',
                            activeTab === 'estadisticas'
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                        ]">
                        Estadisticas
                    </button>
                    <button
                        :class="[
                            'border px-4 py-2 rounded-lg text-sm',
                            activeTab === 'evoluciones'
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                        ]"
                        @click="activeTab = 'evoluciones'"
                        type="button"
                    >
                        Evoluciones
                    </button>
                    <button
                        @click="activeTab = 'habilidades'"
                        type="button"
                        :class="[
                            'border px-4 py-2 rounded-lg text-sm',
                            activeTab === 'habilidades'
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                        ]"
                    >
                        Habilidades
                    </button>
                    <button
                        @click="activeTab = 'daños'"
                        type="button"
                        :class="[
                            'border px-4 py-2 rounded-lg text-sm',
                            activeTab === 'daños'
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                        ]"
                    
                    >
                        Daños
                    </button>
				</div>

				<div class="bg-white rounded-xl shadow p-6">
					<h2 class="text-xl font-bold mb-4">
						Efectividad
					</h2>
					<div class="flex gap-2 mb-6">
						<button
							class="border border-gray-300 rounded-full px-4 py-1 text-sm bg-white"
						>
							Defensa
						</button>
						<button
							class="border border-gray-800 text-white bg-black rounded-full px-4 py-1 text-sm"
						>
							Ataque
						</button>
					</div>

					<div class="mt-6 space-y-4">
                        <div v-if="activeTab === 'estadisticas'">
                            <h1 class="flex justify-center text-2xl">Estadisticas en proceso</h1>
                        </div>
                        <div v-if="activeTab === 'evoluciones'">
                            <h1 class="flex justify-center text-2xl">Evoluciones en proceso</h1>
                        </div>
                                <div v-if="activeTab === 'habilidades'">
                            <h1 class="flex justify-center text-2xl">Habilidades en proceso</h1>
                        </div>
                        <div v-if="activeTab === 'daños'">
                            <div v-if="halfDamageTo && halfDamageTo.length">
                                <div
                                class="text-sm mb-2 text-gray-600"
                                >
                                    0.5x Poco efectivo
                                </div>
                                <div class="flex gap-2 flex-wrap">
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
                            </div>
                            <div v-if="doubleDamageTo && doubleDamageTo.length">
                                <div
                                class="text-sm mb-2 text-gray-600"
                                >
                                    2× Efectivo
                                </div>
                                <div class="flex gap-2 flex-wrap">
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
                                
                            </div>
                            <div v-if="noDamageFrom && noDamageFrom.length">
                                <div
                                class="text-sm mb-2 text-gray-600"
                                >
                                    Inmune
                                </div>
                                <div class="flex gap-2 flex-wrap">
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
                            </div>
                            <div v-if="doubleDamageFrom && doubleDamageFrom.length">
                                <div
                                class="text-sm mb-2 text-gray-600"
                                >
                                    Es debil
                                </div>
                                <div class="flex gap-2 flex-wrap">
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
                            <div v-if="halfDamageFrom && halfDamageFrom.length">
                                <div
                                class="text-sm mb-2 text-gray-600"
                                >
                                    Resiste a
                                </div>
                                <div class="flex gap-2 flex-wrap">
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
                            </div>
                            <div v-if="noDamageTo && noDamageTo.length">
                            <div
                            class="text-sm mb-2 text-gray-600"
                            >
                                Sin daño a
                            </div>
                            <div class="flex gap-2 flex-wrap">
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
                            </div>
                        </div >
					</div>
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