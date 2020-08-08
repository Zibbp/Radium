<template>
  <vue-plyr ref="plyr" class="player" :options="playerOptions">
    <video poster="/radium_poster.png">
      <track kind="captions" label="Track 1" :src="subtitleUrl" default />
    </video>
  </vue-plyr>
</template>

<script>
import Hls from "hls.js";
var mainSocket = null;
export default {
  data() {
    return {
      playerOptions: {
        clickToPlay: false,
        autoplay: false,
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
      subtitleUrl: "http://localhost:3000/subs.vtt"
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    }
  },
  mounted() {
    // Create socket connection
    mainSocket = this.$nuxtSocket({
      persist: "mainSocket"
    });
    // HLS
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.$config.HLS_URL);
      hls.attachMedia(this.player.media);
      window.hls = hls;
    }
    // change HLS stream
    mainSocket.on("setStream", url => {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(this.player.media);
      window.hls = hls;
    });
    // change subtitles
    mainSocket.on("setSubtitles", name => {
      var subUrl = `${this.$config.BASE_URL}/subtitles/${name}`;
      this.subtitleUrl = subUrl;
      console.log(subUrl);
    });
    // Nuxt bus sync
    this.$nuxt.$on("sync", () => {
      mainSocket.emit("sync", this.player.currentTime);
    });
    // on sendPlay from server
    mainSocket.on("sendPlay", () => {
      this.player.play();
      this.$buefy.toast.open({
        duration: 500,
        message: `Play`,
        position: "is-bottom"
      });
    });
    // on sendPause from server
    mainSocket.on("sendPause", () => {
      this.player.pause();
      this.$buefy.toast.open({
        duration: 500,
        message: `Pause`,
        position: "is-bottom"
      });
    });
    // on sendSync from server
    mainSocket.on("sendSync", currentTime => {
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
