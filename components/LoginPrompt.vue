<template>
  <div>
    <div class="modal pointer-events-auto visible opacity-100">
      <div class="modal-box">
        <h1 class="text-xl font-bold">Radium</h1>
        <p>Enter a username to get started.</p>
        <form @submit.prevent="connect">
          <div class="form-control mt-1">
            <input
              v-model="user.username"
              type="text"
              placeholder="username"
              maxlength="12"
              class="input-bordered input"
              required
            />
          </div>

          <div class="modal-action">
            <button type="submit" class="btn btn-primary">Connect</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        color: "null",
      },
    };
  },
  methods: {
    connect() {
      if (this.user.username.length > 0) {
        this.user.color =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        this.$store.commit("setUser", this.user);
        this.$root.mainSocket.emit("newUserConnection", this.user);
      }
    },
  },
};
</script>

<style></style>
