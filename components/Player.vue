<template>
  <vue-plyr ref="plyr" class="player" :options="playerOptions">
    <video poster="/radium_poster.png" crossorigin>
      <track kind="captions" label="Track 1" :src="subtitleUrl" default />
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
        autoplay: true,
        controls: [
          "play",
          "progress",
          "current-time",
          "duration",
          "mute",
          "pip",
          "volume",
          "captions",
          "settings",
          "fullscreen"
        ],
        settings: ["captions", "quality", "loop"]
      },
      subtitleUrl: `${this.$config.BASE_URL}/subs.vtt`
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
    // change HLS stream
    this.$root.mySocket.on("setStream", url => {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(this.player.media);
      window.hls = hls;
    });
    // change subtitles
    this.$root.mySocket.on("setSubtitles", url => {
      this.subtitleUrl = url;
    });
    // Nuxt bus sync
    this.$nuxt.$on("sync", () => {
      this.$root.mySocket.emit("sync", this.player.currentTime);
    });
    // on sendPlay from server
    this.$root.mySocket.on("sendPlay", () => {
      this.player.play();
      this.$buefy.toast.open({
        duration: 500,
        message: `Play`,
        position: "is-bottom"
      });
    });
    // on sendPause from server
    this.$root.mySocket.on("sendPause", () => {
      this.player.pause();
      this.$buefy.toast.open({
        duration: 500,
        message: `Pause`,
        position: "is-bottom"
      });
    });
    // on sendSync from server
    this.$root.mySocket.on("sendSync", currentTime => {
      this.player.currentTime = currentTime;
      this.$buefy.toast.open({
        duration: 500,
        message: `Syncing`,
        position: "is-bottom"
      });
    });
  },
  methods: {}
};
</script>

<style>
.player {
  width: 100%;
  height: 100%;
}
.plyr video {
  height: 100% !important;
  width: 100%;
}
.plyr .video {
  height: 100% !important;
  width: 100%;
}
</style>
