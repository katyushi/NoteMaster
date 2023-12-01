<template>
  <div id="app">
    <nav>
      <p>Anotações</p>
      <router-link to="/">
        <span class="material-symbols-outlined">home</span>
      </router-link>
    </nav>
    <router-view id="mainContent"/>
  </div>
</template>

<script>
export default {
  methods: {
    async initializeIndexedDB() {
      const dbName = 'notes-db';
      const tableName = 'notes';
      const dbVersion = 1;

      // Open or create the database
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
          console.error('Error opening IndexedDB:', event.target.error);
          reject(event.target.error);
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          resolve(db);
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;

          // Check if the table exists, if not, create it
          if (!db.objectStoreNames.contains(tableName)) {
            const objectStore = db.createObjectStore(tableName, { keyPath: 'id', autoIncrement: true });

            // Add two fields to the table
            objectStore.createIndex('title', 'content', { unique: false });
            objectStore.createIndex('content', 'content', { unique: false });
            objectStore.createIndex('category', 'category', { unique: false });
          }
        };
      });

      console.log('IndexedDB initialized and table created:', db);

      // Close the database when done
      db.close();
    },
  },
  created() {
    this.initializeIndexedDB();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
}

nav {
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #505e57;
}

nav p,
nav span {
  color: white;
  font-weight: 500;
  font-size: 25px;
}

#mainContent {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

@media (max-width: 768px) {
  #mainContent,
  #app {
    height: auto;
  }
}
</style>
