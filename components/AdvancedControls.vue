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
            <div class="column">
              <form class="video-form">
                <div v-if="$store.state.user.admin" class="field">
                  <label class="label controls-label">Change HLS Stream</label>
                  <input
                    class="input"
                    v-model="url"
                    type="text"
                    placeholder="https://website.com/video.m3u8"
                  />
                  <p class="help has-text-light">HLS Url</p>
                  <p v-if="urlError" class="help is-danger">
                    Enter a valid HLS stream (.m3u8)
                  </p>
                  <b-button type="is-primary" @click.prevent="changeStream"
                    >Change</b-button
                  >
                </div>
                <div v-else class="field">
                  <label class="label controls-label">Change HLS Stream</label>
                  <input
                    class="input"
                    v-model="url"
                    type="text"
                    placeholder="https://website.com/video.m3u8"
                    disabled
                  />
                  <p class="help has-text-light">HLS Url</p>
                  <p v-if="urlError" class="help is-danger">
                    Enter a valid HLS stream (.m3u8)
                  </p>
                  <b-button
                    type="is-primary"
                    @click.prevent="changeStream"
                    disabled
                    >Change</b-button
                  >
                </div>
              </form>
            </div>
            <div class="column">
              <form class="captions-form">
                <div v-if="$store.state.user.admin" class="field">
                  <label class="label controls-label">Change Subtitles</label>
                  <div class="field-body">
                    <div class="field">
                      <input
                        class="input"
                        v-model="subtitleUrl"
                        type="text"
                        placeholder="https://website.com/my_subs.vtt"
                      />
                      <p class="help has-text-light caption-help">
                        Subtitle URL
                      </p>
                    </div>
                  </div>

                  <p v-if="subtitleError" class="help is-danger">
                    Enter a valid subtitle url (.vtt)
                  </p>
                  <b-button type="is-primary" @click.prevent="changeSubtitles"
                    >Change</b-button
                  >
                </div>
                <div v-else>
                  <label class="label controls-label">Change Subtitles</label>
                  <div class="field-body">
                    <div class="field">
                      <input
                        class="input"
                        v-model="subtitleUrl"
                        type="text"
                        placeholder="https://website.com/my_subs.vtt"
                        disabled
                      />
                      <p class="help has-text-light caption-help">
                        Subtitle URL
                      </p>
                    </div>
                  </div>

                  <p v-if="subtitleError" class="help is-danger">
                    Enter a valid subtitle url (.vtt)
                  </p>
                  <b-button
                    type="is-primary"
                    @click.prevent="changeSubtitles"
                    disabled
                    >Change</b-button
                  >
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
var mainSocket = null;
export default {
  data() {
    return {
      firefox: null,
      url: "",
      urlError: false,
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
    mainSocket = this.$nuxtSocket({
      persist: "mainSocket"
    });
  },
  methods: {
    changeStream() {
      // Check if url is a proper HLS stream then emit to Player
      if (this.url == "") {
        this.url = "";
        this.urlError = true;
      } else if (this.url.slice(this.url.length - 5) != ".m3u8") {
        this.url = "";
        this.urlError = true;
      } else {
        mainSocket.emit("changeStream", this.url);
        this.url = "";
        this.urlError = false;
      }
    },
    changeSubtitles() {
      // Check if url is a valid (VTT)
      if (this.subtitleUrl == "") {
        this.subtitleUrl = "";
        this.subtitleError = true;
      } else if (
        this.subtitleUrl.slice(this.subtitleUrl.length - 4) != ".vtt"
      ) {
        this.subtitleUrl = "";
        this.subtitleError = true;
      } else {
        mainSocket.emit("changeSubtitles", this.subtitleUrl);
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
