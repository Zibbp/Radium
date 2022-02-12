export const state = () => ({
  user: {
    username: null,
    color: null,
    admin: false,
  },
});

export const mutations = {
  setUser(state, user) {
    state.user.username = user.username;
    state.user.color = user.color;
  },
};
