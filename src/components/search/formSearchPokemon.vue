<template>
	<form
		@submit.prevent="search"
		class="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-md w-full max-w-2xl mx-auto relative"
	>
		<div class="w-full relative">
			<input
				v-model="pokemonID"
				@input="onInput"
				placeholder="Buscar Pokémon"
				class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 transition"
			/>
			<!-- Sugerencias -->
			<ul
				v-if="filteredSuggestions.length && pokemonID"
				class="absolute bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto shadow z-10"
			>
				<li
					v-for="pokemon in filteredSuggestions"
					:key="pokemon.name"
					@click="selectSuggestion(pokemon.name)"
					class="flex items-center justify-between gap-2 p-2 hover:bg-gray-100 cursor-pointer"
				>
					<img
						:src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`"
						:alt="pokemon.name"
						class="w-14 h-14"
					/>
					<span class="flex-1 capitalize">{{ pokemon.name }}</span>
					<span class="text-sm text-gray-500">N° {{ pokemon.id }}</span>
				</li>
			</ul>
		</div>
	</form>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const emit = defineEmits(["search"]);

const pokemonID = ref("");
const allPokemons = ref([]);

const filteredSuggestions = computed(() => {
	return allPokemons.value
		.filter((p) =>
			p.name.toLowerCase().includes(pokemonID.value.toLowerCase())
		)
		.slice(0, 5);
});

function selectSuggestion(name) {
	pokemonID.value = name;
	search();
}

function search() {
	emit("search", pokemonID.value);
}

async function fetchPokemons() {
	try {
		const res = await fetch("/data/pokemonList.json");
		const data = await res.json();

		allPokemons.value = data;
	} catch (e) {
		console.error("Error al obtener la lista Json:", e);
	}
}

onMounted(() => {
	fetchPokemons();
});
</script>
