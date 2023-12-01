<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="noteHolder">
    <form @submit.prevent="handleSubmit" id="createNotes">
      <md-field>
        <label>Anotação</label>
        <md-textarea v-model="note.content" id="note"></md-textarea>
      </md-field>
      <md-field>
        <label>Titulo</label>
        <md-input v-model="note.title"></md-input>
      </md-field>
      <md-field>
        <label>Categoria</label>
        <md-input v-model="note.category"></md-input>
      </md-field>
      <div class="actionHolder">
        <md-button @click="openDeleteModal" class="md-icon-button md-raised md-accent">
          <md-icon>delete</md-icon>
        </md-button>
        <md-button type="submit" class="md-raised">Salvar</md-button>
      </div>
    </form>
    <delete-confirmation-modal :show-modal="showDeleteModal" @on-confirm="confirmDeleteNote" @on-cancel="cancelDeleteNote" />
  </div>
</template>

<script>
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal.vue";
/* eslint-disable */
export default {
  props: {
    note: Object,
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  computed: {
    isEditing() {
      return this.note && this.note.id !== undefined;
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("save", this.note);
      this.$router.push("/notes");
    },
    openDeleteModal() {
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    confirmDeleteNote() {
      if (this.isEditing) {
        this.$emit("delete", this.note.id);
      } else {
        this.note = {
          title: "",
          content: "",
          category: ""
        };
      }
      this.closeDeleteModal();
    },
    cancelDeleteNote() {
      this.closeDeleteModal();
    },
  },
  components: {
    DeleteConfirmationModal,
  },
};
</script>

<style scoped>
.noteHolder {
  width: 100%;
  padding: 6.389vw 6.389vw 3.611vw 6.389vw;
}

#createNotes {
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
}

#createNotes .md-field {
  margin: 0;
}

#createNotes #note {
  height: 250px;
}

#createNotes .actionHolder {
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {

}
</style>
