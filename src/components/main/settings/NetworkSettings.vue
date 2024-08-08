<template>
  <div class="network-settings">
    <div class="network-settings-title" @click="showSettings = !showSettings">
      Network
      <img
        class="arrow"
        :class="{ active: showSettings }"
        src="@/assets/img/network-expand.svg"
        alt="arrow"
      />
    </div>
    <div class="network-settings-wrapper" v-if="showSettings">
      <div class="network-settings-item">
        <div class="item-name">Network name</div>
        <div class="item-value">
          {{
            this.$store.getters.activeNetwork
              ? this.$store.getters.activeNetwork.network.wifi.ssid
              : this.formSettings.network.wifi.ssid
          }}
        </div>
      </div>
      <div class="network-settings-item">
        <div class="item-name">Last sync:</div>
        <div class="item-value">Nov 16, 2023, 7:24:00am</div>
      </div>
      <div class="network-settings-item">
        <div class="item-name">IP Address</div>
        <div class="item-value">
          {{
            this.$store.getters.activeNetwork
              ? this.$store.getters.activeNetwork.network.wifi.ipv4.address
              : this.formSettings.network.wifi.ipv4.address
          }}
        </div>
      </div>
      <div class="network-settings-item">
        <div class="item-name">MAC Address</div>
        <div class="item-value">00:1b:63:84:45:e6</div>
      </div>
      <div class="network-settings-item">
        <div class="item-name">DNS</div>
        <div class="item-value">aiscreen.io/player</div>
      </div>
      <div class="network-settings-item">
        <div class="item-name">Network frequency</div>
        <div class="item-value">
          {{
            this.$store.getters.activeNetwork
              ? this.$store.getters.activeNetwork.network.wifi.Frequency
              : this.formSettings.network.wifi.Frequency
          }}
        </div>
      </div>
      <div class="network-settings-item">
        <div class="item-name">Hidden network</div>
        <div class="item-value">
          {{
            this.$store.getters.activeNetwork
              ? this.$store.getters.activeNetwork.network.wifi.hidden
              : this.formSettings.network.wifi.hidden
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkSettings',
  data() {
    return {
      showSettings: false,
    }
  },
  props: {
    formSettings: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.formSettings)
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}

.network-settings {
  display: flex;
  flex-direction: column;
  .network-settings-title {
    font-weight: 700;
    font-size: rem(28px);
    line-height: rem(33px);
    cursor: pointer;
    margin-bottom: rem(34px);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: rem(17px);

    .arrow {
      transform: rotateX(180deg);
      transition: all 0.3s ease;
      position: relative;
      top: rem(3px);
      &.active {
        transform: rotateX(0deg);
      }
    }
  }
  .network-settings-wrapper {
    display: flex;
    flex-direction: column;
    gap: rem(17px);
    .network-settings-item {
      display: flex;
      flex-direction: column;
      .item-name {
        color: rgba(134, 134, 139, 1);
        font-weight: 500;
        font-size: rem(14px);
        line-height: rem(21px);
      }
      .item-value {
        font-weight: 700;
        font-size: rem(17px);
        line-height: rem(21px);
      }
    }
  }
}

@media (max-width: 1600px) {
  .network-settings {
    .network-settings-title {
      font-size: rem(24px);
      line-height: rem(28px);

      .arrow {
        transform: rotateX(180deg);
        transition: all 0.3s ease;
        position: relative;
        top: rem(3px);
        &.active {
          transform: rotateX(0deg);
        }
      }
    }
    .network-settings-wrapper {
      gap: rem(14px);
      .network-settings-item {
        .item-name {
          color: rgba(134, 134, 139, 1);
          font-weight: 500;
          font-size: rem(12px);
          line-height: rem(15px);
        }
        .item-value {
          font-weight: 700;
          font-size: rem(14px);
          line-height: rem(17px);
        }
      }
    }
  }
}
</style>
