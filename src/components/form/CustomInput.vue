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
    <vue-timepicker
      :class="[
        'main-screen__form-input',
        'main-screen__form-input_additional',
        active,
      ]"
      format="hh:mm a"
      v-model="name"
      v-if="timePicker"
      close-on-complete
      hide-clear-button
      @change="sendData"
    ></vue-timepicker>
    <div class="info-tooltip" v-if="info">
      <!-- <img src="@/assets/img/info.svg" alt=""> -->
    </div>
    <div class="deletable" @click="deleteThisInput" v-if="deletable">
      <img :src="require('@/assets/img/cross.svg')" alt="delete" />
    </div>
    <div class="show-password" @click="showPassword" v-if="hidden">
      <img
        :src="require('@/assets/img/passwordHide.svg')"
        alt="show password"
        v-if="showPasswordIcon"
      />
      <img
        :src="require('@/assets/img/passwordError.svg')"
        alt="show password"
        v-else-if="showError"
      />
      <img
        :src="require('@/assets/img/passwordActive.svg')"
        alt="show password"
        v-else-if="active"
      />
      <img
        :src="require('@/assets/img/passwordEye.svg')"
        alt="show password"
        v-else
      />
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
      name: this.defaultName ? this.defaultName : '',
      isValid: false,
      showError: false,
      active: false,
      baseFile: '',
      showPasswordIcon: false,
    }
  },
  watch: {
    defaultName() {
      this.name = this.defaultName
      this.resetValidation()
      this.focus()
      this.sendData()
    },
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

      if (this.formField) {
        this.$emit('getData', this.formPlace, this.formField, this.name)

        return
      }
      this.$emit('getData', this.placeholderText, this.name)
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
    width: rem(52px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      cursor: pointer;
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
