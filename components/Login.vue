<template>
  <form v-on:submit.prevent>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Radium Protect 🔒</p>
      </header>
      <section class="modal-card-body">
        <b-field class="has-text-white" label="Username">
          <b-input
            type="text"
            v-model="username"
            placeholder="Username"
            required
          ></b-input>
        </b-field>

        <b-field class="has-text-white" label="Password">
          <b-input
            type="password"
            v-model="password"
            password-reveal
            placeholder="Password"
            required
          ></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-warning" @click="login">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
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
  "#6666FF",
];

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.username == "" || this.password == "") {
      } else {
        try {
          var res = await this.$axios.post(
            `${this.$config.API_URL}/api/v1/auth/login`,
            {
              username: this.username,
              password: this.password,
            }
          );

          // TODO: GET AND SET TOKEN / USERNAME
          this.$store.commit("setToken", res.data.token);
          this.$parent.close();
          this.$buefy.toast.open({
            duration: 3000,
            message: `Welcome ${this.username}`,
            position: "is-bottom",
            type: "is-info",
          });

          // set user
          var color = colors[Math.floor(Math.random() * colors.length)];
          const user = {
            username: this.username,
            color: color,
            admin: false,
          };
          this.$store.commit("setUser", user);
          this.$store.commit("setAuthorized");
          this.$root.mySocket.emit("newUser", user);
          if (res.data.isAdmin == true) {
            this.$store.commit("isAdmin");
            this.$root.mySocket.emit("setAdmin", this.$store.state.user);
          }
        } catch (error) {
          console.log(error);
          if (error.message == "Request failed with status code 401") {
            this.$buefy.toast.open({
              duration: 3000,
              message: `Invalid Credentials`,
              position: "is-bottom",
              type: "is-danger",
            });
          }
        }
      }
    },
  },
};
</script>

<style></style>
