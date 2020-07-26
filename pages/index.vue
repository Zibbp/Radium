<template>
  <div>
    <div class="columns is-gapless is-multiline">
      <!-- Player Column -->
      <div class="column player-column">
        <Player />
        <!-- <div class="test-div">f</div> -->
      </div>
      <!-- Chat Column -->
      <div v-if="this.$store.state.chat" class="column is-2 chat-column">
        <Chat />
        <!-- <div class="chat-test-div">f</div> -->
      </div>
    </div>
    <!-- <div class="columns">
      <div class="column">
        <Buttons />
      </div>
    </div> -->
  </div>
</template>

<script>
import Player from "../components/Player";
// import Buttons from "../components/Buttons";
import Chat from "../components/Chat";
export default {
  components: { Chat, Player }
};
</script>

<style>
.player-column {
  max-height: 94vh;
  height: 94vh;
}
.chat-column {
  /* display: flex; */
  max-height: 94vh;
}
.bottom-column {
  max-height: 9vh;
  height: 9vh;
}
.test-div {
  background-color: blue;
  height: 100%;
}
.column {
  display: flex;
  flex-direction: column;
}
.chat-test-div {
  background-color: red;
  height: 100%;
}
.bottom-test-div {
  background-color: purple;
  height: 100%;
}
.columns {
  margin-bottom: 0 !important;
}
</style>
