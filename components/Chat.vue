<template>
  <div class="has-background-black-ter chat-panel">
    <!-- messages panel -->
    <div class="message-panel" id="message-panel">
      <div class="chat-message" v-for="item in chat" :key="item.message">
        <img
          v-if="item.user.isAdmin"
          src="/admin.png"
          class="admin-badge"
          alt="admin"
        />
        <strong :style="{ color: item.user.color }"
          >{{ item.user.username }}:&nbsp;</strong
        >
        <div v-html="item.message" />
      </div>
    </div>
    <!-- input panel -->
    <div class="input-panel">
      <form>
        <div class="control">
          <input
            class="input message-input has-text-white"
            v-model="message"
            type="text"
            placeholder="Send a message"
          />
        </div>
        <div class="control">
          <!-- <button
            v-if="this.$store.state.user.isAdmin"
            class="button is-black is-pulled-left"
          >
            Admin
          </button> -->
          <button
            @click.prevent="sendMessage"
            class="button is-success is-outlined is-pulled-right"
          >
            Chat
          </button>
        </div>
      </form>
    </div>
    <b-modal
      :active.sync="isComponentModalActive"
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <Emotes></Emotes>
    </b-modal>
  </div>
</template>

<script>
import socket from "~/plugins/socket.io";
import Emotes from "./Emotes";
export default {
  components: { Emotes },
  data() {
    return {
      isComponentModalActive: false,
      chat: [],
      message: ""
    };
  },
  mounted() {
    socket.on("newMessage", message => {
      this.chat.push(message);
      this.$nextTick(() => {
        this.setScrollToEnd();
      });
    });
  },
  methods: {
    setScrollToEnd() {
      const element = document.getElementById("message-panel");
      element.scrollTop = element.offsetHeight + element.scrollHeight;
    },
    async sendMessage() {
      if (this.message == "/help") {
        this.message = "/auth<br>/emotes";
        this.message = "";
      } else if (this.message == "/emotes") {
        this.isComponentModalActive = true;
        this.message = "";
      } else if (this.message.substring(0, 5) == "/auth") {
        var code = this.message.substring(6);
        try {
          var res = await this.$axios.post(`${this.$config.BASE_URL}/auth`, {
            code
          });
          this.$buefy.toast.open({
            duration: 1000,
            message: `Authenticated`,
            position: "is-bottom",
            type: "is-success"
          });
          this.$store.commit("isAdmin");
        } catch (error) {
          console.log(error);
          this.$buefy.toast.open({
            duration: 1000,
            message: `Incorrect Code`,
            position: "is-bottom",
            type: "is-danger"
          });
        }

        this.message = "";
      } else if (this.message == "") {
        this.message = "";
      } else {
        const stringArr = this.message.split(" ");
        const result = stringArr
          .map(word =>
            this.$store.state.emotes[word]
              ? this.$store.state.emotes[word]
              : word
          )
          .join(" ");
        var message = {
          message: result,
          user: this.$store.state.user
        };
        socket.emit("message", message);
        this.message = "";
      }
    }
  }
};
</script>

<style lang="scss">
.input-panel {
  /* display: flex; */
  width: 16.6vw;
  bottom: 0;
  position: absolute;
}
.message-panel {
  height: 92%;
  overflow: scroll;
  padding: 0.5rem;
}

.message-panel::-webkit-scrollbar {
  display: none;
}
.message-panel {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.chat-panel {
  max-height: 94vh;
  height: 94vh;
}
.chat-input {
  width: 75%;
}
.chat-button {
  width: 25%;
}
.message-input {
  background-color: hsl(0, 0%, 4%);
  border-color: #1b1c25;
}
.chat-message {
  color: #d3d3d3;
  display: flex;
}
.admin-badge {
  height: 18px;
  width: 18px;
  margin-top: 3px;
  margin-right: 5px;
}
.input:hover {
  border-color: hsl(141, 71%, 48%);
}
.input:active {
  border-color: hsl(141, 71%, 48%) !important;
  color: hsl(141, 71%, 48%) !important;
}
</style>
