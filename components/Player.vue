<template>
  <div class="player">
    <Playing />

    <vue-plyr ref="plyr" class="player" :options="playerOptions">
      <video poster="/radium_poster.png" crossorigin>
        <track kind="captions" label="Track 1" :src="subtitleUrl" default />
      </video>
    </vue-plyr>
  </div>
</template>

<script>
import Playing from "../components/Playing";
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
          "fullscreen",
        ],
        settings: ["captions", "quality", "loop"],
      },
      subtitleUrl: `${this.$config.BASE_URL}/subs.vtt`,
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    },
  },
  mounted() {
    // HLS
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.$config.HLS_URL);
      hls.attachMedia(this.player.media);
      window.hls = hls;
    }
    // Send player state to server for new client
    this.$root.mySocket.on("requestState", (id) => {
      var time = this.player.currentTime;
      var state = this.player.playing;
      var id = id;
      var data = { time, state, id };
      this.$root.mySocket.emit("sendState", data);
    });
    // If new client, set state from server
    this.$root.mySocket.on("setState", (state) => {
      // Set HLS stream
      if (state.roomHlsUrl) {
        const hls = new Hls();
        hls.loadSource(state.roomHlsUrl);
        hls.attachMedia(this.player.media);
        window.hls = hls;
      }
      // Set subtitles
      if (state.roomSubtitleUrl) {
        setTimeout(() => {
          this.subtitleUrl = state.roomSubtitleUrl;
        }, 1000);
      }
      // Set time
      if (state.roomTime) {
        setTimeout(() => {
          this.player.currentTime = state.roomTime;
        }, 1000);
      }
      // Set player state
      if (state.roomState == true) {
        this.player.play();
      }
      if (state.roomState == false) {
        this.player.pause();
      }
      // Set Now Playing
      $nuxt.$emit("setPlaying", state.roomPlaying);
    });
    // change HLS stream
    this.$root.mySocket.on("setStream", (url) => {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(this.player.media);
      window.hls = hls;
      this.player.play();
      // Toast notification
      this.$buefy.toast.open({
        duration: 2000,
        message: `Changed HLS Stream`,
        position: "is-bottom",
        type: "is-success",
      });
    });
    // change subtitles
    this.$root.mySocket.on("setSubtitles", (url) => {
      this.subtitleUrl = url;
      // Toast notification
      this.$buefy.toast.open({
        duration: 2000,
        message: `Changed Subtitles`,
        position: "is-bottom",
        type: "is-success",
      });
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
        position: "is-bottom",
      });
    });
    // on sendPause from server
    this.$root.mySocket.on("sendPause", () => {
      this.player.pause();
      this.$buefy.toast.open({
        duration: 500,
        message: `Pause`,
        position: "is-bottom",
      });
    });
    // on sendSync from server
    this.$root.mySocket.on("sendSync", (currentTime) => {
      this.player.currentTime = currentTime;
      this.$buefy.toast.open({
        duration: 500,
        message: `Syncing`,
        position: "is-bottom",
      });
    });
  },
  methods: {},
};
</script>

<style>
.player {
  width: 100%;
  height: 100%;
  position: relative;
}
.plyr video {
  height: 100% !important;
  width: 100%;
}
.plyr .video {
  height: 100% !important;
  width: 100%;
}
.plyr__captions .plyr__caption {
  font-size: 26px !important;
}
.plyr__captions {
  padding-bottom: 7vh;
}
</style>
