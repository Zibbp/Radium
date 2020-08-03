<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF"
];
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
    this.socket = this.$nuxtSocket({
      persist: "mainSocket"
    });
    // console.log(this.$root.socket);
    // console.log(this.$root);
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
      this.user.color = colors[Math.floor(Math.random() * colors.length)];
      this.$store.commit("setUser", this.user);
      this.socket.emit("newUser", this.user);
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
