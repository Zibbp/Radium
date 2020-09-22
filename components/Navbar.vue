<template>
  <div>
    <b-navbar type="is-dark" class="radium-navbar">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="/logo.png" alt="Radium" />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item
          v-if="$config.PROTECT"
          href="https://github.com/Zibbp/Radium/wiki/Radium-Protect"
          target="_blank"
        >
          🔒 Protect
        </b-navbar-item>
        <b-navbar-item @click="info">
          <b-icon icon="information-outline"></b-icon>
        </b-navbar-item>
        <b-navbar-item @click="nowplaying">
          <b-icon
            icon="cursor-default-click-outline"
            class="now-playing-icon"
          ></b-icon
          >Now Playing
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <button class="button is-dark" @click="play">
              <b-icon icon="play"></b-icon>
            </button>
            <button class="button is-dark" @click="pause">
              <b-icon icon="pause"></b-icon>
            </button>
            <button
              v-if="$store.state.user.admin"
              class="button is-dark"
              @click="sync"
            >
              <b-icon icon="sync"></b-icon>
            </button>
            <b-tooltip
              v-else
              label="Only admins can sync the room"
              type="is-success"
              position="is-left"
              class="sync-tooltip"
            >
              <button class="button is-dark" disabled>
                <b-icon icon="sync"></b-icon>
              </button>
            </b-tooltip>
            <b-tooltip
              v-if="this.$store.state.chat"
              label="Hide Chat"
              :delay="500"
              position="is-left"
              type="is-success"
            >
              <button class="button is-dark" @click="toggleChat">
                <b-icon icon="arrow-collapse-right"></b-icon>
              </button>
            </b-tooltip>
            <b-tooltip
              v-else
              label="Show Chat"
              :delay="500"
              position="is-left"
              type="is-success"
            >
              <button class="button is-dark" @click="toggleChat">
                <b-icon icon="arrow-collapse-left"></b-icon>
              </button>
            </b-tooltip>
            <b-tag
              v-if="$store.state.user.admin"
              class="admin-tag"
              type="is-info"
              >Admin</b-tag
            >
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <b-modal
      :active.sync="infoModal"
      has-modal-card
      :destroy-on-hide="true"
      scroll="keep"
    >
      <Info />
    </b-modal>
  </div>
</template>

<script>
import Info from "./Info";
export default {
  data() {
    return {
      infoModal: false
    };
  },
  mounted() {
    this.$root.mySocket = this.$nuxtSocket({
      teardown: false,
      name: "main"
    });
    this.$nuxt.$on("infoModal", () => {
      this.infoModal = true;
    });
  },
  methods: {
    play() {
      this.$root.mySocket.emit("play");
    },
    pause() {
      this.$root.mySocket.emit("pause");
    },
    sync() {
      $nuxt.$emit("sync");
    },
    toggleChat: function() {
      this.$store.commit("toggleChat");
    },
    info() {
      this.infoModal = true;
    },
    nowplaying() {
      $nuxt.$emit("nowplaying");
    }
  }
};
</script>

<style>
.admin-tag {
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}
.sync-tooltip {
  margin-right: 0.5rem;
}
.now-playing-icon {
  margin-right: 5px !important;
}
</style>
