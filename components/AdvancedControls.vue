<template>
  <section>
    <b-notification
      v-if="firefox"
      type="is-warning"
      has-icon
      aria-close-label="Close notification"
      role="alert"
    >
      It appears you are using this site with Firefox. Features may be unstable
      on Firefox.<br />
      <b>Known Firefox issues:</b> Subtitles not functioning properly, Periodic
      frame stutters in the video. <br />
      If these issues occur, please switch browsers.
    </b-notification>

    <b-collapse
      class="card has-background-dark advanced-controls"
      animation="slide"
      v-for="(collapse, index) of collapses"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title controls-title">
          {{ collapse.title }}
        </p>
        <a class="card-header-icon has-text-white">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="columns is-desktop">
            <!-- SET HLS -->
            <div class="column">
              <form>
                <label class="label has-text-white">Change HLS Stream</label>
                <p v-if="hlsError" class="help is-danger">
                  Enter a valid HLS Url (ends with .m3u8)
                </p>
                <p v-else class="help has-text-white">HLS Url (.m3u8)</p>
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input
                      v-model="hlsUrl"
                      class="input"
                      type="text"
                      placeholder="https://website.com/stream.m3u8"
                      :disabled="!$store.state.user.admin"
                    />
                  </p>
                  <p class="control">
                    <a
                      class="button is-success"
                      @click.prevent="changeStream"
                      :disabled="!$store.state.user.admin"
                    >
                      Change
                    </a>
                  </p>
                </div>
              </form>
            </div>
            <!-- SET SUBTITLES -->
            <div class="column">
              <form>
                <label class="label has-text-white">Change Subtitles</label>
                <p v-if="subtitleError" class="help is-danger">
                  Enter a valid subtitle Url (ends with .vtt)
                </p>
                <p v-else class="help has-text-white">Subtitle Url (.vtt)</p>
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input
                      v-model="subtitleUrl"
                      class="input"
                      type="text"
                      placeholder="https://website.com/subs.vtt"
                      :disabled="!$store.state.user.admin"
                    />
                  </p>
                  <p class="control">
                    <a
                      class="button is-success"
                      @click.prevent="changeSubtitles"
                      :disabled="!$store.state.user.admin"
                    >
                      Change
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
  data() {
    return {
      firefox: null,
      hlsUrl: "",
      hlsError: false,
      isOpen: 1,
      collapses: [
        {
          title: "Advanced Controls"
        }
      ],
      subtitleUrl: "",
      subtitleError: false
    };
  },
  mounted() {
    this.firefox = typeof InstallTrigger !== "undefined";
  },
  methods: {
    changeStream() {
      // Check if url is a proper HLS stream then emit to Player
      if (this.hlsUrl == "") {
        this.hlsUrl = "";
      } else if (this.hlsUrl.slice(this.hlsUrl.length - 5) != ".m3u8") {
        this.hlsError = true;
      } else {
        this.$root.mySocket.emit("changeStream", this.hlsUrl);
        this.hlsUrl = "";
        this.hlsError = false;
      }
    },
    changeSubtitles() {
      // Check if url is a valid (VTT)
      if (this.subtitleUrl == "") {
        this.subtitleUrl = "";
      } else if (
        this.subtitleUrl.slice(this.subtitleUrl.length - 4) != ".vtt"
      ) {
        this.subtitleError = true;
      } else {
        this.$root.mySocket.emit("changeSubtitles", this.subtitleUrl);
        this.subtitleUrl = "";
        this.subtitleError = false;
      }
    }
  }
};
</script>

<style>
.controls-title {
  color: hsl(0, 0%, 96%);
}
.controls-label {
  color: hsl(0, 0%, 96%);
}
.caption-help {
  margin-bottom: 1em;
}
</style>
