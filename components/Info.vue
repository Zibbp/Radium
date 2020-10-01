<template>
  <div>
    <div class="card has-background-dark has-text-light">
      <div class="card-content ">
        <div class="media">
          <div class="media-content">
            <p class="title is-4 has-text-light	">Radium</p>
            <p class="subtitle is-6 has-text-light">
              <a
                href="https://github.com/zibbp/radium"
                class="has-text-success"
                target="_blank"
                >Github</a
              >
            </p>
          </div>
        </div>

        <div class="content">
          Synced stream and video playback with VOD capabilities utilizing HLS.
          Developed for movie nights but has many use cases.
          <br /><br />
          <code>Version {{ version }}</code
          ><br />
          <a
            href="https://github.com/Zibbp/Radium/releases"
            target="_blank"
            class="has-text-success"
            >Changelog</a
          >
          <br /><br />
          <p class="subtitle is-6 has-text-light ">
            Developed by
            <span class="has-text-weight-bold has-text-info">Zibbp</span>
          </p>
          <a
            class="button is-dark is-small"
            href="https://github.com/Zibbp"
            target="_blank"
          >
            <b-icon icon="github"></b-icon>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: null
    };
  },
  mounted() {
    var pckg = require("../package.json");
    this.version = pckg.version;
  }
};
</script>

<style></style>
