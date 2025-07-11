import { ref } from 'vue'
import { TypePokemon } from './type'

export function PokemonType() {
  const noDamageTo = ref([])
  const halfDamageTo = ref([])
  const doubleDamageTo = ref([])
  const noDamageFrom = ref([])
  const halfDamageFrom = ref([])
  const doubleDamageFrom = ref([])
  const types = ref([])
  const pokemonImageUrl = ref('')

  async function loadPokemonType(pokemon) {
    try {
        const pokemonData = await TypePokemon(pokemon)
        const id = pokemonData.id
        const typeRaw = pokemonData.types.map(t => t.type)
        const typeDataArray = await Promise.all(
        typeRaw.map(t => t.url).map(url => fetch(url).then(res => res.json()))
        )
        const extractDamageRelations = (key) =>
        typeDataArray
            .map(data => data.damage_relations[key])
            .flat()
            .map(data => data.name)

        types.value = typeRaw.map(t => t.name)
        noDamageTo.value = extractDamageRelations('no_damage_to')
        halfDamageTo.value = extractDamageRelations('half_damage_to')
        doubleDamageTo.value = extractDamageRelations('double_damage_to')
        noDamageFrom.value = extractDamageRelations('no_damage_from')
        halfDamageFrom.value = extractDamageRelations('half_damage_from')
        doubleDamageFrom.value = extractDamageRelations('double_damage_from')
        pokemonImageUrl.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    } catch (e) {
      console.error('error al cargar:', e)
    }
  }

  return {
    noDamageTo,
    halfDamageTo,
    doubleDamageTo,
    noDamageFrom,
    halfDamageFrom,
    doubleDamageFrom,
    types,
    pokemonImageUrl,
    loadPokemonType
  }
}
