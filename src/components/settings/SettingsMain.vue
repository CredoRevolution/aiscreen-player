<template>
  <div class="main-settings-wrapper">
    <div class="player-settings-wrapper">
      <div class="settings-title">Player</div>
      <Player
        :tags="tags"
        :tagsActive="tagsActive"
        @sendPlayerData="sendPlayerData"
      />
    </div>
    <div class="network-settings-wrapper">
      <div class="settings-title">Network</div>
      <Network
        :settings="settings"
        @sendFormData="sendFormData"
        @saveSettings="saveSettings"
      />
    </div>
  </div>
</template>

<script>
import Network from './network/Network.vue'
import Player from './player/Player.vue'

export default {
  name: 'SettingsMain',

  components: {
    Network,
    Player,
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    tagsActive: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    sendPlayerData(playerData) {
      this.$emit('sendPlayerData', playerData)
    },
    sendFormData(formData) {
      this.$emit('sendFormData', formData)
    },
    saveSettings(formData) {
      this.$emit('saveSettings', formData)
    },
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}

.main-settings-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: rem(735px);
  background: rgba(255, 255, 255, 1);
  padding: rem(60px);
  width: 100%;
  justify-content: center;
  border-radius: rem(30px);
  gap: rem(34px);
  .network-settings-wrapper,
  .player-settings-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: rem(34px);
    .settings-title {
      font-size: rem(28px);
      line-height: rem(33px);
      font-weight: 700;
      color: #14121f;
    }
  }
}
</style>
