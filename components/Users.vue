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
          <div class="user-list">
            <div class="user" v-for="item in users" :key="item.username">
              <div :style="{ color: item.color }">
                <b-icon
                  v-if="item.admin"
                  icon="cog"
                  size="is-small"
                  class="admin-icon"
                  type="is-light"
                >
                </b-icon
                >{{ item.username }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isOpen: 1,
      collapses: [
        {
          title: "Online Users"
        }
      ],
      users: []
    };
  },
  mounted() {
    this.$root.mySocket.on("userList", users => {
      this.users = users;
    });
  },
  methods: {}
};
</script>

<style>
.controls-title {
  color: hsl(0, 0%, 96%);
}
.controls-label {
  color: hsl(0, 0%, 96%);
}
.caption-help {
  margin-bottom: 1em;
}
.user-list {
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.user {
  padding-right: 0.5rem;
}
</style>
