<template>
  <div>
    <div v-if="showModal" class="modal-overlay ">
      <div class="modal">
        <!-- <button @click="closeModal" class="close-button">&times;</button> -->
        <div class="tour">Events & Tour dates</div>
        <div id="seated-55fdf2c0" data-artist-id="3c1d40de-6147-4dde-9f64-868884b4735a" data-css-version="3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
    };
  },
  mounted() {
    this.loadSeatedWidget();
  },
  methods: {
    loadSeatedWidget() {
      const seatedScript = document.createElement('script');
      seatedScript.src = 'https://widget.seated.com/app.js';
      seatedScript.async = true;
      document.body.appendChild(seatedScript);
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    }
  }
};
</script>

<style scoped>
.tour{
  padding: 2vw;
    font-size: xx-large;
    font-size: large;
    font-weight: 900;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
}


.modal-overlay {
  position: relative;
    top: 0;
    left: 0;
    /* width: 100%; */
    /* height: 100%; */
    /* background: rgba(0, 0, 0, 0.5); */
    display: flex;
    padding-bottom: 3vw;
    justify-content: center;
    align-items: center;
    /* z-index: 1000; */
}

.modal {
  /* background: white;
  background: #381dbf;
  background: rgba(0, 0, 0, 0.5); */
  color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* width: 80%; */
    max-width: 600px;
    box-sizing: border-box;
    border: none;
    font-size: 10px;
    font-size: 1.5rem;
    position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

@media (max-width: 768px) {
.modal {
    width: 80%;
    max-width: 80%;
}
}
</style>
