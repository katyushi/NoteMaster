import { openDB } from "idb";

export const mixinsDb = {
  methods: {
    async withTransaction(storeName, callback) {
      try {
        const db = await openDB("notes-db", 1);
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        await callback(store, tx);
        await tx.done;
      } catch (error) {
        console.error(`Error performing transaction in ${storeName} in IndexedDB:`, error);
        throw error;
      }
    },
    async fetchData(storeName) {
      return this.withTransaction(storeName, async (store) => {
        return await store.getAll();
      });
    },
    async addData(storeName, newData) {
      return this.withTransaction(storeName, async (store) => {
        await store.add(newData);
      });
    },
    async updateData(storeName, updatedData) {
      return this.withTransaction(storeName, async (store) => {
        await store.put(updatedData);
      });
    },
    async deleteDataById(storeName, id) {
      return this.withTransaction(storeName, async (store) => {
        await store.delete(id);
      });
    },
    // Add more CRUD methods if needed
  },
};
