<template>
  <div class="home">
    <div class="upperHome">
      <span class="material-symbols-outlined">description</span>
      <div class="upperTextHolder">
        <h1 class="title">Anotações</h1>
        <span class="subtitle">by hugo</span>
      </div>
    </div>
    <div class="lowerHome">
      <router-link class="createNewNoteBtn" to="/notes/new">
        <span class="material-symbols-outlined">add</span>
        <span>Criar anotação</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
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
</style>
