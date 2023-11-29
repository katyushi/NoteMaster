<template>
  <div class="imgContainer">
    <img src="https://stjosephsuralla.catholic.edu.au/wp-content/uploads/sites/2/2017/10/Under-construction-clip-art-5.jpg" alt="page under development">
  </div>
</template>

<script>
export default {
  name: 'underConstruction',
};
</script>

<style scoped>
.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.imgContainer img {
  border: 5px solid red;
  width: 75vw;
  height: auto;
}
</style>
