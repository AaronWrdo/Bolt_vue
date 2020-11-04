<template>
  <div id="app">
    <Bolt />
  </div>
</template>
<script>
import Bolt from "./components/Bolt.vue";
export default {
  name: "App",
  components: {
    Bolt
  }
};
</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

body {
  margin: 0;
}

body * {
  margin: 0px;
  box-sizing: border-box;
  font-family: Georgia, serif, "Gill Sans";
  font-size: 14px;
  outline: none;
}
</style>
