<template>
  <div
    @click="resetValidation"
    :class="['select-wrapper', active ? 'active' : '']"
  >
    <label class="main-screen__form-label" for="select" v-if="!compact">
      {{ defaultText }}</label
    >
    <multiselect
      :options="optionsCount"
      :custom-label="selectCountry"
      :value="value"
      :allowEmpty="false"
      :searchable="search"
      :class="{
        error: $v.value && $v.value.$error,
        showValue: showValue,
        valid:
          !$v.value.$error && $v.value.$model && value?.name !== defaultText,
        compact: compact,
      }"
      placeholder=""
      label="name"
      name="select"
      v-model="value"
      track-by="name"
      @select="handleSelect"
      @open="handleOpen"
      @close="checkLabel"
    >
    </multiselect>
    <p v-if="showError && !$v.value.mustBeSelected" class="error-message">
      {{ defaultErrorText }}
    </p>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { required } from 'vuelidate/lib/validators'

const mustBeSelected = (value, vm) => value.name !== vm.defaultText

export default {
  name: 'SearchSelect',
  components: {
    Multiselect,
  },
  data() {
    return {
      value: { name: this.defaultText, code: this.defaultText },
      showError: false,
      active: false,
      showValue: false,
      isUserSelected: false, // Track if selection is user-initiated
    }
  },
  props: {
    optionsCount: {
      type: Array,
      required: true,
    },
    defaultText: {
      type: String,
      required: true,
    },
    defaultErrorText: {
      type: String,
      required: false,
    },
    industry: {
      type: Boolean,
      default: false,
      required: false,
    },
    search: {
      type: Boolean,
      default: true,
      required: false,
    },
    defaultValue: {
      type: Object,
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
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  validations: {
    value: {
      required(value) {
        if (!this.required) {
          return true
        }
        return !!value
      },
      mustBeSelected(value) {
        if (this.required) {
          return mustBeSelected(value, this)
        }
        return true
      },
    },
  },
  methods: {
    checkValidation() {
      if (this.$v) {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          return true
        }
        this.showError = true
        return false
      }
    },

    checkLabel() {
      if (this.value.name === this.defaultText) {
        this.active = false
        this.showValue = false
        return
      }
      this.showValue = true
      this.active = true
    },
    resetValidation() {
      this.$v.$reset()
      this.isValid = false
      this.showError = false
    },
    nameWithLang({ name }) {
      return `${name}`
    },
    selectCountry({ name }) {
      return `${name}`
    },
    checkState() {
      if (this.formField && this.value.name) {
        this.$emit('getData', this.formPlace, this.formField, this.value.name)
        return
      }
      if (this.value.name) {
        this.$emit('getData', this.formField, this.value.name)
      }
      if (this.industry) {
        this.$emit('getInfo', this.value.name)
      }
    },
    handleOpen() {
      this.active = true
      if (this.search) {
        const searchQuery = document.querySelector('.multiselect__input')
        searchQuery.placeholder = this.value.name
      }
      this.$nextTick(() => {
        const list = this.$el.querySelector('.multiselect__content')
        if (list) {
          const listItems = Array.from(list.children)
          const selectedIndex = listItems.findIndex(
            (item) => item.textContent.trim() === this.value.name
          )
          list.scrollTop = 1000
          list.style.overflowY = 'auto'
          list.style.maxHeight = '300px'
          if (selectedIndex !== -1) {
            const listItemSelected = listItems[selectedIndex]
            const listItemSelectedTop =
              listItemSelected.offsetTop - list.offsetTop
            list.scrollTop = listItemSelectedTop
          }
        }
      })
    },
    handleSelect(selectedValue) {
      this.isUserSelected = true
      this.value = selectedValue
      this.checkState()
    },
    clearField() {
      this.isUserSelected = true
      this.value = { name: this.defaultText, code: this.defaultText }
      this.checkState()
      this.resetValidation()
      this.checkLabel()
    },
  },

  mounted() {
    this.resetValidation()
    this.checkState()
    if (this.defaultValue) {
      this.value = this.defaultValue
      this.checkLabel()
      this.showValue = true
      this.checkState()
    }
  },
  watch: {
    defaultValue: {
      handler(newValue) {
        if (this.isUserSelected) return
        if (!this.isUserSelected) {
          this.value = newValue
          this.checkLabel()
          this.showValue = true
          this.checkState()
        }

        this.isUserSelected = false
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
@function rem($px) {
  @return ($px / 16px) + rem;
}
.select-wrapper {
  position: relative;
  cursor: pointer;
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
    z-index: 1;
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
  .select-wrapper
    .multiselect--active.multiselect--above
    .multiselect__content-wrapper {
    border-top-left-radius: 0.8125rem;
    border-top-right-radius: 0.8125rem;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom: 0;
    border-top: 1px solid #0071e2;
  }

  .multiselect {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    border-radius: rem(13px);
    width: 100%;
    font-weight: 500;
    font-size: rem(17px);
    line-height: rem(21px);
    color: #86868b;
    border: 1px solid transparent;
    z-index: auto !important;
    box-sizing: border-box;
    &--above {
      .multiselect__content-wrapper {
        bottom: 100%;
      }
    }
    &.error {
      .multiselect__tags {
        border: 1px solid red;
      }
    }
    &.valid {
      .multiselect__tags {
        border: 1px solid #0071e2;
        transition: all 0.3s ease;
      }
    }
    &.showValue {
      .multiselect__tags {
        .multiselect__single {
          opacity: 1;
          color: #14121f;
        }
      }
    }

    &::after {
      content: '';
      width: rem(40px);
      height: rem(40px);
      position: absolute;
      top: rem(6px);
      right: rem(6px);
      background: #86868b29;
      border-radius: rem(10px);
      transition: all 0.3s ease;
    }
    .multiselect__select {
      all: unset;
      &::before {
        all: unset;
        position: absolute;
        content: '';
        top: rem(6px);
        right: rem(6px);
        width: rem(40px);
        height: rem(40px);
        background: url('@/assets/img/arrow-down.svg');
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.3s ease;
        border-radius: rem(10px);
        z-index: 3;
      }
    }
    .multiselect__tags {
      position: relative;
      width: 100%;
      text-align: left;
      outline: none;
      border-radius: rem(13px);
      width: 100%;
      font-weight: 500;
      font-size: rem(17px);
      line-height: rem(21px);
      color: #86868b;
      border: 1px solid #86868b80;
      padding: rem(23px) rem(15px) rem(8px) rem(15px);
      z-index: 0 !important;
      .multiselect__single {
        color: #86868b;
        font-weight: 500;
        font-size: rem(17px);
        line-height: rem(21px);
        margin-bottom: 0;
        padding: 0;
        opacity: 0;
      }
    }
    .multiselect__content-wrapper {
      position: absolute;
      background-color: white;
      width: 100%;
      z-index: 11 !important;
      border-bottom-left-radius: rem(13px);
      border-bottom-right-radius: rem(13px);
      box-shadow: 0px 0px 8px #0071e254;
      border: 1px solid #0071e2;
      border-top: 0;
      overflow-x: hidden;
      overflow-y: hidden;
      .multiselect__content {
        width: 100%;
      }
      .multiselect__option {
        padding: rem(15px);
        font-size: rem(17px);
        line-height: rem(21px);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        &--selected {
          background: none;
          color: #14121f;
          &::after {
            content: url(@/assets/img/check.svg);
            background: none;
            position: unset;
            line-height: unset;
            padding-right: 0;
          }
        }
        &--highlight {
          background: none;
          background: rgba(0, 0, 0, 0.05);
          color: #14121f;
          &::after {
            content: '';
          }
          &.multiselect__option--selected {
            &::after {
              content: url(@/assets/img/check.svg);
              background: none;
              padding-right: 0;
            }
          }
        }
      }
    }
    input {
      position: relative;
      width: 100%;
      text-align: left;
      outline: none;
      width: 100%;
      font-weight: 500;
      font-size: rem(17px);
      line-height: rem(21px);
      color: #14121f;
      padding: 0;
      margin: 0;
      border: 0;
      &::placeholder {
        color: #86868b;
        font-weight: 500;
        font-size: rem(17px);
        line-height: rem(21px);
        margin-bottom: 0;
        padding: 0;
      }
    }
    &--active {
      .multiselect__tags {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #0071e2;
        box-shadow: 0px 0px 8px #0071e254;
        border-bottom: 1px solid #86868b80;
      }
      .multiselect__select {
        &::before {
          transform: rotateX(180deg);
        }
      }
      .multiselect__content-wrapper {
        .multiselect__content {
          width: 100%;
        }
      }
      &.multiselect--above {
        // border-top-left-radius: 0;
        // border-top-right-radius: 0;
        // border: 1px solid #0071e2;
        // box-shadow: 0px 0px 8px #0071e254;
        // border-top: 1px solid #86868b80;
        .multiselect__tags {
          border-bottom: 1px solid #0071e2;
          border-top: 1px solid #86868b80;
          border-radius: rem(13px);
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
        .multiselect__content-wrapper {
          border-top-left-radius: rem(13px);
          border-top-right-radius: rem(13px);
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
          border-bottom: 0;
          border-top: 1px solid #0071e2;
          .multiselect__content {
            width: 100%;
          }
        }
      }
    }
  }
}

.select-wrapper {
  .multiselect.compact {
    .multiselect__select {
      &::before {
        width: rem(8px);
        height: rem(6px);
        top: rem(8px);
      }
    }
    &::after {
      content: none;
    }
    .multiselect__content-wrapper {
      border: 1px solid #86868b80;
      border-bottom: 0;
      .multiselect__option--selected::after {
        content: none;
      }
      .multiselect__option {
        font-size: rem(14px) !important;
        line-height: rem(21px) !important;
        font-weight: 500 !important;
        color: #86868b !important;
        padding: rem(5px) rem(5px) rem(5px) rem(5px);
        &--highlight.multiselect__option--selected::after {
          content: none;
        }
      }
    }
    .multiselect__tags {
      font-size: rem(14px) !important;
      line-height: rem(21px) !important;
      font-weight: 500 !important;
      color: #86868b !important;
      border: 1px solid transparent;
      padding: rem(0px) rem(25px) rem(0px) rem(5px);
      .multiselect__single {
        font-size: rem(14px) !important;
        line-height: rem(21px) !important;
        font-weight: 500 !important;
        color: #86868b !important;
      }
    }
  }
  .multiselect.multiselect--active.compact {
    .multiselect__tags {
      border: 1px solid #86868b80;
    }
  }
}

// @media (max-height: 900px) {
//   .select-wrapper {
//     .multiselect {
//       .multiselect__tags {
//         padding: rem(12px);
//       }
//       .multiselect__select {
//         &::before {
//           width: rem(38px);
//           height: rem(38px);
//         }
//       }
//       &::after {
//         top: rem(4px);
//         width: rem(38px);
//         height: rem(38px);
//       }
//     }
//   }
// }
//
</style>
