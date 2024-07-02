<template>
  <div class="display-settings-wrapper">
    <div class="screen-toggle">
      <img src="@/assets/screen-toggle.svg" alt="screen toggle" />
      Screen
      <toggle-button
        :labels="{
          checked: 'On',
          unchecked: 'Off',
        }"
        :color="{
          checked: 'rgba(0, 113, 226, 1)',
          unchecked: 'rgba(134, 134, 139, 0.5)',
        }"
        :value="true"
        :margin="8"
        :width="56"
        :height="32"
        :font-size="12"
      />
    </div>
    <ul class="screen-settings-list">
      <li class="screen-settings-item">
        <img src="@/assets/update.svg" alt="" />
        Update software
      </li>
      <li class="screen-settings-item">
        <img src="@/assets/relaunch.svg" alt="" />
        Relaunch app
      </li>
      <li class="screen-settings-item">
        <img src="@/assets/reboot.svg" alt="" />
        Reboot hardware
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ScreenSettings',
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}

@import '~pretty-checkbox/src/pretty-checkbox.scss';

.display-settings-wrapper {
  display: flex;
  flex-direction: row;
  gap: rem(31px);
  font-family: Satoshi Variable, sans-serif;
  font-weight: 500;
  font-size: rem(17px);
  line-height: rem(21px);
  .screen-toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: rem(13px);
  }

  .screen-settings-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: rem(8px);

    .screen-settings-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: rem(13px);
      padding: rem(15px) rem(17px);
      background: rgba(255, 255, 255, 1);
      border-radius: rem(54px);
      border: 1px solid rgba(134, 134, 139, 0.5);
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        transform: scale(1.02);
      }
    }
  }
}

@media (max-width: 1600px) {
  .display-settings-wrapper .screen-settings-list .screen-settings-item {
    font-size: rem(14px);
    line-height: rem(17px);
    padding: rem(10px) rem(12px);
  }
}
</style>
