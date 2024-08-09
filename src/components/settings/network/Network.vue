<template>
  <div class="main-wrapper">
    <form class="main-wrapper__form">
      <CustomTabs
        :tabs="customTabs"
        @getDataTabs="getDataTabs"
        :dataNeeded="true"
        ref="validation1"
      />
      <template>
        <CustomInputWifi
          v-show="selectedTab === 'Wi-Fi'"
          :placeholderText="'Network name (SSID)'"
          :defaultErrorText="'Network name (SSID) is required'"
          :defaultName="activeNetwork.network.wifi.ssid"
          :formField="'ssid'"
          :formPlace="['network', 'wifi']"
          :inputName="'ssid'"
          :required="selectedTab === 'Wi-Fi'"
          @getData="getData"
          @clearNetwork="clearNetwork"
          @addNetwork="createNewNetwork"
          ref="validation01"
        />
        <SearchSelect
          class="search-select_mb"
          v-show="selectedTab === 'Wi-Fi'"
          :optionsCount="networkFrequencies"
          :defaultValue="
            activeNetwork.network.wifi.Frequency
              ? {
                  name: activeNetwork.network.wifi.Frequency,
                }
              : { name: '2.6gHz' }
          "
          :search="false"
          :defaultText="'Network frequency'"
          :defaultErrorText="'Frequency is required'"
          :form-place="['network', 'wifi']"
          :formField="'Frequency'"
          :required="selectedTab === 'Wi-Fi'"
          @getData="getData"
          ref="validation2"
        />
        <SearchSelect
          v-show="selectedTab === 'Wi-Fi'"
          :optionsCount="authentificationMethods"
          :search="false"
          :defaultText="'Authentification'"
          :defaultErrorText="'Authentification is required'"
          :defaultValue="
            activeNetwork.network.wifi.Authentification
              ? {
                  name: activeNetwork.network.wifi.Authentification,
                }
              : { name: 'None' }
          "
          :form-place="['network', 'wifi']"
          :formField="'Authentification'"
          :required="selectedTab === 'Wi-Fi'"
          @getData="getData"
          ref="validation3"
        />
        <CustomInput
          v-show="
            form.network.wifi.Authentification === 'Basic (WPA2 Personal)' &&
            selectedTab === 'Wi-Fi'
          "
          :required="
            form.network.wifi.Authentification === 'Basic (WPA2 Personal)' &&
            selectedTab === 'Wi-Fi'
          "
          :placeholderText="'Password'"
          :defaultErrorText="'Password is required'"
          :formField="'password'"
          :hidden="true"
          :formPlace="['network', 'wifi']"
          :inputName="'Password'"
          :defaultName="
            activeNetwork.network.wifi.Authentification ===
            'Basic (WPA2 Personal)'
              ? activeNetwork.network.wifi.password
              : ''
          "
          @getData="getData"
          ref="validation4"
        />
        <SearchSelect
          v-show="
            form.network.wifi.Authentification ===
              'Enterprise (WPA2 Enterprise)' && selectedTab === 'Wi-Fi'
          "
          :required="
            form.network.wifi.Authentification ===
              'Enterprise (WPA2 Enterprise)' && selectedTab === 'Wi-Fi'
          "
          :optionsCount="security"
          :search="false"
          :defaultText="'Security'"
          :default-value="{ name: 'TLS' }"
          :defaultErrorText="'Security is required'"
          :formField="'mode'"
          :form-place="['network', 'wifi', 'enterprise']"
          @getData="getData"
          ref="validation5"
        />
        <template ref="TLS">
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'CA Certificates'"
            :defaultErrorText="'CA certificates is required'"
            :file="true"
            :form-field="'ca_cert'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'ca certificates'"
            @getData="getData"
            ref="validation6"
          />
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'User Idenity'"
            :defaultErrorText="'User idenity is required'"
            :formField="'identity'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'user identity'"
            @getData="getData"
            ref="validation7"
          />
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'User Private Key'"
            :defaultErrorText="'User private key is required'"
            :file="true"
            :formField="'private_key'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'private key'"
            @getData="getData"
            ref="validation8"
          />
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'User Private Key Password'"
            :defaultErrorText="'User private key password is required'"
            :formField="'private_key_password'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'private key password'"
            @getData="getData"
            ref="validation9"
          />
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'TLS' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'User Certificate'"
            :defaultErrorText="'User certificate is required'"
            :file="true"
            :formField="'client_cert'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'client certificate'"
            @getData="getData"
            ref="validation10"
          />
        </template>
        <template ref="PEAP">
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'PEAP' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'PEAP' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'CA Certificates'"
            :defaultErrorText="'CA certificates is required'"
            :file="true"
            :form-field="'ca_cert'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'ca certificates'"
            @getData="getData"
            ref="validation11"
          />
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'PEAP' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'PEAP' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'User Idenity'"
            :defaultErrorText="'User idenity is required'"
            :formField="'identity'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'user identity'"
            @getData="getData"
            ref="validation12"
          />
          <CustomInput
            v-show="
              form.network.wifi.enterprise.mode == 'PEAP' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :required="
              form.network.wifi.enterprise.mode == 'PEAP' &&
              form.network.wifi.Authentification ==
                'Enterprise (WPA2 Enterprise)' &&
              selectedTab === 'Wi-Fi'
            "
            :placeholderText="'User Password'"
            :defaultErrorText="'User password is required'"
            :hidden="true"
            :formField="'password'"
            :formPlace="['network', 'wifi', 'enterprise']"
            :input-name="'user password'"
            @getData="getData"
            ref="validation13"
          />
        </template>
      </template>
      <SearchSelect
        :optionsCount="timezone"
        :search="true"
        :defaultValue="{ name: guestedTimezone, value: guestedTimezone }"
        :defaultText="'Time zone'"
        :form-field="'timezone'"
        :defaultErrorText="'Time zone is required'"
        @getData="getData"
        ref="validation14"
      />
      <div class="toggle-wrapper">
        <p class="toggle-text">Hidden network</p>
        <toggle-button
          v-model="form.network.wifi.hidden"
          :color="{
            checked: 'rgba(0, 113, 226, 1)',
            unchecked: 'rgba(134, 134, 139, 0.5)',
          }"
          :value="true"
          :margin="8"
          :width="56"
          :height="32"
          :font-size="12"
          @change="getToggleData"
        />
      </div>
      <AdvancedSettings
        ref="advancedSettings"
        @sendAdvancedForm="getAdvancedForm"
      />
      <button type="button" class="main-btn" @click="saveSettings">Save</button>
    </form>
  </div>
</template>

<script>
import CustomInput from '@/components/form/CustomInput.vue'
import CustomInputWifi from '@/components/form/playerInputs/CustomInputWifi.vue'
import CustomTabs from '@/components/form/CustomTabs.vue'
import SearchSelect from '@/components/form/SearchSelect.vue'
import AdvancedSettings from '@/components/settings/network/AdvancedSettings.vue'
import moment from 'moment-timezone'

import availableNetworks from '@/assets/availableNetworks.json'

export default {
  name: 'Network',
  components: {
    CustomInput,
    CustomTabs,
    SearchSelect,
    CustomInputWifi,
    AdvancedSettings,
  },
  data() {
    return {
      form: {
        version: '1.0.0',
        network: {
          wifi: {
            ssid: '',
            hidden: false,
            password: '',
            Authentification: '',
            Frequency: '',
            Network: '',
            enterprise: {
              mode: '',
              identity: '',
              private_key_password: '',
              ca_cert: '',
              private_key: '',
              client_cert: '',
            },
            dns: [],
            ipv4: {
              method: '',
              gateway: '',
              address: '',
            },
          },
          ethernet: {
            dns: [],
            ipv4: {
              method: '',
              gateway: '',
              address: '',
            },
          },
        },
        proxy: {
          server: {
            address: '',
            port: Number,
          },
        },
        ntp: [],
        trust_certificates: [],
      },
      networkFrequencies: [
        {
          name: '2.4gHz',
        },
        {
          name: '5gHz',
        },
      ],
      selectedTab: 'Wi-Fi',
      customTabs: ['Wi-Fi', 'Ethernet'],
      authentificationMethods: [
        {
          name: 'None',
        },
        {
          name: 'Basic (WPA2 Personal)',
        },
        {
          name: 'Enterprise (WPA2 Enterprise)',
        },
      ],
      security: [
        {
          name: 'TLS',
        },
        {
          name: 'PEAP',
        },
      ],

      timezone: [],
      guestedTimezone: '',
      creatingNewNetwork: false,
      readyJSON: {},
    }
  },
  props: {
    settings: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeNetwork() {
      return this.$store.getters.activeNetwork
    },
  },
  watch: {
    settings() {
      if (this.settings) {
        this.$refs.validation1.activateTabs()
      }
    },
    form: {
      handler() {
        this.sendFormData()
      },
      deep: true,
    },
    activeNetwork: {
      handler() {
        this.onActiveNetworkChanged()
      },
    },

    creatingNewNetwork: {
      handler() {
        console.log('creatingNewNetwork', this.creatingNewNetwork)
      },
    },
  },

  methods: {
    checkAllValidations() {
      this.validationCount = 0
      const validations = [
        this.$refs.validation1,
        this.$refs.validation01,
        this.$refs.validation2,
        this.$refs.validation3,
        this.$refs.validation4,
        this.$refs.validation5,
        this.$refs.validation6,
        this.$refs.validation7,
        this.$refs.validation8,
        this.$refs.validation9,
        this.$refs.validation10,
        this.$refs.validation11,
        this.$refs.validation12,
        this.$refs.validation13,
        this.$refs.validation14,
      ]
      let visibleValidations = 0
      validations.forEach((item) => {
        if (item && item.$el) {
          visibleValidations++
          item.checkValidation()
        } else {
          return
        }
        if (item.checkValidation()) {
          this.validationCount++
        }
      })
      if (this.$refs.advancedSettings.checkAllValidations()) {
        if (this.validationCount === visibleValidations) {
          return true
        }
      }
    },
    getData(formPlace, formField, selectedValue) {
      if (formPlace) {
        let formObj = this.form
        for (let i = 0; i < formPlace.length; i++) {
          formObj = formObj[formPlace[i]]
        }
        if (typeof selectedValue === 'boolean') {
          formObj[formField] = selectedValue
        } else {
          formObj[formField] = selectedValue.trim()
        }

        return
      }
      if (typeof selectedValue === 'boolean') {
        this.form[formField] = selectedValue
      } else {
        this.form[formField] = selectedValue.trim()
      }
    },
    getAdvancedForm(form, selectedTab) {
      if (selectedTab === '') {
        console.log('нет активной вкладки')
        return
      }
      if (
        selectedTab &&
        selectedTab.trim() == 'IP Address' &&
        this.selectedTab == 'Ethernet'
      ) {
        this.form.network.ethernet.ipv4 = {
          ...form.ipv4,
        }
      }
      if (
        selectedTab &&
        selectedTab.trim() == 'IP Address' &&
        this.selectedTab == 'Wi-Fi'
      ) {
        this.form.network.wifi.ipv4 = {
          ...form.ipv4,
        }
      }
      if (
        selectedTab &&
        selectedTab.trim() == 'DNS' &&
        this.selectedTab == 'Wi-Fi'
      ) {
        this.form.network.wifi.dns = [...form.dns]
      }
      if (
        selectedTab &&
        selectedTab.trim() == 'DNS' &&
        this.selectedTab == 'Ethernet'
      ) {
        this.form.network.ethernet.dns = [...form.dns]
      }
      if (selectedTab && selectedTab.trim() == 'Proxy') {
        this.form.proxy = {
          ...form.proxy,
        }
      }
      if (selectedTab && selectedTab.trim() == 'NTP') {
        this.form.ntp = [...form.ntp]
      }
      if (selectedTab && selectedTab.trim() == 'Trusted Site’s Certificates') {
        this.form.trust_certificates = [...form.trust_certificates]
      }
    },
    cleanForm() {
      const cleanedForm = JSON.parse(
        JSON.stringify(this.form, (key, value) =>
          value == null ||
          value === '' ||
          (Array.isArray(value) &&
            value.filter((item) => item !== null).length === 0) ||
          (typeof value === 'object' &&
            value !== null &&
            Object.keys(value).length === 0)
            ? undefined
            : value
        ),
        (key, value) => {
          if (
            value === null ||
            value === '' ||
            key === 'Authentification' ||
            value === 'Option' ||
            (typeof value === 'object' && Object.keys(value).length === 0)
          ) {
            return undefined
          } else if (key === 'mode') {
            return value.toLowerCase()
          } else if (this.selectedTab !== 'Wi-Fi' && key.startsWith('wifi')) {
            return undefined
          } else if (
            this.form.network.wifi.Authentification !==
              'Enterprise (WPA2 Enterprise)' &&
            key === 'enterprise'
          ) {
            return undefined
          } else if (
            this.form.network.wifi.Authentification !==
              'Basic (WPA2 Personal)' &&
            key === 'password'
          ) {
            if (
              this.form.network.wifi.Authentification ===
                'Enterprise (WPA2 Enterprise)' &&
              this.form.network.wifi.enterprise.mode === 'PEAP'
            ) {
              return value
            }
            return undefined
          } else if (
            this.form.network.wifi.enterprise.mode !== 'TLS' &&
            (key === 'private_key' ||
              key === 'private_key_password' ||
              key === 'client_cert')
          ) {
            return undefined
          } else if (this.selectedTab === 'Ethernet' && key === 'hidden') {
            return undefined
          } else {
            if (Array.isArray(value)) {
              return value.filter((item) => item !== null)
            } else if (typeof value === 'string' && value.includes('(')) {
              return value.replace(/ *\([^)]*\) */g, '').toLowerCase()
            } else {
              return value
            }
          }
        }
      )
      return cleanedForm
    },
    getToggleData(data) {
      this.form.network.wifi.hidden = data.value
    },
    getDataTabs(tab) {
      if (tab) {
        this.selectedTab = tab.textContent.trim()
      }
    },
    sendFormData() {
      this.$emit('sendFormData', this.form)
    },
    loadActiveNetwork() {
      const activeNetwork = this.activeNetwork
      if (activeNetwork) {
        this.form = JSON.parse(JSON.stringify(activeNetwork))

        // Убедитесь, что все вложенные объекты инициализированы
        if (!this.form.network.wifi.enterprise) {
          this.form.network.wifi.enterprise = {
            mode: '',
            identity: '',
            private_key_password: '',
            ca_cert: '',
            private_key: '',
            client_cert: '',
          }
        }
      }
    },

    saveSettings() {
      if (this.creatingNewNetwork) {
        console.log('Creating new network')

        if (this.checkAllValidations()) {
          const newNetwork = JSON.parse(JSON.stringify(this.form)) // Копируем данные формы
          newNetwork.id = Date.now() // Генерируем уникальный ID для новой сети

          const availableNetworks =
            this.$store.getters.availableNetworks.slice()
          availableNetworks.push(newNetwork)

          this.$store.commit('setAvailableNetworks', availableNetworks) // Сохраняем новую сеть
          this.$store.commit('setActiveNetwork', newNetwork) // Устанавливаем новую сеть активной

          console.log(
            'New network created:',
            this.$store.getters.availableNetworks
          )
          console.log('Active network:', this.$store.getters.activeNetwork)

          this.creatingNewNetwork = false // Сбрасываем флаг создания новой сети
        }
      } else {
        console.log('Editing existing network')

        if (this.checkAllValidations()) {
          const editedNetwork = JSON.parse(JSON.stringify(this.form)) // Копируем данные формы

          const availableNetworks =
            this.$store.getters.availableNetworks.slice()
          const existingNetworkIndex = availableNetworks.findIndex(
            (network) => network.id === this.$store.getters.activeNetwork.id
          )

          if (existingNetworkIndex !== -1) {
            availableNetworks[existingNetworkIndex] = editedNetwork

            this.$store.commit('setAvailableNetworks', availableNetworks) // Обновляем список сетей
            this.$store.commit('setActiveNetwork', editedNetwork) // Устанавливаем обновленную сеть активной

            console.log(
              'Network updated:',
              this.$store.getters.availableNetworks
            )
            console.log('Active network:', this.$store.getters.activeNetwork)
          } else {
            console.error('Active network not found in available networks.')
          }
        }
      }

      if (this.checkAllValidations()) {
        this.$emit('saveSettings', this.form) // Сохраняем настройки
      }
    },

    // Вызовите этот метод при выборе активной сети
    onActiveNetworkChanged() {
      this.loadActiveNetwork()
    },

    // Вызовите этот метод при создании новой сети
    createNewNetwork() {
      console.log('createNewNetwork')
      this.clearNetwork()
      this.creatingNewNetwork = true
      this.$refs.validation01._data.active = true
      this.resetForm()
    },

    resetForm() {
      this.form = {
        version: '1.0.0',
        network: {
          wifi: {
            ssid: '',
            hidden: false,
            password: '',
            Authentification: '',
            Frequency: '',
            Network: '',
            enterprise: {
              mode: '',
              identity: '',
              private_key_password: '',
              ca_cert: '',
              private_key: '',
              client_cert: '',
            },
            dns: [],
            ipv4: {
              method: '',
              gateway: '',
              address: '',
            },
          },
          ethernet: {
            dns: [],
            ipv4: {
              method: '',
              gateway: '',
              address: '',
            },
          },
        },
        proxy: {
          server: {
            address: '',
            port: null,
          },
        },
        ntp: [],
        trust_certificates: [],
      }
    },
    clearNetwork() {
      const fields = [
        this.$refs.validation01,
        this.$refs.validation2,
        this.$refs.validation3,
        this.$refs.validation4,
        this.$refs.validation5,
        this.$refs.validation6,
        this.$refs.validation7,
        this.$refs.validation8,
        this.$refs.validation9,
        this.$refs.validation10,
        this.$refs.validation11,
        this.$refs.validation12,
        this.$refs.validation13,
      ]
      fields.forEach((field) => {
        field.clearField()
      })
    },
  },
  mounted() {
    this.guestedTimezone = moment.tz.guess()
    this.timezone = moment.tz.names().map((name) => ({ name }))
    setTimeout(() => {
      this.loadActiveNetwork() // Загружаем активную сеть при инициализации
      this.sendFormData()
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}

.toggle-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: rem(17px);

  .toggle-text {
    font-size: rem(24px);
    line-height: rem(29px);
    font-weight: 700;
    color: #14121f;
  }
}

.search-select_mb {
  margin-bottom: rem(17px);
}

.error-message {
  color: #d42b2b;
  font-size: rem(13px);
  line-height: rem(16px);
  margin-top: rem(5px);
  position: relative;
  margin-left: rem(18px);
  display: flex;
  align-items: center;
  flex-direction: row;
  &::before {
    position: absolute;
    content: url('@/assets/img/warning.svg');
    font-size: rem(15px);
    line-height: rem(18px);
    font-weight: 500;
    position: absolute;
    width: 100%;
    height: 100%;
    left: rem(-18px);
    color: #d42b2b;
    align-items: center;
    flex-direction: row;
  }
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // max-width: rem(735px);
  width: 100%;
  .main-wrapper__form {
    // background: rgba(255, 255, 255, 1);
    // border-radius: rem(30px);
    display: flex;
    // padding: rem(60px);
    flex-direction: column;
    justify-content: center;
    // max-width: rem(735px);
    gap: rem(17px);
    width: 100%;
    .main-btn {
      font-size: rem(19px);
      line-height: rem(23px);
      font-weight: 700;
      color: rgba(255, 255, 255, 1);
      background: rgba(0, 113, 226, 1);
      border-radius: rem(999px);
      padding: rem(14px) rem(17px) rem(15px) rem(17px);
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
    .preview-btn {
      color: rgba(134, 134, 139, 1);
      font-size: rem(19px);
      line-height: rem(29px);
      font-weight: 500;
      display: flex;
      flex-direction: row;
      gap: rem(12px);
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.8;
      }
      &::after {
        content: url(@/assets/img/diagonal-arrow.svg);
      }
    }
  }
}

@media (max-width: 768px) {
  .main-wrapper {
    .main-wrapper__form {
      padding: rem(20px);
      .main-btn {
        font-size: rem(19px);
        line-height: rem(23px);
      }
    }
  }
}
</style>
