<template>
  <div>
    <FormNotes
      :note="editedNote"
      @save="updateNote"
      @delete="deleteNote"
    />
  </div>
</template>

<script>
import FormNotes from '@/components/FormNotes.vue';
import { openDB } from "idb";
import { mixinsDb } from '@/mixins/mixinsDb';

export default {
  name: 'IndividualNoteView',
  components: {
    FormNotes,
  },
  data() {
    return {
      editedNote: null,
      showDeleteModal: false,
    };
  },
  async mounted() {
    const noteId = this.$route.params.id;
    await this.fetchNoteById(noteId);
  },
  methods: {
    async fetchNoteById(noteId) {
      try {
        const db = await openDB("notes-db", 1);
        const tx = db.transaction("notes", "readonly");
        const store = tx.objectStore("notes");
        this.editedNote = await store.get(parseInt(noteId));
        await tx.done;
        if (!this.editedNote) {
          console.error("Note not found.");
        }
      } catch (error) {
        console.error("Error fetching note from IndexedDB:", error);
      }
    },
    async updateNote(updatedNote) {
      try {
        if (this.editedNote && this.editedNote.content !== undefined) {
          const storeName = "notes";
          await this.updateData(storeName, updatedNote);

          const currentRoute = this.$route.fullPath;
          const targetRoute = { name: "listing" };

          if (currentRoute !== this.$router.resolve(targetRoute).href) {
            this.$router.push(targetRoute).catch(err => {});
          }
        } else {
          console.error("Can't update undefined or null note.");
        }
      } catch (error) {
        console.error("Error updating note in IndexedDB:", error);
      }
    },
    async deleteNote() {
      try {
        if (this.editedNote && this.editedNote.content !== undefined) {
          const storeName = "notes";
          await this.deleteDataById(storeName, this.editedNote.id);
          this.$router.push({ name: "listing" });
        } else {
          console.error("Can't delete undefined or null note.");
        }
      } catch (error) {
        console.error("Error deleting note in IndexedDB:", error);
      }
    },
  },
  mixins: [mixinsDb]
};
</script>
