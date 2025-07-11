<template >
		<div>
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
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow font-bold'
                            : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                        ]">
                        Estadisticas
                    </button>
                    <button
                        :class="[
                            'border px-4 py-2 rounded-lg text-sm',
                            activeTab === 'evoluciones'
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow font-bold'
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
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow font-bold'
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
                            ? 'border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-900 bg-white shadow font-bold'
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
					<div class="mt-6 space-y-4">
                        <div v-if="activeTab === 'estadisticas'">
                            <h1 class="flex justify-center text-2xl">Estadisticas en proceso</h1>
                        </div>
                        <div v-if="activeTab === 'evoluciones'">
                            <div v-if="evolutions.length" class="space-y-6">
                                <div
                                v-for="(branch, i) in evolutions"
                                :key="i"
                                class="flex items-center gap-4"
                                >
                                <div
                                    v-for="(evo, index) in branch"
                                    :key="evo.from + '-' + (evo.to ?? 'final')"
                                    class="flex items-center"
                                >
                                    <div class="text-center">
                                    <img
                                        :src="`https://img.pokemondb.net/artwork/large/${evo.from}.jpg`"
                                        :alt="evo.from"
                                        class="w-24 h-24 object-contain"
                                    />
                                    <p class="capitalize mt-1">{{ evo.from }}</p>
                                    </div>
                                    <div v-if="evo.to" class="flex flex-col items-center mx-2">
                                    <span class="text-sm text-gray-500">
                                        {{
                                        evo.trigger === 'level-up'
                                            ? `Nivel ${evo.level ?? '?'}`
                                            : evo.trigger === 'use-item'
                                            ? 'Piedra evolutiva'
                                            : evo.trigger === 'trade'
                                            ? 'Intercambio'
                                            : evo.trigger ?? 'Desconocido'
                                        }}
                                    </span>
                                    <span class="text-2xl">→</span>
                                    </div>
                                </div>
                                <div v-if="branch[branch.length - 1].to" class="text-center">
                                    <img
                                    :src="`https://img.pokemondb.net/artwork/large/${branch[branch.length - 1].to}.jpg`"
                                    :alt="branch[branch.length - 1].to"
                                    class="w-24 h-24 object-contain"
                                    />
                                    <p class="capitalize mt-1">
                                    {{ branch[branch.length - 1].to }}
                                    </p>
                                </div>
                                </div>
                            </div>
                            </div>



                        <div v-if="activeTab === 'habilidades'">
                            <h1 class="flex justify-center text-2xl">Habilidades en proceso</h1>
                        </div>
                        <div v-if="activeTab === 'daños'">
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
</template>
<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { PokemonType } from '../../services/pokemonType.js'

const route = useRoute()
const pokemonID = route.params.id
const evolutions = ref([])
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
}
const {
  noDamageTo,
  halfDamageTo,
  doubleDamageTo,
  noDamageFrom,
  halfDamageFrom,
  doubleDamageFrom,
  loadPokemonType,
} = PokemonType()

async function fetchEvolutions(pokemonName) {
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const pokemonData = await pokemonRes.json()

    const speciesRes = await fetch(pokemonData.species.url)
    const speciesData = await speciesRes.json()

    const evoRes = await fetch(speciesData.evolution_chain.url)
    const evolutionData = await evoRes.json()

    function getEvolutions(chain, path = [], branches = []) {
        if (!chain) return branches

        const from = chain.species.name

        if (!chain.evolves_to.length) {
            branches.push([...path, { from, to: null, level: null, trigger: null }])
            return branches
        }

        chain.evolves_to.forEach(evo => {
            const evoDetails = evo.evolution_details[0]
            const to = evo.species.name
            const level = evoDetails?.min_level ?? null
            const trigger = evoDetails?.trigger?.name ?? null

            const newPath = [...path, { from, to, level, trigger }]
            getEvolutions(evo, newPath, branches)
        })

        return branches
    }
  return getEvolutions(evolutionData.chain)
}

onMounted(() => {
    loadPokemonType(pokemonID)
     fetchEvolutions(pokemonID).then(data => {
    evolutions.value = data
  })
})
</script>