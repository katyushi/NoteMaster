<template>
  <!-- não sei pq o vue tá ignorando essa primeira div -->
  <div id="dannyPhantom">
    <FormNotes :note="newNote" @save="addNote" @delete="deleteNote"/>
  </div>
</template>

<script>
import FormNotes from '@/components/FormNotes.vue';
import { mixinsDb } from '@/mixins/mixinsDb';

export default {
  name: 'CreateNotesView',
  components: {
    FormNotes
  },
  data: () => ({
    notes: [],
    newNote: {
      title: "",
      content: "",
      category: "",
    },
  }),
  methods: {
    async addNote() {
      try {
        const storeName = "notes";
        const newNote = { ...this.newNote, id: Date.now() };
        await this.addData(storeName, newNote);
        this.notes.push(newNote);
        this.newNote = { title: "", content: "" };
      } catch (error) {
        console.error("Error adding note to IndexedDB:", error);
      }
    },
    deleteNote() {
      this.newNote = {
        title: "",
        content: "",
        category: "",
      };
    },
  },
  mixins: [mixinsDb]
};
</script>

<style scoped>

</style>
