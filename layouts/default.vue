<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/layouts/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style>
html {
  background-color: #171717 !important;
}
</style>
