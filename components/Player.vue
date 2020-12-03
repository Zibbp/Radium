<template>
  <div class="player">
    <Playing />
    <video
      ref="videoPlayer"
      class="video-js vjs-radium-theme"
      poster="/radium_poster.png"
      crossorigin="anonymous"
    >
      <track kind="captions" :src="subtitleUrl" srclang="en" label="default" />
    </video>
  </div>
</template>

<script>
import Playing from "../components/Playing";
import videojs, { log } from "video.js";
require("videojs-hls-quality-selector");
require("videojs-contrib-quality-levels");

export default {
  data() {
    return {
      player: null,
      subtitleUrl: `${this.$config.BASE_URL}/subs.vtt`,
      options: {
        autoplay: true,
        controls: true,
        liveui: true,
        sources: [
          {
            src: this.$config.HLS_URL,
            type: "application/x-mpegURL"
          }
        ]
      }
    };
  },
  mounted() {
    // Initialize player
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        this.hlsQualitySelector();
      }
    );
    // If Radium is running in protected mode, add a token to headers for authentication
    if (this.$config.PROTECT) {
      const token = this.$store.state.token;
      videojs.Hls.xhr.beforeRequest = function(options) {
        if (options.headers == undefined) {
          options.headers = {};
        }
        options.headers["x-auth-token"] = token;

        return options;
      };
    }

    // Set player volume to 25% as videojs volume isn't persisted
    // maybe add that in the future
    this.player.volume(0.25);

    // Send player state to server for new client
    this.$root.mySocket.on("requestState", id => {
      var time = this.player.currentTime();
      var state = this.player.paused();
      var id = id;
      var data = { time, state, id };
      this.$root.mySocket.emit("sendState", data);
    });

    // If new client, set state from server
    this.$root.mySocket.on("setState", state => {
      // Set HLS stream
      console.log(state);
      if (state.roomHlsUrl) {
        this.player.src(state.roomHlsUrl);
      }
      // Set subtitles
      if (state.roomSubtitleUrl) {
        // Remove old subtitles
        setTimeout(() => {
          var oldTracks = this.player.remoteTextTracks();

          var i = oldTracks.length;

          while (i--) {
            this.player.removeRemoteTextTrack(oldTracks[i]);
          }
        }, 1000);
        // Add new subtitle
        setTimeout(() => {
          this.player.addRemoteTextTrack(
            {
              kind: "captions",
              src: state.roomSubtitleUrl,
              srclang: "en",
              label: "custom",
              default: true
            },
            true
          );
        }, 1500);
      }
      // Set time
      if (state.roomTime) {
        // setTimeout(() => {
        //   this.player.currentTime = state.roomTime;
        // }, 1000);
        this.player.currentTime(state.roomTime);
      }
      // Set player state
      if (state.roomState == true) {
        this.player.pause();
      }
      if (state.roomState == false) {
        this.player.play();
      }
      // Set Now Playing
      $nuxt.$emit("setPlaying", state.roomPlaying);
    });

    // Change HLS Stream
    this.$root.mySocket.on("setStream", url => {
      this.player.src(url);
      // Toast notification
      this.$buefy.toast.open({
        duration: 2000,
        message: `Changed HLS Stream`,
        position: "is-bottom",
        type: "is-success"
      });
    });

    // change subtitles
    this.$root.mySocket.on("setSubtitles", url => {
      // Remove old subtitles
      setTimeout(() => {
        var oldTracks = this.player.remoteTextTracks();

        var i = oldTracks.length;

        while (i--) {
          this.player.removeRemoteTextTrack(oldTracks[i]);
        }
      }, 1000);
      // Add new subtitle
      setTimeout(() => {
        this.player.addRemoteTextTrack(
          {
            kind: "captions",
            src: url,
            srclang: "en",
            label: "custom",
            default: true
          },
          true
        );
      }, 1500);

      // Toast notification
      this.$buefy.toast.open({
        duration: 2000,
        message: `Changed Subtitles`,
        position: "is-bottom",
        type: "is-success"
      });
    });

    // Nuxt bus for syncing rom
    this.$nuxt.$on("sync", () => {
      this.$root.mySocket.emit("sync", this.player.currentTime());
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
      this.player.currentTime(currentTime);
      this.$buefy.toast.open({
        duration: 500,
        message: `Syncing`,
        position: "is-bottom"
      });
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style>
.player {
  width: 100%;
  height: 100%;
  position: relative;
}
.video-js {
  height: 100% !important;
  width: 100%;
}
.video-js .video {
  height: 100% !important;
  width: 100%;
}
.video-js__captions .video-js__caption {
  font-size: 26px !important;
}
.video-js__captions {
  padding-bottom: 7vh;
}
.vjs-tech {
  pointer-events: none;
}
/* Custom Theme */
.vjs-radium-theme {
  --vjs-radium-theme--primary: #8ef311;
  --vjs-radium-theme--secondary: #fff;
}
.vjs-radium-theme .vjs-big-play-button {
  width: 2em;
  height: 2em;
  line-height: 1.9em;
  border-radius: 1em;
  left: calc(50% - 1em);
  top: calc(50% - 1em);
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid var(--vjs-radium-theme--primary);
  color: var(--vjs-radium-theme--primary);
}
.vjs-radium-theme.vjs-big-play-button:focus,
.vjs-radium-theme:hover .vjs-big-play-button {
  color: var(--vjs-radium-theme--primary);
}
.vjs-radium-theme .vjs-control-bar {
  height: 54px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 35%,
    rgba(0, 0, 0, 0) 100%
  );
}
.vjs-radium-theme .vjs-button > .vjs-icon-placeholder:before,
.vjs-radium-theme .vjs-time-control {
  line-height: 54px;
}
.vjs-radium-theme .vjs-play-control {
  font-size: 1.5em;
  position: relative;
}
.vjs-radium-theme .vjs-volume-panel {
  order: 4;
  font-size: 1.6em;
  margin-left: -0.5em;
  margin-right: -0.9em;
}

.vjs-radium-theme .vjs-seek-to-live-control {
  margin-top: 1.1em !important;
}

.vjs-radium-theme .vjs-volume-bar {
  margin: 1.5em 0.45em;
}

.video-js .vjs-volume-level {
  background-color: var(--vjs-radium-theme--primary);
}

.vjs-theme-city
  .vjs-volume-panel:hover
  .vjs-volume-control.vjs-volume-horizontal {
  height: 100%;
}

.vjs-radium-theme .vjs-progress-holder .vjs-load-progress {
  background-color: #95c01f !important;
  transition: width 0.15s linear;
}

.vjs-radium-theme .vjs-progress-control .vjs-progress-holder,
.vjs-radium-theme .vjs-progress-control:hover .vjs-progress-holder {
  font-size: 1.5em;
}

.vjs-radium-theme .vjs-picture-in-picture-control {
  font-size: 1.4em;
}

.vjs-radium-theme .vjs-menu-button {
  font-size: 1.2em;
}

.vjs-radium-theme .vjs-play-control .vjs-icon-placeholder:before {
  height: 1.3em;
  width: 1.3em;
  margin-top: 0.2em;
  border-radius: 1em;
  border: 3px solid var(--vjs-radium-theme--secondary);
  top: 2px;
  left: 9px;
  line-height: 1.1;
}
.vjs-radium-theme .vjs-play-control:hover .vjs-icon-placeholder:before {
  border: 3px solid var(--vjs-radium-theme--secondary);
}
.vjs-radium-theme .vjs-play-progress,
.vjs-radium-theme .vjs-play-progress:before {
  background-color: var(--vjs-radium-theme--primary);
}
.vjs-radium-theme .vjs-play-progress:before {
  height: 0.8em;
  width: 0.8em;
  content: "";
  border: 4px solid var(--vjs-radium-theme--secondary);
  border-radius: 0.8em;
  top: -0.25em;
}
.vjs-radium-theme .vjs-progress-control {
  font-size: 14px;
}
.vjs-radium-theme .vjs-fullscreen-control {
  order: 6;
  font-size: 1.5em;
}
.vjs-radium-theme .vjs-remaining-time {
  font-size: 1.5em;
}
.vjs-radium-theme.nyan .vjs-play-progress {
  background: linear-gradient(
    180deg,
    #fe0000 0,
    #fe9a01 16.666666667%,
    #fe9a01 0,
    #ff0 33.332666667%,
    #ff0 0,
    #32ff00 49.999326667%,
    #32ff00 0,
    #0099fe 66.6659926%,
    #0099fe 0,
    #63f 83.33266%,
    #63f 0
  );
}
.vjs-radium-theme.nyan .vjs-play-progress:before {
  height: 1.3em;
  width: 1.3em;
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125' fill='%23fff'%3E%3Cpath d='M62.153 37.323h2.813v3.246h-2.813zM64.858 40.569h2.813v3.246h-2.813zM67.672 43.814h11.9v3.246h-11.9zM79.572 24.449h2.813v19.365h-2.813zM82.386 37.323h3.244v3.246h-3.244zM85.63 34.132h5.627v3.246H85.63zM91.257 37.323h2.92v12.95h-2.92zM94.177 50.274h2.922V66.21h-2.922zM91.29 66.372h2.887v3.245H91.29zM88.401 69.617h2.889v3.246h-2.889zM27.312 72.863h61.003v3.245H27.312zM73.622 76.108h2.889v3.246h-2.889zM82.563 76.108h2.888v3.246h-2.888zM76.511 79.354h6.053v3.245h-6.053zM61.941 79.354h8.895v3.245h-8.895zM67.947 76.108h2.889v3.246h-2.889zM59.321 76.108h2.888v3.246h-2.888zM27.312 17.917h49.387v3.246H27.312zM76.699 21.162h2.873v3.287h-2.873zM56.372 34.132h5.781v3.191h-5.781zM53.448 37.323h2.924v12.951h-2.924zM50.488 50.274h2.96v16.049h-2.96zM53.448 66.323h2.924v3.257h-2.924zM56.372 69.58h2.949v3.283h-2.949zM65.069 63.213h2.878v6.367h-2.878zM67.947 66.397h17.504v3.22H67.947z'/%3E%3Cpath d='M82.563 63.213h2.888v3.185h-2.888zM73.801 63.213h2.898v3.185h-2.898zM76.699 56.774h2.873v3.145h-2.873zM82.563 56.774h2.888v3.145h-2.888zM85.451 53.444h2.864v3.33h-2.864z'/%3E%3Cpath d='M85.451 56.774h2.864v3.145h-2.864zM65.069 53.444h2.878v3.33h-2.878zM65.069 56.774h2.878v3.145h-2.878zM62.209 56.774h2.86v3.145h-2.86zM21.509 24.327h2.813v45.169h-2.813zM24.323 21.162h2.99v3.165h-2.99zM18.562 69.496h8.75v3.367h-8.75zM15.656 72.863h2.906v9.591h-2.906zM18.562 79.301h8.75v3.153h-8.75zM24.323 76.108h5.743V79.3h-5.743zM33.136 76.108h2.824v6.346h-2.824zM35.96 79.281h5.813v3.173H35.96zM41.774 76.108h2.864v3.173h-2.864zM3.948 40.569h11.708v3.229H3.948zM3.948 43.814h2.921v6.459H3.948zM6.869 47.06h2.934v6.384H6.869zM9.803 50.274h2.909v6.5H9.803z'/%3E%3Cpath d='M12.711 53.444h2.945v6.475h-2.945zM15.656 56.774h5.853v3.145h-5.853z'/%3E%3Cpath d='M18.583 59.919h2.926v3.294h-2.926zM18.583 47.044h2.926v6.4h-2.926zM12.711 43.814h5.872v3.229h-5.872zM15.647 47.044h2.936v3.2h-2.936z'/%3E%3Cpath fill='none' d='M47.439 50.274h3.049v3.17h-3.049z'/%3E%3Cpath d='M73.801 30.94v-3.138h-2.965v-3.354l-37.7-.122v3.151h-3.07v3.462l-2.753-.108-.118 32.381h2.871v3.185h3.07v-3.185h2.824v3.185h-2.824v3.099l20.312.084v-3.257h-2.96V50.274h2.96V37.323h2.924v-3.191h5.781v3.191h2.813l-.108 3.246h2.813v3.246h9.027V30.94h-2.897zM33.136 56.682h-3.07v-3.158h3.07v3.158zm2.824-22.55h-2.824v-3.084h2.824v3.084zm2.907 12.928h2.907v3.184h-2.907V47.06zm5.771 16.153h-2.864v-3.294h2.864v3.294zm2.801-19.399h-2.801v-3.246h2.801v3.246zm6.009-12.766h-2.96v-3.354h2.96v3.354zm8.705 0h-2.832v-3.354h2.832v3.354zm8.683 6.275h-2.889v-3.191h2.889v3.191z'/%3E%3C/svg%3E")
    no-repeat;
  border: none;
  top: -0.35em;
}
</style>
