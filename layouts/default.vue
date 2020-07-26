<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: { Navbar },
  data() {
    return {
      user: {
        username: "",
        color: "",
        isAdmin: false
      }
    };
  },
  mounted() {
    if (!this.$store.state.connected) {
      this.prompt();
    }
  },
  methods: {
    prompt() {
      this.$buefy.dialog.prompt({
        message: `Enter a username`,
        inputAttrs: {
          maxlength: 12
        },
        confirmText: "Enter",
        trapFocus: true,
        onConfirm: value => {
          this.user.username = value;
          this.setUser();
        },
        canCancel: false
      });
    },
    setUser() {
      this.$store.commit("setUser", this.user);
    }
  }
};
</script>

<style lang="scss">
html::-webkit-scrollbar {
  display: none;
}
html {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
$input-placeholder-color: #fff;
</style>
