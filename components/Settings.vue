<template>
  <div>
    <div>
      <h1 class="mb-2 text-2xl font-bold text-neutral-100">Add Source</h1>
      <form @submit.prevent="addSource">
        <div class="flex space-x-2">
          <select v-model="source.type" class="select" required>
            <option disabled="disabled" selected="selected">Type</option>
            <option value="mp4">mp4</option>
            <option value="webrtc">webrtc</option>
            <option value="dash">dash</option>
            <option value="hls">hls</option>
          </select>
          <input
            type="text"
            v-model="source.file"
            placeholder="url (wss://webrtc.example.com)"
            class="input-neutral input-bordered input w-full"
            required
          />

          <input
            type="text"
            v-model="source.label"
            placeholder="label (1080p)"
            class="input-neutral input-bordered input"
            required
          />
          <button type="submit" class="btn-neutral btn">Add</button>
        </div>
      </form>
      <!-- Sources -->
      <div class="mt-2">
        <h1 class="text-2xl font-bold text-neutral-100">Sources</h1>
        <div class="overflow-x-auto">
          <table class="table-compact table w-full text-neutral-100">
            <thead>
              <tr>
                <th class="bg-neutral-800">type</th>
                <th class="bg-neutral-800">Source</th>
                <th class="bg-neutral-800">Label</th>
                <th class="bg-neutral-800"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(source, index) in sources" :key="index">
                <td class="bg-neutral-800">{{ source.type }}</td>
                <td class="bg-neutral-800">{{ source.file }}</td>
                <td class="bg-neutral-800">{{ source.label }}</td>
                <td class="bg-neutral-800">
                  <button
                    @click="removeSource(index)"
                    class="btn btn-square btn-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      class="inline-block h-4 w-4 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      source: {
        type: "webrtc",
        file: null,
        label: null,
      },
      sources: [],
    };
  },
  mounted() {
    this.$root.mainSocket.on("sourcesList", (sources) => {
      this.sources = sources;
    });
  },
  methods: {
    addSource() {
      this.$root.mainSocket.emit("addPlayerSource", this.source);
      this.source.type = "webrtc";
      this.source.file = null;
      this.source.label = null;
    },
    removeSource(index) {
      this.$root.mainSocket.emit("removePlayerSource", index);
    },
  },
};
</script>

<style>
.table :where(thead, tfoot) :where(th, td):first-child {
  border-bottom-left-radius: 0rem !important;
}
.table :where(thead, tfoot) :where(th, td):last-child {
  border-bottom-right-radius: 0rem !important;
}
</style>
