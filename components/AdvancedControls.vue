<template>
  <section>
    <b-collapse
      class="card has-background-dark advanced-controls"
      animation="slide"
      v-for="(collapse, index) of collapses"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title controls-title">{{ collapse.title }}</p>
        <a class="card-header-icon has-text-white">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <h6 class="has-text-grey-lighter">
            Visit the
            <a
              class="link"
              href="https://github.com/zibbp/radium/wiki"
              target="_blank"
              >documentation</a
            >
            for more info.
          </h6>
          <div class="columns is-desktop">
            <!-- SET HLS -->
            <div class="column is-6">
              <form v-on:submit.prevent>
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
                      class="button is-black"
                      @click.prevent="changeStream"
                      :disabled="!$store.state.user.admin"
                      >Change</a
                    >
                  </p>
                </div>
              </form>
            </div>
            <!-- SET SUBTITLES -->
            <div class="column is-6">
              <form v-on:submit.prevent>
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
                      class="button is-black"
                      @click.prevent="changeSubtitles"
                      :disabled="!$store.state.user.admin"
                      >Change</a
                    >
                  </p>
                </div>
              </form>
            </div>
          </div>
          <!-- Change "Now Playing" -->
          <div class="columns is-desktop">
            <div class="column is-6">
              <form v-on:submit.prevent>
                <label class="label has-text-white">Now Playing</label>
                <p v-if="hlsError" class="help is-danger">
                  Enter a Movie or TV Show
                </p>
                <p v-else class="help has-text-white">
                  Enter a Movie or TV Show
                </p>
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input
                      v-model="playing"
                      class="input"
                      type="text"
                      placeholder="Game of Thrones"
                      :disabled="!$store.state.user.admin"
                    />
                  </p>
                  <p class="control">
                    <b-button
                      class="is-black"
                      @click.prevent="nowplaying"
                      :disabled="!$store.state.user.admin"
                      :loading="loading"
                      >Change</b-button
                    >
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
      hlsUrl: "",
      hlsError: false,
      playing: "",
      loading: false,
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
    this.$nuxt.$on("stopLoading", () => {
      this.loading = false;
    });
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
    },
    nowplaying() {
      if (this.playing == "") {
        this.playing = "";
      } else {
        this.$root.mySocket.emit("nowPlaying", this.playing);
        this.playing = "";
        this.loading = true;
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
.link {
  color: hsl(0, 0%, 48%);
}
.link:hover {
  color: hsl(141, 71%, 48%);
  position: relative;
}
.link:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  visibility: hidden;
  transform: scaleX(0);
  /* transition: all 0.3s ease-in-out; */
}
.link:hover:before {
  visibility: visible;
  transform: scaleX(1);
}
</style>
