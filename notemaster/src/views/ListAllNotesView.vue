<template>
  <div>
    <div class="holderBtn">
      <md-button class="md-raised btn-add">
        <router-link to="/notes/new" class="innerBtn">Criar anotação</router-link>
      </md-button>
    </div>
    <ul class="cardHolder">
      <li v-for="note in notes" :key="note.id" class="innerCardHolder">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{ note.title }}</div>
            </md-card-header>

            <md-card-content>
              {{ note.content }}
            </md-card-content>

            <md-card-actions>
              <md-button>
                <router-link :to="{ name: 'edit', params: { id: note.id } }" class="innerBtn">
                  Editar
                </router-link>
              </md-button>
              <md-button @click="openDeleteModal(note)" class="md-accent">Apagar</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </li>
    </ul>
    <router-view :notes="notes" @delete="deleteNote"/>
    <delete-confirmation-modal
      :show-modal="showDeleteModal"
      @on-confirm="confirmDeleteNote()"
      @on-cancel="cancelDeleteNote()"
    />
  </div>
</template>

<script>
import { openDB } from "idb";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal.vue";
import { mixinsDb } from '@/mixins/mixinsDb';

export default {
  name: 'ListAllNotesView',
  data() {
    return {
      notes: [],
      newNote: {
        title: "",
        content: "",
        category: "",
      },
      showDeleteModal: false,
      noteToDelete: null,
    };
  },
  async mounted() {
    await this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      try {
        const db = await openDB("notes-db", 1, {
          upgrade(db) {
            db.createObjectStore("notes", { keyPath: "id" });
          },
        });
        const tx = db.transaction("notes", "readonly");
        const store = tx.objectStore("notes");
        this.notes = await store.getAll();
        await tx.done;
      } catch (error) {
        console.error("Error fetching notes from IndexedDB:", error);
      }
    },
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
    async editNote(note) {
      const newTitle = prompt("Enter new title:", note.title);
      const newContent = prompt("Enter new content:", note.content);

      if (newTitle !== null && newContent !== null) {
        try {
          const storeName = "notes";
          note.title = newTitle;
          note.content = newContent;
          await this.updateData(storeName, note);
        } catch (error) {
          console.error("Error editing note in IndexedDB:", error);
        }
      }
    },
    async deleteNote(noteId) {
      try {
        const storeName = "notes";
        await this.deleteDataById(storeName, noteId);
        this.notes = this.notes.filter((note) => note.id !== noteId);
      } catch (error) {
        console.error("Error deleting note from IndexedDB:", error);
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    confirmDeleteNote() {
      if (this.noteToDelete) {
        this.deleteNote(this.noteToDelete.id);
      }
      this.closeDeleteModal();
    },
    cancelDeleteNote() {
      this.closeDeleteModal();
    },
    openDeleteModal(note) {
      this.noteToDelete = note;
      this.showDeleteModal = true;
    },
  },
  components: {
    DeleteConfirmationModal
  },
  mixins: [mixinsDb]
};
</script>

<style scoped>
.cardHolder {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}

.btn-add {
  width: 175px;
  height: 45px;
}

.holderBtn {
  margin-bottom: 25px;
}

.innerBtn {
  color: rgba(0, 0, 0, 0.87) !important;
  text-decoration: none !important;
}

@media (max-width: 768px) {
  .cardHolder {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 10px 15px;
  }

  .innerCardHolder {
    width: 100%;
  }
}
</style>
