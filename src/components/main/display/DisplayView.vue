<template>
  <div class="dispay-wrapper">
    <div class="tabs-wrapper">
      <CustomTabs
        @getDataTabs="rotateScreen"
        :dataNeeded="true"
        :tabs="screenTabs"
        :direction="'vertical'"
        ref="rotateScreen"
      />
    </div>
    <div class="display-main-wrapper">
      <ScreenSettings @rebootScreen="rebootScreen" />
      <div class="display-screen-wrapper" ref="screenWrapper">
        <img
          v-if="screenStatus == 'ready'"
          src="@/assets/img/screen.png"
          alt="screen"
          class="display-screen"
          ref="screen"
        />
        <img
          src="@/assets/img/loading.svg"
          alt="loading"
          class="display-screen display-screen_loading"
          ref="loadingScreen"
          v-if="screenStatus === 'loading'"
        />
        <img
          src="@/assets/img/check.svg"
          alt="loading"
          class="display-screen display-screen_loading"
          ref="loadingScreen"
          v-if="screenStatus === 'ok'"
        />
      </div>
      <div class="display-scale-wrapper">
        Content scale
        <div class="scale-form-wrapper">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value="50"
            ref="scale"
            @input="changeScale"
          />
          <input
            type="text"
            value="100"
            ref="scaleInput"
            @input="setRangeValue"
          />
          %
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSettings from '@/components/main/display/ScreenSettings.vue'
import CustomTabs from '@/components/form/CustomTabs.vue'
export default {
  name: 'DisplayView',
  components: {
    ScreenSettings,
    CustomTabs,
  },
  data() {
    return {
      screenStatus: 'ready',
      screenTabs: ['0°', '90°', '180°', '270°'],
    }
  },
  methods: {
    changeScale() {
      this.$refs.scale.style.background = `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) ${this.$refs.scale.value}%, rgba(255, 255, 255, 1) ${this.$refs.scale.value}%)`
      this.$refs.scaleInput.value = this.$refs.scale.value * 2
      this.$refs.screen.style.transform = `scale(${
        this.$refs.scale.value / 50
      })`
    },
    setRangeValue() {
      this.$refs.scale.value = this.$refs.scaleInput.value / 2
      this.changeScale()
      if (this.$refs.scaleInput.value > 200) {
        this.$refs.scaleInput.value = 200
      }
    },
    rotateScreen(value) {
      const degrees = value.slice(0, -2)
      this.$refs.screenWrapper.style.transition = `all 0.3s ease`
      this.$refs.screen.style.transition = `all 0.3s ease`
      this.$refs.screenWrapper.style.transform = `rotate(${degrees}deg)`
      this.$refs.screenWrapper.style.margin = 0
      if (degrees == 90 || degrees == 270) {
        this.$refs.screenWrapper.style.width =
          this.$refs.screen.offsetWidth + 20 + 'px'
        this.$refs.screenWrapper.style.height =
          this.$refs.screen.offsetHeight + 20 + 'px'
        this.$refs.screenWrapper.style.marginTop =
          this.$refs.screenWrapper.offsetHeight / 2 + 'px'
        this.$refs.screenWrapper.style.marginBottom =
          this.$refs.screenWrapper.offsetHeight / 2 + 'px'
      }
    },
    rebootScreen() {
      let height = this.$refs.screenWrapper.offsetHeight
      let width = this.$refs.screenWrapper.offsetWidth
      this.$refs.screenWrapper.style.height = height + 'px'
      this.$refs.screenWrapper.style.width = width + 'px'
      this.screenStatus = 'loading'
      setTimeout(() => {
        this.screenStatus = 'ok'
      }, 2000)
      setTimeout(() => {
        this.screenStatus = 'ready'
      }, 3000)
    },
  },
  mounted() {
    this.$refs.rotateScreen.activateTabs()
    this.changeScale()
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}
.dispay-wrapper {
  //   padding-top: rem(50px);
  background-color: rgba(242, 245, 250, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: rem(30px);
  //   padding-left: rem(67px);
  margin: auto 0;
  .tabs-wrapper {
  }
  .display-main-wrapper {
    display: flex;
    flex-direction: column;
    gap: rem(55px);
    align-items: center;
    justify-content: center;

    .display-screen-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      border-radius: rem(14px);
      border: 10px solid black;
      border-radius: rem(24px);
      overflow: hidden;
      img {
        width: 100%;
      }
      .display-screen_loading {
        width: 50%;
      }
    }
    .display-scale-wrapper {
      font-weight: 700;
      font-size: rem(19px);
      line-height: rem(23px);
      margin-bottom: rem(17px);
      .scale-form-wrapper {
        margin-top: rem(17px);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: rem(8px);
        input[type='range'] {
          -webkit-appearance: none;
          width: rem(430px);
          height: rem(5px);
          background: rgb(188, 190, 194);
          border-radius: rem(999px);
          outline: none;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: rem(24px);
            height: rem(24px);
            background: rgb(255, 255, 255);
            border-radius: rem(999px);
            border: 5px solid black;
          }
          &::-ms-fill-lower {
            background: black;
          }
        }
        color: rgba(134, 134, 139, 0.5);
        font-size: rem(19px);
        line-height: rem(23px);
        input[type='text'] {
          padding: rem(9px) rem(14px);
          border: 1px solid rgba(134, 134, 139, 0.5);
          border-radius: rem(13px);
          font-size: rem(17px);
          line-height: rem(21px);
          width: rem(64px);
          color: rgba(134, 134, 139, 1);
          margin-left: rem(9px);
          &::placeholder {
            color: rgba(134, 134, 139, 0.5);
            font-size: rem(17px);
            line-height: rem(21px);
          }
        }
      }
    }
  }
}

@media (max-width: 1700px) {
  .dispay-wrapper {
    margin: auto;
  }
}
.dispay-wrapper .display-main-wrapper {
  gap: rem(25px);
}

@media (max-width: 1600px) {
  .dispay-wrapper {
    transform: scale(0.85);
  }
  .dispay-wrapper .display-main-wrapper .display-screen-wrapper {
    width: 90%;
  }
}
</style>
