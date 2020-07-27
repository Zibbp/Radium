<template>
  <vue-plyr ref="plyr" :options="playerOptions">
    <video
      poster="/radium_poster.png"
      data-plyr-config="{'autoplay': true}"
    ></video>
  </vue-plyr>
</template>

<script>
import socket from "~/plugins/socket.io";
import Hls from "hls.js";
export default {
  data() {
    return {
      playerOptions: {
        clickToPlay: false,
        controls: [
          "play",
          "progress",
          "current-time",
          "duration",
          "mute",
          "pip",
          "volume",
          "settings",
          "fullscreen"
        ],
        settings: ["quality", "loop"]
      },
      testString: "yodude"
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    }
  },
  mounted() {
    // HLS
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.$config.HLS_URL);
      hls.attachMedia(this.player.media);

      window.hls = hls;
    }
    // Nuxt bus to sync
    this.$nuxt.$on("sync", () => {
      socket.emit("sync", this.player.currentTime);
    });
    // On play from server
    socket.on("sendPlay", () => {
      this.player.play();
      this.$buefy.toast.open({
        duration: 1000,
        message: `Play`,
        position: "is-bottom"
      });
    });
    // On pause from server
    socket.on("sendPause", () => {
      this.player.pause();
      this.$buefy.toast.open({
        duration: 1000,
        message: `Pause`,
        position: "is-bottom"
      });
    });
    // On sync from server
    socket.on("sendSync", currentTime => {
      this.player.currentTime = currentTime;
      this.$buefy.toast.open({
        duration: 1000,
        message: `Syncing`,
        position: "is-bottom"
      });
    });
  }
};
</script>

<style>
.plyr {
  max-height: 94vh;
  height: 94vh;
}
</style>
