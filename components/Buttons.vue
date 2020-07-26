<template>
  <div class="has-background-black">
    <div class="columns is-gapless">
      <div class="column is-10">
        <div class="container is-fluid">
          <div class="card button-card">
            <b-button type="is-success" outlined
              ><b-icon icon="play" size="is-small"> </b-icon
            ></b-button>
            <b-button type="is-success" outlined
              ><b-icon icon="pause" size="is-small"> </b-icon
            ></b-button>
            <b-button
              v-if="this.$store.state.user.isAdmin"
              type="is-success"
              outlined
              ><b-icon icon="sync" size="is-small"> </b-icon
            ></b-button>
            <b-button v-else type="is-success" outlined disabled>Sync</b-button>
          </div>
        </div>
      </div>
      <div class="column is-2">Auto</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.button-card {
  width: 20vw;
  background-color: hsl(0, 0%, 4%);
}
</style>
