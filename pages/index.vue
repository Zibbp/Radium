<template>
  <div>
    <b-modal
      v-model="isProtected"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <template>
        <h1>yo</h1>
      </template>
    </b-modal>
    <div class="columns is-desktop is-gapless">
      <div class="column">
        <div class="player-panel">
          <Player v-if="$config.PROTECT && $store.state.authorized" />
          <Player v-if="!$config.PROTECT" />
        </div>
      </div>
      <div
        v-if="this.$store.state.chat"
        class="column is-12-mobile is-12-tablet is-2-desktop is-2-widescreen is-2-fullhd"
      >
        <Chat v-if="$config.PROTECT && $store.state.authorized" />
        <Chat v-if="!$config.PROTECT" />
      </div>
    </div>
    <div class="under-panel">
      <div class="columns is-desktop is-gapless">
        <div class="column is-6-desktop is-6-widescreen is-6-fullhd">
          <div class="under container is-fluid">
            <AdvancedControls />
          </div>
        </div>
        <div class="column is-6-desktop is-6-widescreen is-6-fullhd">
          <div class="under container is-fluid">
            <Users />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "../components/Player";
import Chat from "../components/Chat";
import AdvancedControls from "../components/AdvancedControls";
import Users from "../components/Users";
import Login from "../components/Login";
const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF"
];
export default {
  components: {
    Login
  },
  data() {
    return {
      isProtected: true,
      user: {
        username: "",
        color: "",
        admin: false
      }
    };
  },
  async mounted() {
    if (!this.$store.state.connected) {
      // if protected mode running
      if (this.$config.PROTECT) {
        this.protectedModal();
      } else {
        this.prompt();
      }
    }
    const emotes = await this.$axios.get(
      `${this.$config.BASE_URL}/api/emotes/list`
    );
    this.$store.commit("setEmotes", emotes.data);
    const emoteList = await this.$axios.get(
      `${this.$config.BASE_URL}/api/emotes/emoteList`
    );
    this.$store.commit("setEmoteList", emoteList.data);
  },
  methods: {
    prompt() {
      this.$buefy.dialog.prompt({
        title: "Welcome",
        type: "is-success",
        message: `Enter a username`,
        inputAttrs: {
          maxlength: 12
        },
        confirmText: "Enter",
        trapFocus: true,
        onConfirm: value => {
          this.user.username = value;
          this.setUser();
        },
        canCancel: false
      });
    },
    protectedModal() {
      this.$buefy.modal.open({
        parent: this,
        component: Login,
        hasModalCard: true,
        trapFocus: true,
        canCancel: false
      });
    },
    setUser() {
      this.user.color = colors[Math.floor(Math.random() * colors.length)];
      this.$store.commit("setUser", this.user);
      this.$root.mySocket.emit("newUser", this.user);
    }
  }
};
</script>

<style>
.player-panel {
  background-color: #252525;
  height: calc(100vh - 3.25rem);
}
.under-panel {
  height: 50vh;
  background-color: #252525;
}
.columns {
  margin-bottom: 0 !important;
}
.under {
  padding-top: 5vh;
}
.modal-card-head {
  background-color: hsl(0, 0%, 21%);
  border-bottom: 0;
}
.modal-card-title {
  color: #d3d3d3;
}
.modal-card-body {
  background-color: hsl(0, 0%, 29%);
  color: #d3d3d3;
}
.modal-card-foot {
  background-color: hsl(0, 0%, 21%);
  border-top: 0;
  color: #d3d3d3;
}
</style>
