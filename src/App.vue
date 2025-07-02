<template>
	<div>
		<searchForm @search="searchPokemon" />
		<div>
			{{ errorMessage }}
		</div>
		<div class="flex flex-wrap gap-7 justify-center w-full" v-if="pokemonSearch">
			<div class="pokemonForCards">
				<CardPokemon :pokemonData="pokemonData" />
				<div class="flex flex-wrap gap-7">
					<button @click="resetSearch">volver</button>
					<!-- <popUp/> -->
					 <CardCounter/>
				</div>

			</div>
		</div>
		<div class="flex flex-wrap gap-7 justify-center w-full" v-else>
			<div
				v-for="pokemon in pokemonDatageneration"
				:key="pokemon.name"
			>
				<CardPokemon :pokemonData="pokemon" />
			</div>
		</div>
	</div>
</template>

<script>
import CardPokemon from "./components/common/CardPokemon.vue";
import { fetchPokemon } from "./services/searchPokemon.js";
import { generation } from "./services/generation.js";
import searchForm from "./components/search/formSearchPokemon.vue";
import popUp from "./components/popUp.vue";
import CardCounter from "./components/common/CardCounter.vue";

export default {
	components: {
		CardPokemon,
		searchForm,
		popUp,
		CardCounter,
	},
	data() {
		return {
			pokemonData: {},
			pokemonID: "",
			pokemonDatageneration: {},
			pokemonSearch: false,
			errorMessage: "",
		};
	},
	methods: {
		normalizeText(text) {
			return text
				.trim()
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
		},
		async searchPokemon(id) {
			const cleanId = this.normalizeText(id);
			if (!cleanId) {
				this.errorMessage =
					"Por favor, ingresa un ID o nombre de Pokémon.";
				this.pokemonSearch = false;
				return;
			}

			const data = await fetchPokemon(cleanId);
			try {
				if (data) {
					this.pokemonData = data;
					this.pokemonSearch = true;
					this.errorMessage = "";
				} else {
					this.pokemonSearch = false;
					this.errorMessage = "Pokemon no encontrado";
				}
			} catch (e) {
				this.errorMessage =
					"Error al buscar el pokemon. Id o nombre incorrectos.";
				this.pokemonSearch = false;
				console.error("Error al buscar el pokemon:", e);
			}
		},

		async searchGeneration(gen) {
			try {
				const data = await generation(gen);
				const pokemonDetail = data.pokemon_species.map(
					async (pokemon) => {
                        const urlPart = pokemon.url.split("/").filter(Boolean)
                        const id = urlPart[urlPart.length - 1]
                        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                        const pokemonData = await response.json();
                        return pokemonData;
					}
				);
				const allPokemon = await Promise.all(pokemonDetail);
				this.pokemonDatageneration = allPokemon.sort(
					(a, b) => a.id - b.id 
				);
				this.pokemonSearch = false;
			} catch (e) {
				console.error("Error al buscar el pokemon:", e);
			}
		},

		resetSearch() {
			this.pokemonID = "";
			this.pokemonData = {};
			this.pokemonSearch = false;
			this.errorMessage = "";
		},
	},
	mounted() {
		this.searchGeneration(1);
	},
};
</script>