<template>
  <div id="main">
    <div class="navbar">
      <div class="back" @click="closeSettings">
        <img src="@/assets/img/arrow-back.svg" alt="back" />
        Back
      </div>
      <div class="title">AIScreen Player</div>
    </div>
    <div class="main-wrapper" v-show="settings == false">
      <DisplayView />
      <SettingsView
        @toggleSettings="toggleSettings"
        @openSettings="toggleSettings"
        :playerSettings="playerSettings"
        :formSettings="formSettings"
        :playerId="playerId"
        ref="SettingsView"
      />
    </div>
    <div class="main-wrapper_settings" v-show="settings == true">
      <SettingsMain
        :tags="tags"
        :settings="settings"
        @sendPlayerData="setPlayerData"
        @sendFormData="setFormData"
        @saveSettings="saveSettings"
      />
    </div>
  </div>
</template>

<script>
import DisplayView from '@/components/main/display/DisplayView.vue'
import SettingsView from '@/components/main/settings/SettingsView.vue'
import SettingsMain from './settings/SettingsMain.vue'

// JSON data
import availableNetworks from '@/assets/availableNetworks.json'

export default {
  name: 'PlayerSettings',
  components: {
    DisplayView,
    SettingsView,
    SettingsMain,
  },
  data() {
    return {
      settings: false,
      tags: [
        { name: 'tag2', code: 'tag2' },
        { name: 'tag3', code: 'tag3' },
        { name: 'tag4', code: 'tag4' },
        { name: 'tag5', code: 'tag5' },
        { name: 'tag6', code: 'tag6' },
        { name: 'tag7', code: 'tag7' },
        { name: 'tag8', code: 'tag8' },
        { name: 'tag9', code: 'tag9' },
      ],

      playerSettings: {},
      formSettings: {},
      playerId: '9bd1a6f7-49d4-4534-8e0d-19cd43553a91',
    }
  },
  methods: {
    toggleSettings() {
      this.settings = !this.settings
    },
    closeSettings() {
      if (this.settings == true) {
        this.settings = false
      }
    },
    setPlayerData(playerData) {
      this.playerSettings = playerData
    },
    setFormData(formData) {
      console.log('formData', formData)
      this.formSettings = formData
    },
    saveSettings(formData) {
      this.formSettings = formData
      this.settings = false
      console.log('saved settings', this.formSettings)
    },
  },
  mounted() {
    this.$store.commit('setAvailableNetworks', availableNetworks)
    this.$store.commit('setActiveNetwork', availableNetworks[0])
    console.log(this.$store.getters.availableNetworks)
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}
::v-deep {
  .error-message {
    color: #d42b2b;
    font-size: rem(13px);
    line-height: rem(16px);
    margin-top: rem(5px);
    position: relative;
    margin-left: rem(18px);
    display: flex;
    align-items: center;
    flex-direction: row;
    &::before {
      position: absolute;
      content: url('@/assets/img/warning.svg');
      font-size: rem(15px);
      line-height: rem(18px);
      font-weight: 500;
      position: absolute;
      width: 100%;
      height: 100%;
      left: rem(-18px);
      color: #d42b2b;
      bottom: -10%;
      display: flex;
      align-items: center;
    }
  }
}
#main {
  width: 100%;
  height: 100%;
  .navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: rem(102px);
    padding-top: rem(29px);
    padding-bottom: rem(29px);
    padding-left: rem(67px);
    width: 100%;
    height: 9%;
    background-color: rgba(255, 255, 255, 1);
    .back {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: rem(17px);
      font-weight: 500;
      font-size: rem(18px);
      line-height: rem(24px);
      transition: all 0.3s ease;
      cursor: pointer;
      color: rgba(0, 113, 226, 1);
      &:hover {
        opacity: 0.7;
      }
    }
    .title {
      font-weight: 700;
      font-size: rem(28px);
      line-height: rem(33px);
    }
  }
  .main-wrapper {
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background: rgba(242, 245, 250, 1);
    padding-right: rem(32px);
    padding-top: rem(45px);
    padding-bottom: rem(37px);
    padding-left: rem(67px);
    gap: rem(30px);
  }
  .main-wrapper_settings {
    display: flex;
    width: 100%;
    justify-content: center;
    height: auto;
    background: rgba(242, 245, 250, 1);
    padding-right: rem(32px);
    padding-top: rem(45px);
    padding-bottom: rem(37px);
    padding-left: rem(67px);
  }
}

@media (max-width: 1700px) {
  #main .main-wrapper {
    padding-left: unset;
  }
}
</style>
