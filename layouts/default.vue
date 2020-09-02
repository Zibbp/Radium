<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {};
</script>

<style>
html {
  background-color: #252525;
}

body::-webkit-scrollbar {
  width: 10px;
  background-color: #555555;
}
body::-webkit-scrollbar-track {
  background-color: #555555;
}
body::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 0px solid #555555;
}
* {
  scrollbar-color: #000000 #555555;
}
</style>
