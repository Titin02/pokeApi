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
import CardCounter from "./components/common/CardCounter.vue";

export default {
	components: {
		CardPokemon,
		searchForm,
		CardCounter,
	},
	data() {
		return {
			pokemonData: {},
			pokemonID: "",
			pokemonDatageneration: [],
			pokemonSearch: false,
			errorMessage: "",
			offset: 0,
			loading: false,
			endOfList: false,
			totalLoaded: 0,
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
			console.log(cleanId)
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

		async fetchMorePokemon() {
			try {
				const limit = 30
				const maxPokemon = 1025

				if(this.totalLoaded >= maxPokemon) {
					this.endOfList = true
					this.loading = false
					return
				}

				const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${this.offset}`)
				const data = await response.json()

				const pokemonDetail = data.results.map(async (pokemon) => {
					const res = await fetch(pokemon.url)
					const detail = await res.json()
					return detail;
				})

				const fullDetail = await Promise.all(pokemonDetail)

				const remaining = maxPokemon - this.totalLoaded
				const toAdd = fullDetail.slice(0, remaining)

				this.pokemonDatageneration.push(...toAdd)
				this.totalLoaded += toAdd.length
				this.offset += limit

				if(this.totalLoaded >= maxPokemon) {
					this.endOfList = true
				}

				this.loading = false
			} catch (e) {
				console.error("Error al cargar mas pokemones:", e)
				this.loading = false
			}
		},

		resetSearch() {
			this.pokemonID = "";
			this.pokemonData = {};
			this.pokemonSearch = false;
			this.errorMessage = "";
		},

		handleScroll() {
			const scrollTop = window.scrollY
			const windowHeight = window.innerHeight
			const documentHeight = document.body.offsetHeight

			if (scrollTop + windowHeight >= documentHeight - 10 && !this.loading && !this.endOfList) {
				this.loading = true;
				this.fetchMorePokemon();
			}
		}
	},
	mounted() {
		// this.searchGeneration(1);
		window.addEventListener("scroll", this.handleScroll)
		this.fetchMorePokemon()
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.handleScroll)
	},
};
</script>