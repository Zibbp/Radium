<template>
  <div>
    <login-prompt v-if="!$store.state.user.username" />
    <div v-else>
      <div class="grid grid-cols-12">
        <div
          class="xs:col-span-12 max-content-height col-span-10 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-10 2xl:col-span-10"
        >
          <client-only>
            <player />
          </client-only>
        </div>
        <div
          class="xs:col-span-12 max-content-height col-span-2 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-2 2xl:col-span-2"
        >
          <chat />
        </div>
      </div>
      <!-- Settings -->
      <div class="container mx-auto mt-4">
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-8"><settings /></div>
          <div class="col-span-4"><users /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPrompt from "~/components/LoginPrompt.vue";
import Settings from "~/components/Settings.vue";
import Users from "~/components/Users.vue";
import Chat from "~/components/Chat/Chat.vue";
export default {
  components: {
    Player: () =>
      process.client ? import("@/components/Player/Player.vue") : null,
    LoginPrompt,
    Settings,
    Users,
    Chat,
  },
};
</script>

<style>
.max-content-height {
  max-height: calc(100vh - 4rem);
  height: calc(100vh - 4rem);
}
</style>
