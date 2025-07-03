<template>
	<div class="bg-amber-100 px-4 py-6">
		<div class="max-w-6xl mx-auto space-y-6">
			<!-- Buscar -->
			 <div class="flex justify-center">
				 <div class="p-4 rounded-xl w-full max-w-sm">
					 <searchForm @search="searchPokemon" />
					 <!-- <p v-if="errorMessage" class="text-red-600 mt-2 text-sm text-center">
						 {{ errorMessage }}
					 </p> -->
				 </div>
			 </div>
			<!-- Generacion -->
			<div class="bg-white p-2 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<label class="font-semibold text-gray-700 mb-2 sm:mb-0">
					Seleccione Generación
				</label>
				<GenerationSelector 
					v-model="selectedGeneration"
					:generations="generations"
				/>
			</div>
			<!-- Card pokemon busqueda -->
			<div v-if="pokemonSearch" class="bg-white p-6 rounded-xl shadow-md">
				<!-- <div class="flex flex-col gap-7 justify-center w-full"> -->
				<div class="flex flex-col items-center space-y-4">
					<CardPokemon :pokemonData="pokemonData" />
					<div class="flex flex-wrap gap-4">
						<button @click="resetSearch" class="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white shadow-md cursor-pointer hover:scale-95">
							Volver
						</button>
						<!-- <popUp/> -->
					</div>
				</div>
			</div>
			<!-- Lista de pokemones -->
			<!-- <div v-else class="flex flex-wrap gap-7 justify-center w-full"> -->
			<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				<div
					v-for="pokemon in pokemonDatageneration"
					:key="pokemon.name"
					class="flex justify-center"
				>
				<div  @click="openPopup(pokemon)">
					<CardPokemon :pokemonData="pokemon" :generationName="pokemon.generation" />
				</div>
				</div>
			</div>
			<div v-if="popUpActive" class="popup-overlay active">
				<div class="popup-content">
					<div v-if="typeData && typeData.length">
						<p><strong>Es débil contra:</strong></p>
						<ul>
							<li v-for="tipo in typeData" :key="tipo.name">
							{{ tipo.name }}
							</li>
						</ul>
					</div>
					<div class="popup-buttons">
						<button @click="closePopup" class="no-popup">Atras</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardPokemon from "./components/common/CardPokemon.vue";
import { fetchPokemon } from "./services/searchPokemon.js";
import { generation } from "./services/generation.js";
import { TypePokemon } from './services/type.js';
import searchForm from "./components/search/formSearchPokemon.vue";
import GenerationSelector from "./components/common/GenerationSelector.vue";

export default {
	components: {
		CardPokemon,
		searchForm,
		GenerationSelector,
	},
	data() {
		return {
			pokemonData: {},
			pokemonID: "",
			pokemonDatageneration: [],
			pokemonSearch: false,
			errorMessage: "",
			//FetchMorePokemon
			offset: 0,
			loading: false,
			endOfList: false,
			totalLoaded: 0,
			limit: 30,
			maxPokemon: 1025,
			//Generations
			selectedGeneration: 0,
			generations: [
				{ id: 0, name: "All"},
				{ id: 1, name: "Generación I"},
				{ id: 2, name: "Generación II"},
				{ id: 3, name: "Generación III"},
				{ id: 4, name: "Generación IV"},
				{ id: 5, name: "Generación V"},
				{ id: 6, name: "Generación VI"},
				{ id: 7, name: "Generación VII"},
				{ id: 8, name: "Generación VIII"},
				{ id: 9, name: "Generación IX"}
			],
			isFilterByGeneration: false,
			popUpActive: false,
			typeData: null,
		};
	},
	methods: {
		async openPopup(pokemon) {
            this.popUpActive = true;
			this.pokemonData = pokemon;
			this.loadPokemonType(pokemon)
        },
		closePopup() {
            this.popUpActive = false;
        },
		async loadPokemonType(pokemon) {
			try {
			const pokemonData = await TypePokemon(pokemon);
			const typeUrls = pokemonData.types.map(t => t.type.url);

			const allTypes = [];

			for (const url of typeUrls) {
			const res = await fetch(url);
			const typeData = await res.json();
			allTypes.push(typeData.damage_relations.double_damage_from);
			}

			// aplanamos y eliminamos duplicados por nombre
			const flat = allTypes.flat();
			const unique = [...new Map(flat.map(t => [t.name, t])).values()];

			this.typeData = unique;
			console.log("Es débil contra:", unique.map(t => t.name));
		} catch (e) {
			console.error("error al cargar:", e);
		}
		// 	console.log("Abriste el popup del:", pokemon.name);
		// 	const type = await TypePokemon(pokemon);
		// 	console.log("es debil con:", type);
		// 	if (!pokemon || !pokemon.name) {
		// 		throw new Error("El Pokémon no es válido");
		// 	}

		// 	this.typeData = type; // guarda solo una vez
		// } catch (e) {
		// 	console.log("error al cargar:", e);
		// }
        },
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
			const generationId = typeof gen === "object" ? Number(gen.target.value) : gen;

			try {
				this.isFilterByGeneration = true
				this.offset = 0
				this.totalLoaded = 0
				this.endOfList = true

				const data = await generation(generationId)
				const pokemonDetail = data.pokemon_species.map(
					async (pokemon) => {
                        const urlPart = pokemon.url.split("/").filter(Boolean)
                        const id = urlPart[urlPart.length - 1]
                        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                        const pokemonData = await response.json()
                        return pokemonData
					}
				);
				const allPokemon = await Promise.all(pokemonDetail)
				this.pokemonDatageneration = allPokemon.sort(
					(a, b) => a.id - b.id
				);
				this.pokemonSearch = false
			} catch (e) {
				console.error("Error al buscar el pokemon:", e)
			}
		},
		async fetchMorePokemon() {
			try {
				if(this.totalLoaded >= this.maxPokemon) {
					this.endOfList = true
					this.loading = false
					return
				}
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
				const data = await response.json()

				const pokemonDetail = data.results.map(async (pokemon) => {
					try {
						const res = await fetch(pokemon.url)
						const detail = await res.json()

						if(detail.id > this.maxPokemon) {
							return null
						}

						let generation = "unknown";
						try {
							const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${detail.id}`);
							if (speciesRes.ok) {
								const speciesData = await speciesRes.json();
								generation = speciesData.generation.name;
							} else {
								console.warn(`No se encontro especie para ID: ${detail.id}`);
								return null
							}
						} catch (w) {
							console.warn("No se encontro el pokemon: ", w)
							return null
						}

						return {
							...detail,
							generation
						};
					} catch (e) {
						console.error("Error en pokemon individual:", e);
						return null;
					}
				})

				const fullDetail = await Promise.all(pokemonDetail)
				const remaining = this.maxPokemon - this.totalLoaded
				const toAdd = fullDetail.slice(0, remaining)

				this.pokemonDatageneration.push(...toAdd)
				this.totalLoaded += toAdd.length
				this.offset += this.limit

				if(this.totalLoaded >= this.maxPokemon) {
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

			this.isFilteringByGeneration = false;
			this.pokemonDatageneration = [];
			this.offset = 0;
			this.totalLoaded = 0;
			this.endOfList = false;
			this.loading = false;

			this.fetchMorePokemon();
		},
		handleScroll() {
			if (this.isFilteringByGeneration) return;

			const scrollTop = window.scrollY
			const windowHeight = window.innerHeight
			const documentHeight = document.body.offsetHeight

			if (scrollTop + windowHeight >= documentHeight - 10 && !this.loading && !this.endOfList) {
				this.loading = true;
				this.fetchMorePokemon();
			}
		},
	},
	mounted() {
		// this.searchGeneration(1);
		window.addEventListener("scroll", this.handleScroll)
		this.fetchMorePokemon()
	},
	beforeUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	watch: {
		selectedGeneration(newGen) {
			if(newGen === 0) {
				this.isFilteringByGeneration = false;
				this.pokemonDatageneration = [];
				this.offset = 0;
				this.totalLoaded = 0;
				this.endOfList = false;
				this.fetchMorePokemon()
			} else {
				this.searchGeneration(newGen)
			}
		}
	},
};
</script>
<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
}

.popup-content {
    width: auto;
    max-width: 514px;
    height: 268px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 32px 32px 14px 32px;
}

.popup-overlay.active {
    display: flex;
}

.popup-img {
    text-align: center;
}

.popup-message {
    padding: 32px 28px 0 28px;
}

.popup-message label {
    font-size: 24px;
}

.popup-message p {
    font-size: 16px;
}

.no-popup {
    width: auto;
    min-width: 80px;
    height: 36px;
    border: 1.4px solid #3688b7;
    color: #3688b7;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s linear;
    padding: 8px 16px 8px 16px;
}

.yes-popup {
    width: auto;
    min-width: 80px;
    height: 36px;
    background: #ff8c2b;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s linear;
    padding: 8px 16px 8px 16px;
}

.yes-popup:hover {
    background: #f9ae65;
    color: #4e4442;
}

.no-popup:hover {
    background: #c1dbea;
    color: #313546;
}

.popup-buttons {
    display: flex;
    padding-top: 32px;
    justify-content: center;
    gap: 32px;
}

</style>