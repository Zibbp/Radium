export const state = () => ({
  chat: true,
  connected: false,
  user: {
    username: null,
    color: null,
    isAdmin: null
  },
  emotes: null,
  emoteList: null
});

export const mutations = {
  toggleChat(state) {
    state.chat = !state.chat;
  },
  connect(state) {
    state.connected = true;
  },
  setUser(state, user) {
    state.user = user;
  },
  isAdmin(state) {
    state.user.isAdmin = true;
  },
  setEnv(state, env) {
    state.env = env;
  },
  setEmotes(state, emotes) {
    state.emotes = emotes;
  },
  setEmoteList(state, emoteList) {
    state.emoteList = emoteList;
  }
};
