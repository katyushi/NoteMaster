<template>
  <div>
    <div class="home">
      <div class="upperHome">
        <span class="material-symbols-outlined">description</span>
        <div class="upperTextHolder">
          <h1 class="title">Anotações</h1>
          <span class="subtitle">by hugo</span>
        </div>
      </div>
      <div class="lowerHome">
        <template v-if="!hasNotes">
          <router-link class="createNewNoteBtn" to="/notes/new">
            <span class="material-symbols-outlined">add</span>
            <span>Criar anotação</span>
          </router-link>
        </template>
        <template v-else>
          <router-link class="createNewNoteBtn" to="/notes">
            <span>Ver anotações</span>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { openDB } from "idb";

export default {
  name: 'HomeView',
  data() {
    return {
      notes: [],
    };
  },
  async mounted() {
    await this.fetchNotes();
  },
  computed: {
    hasNotes() {
      return this.notes && this.notes.length > 0;
    },
  },
  methods: {
    async fetchNotes() {
      try {
        const db = await openDB("notes-db", 1);
        const tx = db.transaction("notes", "readonly");
        const store = tx.objectStore("notes");
        this.notes = await store.getAll();
        await tx.done;
      } catch (error) {
        console.error("Error fetching notes from IndexedDB:", error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  height: 92vh;
}

.upperHome .material-symbols-outlined {
  font-size: 100px;
  line-height: 1;
  color: #505e57;
}

.upperTextHolder .title {
  font-size: 25px;
  font-weight: 500;
  color: #487862;
}

.upperTextHolder .subtitle {
  font-size: 14px;
}

.lowerHome .createNewNoteBtn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-decoration: none;
  background-color: #487862;
  border-radius: 26px;
  width: 160px;
  height: 44px;
  color: #f2f2f2;
}

.lowerHome .createNewNoteBtn:hover {
  color: #f2f2f2;
  filter: opacity(0.85);
}
</style>
