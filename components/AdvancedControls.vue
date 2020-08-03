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
        <p class="card-header-title controls-title">
          {{ collapse.title }}
        </p>
        <a class="card-header-icon has-text-white">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <form class="video-form">
            <div v-if="$store.state.user.admin" class="field">
              <label class="label controls-label">Change HLS Stream</label>
              <input
                class="input"
                v-model="url"
                type="text"
                placeholder="https://website.com/video.m3u8"
              />
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
              <p v-if="urlError" class="help is-danger">
                Enter a valid HLS stream (.m3u8)
              </p>
              <b-button type="is-primary" @click.prevent="changeStream" disabled
                >Change</b-button
              >
            </div>
          </form>
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
      url: "",
      urlError: false,
      isOpen: 1,
      collapses: [
        {
          title: "Advanced Controls"
        }
      ]
    };
  },
  mounted() {
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
</style>
