<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <p>Voce tem certeza que quer apagar essa anotação?</p>
      <div class="modal-buttons">
        <button @click="cancelDelete">Cancelar</button>
        <button @click="confirmDelete">Apagar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
  },
  methods: {
    confirmDelete() {
      this.$emit("on-confirm");
    },
    cancelDelete() {
      this.$emit("on-cancel");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-buttons {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
