<template>
    <form @submit.prevent="search" class="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-md w-full max-w-2xl mx-auto">
        <div class="w-full">
            <input 
                v-model="pokemonID" 
                placeholder="Buscar pokemon"
                class="w-full px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 transition"
            />
        </div>
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
