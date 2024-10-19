<template>
    <button @click="openPopup">Mostrar guardar</button>
    <div v-if="popUpActive" class="popup-overlay active">
        <div class="popup-content">
            <div class="popup-img">
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3927_12473)">
                        <path
                            d="M29.0036 3.625C30.6122 3.625 32.0962 4.47461 32.9118 5.86797L57.3806 47.5555C58.2075 48.9602 58.2075 50.6934 57.4032 52.098C56.5989 53.5027 55.0923 54.375 53.4724 54.375H4.53488C2.91496 54.375 1.40832 53.5027 0.604022 52.098C-0.200275 50.6934 -0.188947 48.9488 0.626678 47.5555L25.0954 5.86797C25.9111 4.47461 27.395 3.625 29.0036 3.625ZM29.0036 18.125C27.497 18.125 26.2849 19.3371 26.2849 20.8438V33.5312C26.2849 35.0379 27.497 36.25 29.0036 36.25C30.5103 36.25 31.7224 35.0379 31.7224 33.5312V20.8438C31.7224 19.3371 30.5103 18.125 29.0036 18.125ZM32.6286 43.5C32.6286 42.5386 32.2467 41.6166 31.5669 40.9367C30.8871 40.2569 29.965 39.875 29.0036 39.875C28.0422 39.875 27.1202 40.2569 26.4404 40.9367C25.7606 41.6166 25.3786 42.5386 25.3786 43.5C25.3786 44.4614 25.7606 45.3834 26.4404 46.0633C27.1202 46.7431 28.0422 47.125 29.0036 47.125C29.965 47.125 30.8871 46.7431 31.5669 46.0633C32.2467 45.3834 32.6286 44.4614 32.6286 43.5Z"
                            fill="#FBC239" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3927_12473">
                            <rect width="58" height="58" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div class="popup-message">
                <label><b>Guardar cambios</b></label>
                <p>
                    ¿Estás seguro que deseas guardar los cambios
                    realizados?
                </p>
            </div>
            <div class="popup-buttons">
                <button @click="closePopup" class="no-popup">No</button>
                <button class="yes-popup">Si</button>
            </div>
        </div>
    </div>
    <div v-else>
        No esta activado el popup
    </div>
</template>

<script>
export default {
    data() {
        return {
            popUpActive: false
        }
    },
    methods: {
    openPopup() {
      this.popUpActive = true;
    },
    closePopup() {
      this.popUpActive = false;
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