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
