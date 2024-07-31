<template>
  <div :class="['input-wrapper']" ref="inputWrapper">
    <!-- <label class="main-screen__form-item-label" for="text-input" ref="label">{{
      placeholderText
    }}</label> -->
    <input
      :name="inputName"
      :class="[
        'main-screen__form-input',
        'main-screen__form-item-warnings',
        $v.name.$error && showError ? 'error' : '',
        !$v.name.$error && $v.name.$model ? 'valid' : '',
      ]"
      :required="required"
      :placeholder="placeholderText"
      @click="resetValidation()"
      @focusin="active = true"
      @focusout="focus"
      @input="sendData"
      ref="input"
      v-model.trim="name"
    />
    <input
      :name="inputName"
      :class="['main-screen__form-input', 'main-screen__form-input_additional']"
      :required="required"
      :placeholder="placeholderTextTime"
      @input="sendData"
      ref="input"
      v-model.trim="time"
      v-mask="'##:##AA'"
    />
    <div class="info-tooltip" v-if="info">
      <!-- <img src="@/assets/img/info.svg" alt=""> -->
    </div>
    <div class="error-message" v-if="showError && !$v.name.minLength">
      Name must have at least {{ $v.name.$params.minLength.min }} letters.
    </div>
    <div class="error-message" v-if="showError && !$v.name.required">
      {{ defaultErrorText }}
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'CustomInput',
  props: {
    placeholderText: {
      type: String,
      required: true,
    },
    placeholderTextTime: {
      type: String,
      required: true,
    },
    defaultErrorText: {
      type: String,
      required: false,
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
  },
  data() {
    return {
      name: '',
      time: '',
      isValid: false,
      showError: false,
      active: false,
      baseFile: '',
    }
  },
  validations: {
    name: {
      required(value) {
        if (!this.required) {
          return true
        }
        return !!value
      },
      minLength: minLength(3),
      ipAddress(value) {
        if (!this.ipAddress) {
          return true
        }
        if (value === '') return true
        const regex =
          /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/
        return regex.test(value)
      },
    },
  },
  mounted() {
    this.resetValidation()
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
    resetValidation() {
      this.$v.$reset()
      this.isValid = false
      this.showError = false
    },
    focus() {
      if (this.name === '') {
        this.active = false
      } else {
        this.active = true
      }
    },
    sendData() {
      this.$emit('getLocation', this.name, this.time)
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

  .main-screen__form-input {
    background: transparent;
    border-radius: rem(13px);
    padding: rem(15px) rem(15px) rem(15px) rem(15px);
    width: 100%;
    font-weight: 500;
    font-size: rem(17px);
    line-height: rem(21px);
    color: #14121f;
    border: 1px solid #86868b80;
    &_additional {
      z-index: 0;
      position: absolute;
      left: 100%;
      transform: translateX(-100%);
      width: 16.5%;
      border: 1px solid transparent;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
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
