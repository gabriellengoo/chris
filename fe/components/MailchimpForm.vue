<template>
  <div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <button @click="closeModal" class="close-button">&times;</button>
        <div id="mc_embed_signup"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.showModal = true;
    }, 2000);
  },
  methods: {
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  box-sizing: border-box; /* Ensure padding does not affect width */
  position: relative; /* Make positioning relative for the close button */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #381dbf;
}
</style>