<template>
  <table class="table is-narrow is-bordered">
    <thead>
      <tr>
        <th class="table-head">Emote</th>
        <th class="table-head">Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in emotes" :key="item.name">
        <td>{{ item.name }}</td>
        <td v-html="item.emote"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      emotes: null
    };
  },
  mounted() {
    this.emotes = this.$store.state.emoteList;
  }
};
</script>

<style>
.table {
  background-color: hsl(0, 0%, 21%);
  color: #d3d3d3;
}
.table-head {
  color: #d3d3d3 !important;
}
</style>
