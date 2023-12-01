<template>
  <!-- não sei pq o vue tá ignorando essa primeira div -->
  <div id="dannyPhantom">
    <FormNotes :note="newNote" @save="addNote" @delete="deleteNote"/>
  </div>
</template>

<script>
import { openDB } from "idb";
import FormNotes from '@/components/FormNotes.vue';

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
        const db = await openDB("notes-db", 1);
        const tx = db.transaction("notes", "readwrite");
        const store = tx.objectStore("notes");
        const newNote = { ...this.newNote, id: Date.now() };
        await store.add(newNote);
        await tx.done;
        this.notes.push(newNote);
        this.newNote = { title: "", content: "", category: "" };
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
  }
};
</script>

<style scoped>

</style>
