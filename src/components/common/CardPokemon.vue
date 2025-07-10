<template>
	<div
		class="relative group bg-stone-50 border border-stone-200 hover:border-stone-300 hover:shadow-lg rounded-2xl shadow-md cursor-pointer transition-all duration-500 hover:scale-[1.05] w-40 sm:w-48 p-4"
	>
		<div
			class="absolute top-2 left-2 w-7 h-7 rounded-full text-xs flex items-center justify-center bg-stone-100 border border-stone-300 text-stone-600 font-medium"
		>
			{{ pokemonData.id }}
		</div>

		<div class="flex justify-center mb-2">
			<img
				:src="pokemonImage"
				alt="Pokemon Image"
				class="w-20 h-20 drop-shadow-sm"
			/>
		</div>

		<div class="text-center mb-2">
			<h2
				class="capitalize font-mono text-stone-700 tracking-wide text-base"
			>
				{{ pokemonData.name.replace("-", " ") }}
			</h2>
			<div class="w-10 h-px mx-auto bg-stone-300 mt-1"></div>
		</div>

		<div class="flex justify-center gap-2 mt-1 mb-2">
			<div
				v-for="(typeObj, index) in normalizedTypes"
				:key="index"
				class="flex gap-0.5 px-2 py-1 rounded-full text-xs font-medium text-white border border-white/20"
				:style="{ backgroundColor: typeColors[typeObj.type.name] }"
			>
				<img
					:src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeObj.type.name}.svg`"
					:alt="typeObj.type.name"
					class="w-4 h-4"
				/>
				<!-- <span class="capitalize">{{ typeObj.type.name }}</span> -->
			</div>
		</div>

		<div
			v-if="generationName"
			class="text-center text-[10px] px-2 py-1 rounded-full border bg-stone-100 border-stone-200 text-stone-500 font-light"
		>
			{{ formattedGeneration }}
		</div>
	</div>
</template>

<script setup>
import { toRefs, computed } from "vue"

const props = defineProps({
	pokemonData: { type: Object, required: true },
	generationName: { type: String, default: "" },
})

const { pokemonData, generationName } = toRefs(props)

const typeColors = {
	normal: "#A8A878",
	fire: "#F08030",
	water: "#6890F0",
	grass: "#78C850",
	electric: "#F8D030",
	ice: "#98D8D8",
	fighting: "#C03028",
	poison: "#A040A0",
	ground: "#E0C068",
	flying: "#A890F0",
	psychic: "#F85888",
	bug: "#A8B820",
	rock: "#B8A038",
	ghost: "#705898",
	dragon: "#7038F8",
	dark: "#705848",
	steel: "#B8B8D0",
	fairy: "#F0B6BC",
}

const pokemonImage = computed(
	() =>
		`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.value.id}.png`
)

const formattedGeneration = computed(() => {
	const map = {
		"generation-i": "Generación I",
		"generation-ii": "Generación II",
		"generation-iii": "Generación III",
		"generation-iv": "Generación IV",
		"generation-v": "Generación V",
		"generation-vi": "Generación VI",
		"generation-vii": "Generación VII",
		"generation-viii": "Generación VIII",
		"generation-ix": "Generación IX",
	}
	return map[generationName.value] || generationName.value
})

const normalizedTypes = computed(() => {
	if (!pokemonData.value.types) return []
	if (
		typeof pokemonData.value.types[0] === "object" &&
		pokemonData.value.types[0].type
	) {
		return pokemonData.value.types
	}
	return pokemonData.value.types.map((typeName) => ({
		type: { name: typeName },
	}))
})
</script>
