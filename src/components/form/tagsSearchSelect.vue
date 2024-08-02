<template>
  <div
    @click="resetValidation"
    :class="['select-wrapper select-wrapper_tags', active ? 'active' : '']"
  >
    <!-- <label class="main-screen__form-label" for="select">
      {{ defaultText }}</label
    > -->
    <multiselect
      :options="optionsCount"
      :custom-label="selectCountry"
      :value="value"
      :allowEmpty="false"
      :searchable="search"
      :taggable="taggable"
      :multiple="taggable"
      :class="{
        error: $v.value && $v.value.$error,
        showValue: showValue,
        valid:
          !$v.value.$error && $v.value.$model && value?.name !== defaultText,
        taggable: taggable,
      }"
      :closeOnSelect="!taggable"
      placeholder=""
      label="name"
      name="select"
      v-model="value"
      track-by="code"
      @select="checkState"
      @remove="checkState"
      @open="handleOpen"
      @close="checkLabel"
      @tag="addTag"
    >
      <template #tag="{ option, remove }">
        <span class="custom-tag">
          {{ option.name }}
          <span class="remove-tag" @click.stop="remove(option)"
            ><img src="@/assets/img/closeTag.svg" alt="delete"
          /></span>
        </span>
      </template>
    </multiselect>
    <div class="additional-actions">
      <div class="copy-tags" @click="copyActiveTags">
        <img src="@/assets/img/copy.svg" alt="copy" />
      </div>
      <div class="clear-tags" @click="clearActiveTags">
        <img src="@/assets/img/clear.svg" alt="clear" />
      </div>
    </div>

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
      value: this.tagsActive,
      showError: false,
      active: false,
      showValue: false,
    }
  },
  props: {
    optionsCount: {},
    tagsActive: {
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
    taggable: {
      type: Boolean,
      required: false,
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
        return
      }
      this.showValue = true
      this.active = false
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
      this.$emit('updateActiveTags', this.value)
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
        searchQuery.placeholder = 'select or input tags'
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
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      }
      this.optionsCount.push(tag)
      this.value.push(tag)
    },
    copyActiveTags() {
      const activeTags = this.value.filter(
        (tag) => tag.name !== this.defaultText
      )
      const tagsToCopy = activeTags.map((tag) => tag.name).join(', ')
      navigator.clipboard.writeText(tagsToCopy).then(() => {
        console.log('Tags copied to clipboard')
      })
    },
    clearActiveTags() {
      this.value = []
      this.$emit('updateActiveTags', this.value)
    },
    remove(tag) {
      console.log('Removing', tag)
      this.value = this.value.filter((t) => t.name !== tag.name)
      this.$emit('updateActiveTags', this.value)
    },
  },

  mounted() {
    this.resetValidation()
    this.checkState()
    setTimeout(() => {
      if (this.defaultValue) {
        this.value = this.defaultValue
        this.checkLabel()
        this.showValue = true
        this.checkState()
      }
    }, 0)
  },
}
</script>

<style lang="scss">
@function rem($px) {
  @return ($px / 16px) + rem;
}
.select-wrapper_tags .multiselect__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .multiselect__tags-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: rem(6px);
    width: auto;
    max-width: 85%;
    flex-wrap: wrap;
    position: unset;
    margin-right: rem(6px);
    .custom-tag {
      font-size: rem(11px);
      line-height: rem(20px);
      font-weight: 400;
      padding: rem(4px) rem(6px);
      background: #f5f5f8;
      color: #14121f;
      border-radius: rem(45px);
      pointer-events: all;
      position: relative;
      z-index: 100;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: rem(4px);
      .remove-tag {
        padding: 0 rem(5px);
        background: #e3e3e6;
        border-radius: 50%;
        height: rem(15px);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: rem(6px);
          height: rem(6px);
          position: relative;
        }
      }
    }
  }
}

.select-wrapper_tags {
  position: relative;
  cursor: pointer;

  .additional-actions {
    position: absolute;
    top: 35%;
    right: rem(20px);
    display: flex;
    align-items: center;
    gap: rem(6px);
    div {
      transition: all 0.2s ease;

      &:hover {
        cursor: pointer;
        filter: brightness(0);
        transition: all 0.2s ease;
      }
    }
  }
  .multiselect__tags-wrap {
    position: absolute;
    transition: all 0.3s ease;
    font-size: rem(17px);
    line-height: rem(21px);
    font-weight: 500;
    top: rem(13px);
    left: rem(15px);
    color: #86868b;
    pointer-events: none;
    z-index: 1;
  }
  .multiselect__tags {
    height: auto;
    min-height: rem(54px);
  }
  &.active {
    .multiselect__tags-wrap {
      top: rem(3px);
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
      padding: rem(12px) rem(15px) rem(12px) rem(15px);
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
      // margin: rem(5px) 0 0 0;
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
        input {
          width: auto !important;
        }
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

.select-wrapper_tags .multiselect.taggable .multiselect__select::before {
  all: unset;
}
.select-wrapper_tags .multiselect.taggable::after {
  all: unset;
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
