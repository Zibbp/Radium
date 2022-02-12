<template>
  <div>
    <div class="bg-neutral navbar h-16 text-neutral-content shadow-lg">
      <div class="mx-2 flex-none px-2">
        <span class="text-lg font-bold"> Radium </span>
      </div>
      <div class="mx-2 flex-1 px-2">
        <div class="hidden items-stretch lg:flex">
          <a
            href="https://github.com/zibbp/radium"
            target="_blank"
            class="btn btn-ghost rounded-btn btn-sm"
          >
            Github
          </a>
        </div>
      </div>
      <div class="flex-none">
        <button @click="playMethod" class="btn btn-ghost btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-play"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      </div>
      <div @click="pauseMethod" class="flex-none">
        <button class="btn btn-ghost btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-pause"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$root.mainSocket = this.$nuxtSocket({
      teardown: false,
      name: "main",
    });
  },
  methods: {
    playMethod() {
      this.$root.mainSocket.emit(
        "sendPlayerPlay",
        this.$store.state.user.username
      );
    },
    pauseMethod() {
      this.$root.mainSocket.emit(
        "sendPlayerPause",
        this.$store.state.user.username
      );
    },
  },
};
</script>

<style></style>
