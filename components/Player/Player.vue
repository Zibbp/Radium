<template>
  <div class="max-content-height">
    <div ref="player" id="player-div"></div>
  </div>
</template>

<script>
import Vue from "vue";
import Hls from "hls.js";
export default {
  data() {
    return {
      player: null,
      options: {
        volume: 25,
        autoStart: true,
        mute: false,
        sources: [],
        webrtcConfig: {
          timeoutMaxRetry: 4,
          connectionTimeout: 10000,
        },
      },
    };
  },
  async mounted() {
    window.Hls = Hls;
    this.$root.mainSocket.on("sourcesList", (sources) => {
      this.options.sources = sources;
      this.player.load(this.options);
    });

    const OvenPlayer = await import("ovenplayer");
    Vue.use(OvenPlayer);

    this.player = OvenPlayer.create(this.$refs.player, this.options);

    this.$root.mainSocket.on("serverPlayerPlay", (username) => {
      this.$toast.info(`${username} Playing`, {
        timeout: 2000,
      });
      this.player.play();
    });

    this.$root.mainSocket.on("serverPlayerPause", (username) => {
      this.$toast.info(`${username} Paused`, {
        timeout: 2000,
      });
      this.player.pause();
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.remove();
    }
  },
};
</script>

<style>
.max-content-height {
  max-height: calc(100vh - 4rem);
  height: calc(100vh - 4rem);
  min-height: calc(100vh - 4rem);
}
#player-div {
  --op-accent-color: #8ef311;
}
.ovenplayer {
  min-height: 100% !important;
}
</style>
