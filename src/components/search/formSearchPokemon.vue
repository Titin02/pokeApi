<template>
    <form @submit.prevent="search" class="searchMenu">
        <label for="">Busqueda pokemon</label>
        <input v-model="pokemonID" placeholder="Ingrese un N° o nombre" />
        <button type="submit">Buscar</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            pokemonID: ''
        }
    },
    methods: {
        search() {
            this.$emit('search', this.pokemonID) 
        }
    }
}
</script>

<style scoped>
.searchMenu {
    display: flex;
    color: #000;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>