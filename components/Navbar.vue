<template>
  <b-navbar class="is-black">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="/rg2.png" alt="Radium" class="radium-logo" />
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button @click="play" type="is-success" outlined
            ><b-icon icon="play" size="is-small"> </b-icon
          ></b-button>
          <b-button @click="pause" type="is-success" outlined
            ><b-icon icon="pause" size="is-small"> </b-icon
          ></b-button>
          <b-button
            v-if="this.$store.state.user.isAdmin"
            type="is-success"
            @click="sync"
            outlined
            ><b-icon icon="sync" size="is-small"> </b-icon
          ></b-button>
          <b-tooltip
            v-else
            label="Only admins can sync"
            position="is-bottom"
            type="is-dark"
            class="sync-tooltip"
            animated
          >
            <b-button type="is-success" outlined disabled
              ><b-icon icon="sync" size="is-small"> </b-icon
            ></b-button>
          </b-tooltip>
          <b-button
            v-if="this.$store.state.chat"
            @click="toggleChat"
            type="is-success"
            outlined
            ><b-icon icon="arrow-collapse-right" size="is-small"> </b-icon
          ></b-button>
          <b-button v-else @click="toggleChat" type="is-success" outlined
            ><b-icon icon="arrow-collapse-left" size="is-small"> </b-icon
          ></b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  mounted() {
    this.mainSocket = this.$nuxtSocket({
      persist: "mainSocket"
    });
  },
  methods: {
    toggleChat: function() {
      this.$store.commit("toggleChat");
    },
    play() {
      this.mainSocket.emit("play");
    },
    pause() {
      this.mainSocket.emit("pause");
    },
    sync() {
      $nuxt.$emit("sync");
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.navbar {
  height: 6vh !important;
  min-height: 6vh !important;
}
.sync-tooltip {
  margin-right: 0.5rem;
}
</style>
