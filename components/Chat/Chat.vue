<template>
  <div class="table h-full w-full border-collapse">
    <div class="message-panel" ref="messagePanel">
      <div class="mx-2 pb-6 text-neutral-200">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="chat-message my-1"
        >
          <span :style="{ color: message.user.color }">{{
            message.user.username
          }}</span
          >:
          <div class="html-message" v-html="message.message"></div>
        </div>
        <div ref="messagePanel" class="h-1"></div>
      </div>
    </div>
    <!-- Bottom -->
    <div class="mb-1 table-row h-12">
      <emote-menu v-if="emoteMenuVisible" :emotes="emotes" class="z-50" />

      <form @submit.prevent="sendMessage">
        <div class="flex">
          <input
            type="text"
            ref="messageInput"
            v-model="messageText"
            placeholder="Send a message"
            class="input w-full rounded-none bg-neutral-800 text-neutral-200 focus:border-2 focus:border-neutral-700 focus:shadow-none"
            required
          />
          <div
            @click="emoteMenuVisible = !emoteMenuVisible"
            class="btn btn-xs h-auto rounded-none border-none bg-neutral-800 hover:bg-neutral-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a1a1aa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-smile"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>

          <button
            type="submit"
            class="btn rounded-none border-none bg-neutral-800 hover:bg-neutral-700"
          >
            Chat
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import EmoteMenu from "~/components/Chat/EmoteMenu.vue";
export default {
  components: {
    EmoteMenu,
  },
  data() {
    return {
      emoteMenuVisible: false,
      messageText: "",
      messages: [],
      emotes: [],
    };
  },
  mounted() {
    this.$root.mainSocket.on("emoteDictionary", (emotes) => {
      this.emotes = emotes;
    });
    this.$root.mainSocket.on("newChatMessage", (message) => {
      const processedMessage = this.processMessage(message.message);
      const newMessageObject = {
        message: processedMessage,
        user: message.user,
      };
      this.messages.push(newMessageObject);
      if (this.messages.length > 30) {
        this.messages.shift();
      }
      this.setScrollToEnd();
    });

    this.$nuxt.$on("insertEmote", (emote) => {
      this.messageText += ` ${emote.code} `;
      this.emoteMenuVisible = false;
      const length = this.messageText.length;
      this.$refs.messageInput.setSelectionRange(length, length);
      this.$refs.messageInput.focus();
    });
  },
  methods: {
    sendMessage() {
      this.$root.mainSocket.emit("sendChatMessage", {
        message: this.messageText,
        user: this.$store.state.user,
      });
      this.messageText = "";
    },
    processMessage(text) {
      const emotes = this.emotes;
      const emotesRegex = new RegExp(
        emotes.map((emote) => emote.code).join("|"),
        "g"
      );
      return text.replace(emotesRegex, (match) => {
        const emote = emotes.find((emote) => emote.code === match);
        if (emote.source == "bttv") {
          return `<img  src="https://cdn.betterttv.net/emote/${emote.id}/1x" class="mr-1" title="${emote.code}" alt="${emote.code}" />`;
        }
        if (emote.source == "ffz") {
          return `<img src="https://cdn.frankerfacez.com/emote/${emote.id}/1" class="mr-1" title="${emote.code}" alt="${emote.code}" />`;
        }
        if (emote.source == "7tv") {
          return `<img src="https://cdn.7tv.app/emote/${emote.id}/1x" class="mr-1" title="${emote.code}" alt="${emote.code}" />`;
        }
      });
    },
    setScrollToEnd() {
      const element = this.$refs.messagePanel;
      element.scrollTop = element.scrollHeight;
    },
  },
};
</script>

<style>
.message-panel {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  height: 100%;
  max-height: calc(100vh - 7.1rem);
}
.message-panel::-webkit-scrollbar {
  display: none;
}
.chat-message {
  word-break: break-word;
}
.html-message {
  display: inline;
}
.html-message img {
  display: inline;
}
</style>
