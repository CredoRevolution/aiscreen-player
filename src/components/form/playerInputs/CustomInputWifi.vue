<template>
  <div
    :class="[
      'input-wrapper',
      {
        active,
        file,
        deletable,
      },
    ]"
    ref="inputWrapper"
  >
    <label class="main-screen__form-item-label" for="text-input" ref="label">{{
      placeholderText
    }}</label>
    <input
      :name="inputName"
      :type="hidden ? 'password' : 'text'"
      :class="[
        'main-screen__form-input',
        'main-screen__form-item-warnings',
        $v.name.$error && showError ? 'error' : '',
        deletable ? 'deletable' : '',
        file ? 'file' : '',
        hidden ? 'password' : '',
        timePicker ? 'timePicker' : '',
        !$v.name.$error && $v.name.$model ? 'valid' : '',
      ]"
      :readonly="file"
      :required="required"
      v-model.trim="name"
      v-mask="mask"
      @click="
        resetValidation()
        uploadFile()
      "
      @focusin="active = true"
      @focusout="focus"
      @input="sendData"
      ref="input"
    />
    <div class="show-password" @click="toggleWifiSettings">
      <img
        :src="require('@/assets/img/wifi-settings.svg')"
        alt="show password"
      />
    </div>
    <div class="deletable" @click="clearNetwork">
      <img :src="require('@/assets/img/cross.svg')" alt="delete" />
    </div>
    <div class="wifi-settings" v-show="wifiSettings == true" ref="wifiSettings">
      <div class="personal-wrapper">
        <div class="wrapper__title">Personal Hotspot</div>
        <ul class="wifi__list">
          <li class="wifi__item">
            <div class="wifi-item__name">
              <img src="@/assets/img/hotspot.svg" alt="" />
              Nikita
            </div>
            <div class="wifi-item__status">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="14" width="4" height="5" rx="1" fill="#86868B" />
                <rect x="7" y="11" width="4" height="8" rx="1" fill="#86868B" />
                <rect
                  x="13"
                  y="8"
                  width="4"
                  height="11"
                  rx="1"
                  fill="#D9D9D9"
                />
                <rect
                  x="19"
                  y="5"
                  width="4"
                  height="14"
                  rx="1"
                  fill="#D9D9D9"
                />
              </svg>
              LTE
            </div>
          </li>
        </ul>
      </div>

      <div class="known-wrapper">
        <div class="wrapper__title">Known Networks</div>
        <ul class="wifi__list">
          <li
            class="wifi__item"
            v-for="network in $store.getters.availableNetworks"
            :key="network.network.wifi.ssid"
            :class="[
              $store.getters.activeNetwork &&
              $store.getters.activeNetwork.network.wifi.ssid ==
                network.network.wifi.ssid
                ? 'active'
                : '',
            ]"
            @click="connectToNetwork(network)"
          >
            <div class="wifi-item__name">
              <svg
                v-if="isConnecting !== network"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.91747 4.89353C10.1818 5.14127 10.5911 5.12133 10.8316 4.84893C11.0721 4.5766 11.0527 4.15493 10.7883 3.9072L9.91747 4.89353ZM1.21168 3.9072C0.947306 4.15493 0.927938 4.5766 1.16841 4.84893C1.4089 5.12133 1.81816 5.14127 2.08253 4.89353L1.21168 3.9072ZM5.99999 3.33333C7.50896 3.33333 8.88256 3.92367 9.91747 4.89353L10.7883 3.9072C9.52448 2.7228 7.84338 2 5.99999 2V3.33333ZM2.08253 4.89353C3.11745 3.92367 4.49106 3.33333 5.99999 3.33333V2C4.15658 2 2.47553 2.7228 1.21168 3.9072L2.08253 4.89353Z"
                  fill="#1F1F20"
                />
                <path
                  d="M7.74034 7.36016C8.00475 7.6079 8.41398 7.58796 8.65444 7.31563C8.89496 7.04323 8.87555 6.62163 8.61121 6.37383L7.74034 7.36016ZM3.38746 6.37383C3.12309 6.62163 3.10372 7.04323 3.34419 7.31563C3.58468 7.58796 3.99394 7.6079 4.25831 7.36016L3.38746 6.37383ZM5.99932 6.66683C6.67017 6.66683 7.28013 6.9289 7.74034 7.36016L8.61121 6.37383C7.92205 5.72803 7.00466 5.3335 5.99932 5.3335V6.66683ZM4.25831 7.36016C4.71852 6.9289 5.32847 6.66683 5.99932 6.66683V5.3335C4.99399 5.3335 4.07661 5.72803 3.38746 6.37383L4.25831 7.36016Z"
                  fill="#1F1F20"
                />
                <path
                  d="M5.99866 8.6665C5.64127 8.6665 5.35156 8.96497 5.35156 9.33317C5.35156 9.70137 5.64127 9.99984 5.99866 9.99984V8.6665ZM6.00513 9.99984C6.36253 9.99984 6.65223 9.70137 6.65223 9.33317C6.65223 8.96497 6.36253 8.6665 6.00513 8.6665V9.99984ZM5.99866 9.99984H6.00513V8.6665H5.99866V9.99984Z"
                  fill="#1F1F20"
                />
              </svg>
              <svg
                v-if="isConnecting == network"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="margin: auto; display: block; shape-rendering: auto"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  stroke-width="8"
                  stroke="#14121f"
                  stroke-dasharray="50.26548245743669 50.26548245743669"
                  fill="none"
                  stroke-linecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                  ></animateTransform>
                </circle>
                <circle
                  cx="50"
                  cy="50"
                  r="23"
                  stroke-width="8"
                  stroke="#14121f"
                  stroke-dasharray="36.12831551628262 36.12831551628262"
                  stroke-dashoffset="36.12831551628262"
                  fill="none"
                  stroke-linecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 50;-360 50 50"
                  ></animateTransform>
                </circle>
              </svg>

              {{ network.network.wifi.ssid }}
            </div>

            <div class="wifi-item__status">
              <img src="@/assets/img/wifi-lock.svg" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <div class="network-btn" @click="addNetwork">Add network</div>
    </div>

    <div class="error-message" v-if="showError && !$v.name.minLength && !phone">
      Name must have at least {{ $v.name.$params.minLength.min }} letters.
    </div>
    <div class="error-message" v-if="showError && !$v.name.required && !phone">
      {{ defaultErrorText }}
    </div>
    <div class="error-message" v-if="showError && !$v.name.phoneCheck && phone">
      Please enter a valid phone number
    </div>
    <!-- <div class="error-message" v-if="showError && !$v.name.ipAddress &&">
      Please enter a valid IP address
    </div> -->
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import VueTimepicker from 'vue2-timepicker'

// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  name: 'CustomInput',
  props: {
    placeholderText: {
      type: String,
      required: true,
    },
    defaultName: {
      type: String,
      required: false,
      default: '',
    },
    defaultNameTime: {
      type: Object,
      required: false,
    },
    phone: {
      type: Boolean,
      required: false,
    },
    defaultErrorText: {
      type: String,
      required: false,
    },
    hidden: {
      type: Boolean,
      required: false,
      default: false,
    },
    file: {
      type: Boolean,
      required: false,
      default: false,
    },
    deletable: {
      type: Boolean,
      required: false,
      default: false,
    },
    formField: {
      type: String,
      required: false,
    },
    formPlace: {
      type: Array,
      required: false,
    },
    inputName: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    info: {
      type: Boolean,
      required: false,
      default: false,
    },
    mask: {
      type: String,
      required: false,
      default: null,
    },
    timePicker: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      name: this.defaultName,
      isValid: false,
      showError: false,
      active: false,
      baseFile: '',
      showPasswordIcon: false,
      wifiSettings: false,
      isConnecting: null,
    }
  },
  components: {
    VueTimepicker,
  },
  validations: {
    name: {
      phoneCheck(value) {
        if (!this.phone) {
          return true
        }
        const regex =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        return regex.test(value)
      },
      required(value) {
        if (!this.required) {
          return true
        }
        return !!value
      },
      minLength: minLength(3),
    },
  },
  mounted() {
    if (this.defaultNameTime) {
      this.name =
        this.defaultNameTime.hh +
        ':' +
        this.defaultNameTime.mm +
        this.defaultNameTime.a
    }
    this.resetValidation()
    this.focus()
    this.sendData()
  },
  watch: {
    defaultName() {
      this.name = this.defaultName
      this.resetValidation()
      this.focus()
      this.sendData()
    },
  },
  methods: {
    checkValidation() {
      if (this.$v) {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.isValid = true
        } else {
          this.isValid = false
          this.showError = true
        }
      }
      return this.isValid
    },
    deleteThisInput() {
      this.$refs.inputWrapper.remove()
      this.$emit('getData', this.formPlace, this.formField, null)
    },

    resetValidation() {
      this.$v.$reset()
      this.isValid = false
      this.showError = false
    },
    async uploadFile() {
      if (this.file) {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.txt'
        input.onchange = async (e) => {
          const file = e.target.files[0]
          const reader = new FileReader()
          reader.onload = async (event) => {
            const base64String = await this.compress(event.target.result)
            this.baseFile = base64String
            this.$emit('getData', this.formPlace, this.formField, this.baseFile)
            this.name = file.name
          }
          reader.readAsText(file)
        }
        input.click()
      }
    },
    async compress(text) {
      const encoder = new TextEncoder()
      const compressed = await new Response(encoder.encode(text)).arrayBuffer()
      return btoa(String.fromCharCode.apply(null, new Uint8Array(compressed)))
    },
    focus() {
      if (this.name === '') {
        this.active = false
      } else {
        this.active = true
      }
    },

    showPassword() {
      if (this.hidden) {
        if (this.$refs.input.type === 'text') {
          this.$refs.input.type = 'password'
          this.showPasswordIcon = false
          return
        }
        this.$refs.input.type = 'text'
        this.showPasswordIcon = true
        return
      }
    },
    sendData() {
      this.checkValidation()
      if (this.baseFile) {
      }
      if (this.formField) {
        this.$emit('getData', this.formPlace, this.formField, this.name)

        return
      }
      this.$emit('getData', this.placeholderText, this.name)
    },
    toggleWifiSettings() {
      this.wifiSettings = !this.wifiSettings

      setTimeout(() => {
        if (this.wifiSettings) {
          // Проверка, существует ли обработчик, и удаление его, если нужно
          if (this.documentClickHandler) {
            window.removeEventListener('click', this.documentClickHandler)
          }

          this.documentClickHandler = (e) => {
            if (
              this.$refs.wifiSettings &&
              !this.$refs.wifiSettings.contains(e.target)
            ) {
              this.wifiSettings = false
              window.removeEventListener('click', this.documentClickHandler)
              this.documentClickHandler = null
            }
          }

          window.addEventListener('click', this.documentClickHandler)
        } else {
          // Удаление обработчика событий, если настройки закрываются
          if (this.documentClickHandler) {
            window.removeEventListener('click', this.documentClickHandler)
            this.documentClickHandler = null
          }
        }
      }, 500)
    },
    connectToNetwork(network) {
      this.isConnecting = network
      document.body.style.pointerEvents = 'none'
      setTimeout(() => {
        this.name = network.network.wifi.ssid
        this.isConnecting = false
        this.$store.commit('setActiveNetwork', network)
        document.body.style.pointerEvents = 'unset'
      }, 2000)
    },
    addNetwork() {
      this.wifiSettings = false
      this.$refs.input.focus()
      this.$emit('addNetwork')
    },
    clearNetwork() {
      this.$emit('clearNetwork')
    },
    clearField() {
      this.name = ''
      this.resetValidation()
      this.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}

.input-wrapper {
  position: relative;
  label {
    position: absolute;
    transition: all 0.3s ease;
    font-size: rem(17px);
    line-height: rem(21px);
    font-weight: 500;
    top: rem(17px);
    left: rem(15px);
    color: #86868b;
    pointer-events: none;
  }
  .info-tooltip {
    position: absolute;
    top: rem(19px);
    right: rem(17px);
    cursor: pointer;
    width: rem(15px);
    height: rem(15px);
    background: url('@/assets/img/info.svg') no-repeat;
    background-size: cover;
  }
  input[type='password'] {
    &::-ms-reveal {
      display: none;
    }
  }
  &.active {
    label {
      top: rem(6px);
      left: rem(15px);
      font-weight: 500;
      font-size: rem(13px);
      line-height: rem(17.5px);
      color: #86868b;
      transition: all 0.3s ease;
    }
  }
  &.password {
    // &::after {
    //   content: '';
    //   position: absolute;
    //   top: rem(6px);
    //   right: rem(6px);
    //   width: rem(40px);
    //   height: rem(40px);
    //   background: url('@/assets/img/arrow-down.svg');
    //   background-position: center;
    //   background-repeat: no-repeat;
    //   transition: all 0.3s ease;
    //   border-radius: rem(10px);
    //   z-index: 3;
    // }
  }
  &.file {
    cursor: pointer;
    &.deletable {
      &::after {
        right: 10.5%;
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: rem(6px);
      right: rem(6px);
      width: rem(40px);
      height: rem(40px);
      background: url('@/assets/img/dots.svg');
      background-position: center;
      background-repeat: no-repeat;
      transition: all 0.3s ease;
      border-radius: rem(10px);
      z-index: 3;
      pointer-events: none;
    }
  }
  &.deletable {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 0;
  }
  .deletable {
    position: absolute;
    top: 0.375rem;
    right: rem(50px);
    width: 2.5rem;
    height: 2.5rem;
    transition: all 0.3s ease;
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        transition: all 0.2s ease;
        opacity: 0.8;
      }
    }
  }
  .show-password {
    position: absolute;
    top: rem(6px);
    right: rem(6px);
    width: rem(40px);
    height: rem(40px);
    background: rgba(134, 134, 139, 0.16);
    transition: all 0.3s ease;
    border-radius: rem(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
      background: rgba(134, 134, 139, 0.36);
    }
  }
  .main-screen__form-input {
    background: #fff;
    border-radius: rem(13px);
    padding: rem(23px) rem(15px) rem(8px) rem(15px);
    width: 100%;
    font-weight: 500;
    font-size: rem(17px);
    line-height: rem(21px);
    color: #14121f;
    border: 1px solid #86868b80;
    &.timePicker {
      pointer-events: none;
      opacity: 1;
    }
    &.error {
      border: 1px solid red;
    }
    &.valid {
      border: 1px solid #0071e2;
      transition: all 0.3s ease;
    }
    &.file {
      cursor: pointer;
    }
    &.deletable {
      width: 90.5%;
    }
    &.password {
    }
    &::placeholder {
      color: #86868b;
      font-weight: 500;
      font-size: rem(17px);
      line-height: rem(21px);
    }
    &:focus {
      border: 1px solid #0071e2 !important;
      color: #14121f;
      outline: none;
      box-shadow: 0px 0px 8px #0071e254; /* Добавьте нужный вам box-shadow стиль */
      transition: all 0.3s ease;
      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: rem(13px);
        z-index: 1;
        transition: all 0.3s;
        box-sizing: content-box;
        background: rgba(0, 113, 226, 0.25);
        backdrop-filter: blur(5px);
      }
    }
    &:active {
      border: 1px solid #0071e2 !important;
      color: #14121f;
    }
    &:focus-visible {
      border: 1px solid #0071e2 !important;
      outline: none;
    }
    &_additional {
      z-index: 10;
      position: absolute;
      left: 100%;
      transform: translateX(-100%);
      width: 100%;
      height: 100%;
      border: none;
      padding: 0;
      border-left: 1px solid transparent !important;
      background: transparent;
      ::v-deep {
        input.display-time {
          font-size: rem(14px);
          line-height: rem(21px);
          font-weight: 500;
          background: transparent;
          opacity: 0;

          outline: none !important;
          width: 100%;
          height: rem(54px);
          border-radius: rem(0px) rem(13px) rem(13px) rem(0px);
          border: 1px solid transparent !important;
          padding: rem(15px) rem(15px) rem(15px) rem(15px) !important;
        }
        &.vue__time-picker {
          .dropdown {
            border-radius: rem(13px);

            opacity: 1 !important;
            top: 95%;
            .select-list {
              ul {
                &::-webkit-scrollbar {
                  width: 4px;
                  height: 4px;
                  margin-left: -10px;
                }

                &::-webkit-scrollbar-thumb {
                  background-color: rgba(235, 235, 236, 1) !important;
                  border-radius: 10px !important;
                  margin-left: -10px;
                }

                &::-webkit-scrollbar-track {
                  background-color: rgba(255, 255, 255, 1) !important;
                  border-radius: 10px !important;
                  margin-left: -10px;
                }
                li {
                  font-size: rem(14px) !important;
                  line-height: rem(21px) !important;
                  font-weight: 500 !important;
                  &.active {
                    background: #0071e2 !important;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// @media (max-height: 900px) {
//   .input-wrapper {
//     .main-screen__form-input {
//       padding: rem(12px);
//     }
//     .show-password {
//       width: rem(38px);
//       height: rem(38px);
//     }
//   }
// }
//

.wifi-settings {
  position: absolute;
  top: 100%;
  right: 0%;
  z-index: 100;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 12px 24px 0px #0000001f;
  width: rem(320px);
  border-radius: rem(30px);
  padding: rem(31px);
  display: flex;
  flex-direction: column;
  gap: rem(17px);
  .personal-wrapper {
    border-bottom: 1px solid #f5f5f8;
    padding-bottom: rem(17px);
  }
  .personal-wrapper,
  .known-wrapper {
    display: flex;
    flex-direction: column;
    gap: rem(12px);
    .wrapper__title {
      color: #86868b;
      font-size: rem(14px);
      line-height: rem(21px);
      font-weight: 500;
    }
    .wifi__list {
      display: flex;
      flex-direction: column;
      gap: rem(12px);
      list-style: none;
      .wifi__item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        .wifi-item__name {
          display: flex;
          flex-direction: row;
          gap: rem(8px);
          align-items: center;
          font-weight: 700;
          font-size: rem(17px);
          line-height: rem(21px);
          letter-spacing: -0.02em;
          color: #14121f;
          svg {
            height: rem(24px);
            width: rem(24px);
            padding: rem(6px);
            background: #86868b29;
            border-radius: 50%;
          }
          img {
            padding: rem(6px);
            background: #86868b29;
            border-radius: 50%;
          }
        }
        &.active {
          svg {
            path {
              fill: #fff;
            }
            background: #0071e2;
          }
        }
        .wifi-item__status {
          display: flex;
          flex-direction: row;
          gap: rem(8px);
          align-items: center;
          font-weight: 700;
          font-size: rem(17px);
          line-height: rem(21px);
          letter-spacing: -0.02em;
          color: #86868b;
        }
      }
    }
  }
  .network-btn {
    font-size: rem(14px);
    line-height: rem(21px);
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 113, 226, 1);
    border-radius: rem(999px);
    padding: rem(7px) rem(17px) rem(8px) rem(17px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    border: 1px solid transparent;
    &:hover {
      opacity: 0.8;
    }
  }
}

@media (max-width: 670px) {
  .input-wrapper.deletable {
    flex-wrap: nowrap;
  }
  .input-wrapper.file.deletable::after {
    right: 12.5%;
  }
}

@media (max-width: 520px) {
  .input-wrapper.file.deletable::after {
    right: 14.5%;
  }
  .input-wrapper.file label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 60%;
  }
}

@media (max-width: 400px) {
  .input-wrapper.file.deletable::after {
    right: 17.5%;
  }
}
</style>
