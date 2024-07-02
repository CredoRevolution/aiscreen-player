<template>
  <div id="main">
    <div class="navbar">
      <div class="back">
        <img src="@/assets/arrow-back.svg" alt="back" />
        Back
      </div>
      <div class="title">AIScreen Player</div>
    </div>
    <div class="main-wrapper">
      <DisplayView />
      <SettingsView />
    </div>
  </div>
</template>

<script>
import DisplayView from '@/components/main/display/DisplayView.vue'
import SettingsView from '@/components/main/settings/SettingsView.vue'
export default {
  name: 'MainView',
  components: {
    DisplayView,
    SettingsView,
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
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
    height: 91%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
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
