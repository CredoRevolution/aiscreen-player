<template>
  <div class="dispay-wrapper">
    <div class="tabs-wrapper">
      <CustomTabs @getData="rotateScreen" />
    </div>
    <div class="display-main-wrapper">
      <ScreenSettings />
      <div class="display-screen-wrapper" ref="screenWrapper">
        <img
          src="@/assets/screen.png"
          alt="screen"
          class="display-screen"
          ref="screen"
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
  methods: {
    changeScale() {
      this.$refs.scale.style.background = `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) ${this.$refs.scale.value}%, rgba(255, 255, 255, 1) ${this.$refs.scale.value}%)`
      this.$refs.scaleInput.value = this.$refs.scale.value * 2
      //   this.$refs.screen.style.transform = `scale(${
      //     this.$refs.scale.value / 50
      //   })`
    },
    setRangeValue() {
      this.$refs.scale.value = this.$refs.scaleInput.value / 2
      this.changeScale()
      if (this.$refs.scaleInput.value > 200) {
        this.$refs.scaleInput.value = 200
      }
    },
    rotateScreen(something, value) {
      const degrees = value.slice(0, -2)
      this.$refs.screen.style.transition = `all 0.3s ease`
      this.$refs.screenWrapper.style.height = 'auto'
      this.$refs.screen.style.transform = `rotate(${degrees}deg)`
      if (degrees == 90 || degrees == 270) {
        this.$refs.screenWrapper.style.height =
          this.$refs.screen.offsetWidth + 'px'
      }
    },
  },
  mounted() {
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
  gap: rem(95px);
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

      img {
        border-radius: rem(14px);
        border: rem(10px) solid black;
        border-radius: rem(24px);
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
</style>
