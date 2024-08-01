<template>
  <div class="settings-wrapper">
    <div class="online-switch">Online</div>
    <div class="chanel-wrapper">
      <div class="chanel-main">
        <div class="chanel-status">Now playing</div>
        <div class="chanel-title">
          Demo channel
          <!-- <img src="@/assets/img/chanel-more.svg" alt="" /> -->
        </div>
        <div class="chanel-id">
          ID {{ playerId }}
          <img
            src="@/assets/img/copy.svg"
            alt="copy"
            @click="copyId"
            v-show="!idCopied"
            ref="copy"
          />
          <img
            src="@/assets/img/check.svg"
            alt="copy"
            @click="copyId"
            v-show="idCopied"
            ref="copied"
          />
        </div>
        <ul class="chanel-tags">
          <li
            class="chanel-tag"
            v-for="tag in playerSettings.tags"
            @click="openSettings"
          >
            {{ tag.name }}
          </li>
        </ul>
      </div>
      <div class="settings-btn" @click="toggleSettings">
        <div class="settings-btn__svg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.249 12.5701V11.4226L21.689 10.1626C21.9544 9.9286 22.1286 9.60833 22.1808 9.25836C22.2329 8.90839 22.1597 8.55125 21.974 8.25006L20.204 5.25006C20.0724 5.02226 19.8833 4.83305 19.6556 4.70141C19.4279 4.56977 19.1695 4.50033 18.9065 4.50006C18.7435 4.49881 18.5813 4.52414 18.4265 4.57506L16.604 5.19006C16.2897 4.98028 15.9615 4.79234 15.6215 4.62756L15.239 2.73756C15.1704 2.39226 14.9825 2.08209 14.7083 1.86134C14.4341 1.64058 14.0909 1.52332 13.739 1.53006H10.229C9.87699 1.52332 9.53386 1.64058 9.25963 1.86134C8.9854 2.08209 8.79755 2.39226 8.72897 2.73756L8.34647 4.62756C8.00444 4.79305 7.67372 4.98096 7.35647 5.19006L5.57147 4.54506C5.41494 4.50428 5.25285 4.48908 5.09147 4.50006C4.82842 4.50033 4.57008 4.56977 4.34234 4.70141C4.11461 4.83305 3.92549 5.02226 3.79397 5.25006L2.02397 8.25006C1.84891 8.5508 1.78386 8.90305 1.83996 9.24648C1.89605 9.58991 2.06981 9.90316 2.33147 10.1326L3.74897 11.4301V12.5776L2.33147 13.8376C2.06242 14.0686 1.88391 14.3874 1.82762 14.7375C1.77133 15.0876 1.84089 15.4464 2.02397 15.7501L3.79397 18.7501C3.92549 18.9779 4.11461 19.1671 4.34234 19.2987C4.57008 19.4304 4.82842 19.4998 5.09147 19.5001C5.25448 19.5013 5.41661 19.476 5.57147 19.4251L7.39397 18.8101C7.7082 19.0198 8.03648 19.2078 8.37647 19.3726L8.75897 21.2626C8.82755 21.6079 9.0154 21.918 9.28963 22.1388C9.56386 22.3595 9.90699 22.4768 10.259 22.4701H13.799C14.1509 22.4768 14.4941 22.3595 14.7683 22.1388C15.0425 21.918 15.2304 21.6079 15.299 21.2626L15.6815 19.3726C16.0235 19.2071 16.3542 19.0192 16.6715 18.8101L18.4865 19.4251C18.6413 19.476 18.8035 19.5013 18.9665 19.5001C19.2295 19.4998 19.4879 19.4304 19.7156 19.2987C19.9433 19.1671 20.1324 18.9779 20.264 18.7501L21.974 15.7501C22.149 15.4493 22.2141 15.0971 22.158 14.7536C22.1019 14.4102 21.9281 14.097 21.6665 13.8676L20.249 12.5701ZM18.9065 18.0001L16.334 17.1301C15.7314 17.6396 15.0432 18.0383 14.3015 18.3076L13.769 21.0001H10.229L9.69647 18.3376C8.96053 18.0607 8.27608 17.6627 7.67147 17.1601L5.09147 18.0001L3.32147 15.0001L5.36147 13.2001C5.22279 12.4237 5.22279 11.6289 5.36147 10.8526L3.32147 9.00006L5.09147 6.00006L7.66397 6.87006C8.26654 6.3605 8.95469 5.96183 9.69647 5.69256L10.229 3.00006H13.769L14.3015 5.66256C15.0374 5.93939 15.7219 6.33738 16.3265 6.84006L18.9065 6.00006L20.6765 9.00006L18.6365 10.8001C18.7751 11.5764 18.7751 12.3712 18.6365 13.1476L20.6765 15.0001L18.9065 18.0001Z"
              fill="#86868B"
              fill-opacity="1"
            />
            <path
              d="M12 16.5C11.11 16.5 10.24 16.2361 9.49994 15.7416C8.75991 15.2471 8.18314 14.5443 7.84254 13.7221C7.50195 12.8998 7.41283 11.995 7.58647 11.1221C7.7601 10.2492 8.18868 9.44736 8.81802 8.81802C9.44736 8.18868 10.2492 7.7601 11.1221 7.58647C11.995 7.41283 12.8998 7.50195 13.7221 7.84254C14.5443 8.18314 15.2471 8.75991 15.7416 9.49994C16.2361 10.24 16.5 11.11 16.5 12C16.506 12.5926 16.3937 13.1805 16.1697 13.7292C15.9457 14.2779 15.6145 14.7763 15.1954 15.1954C14.7763 15.6145 14.2779 15.9457 13.7292 16.1697C13.1805 16.3937 12.5926 16.506 12 16.5ZM12 9C11.6035 8.99077 11.2093 9.06205 10.8411 9.20954C10.473 9.35704 10.1386 9.57768 9.85812 9.85812C9.57768 10.1386 9.35704 10.473 9.20954 10.8411C9.06205 11.2093 8.99077 11.6035 9 12C8.99077 12.3965 9.06205 12.7907 9.20954 13.1589C9.35704 13.527 9.57768 13.8615 9.85812 14.1419C10.1386 14.4223 10.473 14.643 10.8411 14.7905C11.2093 14.938 11.6035 15.0092 12 15C12.3965 15.0092 12.7907 14.938 13.1589 14.7905C13.527 14.643 13.8615 14.4223 14.1419 14.1419C14.4223 13.8615 14.643 13.527 14.7905 13.1589C14.938 12.7907 15.0092 12.3965 15 12C15.0092 11.6035 14.938 11.2093 14.7905 10.8411C14.643 10.473 14.4223 10.1386 14.1419 9.85812C13.8615 9.57768 13.527 9.35704 13.1589 9.20954C12.7907 9.06205 12.3965 8.99077 12 9Z"
              fill="#86868B"
              fill-opacity="1"
            />
          </svg>
        </div>
      </div>
    </div>
    <ul class="chanel-info">
      <li class="chanel-info-item">
        <div class="chanel-info-item__name">Type</div>
        <div class="chanel-info-item__value">Web Player</div>
      </li>
      <li class="chanel-info-item">
        <div class="chanel-info-item__name">Resolution</div>
        <div class="chanel-info-item__value">1920x929px</div>
      </li>
      <li class="chanel-info-item">
        <div class="chanel-info-item__name">OS</div>
        <div class="chanel-info-item__value">N/A</div>
      </li>
      <li class="chanel-info-item">
        <div class="chanel-info-item__name">Space</div>
        <div class="chanel-info-item__value">Kekshi</div>
      </li>
      <li class="chanel-info-item">
        <div class="chanel-info-item__name">App ver.</div>
        <div class="chanel-info-item__value">1.12.08</div>
      </li>
    </ul>
    <div class="chanel-info-wrapper">
      <div class="chanel-info-row">
        <div class="chanel-info-row-item">
          <div class="chanel-info-title">Created by</div>
          <div class="chanel-info-value">Kekshi</div>
        </div>
        <div class="chanel-info-row-item">
          <div class="chanel-info-title">Created at</div>
          <div class="chanel-info-value">{{ startTime }}</div>
        </div>
      </div>
      <div class="chanel-info-row">
        <div class="chanel-info-row-item">
          <div class="chanel-info-title-wrapper">
            <div class="chanel-info-title">Auto wake up time</div>
            <div class="chanel-info-title">{{ playerSettings.wakeUpTime }}</div>
          </div>
          <div class="chanel-info-value">
            {{ playerSettings.formattedDays }}
          </div>
        </div>
        <div class="chanel-info-row-item">
          <div class="chanel-info-title">Memory used / total</div>
          <div class="chanel-info-value">12gb <span>/</span> 16gb</div>
        </div>
      </div>
      <div class="chanel-info-row">
        <div class="chanel-info-row-item">
          <div class="chanel-info-title-wrapper">
            <div class="chanel-info-title">Work time</div>
            <div class="chanel-info-title">
              {{ startTime }}
              <img src="@/assets/img/info.svg" alt="info" />
            </div>
          </div>
          <div class="chanel-info-value">{{ deviceUpTime }}</div>
        </div>
      </div>
      <div class="chanel-info-row chanel-info-row_graph">
        <div class="chanel-info-row-item chanel-info-row-item_graph">
          <div class="chanel-info-title">
            <SearchSelect
              :optionsCount="CPUoptions"
              :defaultText="'CPU_Temperature'"
              :defaultValue="{ name: 'CPU Temperature' }"
              :compact="true"
              :search="false"
              :formField="'cpuChart'"
              @getData="getData"
            />
          </div>
          <div class="chanel-info-value-wrapper">
            <div class="graph-wrapper">
              <LineChartTemperature v-if="cpuChart === 'CPU Temperature'" />
              <LineChartPercents v-if="cpuChart === 'CPU Usage'" />

              <!-- <div class="time">8:18pm</div> -->
            </div>
            <!-- 125°F -->
          </div>
        </div>
        <div class="chanel-info-row-item chanel-info-row-item_graph">
          <div class="chanel-info-title">
            <SearchSelect
              :optionsCount="GPUoptions"
              :defaultText="'GPU_Temperature'"
              :defaultValue="{ name: 'GPU Temperature' }"
              :compact="true"
              :search="false"
              :formField="'gpuChart'"
              @getData="getData"
            />
          </div>
          <div class="chanel-info-value-wrapper">
            <div class="graph-wrapper">
              <LineChartTemperature v-if="gpuChart === 'GPU Temperature'" />
              <LineChartPercents v-if="gpuChart === 'GPU Usage'" />
              <!-- <div class="time">8:20pm</div> -->
            </div>
            <!-- 135°F -->
          </div>
        </div>
      </div>
      <div class="chanel-info-row">
        <div class="chanel-info-row-item">
          <div class="chanel-info-title-wrapper">
            <div class="chanel-info-title">Location</div>
            <div class="chanel-info-title">
              {{ playerSettings.locationTime }}
            </div>
          </div>
          <div class="chanel-info-value chanel-info-value__location">
            {{ playerSettings.location }}
          </div>
        </div>
      </div>
    </div>
    <NetworkSettings :formSettings="formSettings" />
  </div>
</template>

<script>
import NetworkSettings from '@/components/main/settings/NetworkSettings.vue'
import SearchSelect from '@/components/form/SearchSelect.vue'
import LineChartTemperature from '@/components/charts/lineChartTemperature.vue'
import LineChartPercents from '@/components/charts/lineChartPercents.vue'
import moment from 'moment'

export default {
  name: 'SettingsView',
  components: {
    NetworkSettings,
    LineChartTemperature,
    LineChartPercents,
    SearchSelect,
  },
  data() {
    return {
      startTime: 'Jul 14, 2024, 9:20pm',
      idCopied: false,
      CPUoptions: [
        {
          name: 'CPU Temperature',
        },
        {
          name: 'CPU Usage',
        },
      ],
      GPUoptions: [
        {
          name: 'GPU Temperature',
        },
        {
          name: 'GPU Usage',
        },
      ],
      cpuChart: '',
      gpuChart: '',
    }
  },
  computed: {
    deviceUpTime() {
      const currentTime = moment()
      const startTime = moment(this.startTime, 'MMM DD, YYYY, h:mma')
      const duration = moment.duration(currentTime.diff(startTime))
      const days = duration.days()
      const hours = duration.hours()
      const minutes = duration.minutes()
      return `${days}d ${hours}h ${minutes}min`
    },
  },

  props: {
    playerSettings: {
      type: Object,
      required: true,
    },
    formSettings: {
      type: Object,
      required: true,
    },
    playerId: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleSettings() {
      this.$emit('toggleSettings')
    },
    openSettings() {
      this.$emit('toggleSettings')
    },
    copyId() {
      navigator.clipboard.writeText(this.playerId)
      this.$refs.copy.style.transition = 'opacity 0.2s ease-in-out'
      this.$refs.copied.style.transition = 'opacity 0.2s ease-in-out'
      setTimeout(() => {
        this.$refs.copied.style.opacity = '1'
        this.idCopied = true
      }, 200)
      this.$refs.copy.style.opacity = '0'
      setTimeout(() => {
        this.$refs.copied.style.opacity = '0'
      }, 2000)
      setTimeout(() => {
        this.idCopied = false
      }, 2200)
      setTimeout(() => {
        this.$refs.copy.style.opacity = '1'
      }, 2400)
      setTimeout(() => {
        this.$refs.copy.style.transition = 'none'
        this.$refs.copied.style.transition = 'none'
      }, 4000)
    },
    getData(place, field, value) {
      this[field] = value
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}

.settings-wrapper {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  border-radius: rem(31px);
  padding: rem(31px);
  height: 82vh;
  font-family: Satoshi Variable, sans-serif;
  width: rem(600px);
  overflow-y: scroll;
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
  .online-switch {
    margin-bottom: rem(34px);
    border-radius: rem(10px);
    background: rgba(18, 179, 71, 1);
    padding: 0 rem(10px);
    font-size: rem(12px);
    line-height: rem(23px);
    color: white;
    width: max-content;
  }
  .chanel-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(34px);
    .chanel-main {
      display: flex;
      flex-direction: column;
      .chanel-status {
        font-weight: 500;
        font-size: rem(17px);
        line-height: rem(21px);
        color: rgba(134, 134, 139, 1);
        letter-spacing: -0.02em;
      }
      .chanel-title {
        font-weight: 700;
        font-size: rem(40px);
        line-height: rem(48px);
        letter-spacing: -0.02em;
        color: rgba(20, 18, 31, 1);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: rem(17px);
        img {
          cursor: pointer;
        }
      }
      .chanel-id {
        font-weight: 500;
        font-size: rem(17px);
        line-height: rem(21px);
        letter-spacing: -0.02em;
        color: rgba(134, 134, 139, 1);
        margin-bottom: rem(8px);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: rem(8px);
        img {
          cursor: pointer;
        }
      }
      .chanel-tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: rem(8px);
        list-style: none;
        .chanel-tag {
          font-weight: 400;
          font-size: rem(11px);
          line-height: rem(20px);
          color: rgba(20, 18, 31, 1);
          padding: 0 rem(8px);
          background: rgba(245, 245, 248, 1);
          border-radius: rem(45px);
          transition: all 0.3s ease;
          cursor: pointer;
          &:hover {
            background: rgba(20, 18, 31, 1);
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .settings-btn {
      cursor: pointer;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(134, 134, 139, 0.5);
      border-radius: rem(13px);
      padding: rem(14px);
      padding-bottom: rem(9px);
      transition: all 0.3s ease;
      &:hover {
        border: 1px solid rgba(20, 18, 31, 1);
        background: rgba(20, 18, 31, 1);
        svg {
          path {
            fill: #fff;
          }
          fill: #fff;
        }
      }
      .settings-btn__svg {
        transition: all 0.3s ease;
      }
    }
  }
  .chanel-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: rem(31px);
    list-style: none;
    margin-bottom: rem(34px);
    .chanel-info-item {
      display: flex;
      flex-direction: column;
      .chanel-info-item__name {
        font-weight: 500;
        font-size: rem(14px);
        line-height: rem(21px);
        letter-spacing: -0.02em;
        color: rgba(134, 134, 139, 1);
      }
      .chanel-info-item__value {
        font-weight: 700;
        font-size: rem(17px);
        line-height: rem(21px);
        letter-spacing: -0.02em;
        color: rgba(20, 18, 31, 1);
      }
    }
  }
  .chanel-info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(17px);
    margin-bottom: rem(34px);
    .chanel-info-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: rem(17px);
      width: 100%;
      &_graph {
      }
      .chanel-info-row-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: rem(12px);
        padding: rem(12px) rem(16px);
        border: 1px solid rgba(134, 134, 139, 0.5);
        border-radius: rem(13px);
        height: 100%;
        justify-content: space-between;
        &_graph {
          height: auto;
          .chanel-info-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: rem(8px);
            cursor: pointer;
          }
          .chanel-info-value-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            font-size: rem(19px);
            line-height: rem(23px);
            color: rgba(20, 18, 31, 1);
            gap: rem(12px);

            .graph-wrapper {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              width: 99% !important;
              .time {
                font-size: rem(12px);
                line-height: rem(5px);
                color: rgba(20, 18, 31, 1);
                padding: rem(8px) rem(8px);
                background: rgba(245, 245, 248, 1);
                border-radius: rem(8px);
                position: relative;
                margin-bottom: rem(-8px);
              }
            }
          }
        }
        .chanel-info-title-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          .chanel-info-title {
            font-weight: 500;
            font-size: rem(14px);
            line-height: rem(21px);
            letter-spacing: -0.02em;
            color: rgba(134, 134, 139, 1);
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: rem(8px);
            img {
              cursor: pointer;
            }
          }
        }
        .chanel-info-title {
          font-weight: 500;
          font-size: rem(14px);
          line-height: rem(21px);
          letter-spacing: -0.02em;
          color: rgba(134, 134, 139, 1);
        }
        .chanel-info-value {
          font-weight: 700;
          font-size: rem(19px);
          line-height: rem(23px);
          letter-spacing: -0.02em;
          color: rgba(20, 18, 31, 1);
          span {
            color: rgba(134, 134, 139, 1);
            margin: 0 rem(10px);
          }
          &__location {
            padding-bottom: rem(14px);
          }
        }
      }
    }
  }
}

@media (max-width: 1550px) {
  //   .settings-wrapper .chanel-info-wrapper .chanel-info-row_graph {
  //     flex-wrap: wrap;
  //   }
  .settings-wrapper .chanel-wrapper .chanel-main .chanel-id {
    font-size: rem(14px);
  }
  .settings-wrapper {
    padding: rem(24px);
    width: rem(470px);
    .chanel-wrapper {
      .chanel-main {
        .chanel-status {
          font-weight: 500;
          font-size: rem(14px);
          line-height: rem(17px);
        }
        .chanel-title {
          font-size: rem(37px);
        }
        .chanel-id {
          font-weight: 500;
          font-size: rem(14px);
          line-height: rem(17px);
          gap: rem(6px);
        }
        .chanel-tags {
          gap: rem(6px);
        }
      }
      .settings-btn {
        cursor: pointer;
        padding: rem(11px);
        padding-bottom: rem(7px);
        img {
          transition: all 0.3s ease;
        }

        &:hover {
          border: 1px solid rgba(20, 18, 31, 1);
        }
      }
    }
    .chanel-info {
      gap: rem(31px);
      list-style: none;
      margin-bottom: rem(34px);
      .chanel-info-item {
        .chanel-info-item__name {
          font-size: rem(11px);
          line-height: rem(14px);
        }
        .chanel-info-item__value {
          font-size: rem(14px);
          line-height: rem(17px);
        }
      }
    }
    .chanel-info-wrapper {
      gap: rem(14px);
      .chanel-info-row {
        .chanel-info-row-item {
          &_graph {
            .chanel-info-title {
              gap: rem(8px);
              cursor: pointer;
            }
            .chanel-info-value-wrapper {
              font-size: rem(15px);
              line-height: rem(21px);
            }
          }
          .chanel-info-title-wrapper {
            .chanel-info-title {
              font-size: rem(11px);
              line-height: rem(17px);
            }
          }
          .chanel-info-title {
            font-size: rem(11px);
            line-height: rem(17px);
          }
          .chanel-info-value {
            font-size: rem(16px);
            line-height: rem(20px);
            &__location {
              padding-bottom: rem(14px);
            }
          }
        }
      }
    }
  }
}
</style>
