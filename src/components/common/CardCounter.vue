<template>
    <button @click="openPopup(pokemon)">Mostrar guardar</button>
    <div v-if="popUpActive" class="popup-overlay active">
        <div class="popup-content">
            <div v-if="typeData">
                <p><strong>Nombre del tipo:</strong> {{ typeData.name }}</p>
            </div>

            <div class="popup-buttons">
                <button @click="closePopup" class="no-popup">Atras</button>
            </div>
        </div>
    </div>
    <!-- <div v-else>
        No esta activado el popup
    </div> -->
</template>
<script>
import { TypePokemon } from '../../services/type.js';


export default {
    data() {
        return {
            popUpActive: false,
            typeData: null,
        }
    },
    methods: {
        openPopup() {
            this.popUpActive = true;
            this.loadPokemonType(10)
        },
        closePopup() {
            this.popUpActive = false;
        },
        async loadPokemonType(pokemonID) {
            try {
                const data = await TypePokemon(pokemonID);
                this.typeData = data;
                console.log("es debil con: ", data)
            } catch (error) {
                console.error("error al cargar: ", error)
            }
        }
    }
}
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