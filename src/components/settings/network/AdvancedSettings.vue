<template>
  <div class="advanced-wrapper">
    <div
      :class="['advanced-btn', active ? 'active' : '']"
      @click="showAdvanced"
      ref="advancedSettings"
    >
      Advanced
    </div>
    <div class="advanced-settings" v-show="active">
      <CustomTabs
        :tabs="CustomTabs"
        @getDataTabs="getDataTabs"
        :dataNeeded="true"
        ref="customTabsAdvanced"
      />
      <div
        class="advanced-settings__wrapper"
        v-show="selectedTab === 'IP Address'"
      >
        <SearchSelect
          :optionsCount="Options"
          :defaultText="'Option'"
          :defaultErrorText="'Option is required'"
          :form-field="'method'"
          :formPlace="['ipv4']"
          :defaultValue="
            activeNetwork &&
            activeNetwork.network.wifi &&
            activeNetwork.network.wifi.ipv4
              ? { name: activeNetwork.network.wifi.ipv4.method }
              : { name: 'Automatic DHCP' }
          "
          @getData="getData"
          ref="validation1"
        />
        <CustomInput
          v-if="form.ipv4.method === 'Manual (Static IP)'"
          :placeholderText="'IP Address (CIDR Format)'"
          :defaultErrorText="'IP address (CIDR format) is required'"
          :formPlace="['ipv4']"
          :input-name="'IP'"
          :form-field="'address'"
          :required="form.ipv4.method === 'Manual (Static IP)'"
          :defaultName="
            activeNetwork &&
            activeNetwork.network.wifi &&
            activeNetwork.network.wifi.ipv4
              ? activeNetwork.network.wifi.ipv4.address
              : ''
          "
          @getData="getData"
          ref="validation2"
        />
        <CustomInput
          v-if="form.ipv4.method === 'Manual (Static IP)'"
          :placeholderText="'Gateway'"
          :defaultErrorText="'Gateway is required'"
          :required="form.ipv4.address !== ''"
          :formPlace="['ipv4']"
          :form-field="'gateway'"
          :input-name="'gateway'"
          :defaultName="
            activeNetwork &&
            activeNetwork.network.wifi &&
            activeNetwork.network.wifi.ipv4
              ? activeNetwork.network.wifi.ipv4.gateway
              : ''
          "
          @getData="getData"
          ref="validation3"
        />
      </div>
      <div class="advanced-settings__wrapper" v-show="selectedTab === 'DNS'">
        <CustomInput
          v-for="(adress, index) in activeNetwork &&
          activeNetwork.network.wifi &&
          activeNetwork.network.wifi.dns &&
          activeNetwork.network.wifi.dns.length > 0
            ? activeNetwork.network.wifi.dns
            : serverIPAdressAmount"
          :key="index"
          :placeholderText="'Server IP Address'"
          :defaultErrorText="'Server IP address is required'"
          :formPlace="['dns']"
          :ipAddress="true"
          :form-field="`${index}`"
          :input-name="'DNS'"
          :defaultName="
            activeNetwork &&
            activeNetwork.network.wifi &&
            activeNetwork.network.wifi.dns
              ? activeNetwork.network.wifi.dns[index]
              : ''
          "
          @getData="getData"
          deletable
          ref="validation4"
        />
        <div
          class="dns-btn"
          @click="
            serverIPAdressAmount++ && activeNetwork.network.wifi.dns.push('')
          "
        >
          Add more
          <img :src="require('@/assets/img/add.svg')" alt="add more" />
        </div>
      </div>
      <div class="advanced-settings__wrapper" v-show="selectedTab === 'Proxy'">
        <div class="proxy-wrapper">
          <CustomInput
            :placeholderText="'Host'"
            :defaultErrorText="'Host is required'"
            :formPlace="['proxy', 'server']"
            :formField="'address'"
            :required="
              form.proxy.server.port !== '' &&
              activeNetwork &&
              activeNetwork.proxy &&
              activeNetwork.proxy.port
            "
            :input-name="'host'"
            :defaultName="
              activeNetwork && activeNetwork.proxy && activeNetwork.proxy.server
                ? activeNetwork.proxy.server.address
                : ''
            "
            @getData="getData"
            ref="validation5"
          />
          <CustomInput
            :placeholderText="'Port'"
            :defaultErrorText="'Port is required'"
            :formPlace="['proxy', 'server']"
            :formField="'port'"
            :input-name="'port'"
            :required="
              form.proxy.server.address !== '' &&
              activeNetwork &&
              activeNetwork.proxy &&
              activeNetwork.proxy.address
            "
            :defaultName="
              activeNetwork && activeNetwork.proxy && activeNetwork.proxy.server
                ? activeNetwork.proxy.server.port
                : ''
            "
            @getData="getData"
            ref="validation6"
          />
        </div>
      </div>
      <div class="advanced-settings__wrapper" v-show="selectedTab === 'NTP'">
        <CustomInput
          v-for="(adress, index) in activeNetwork &&
          activeNetwork.ntp &&
          activeNetwork.ntp.length > 0
            ? activeNetwork.ntp
            : NTPAmount"
          :key="index"
          :placeholderText="'NTP'"
          :defaultErrorText="'NTP is required'"
          :defaultName="
            activeNetwork && activeNetwork.ntp ? activeNetwork.ntp[index] : ''
          "
          :formPlace="['ntp']"
          :form-field="`${index}`"
          :input-name="'ntp'"
          @getData="getData"
          deletable
          ref="validation7"
        />
        <div class="dns-btn" @click="NTPAmount++ && activeNetwork.ntp.push('')">
          Add more
          <img :src="require('@/assets/img/add.svg')" alt="add more" />
        </div>
      </div>
      <div
        class="advanced-settings__wrapper"
        v-show="selectedTab === 'Trusted Site’s Certificates'"
      >
        <CustomInput
          v-for="(adress, index) in SitesCertificatesAmount"
          :key="index"
          :placeholderText="'Deploy trusted site’s certificates'"
          :defaultErrorText="'Trusted site’s certificates is required'"
          :file="true"
          :formPlace="['trust_certificates']"
          :formField="`${index}`"
          :input-name="'trusted site’s certificates'"
          @getData="getData"
          deletable
          ref="validation8"
        />
        <div class="dns-btn" @click="SitesCertificatesAmount++">
          Add more
          <img :src="require('@/assets/img/add.svg')" alt="add more" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomTabs from '@/components/form/CustomTabs.vue'
import SearchSelect from '@/components/form/SearchSelect.vue'
import CustomInput from '@/components/form/CustomInput.vue'
export default {
  name: 'AdvancedSettings',
  data() {
    return {
      active: false,
      CustomTabs: [
        'IP Address',
        'DNS',
        'Proxy',
        'NTP',
        'Trusted Site’s Certificates',
      ],
      Options: [{ name: 'Automatic DHCP' }, { name: 'Manual (Static IP)' }],
      selectedTab: 'IP Address',
      form: {
        ipv4: {
          method: '',
          gateway: '',
          address: '',
        },
        dns: [],
        proxy: {
          server: {
            address: '',
            port: '',
          },
        },
        ntp: [],
        trust_certificates: [],
      },
      serverIPAdressAmount: 1,
      NTPAmount: 1,
      SitesCertificatesAmount: 1,
    }
  },
  computed: {
    activeNetwork() {
      return this.$store.getters.activeNetwork
    },
  },

  components: { CustomTabs, SearchSelect, CustomInput },
  methods: {
    showAdvanced() {
      if (this.$refs.advancedSettings) {
        this.active = !this.active
      }
      this.$refs.customTabsAdvanced.activateTabs()
    },
    getDataTabs(tab) {
      if (tab) {
        this.selectedTab = tab.textContent.trim()
      }
    },
    getData(formPlace, formField, selectedValue) {
      if (formPlace) {
        let formObj = this.form
        for (let i = 0; i < formPlace.length; i++) {
          formObj = formObj[formPlace[i]]
        }
        if (selectedValue === null) {
          delete formObj[formField]
        } else {
          formObj[formField] = selectedValue.trim()
        }
        this.$emit('sendAdvancedForm', this.form, this.selectedTab)
        return
      }
      if (selectedValue === null) {
        delete this.form[formField]
      } else {
        this.form[formField] = selectedValue.trim()
      }
      this.$emit('sendAdvancedForm', this.form, this.selectedTab)
    },
    checkAllValidations() {
      this.validationCount = 0
      const validations = [
        this.$refs.validation1,
        this.$refs.validation2,
        this.$refs.validation3,
        this.$refs.validation4,
        this.$refs.validation5,
        this.$refs.validation6,
        this.$refs.validation7,
        this.$refs.validation8,
      ]
      let visibleValidations = 0
      validations.forEach((item) => {
        if (Array.isArray(item)) {
          item.forEach((validation) => {
            if (validation && validation.$el) {
              visibleValidations++
              validation.checkValidation()
            } else {
              return
            }
            if (validation.checkValidation()) {
              this.validationCount++
            }
          })
        } else if (item && item.$el) {
          visibleValidations++
          item.checkValidation()
          if (item.checkValidation()) {
            this.validationCount++
          }
        }
      })
      console.log(this.validationCount, visibleValidations)
      if (this.validationCount === visibleValidations) {
        return true
      }
    },
    clearNetwork() {
      const fields = [
        'validation1',
        'validation2',
        'validation3',
        'validation4',
        'validation5',
        'validation6',
        'validation7',
        'validation8',
      ].map((ref) => this.$refs[ref])

      fields.forEach((field) => {
        if (field && field.$el) field.clearField()
      })
    },
  },
  mounted() {
    this.selectedTab = 'IP Address'
    this.$emit('sendAdvancedForm', this.form, this.selectedTab)
    // setTimeout(() => {
    //   this.$refs.customTabsAdvanced.$refs.tabs[0].click()
    // })
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}
.advanced-settings__wrapper {
  display: flex;
  flex-direction: column;
  gap: rem(17px);
  margin-bottom: rem(17px);
}
.advanced-btn {
  margin: rem(17px) 0 rem(17px) 0;
  font-size: rem(28px);
  line-height: rem(33px);
  font-weight: 700;
  color: rgba(134, 134, 139, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: rem(17px);
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    color: rgba(20, 18, 31, 1);
    transition: all 0.3s ease;
    &::after {
      transition: all 0.3s ease;
      opacity: 1;
    }
  }
  &::after {
    content: url(@/assets/img/advanced-active.svg);
    position: relative;
    min-width: rem(17px);
    transition: all 0.3s ease;
    transform: rotateX(180deg);
    top: rem(5px);
    opacity: 0.4;
  }

  &.active {
    color: rgba(20, 18, 31, 1);
    margin-bottom: rem(34px);
    &::after {
      transform: rotateX(360deg);
      transition: all 0.3s ease;
      opacity: 1;
      top: rem(-2px);
    }
  }
}
.advanced-settings {
  display: flex;
  flex-direction: column;
  gap: rem(17px);
}
.dns-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: rem(10px);
  font-size: rem(19px);
  line-height: rem(23px);
  font-weight: 700;
  color: rgba(0, 113, 226, 1);
  margin-left: rem(17px);
  cursor: pointer;
  font-family: 'satoshi', sans-serif;
  img {
    width: rem(20px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.proxy-wrapper {
  display: flex;
  flex-direction: row;
  gap: rem(12px);
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-start;
  .input-wrapper {
    &:nth-child(1) {
      width: 80%;
    }
  }
}

@media (max-width: 768px) {
  .advanced-btn {
    font-size: rem(23px);
    gap: rem(10px);
    line-height: rem(26px);
  }
}
</style>
