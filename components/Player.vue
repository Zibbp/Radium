<template>
  <vue-plyr ref="plyr" :options="playerOptions">
    <video poster="/radium_poster.png" data-plyr-config="{'autoplay': true}">
      <track
        kind="captions"
        label="English"
        srclang="en"
        src="/subs.vtt"
        default
      />
    </video>
  </vue-plyr>
</template>

<script>
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
        settings: ["quality", "loop", "captions"]
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
    this.mainSocket = this.$nuxtSocket({
      persist: "mainSocket"
    });
    // HLS
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.$config.HLS_URL);
      hls.attachMedia(this.player.media);

      window.hls = hls;
    }
    // Nuxt bus to sync
    this.$nuxt.$on("sync", () => {
      this.mainSocket.emit("sync", this.player.currentTime);
    });
    // On play from server
    this.mainSocket.on("sendPlay", () => {
      this.player.play();
      this.$buefy.toast.open({
        duration: 1000,
        message: `Play`,
        position: "is-bottom"
      });
    });
    // On pause from server
    this.mainSocket.on("sendPause", () => {
      this.player.pause();
      this.$buefy.toast.open({
        duration: 1000,
        message: `Pause`,
        position: "is-bottom"
      });
    });
    // On sync from server
    this.mainSocket.on("sendSync", currentTime => {
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
