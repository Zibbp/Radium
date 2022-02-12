<template>
  <div class="emote-grid h-80 max-h-80 w-full bg-neutral-800">
    <div class="px-2 py-2">
      <input
        type="text"
        ref="filterInput"
        v-model="filter"
        placeholder="search"
        class="input input-sm w-full bg-neutral-700 text-neutral-200 focus:shadow-none"
      />
      <div v-if="currentEmote" class="mt-2 flex w-full pl-1">
        <img
          v-if="currentEmote.source == 'bttv'"
          :src="'https://cdn.betterttv.net/emote/' + currentEmote.id + '/1x'"
          alt=""
        />
        <img
          v-if="currentEmote.source == 'ffz'"
          :src="'https://cdn.frankerfacez.com/emote/' + currentEmote.id + '/1'"
          alt=""
        />
        <img
          v-if="currentEmote.source == '7tv'"
          :src="'https://cdn.7tv.app/emote/' + currentEmote.id + '/1x'"
          alt=""
        />
        <span class="text-md pl-2 text-neutral-100">{{
          currentEmote.code
        }}</span>
      </div>
    </div>
    <!-- Emote grid -->
    <div class="grid grid-cols-8 gap-2 p-2">
      <div
        v-for="emote in filteredRows"
        :key="emote.id"
        class="hover:bg-neutral-700 hover:outline hover:outline-4 hover:outline-neutral-700"
        @mouseover="setCurrentEmote(emote)"
        @click="insertEmote(emote)"
      >
        <img
          v-if="emote.source == 'bttv'"
          :src="'https://cdn.betterttv.net/emote/' + emote.id + '/1x'"
          :title="emote.code"
          :alt="emote.code"
        />
        <img
          v-if="emote.source == 'ffz'"
          :src="'https://cdn.frankerfacez.com/emote/' + emote.id + '/1'"
          :title="emote.code"
          :alt="emote.code"
        />
        <img
          v-if="emote.source == '7tv'"
          :src="'https://cdn.7tv.app/emote/' + emote.id + '/1x'"
          :title="emote.code"
          :alt="emote.code"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    emotes: {
      type: Array,
    },
  },
  data() {
    return {
      currentEmote: {
        id: "5f1b0186cf6d2144653d2970",
        code: "catJAM",
        source: "bttv",
      },
      filter: "",
    };
  },
  mounted() {
    this.$refs.filterInput.focus();
  },
  methods: {
    setCurrentEmote(emote) {
      this.currentEmote = emote;
    },
    insertEmote(emote) {
      this.$nuxt.$emit("insertEmote", emote);
    },
  },
  computed: {
    filteredRows() {
      return this.emotes.filter((emote) => {
        return emote.code.toLowerCase().includes(this.filter.toLowerCase());
      });
    },
  },
};
</script>

<style>
.emote-grid {
  overflow-y: scroll;
}
.emote-grid::-webkit-scrollbar {
  display: none;
}
</style>
