<template>
	<form @submit.prevent="search">
		<div class="w-full relative">
			<input
				v-model="pokemonID"
				@input="onInput"
				@blur="onBlur"
				@keyup.enter="selectSuggestion(pokemonID)"
				placeholder="Buscar Pokémon"
				class="w-full px-4 py-2 border border-gray-300 dark:border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-0 dark:text-gray-100"
			/>
			<!-- Sugerencias -->
			<router-link v-if="pokemonID" :to="`/detallePokemon/${pokemonID}`" class="block">
			<ul
				v-if="filteredSuggestions.length && pokemonID"
				class="absolute bg-white dark:bg-gray-700 border rounded w-full mt-1 max-h-40 overflow-y-auto shadow z-10"
			>
				<li
					v-for="pokemon in filteredSuggestions"
					:key="pokemon.name"
					@click="selectSuggestion(pokemon.name)"
					class="flex items-center justify-between gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer"
				>
					<img
						:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
						:alt="pokemon.name"
						class="w-10 h-10"
					/>
					<span class="flex-1 capitalize font-mono dark:text-gray-100">{{ pokemon.name }}</span>
					<span class="text-sm text-gray-500 font-mono dark:text-gray-100">N° {{ pokemon.id }}</span>
				</li>
			</ul>
			</router-link>
		</div>
	</form>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

const emit = defineEmits(["search"])

const pokemonID = ref("")
const allPokemons = ref([])
const router = useRouter()

const filteredSuggestions = computed(() => {
	const query = pokemonID.value.toLowerCase()
	return allPokemons.value
		.filter((p) =>
			p.name.toLowerCase().includes(query) || p.id.toString().includes(query)
		)
		.slice(0, 5)
})

function onBlur() {
	setTimeout(() => {
		pokemonID.value = ""
	}, 100)
}

function selectSuggestion(name) {
	pokemonID.value = name
	search()

	const match = allPokemons.value.find(
		(p) => 
			p.name.toLowerCase() === name
	)

	if(match) {
		emit("search", pokemonID.value)
		router.push(`/detallePokemon/${pokemonID.value}`)
	}
}

function search() {
	emit("search", pokemonID.value)
}

async function fetchPokemons() {
	try {
		const res = await fetch("/data/pokemonFullList.json")
		const data = await res.json()

		allPokemons.value = data
	} catch (e) {
		console.error("Error al obtener la lista Json:", e)
	}
}

onMounted(() => {
	fetchPokemons()
})
</script>
