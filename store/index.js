export const state = () => ({
  connected: false,
  chat: true,
  authorized: false,
  token: null,
  user: {
    username: null,
    color: null,
    admin: null
  },
  emotes: null,
  emoteList: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  toggleChat(state) {
    state.chat = !state.chat;
  },
  setEmotes(state, emotes) {
    state.emotes = emotes;
  },
  setEmoteList(state, emoteList) {
    state.emoteList = emoteList;
  },
  isAdmin(state) {
    state.user.admin = true;
  },
  setAuthorized(state) {
    state.authorized = true;
  },
  setToken(state, token) {
    state.token = token;
  }
};
