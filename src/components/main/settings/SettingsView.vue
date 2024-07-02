<template>
  <div class="settings-wrapper">
    <div class="online-switch">Online</div>
    <div class="chanel-wrapper">
      <div class="chanel-main">
        <div class="chanel-status">Now playing</div>
        <div class="chanel-title">Demo channel</div>
        <div class="chanel-id">
          ID 9bd1a6f7-49d4-4534-8e0d-19cd43553a91
          <img src="@/assets/copy.svg" alt="copy" />
        </div>
        <ul class="chanel-tags">
          <li class="chanel-tag">Tag</li>
          <li class="chanel-tag">Tag</li>
          <li class="chanel-tag">Guten tag</li>
          <li class="chanel-tag">Abend</li>
        </ul>
      </div>
      <div class="settings-btn">
        <img src="@/assets/settings-btn.svg" alt="settings" />
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
          <div class="chanel-info-value">Jun 14, 2024, 9:20pm</div>
        </div>
      </div>
      <div class="chanel-info-row">
        <div class="chanel-info-row-item">
          <div class="chanel-info-title-wrapper">
            <div class="chanel-info-title">Auto wake up time</div>
            <div class="chanel-info-title">10:09am</div>
          </div>
          <div class="chanel-info-value">Monday - Friday</div>
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
              Jun 14, 2024, 9:20pm <img src="@/assets/info.svg" alt="info" />
            </div>
          </div>
          <div class="chanel-info-value">24d 24h 24min</div>
        </div>
      </div>
      <div class="chanel-info-row chanel-info-row_graph">
        <div class="chanel-info-row-item chanel-info-row-item_graph">
          <div class="chanel-info-title">
            CPU Temperature <img src="@/assets/graph-arrow.svg" alt="arrow" />
          </div>
          <div class="chanel-info-value-wrapper">
            <div class="graph-wrapper">
              <img src="@/assets/cpu.svg" alt="" />
              <div class="time">8:18pm</div>
            </div>
            125°F
          </div>
        </div>
        <div class="chanel-info-row-item chanel-info-row-item_graph">
          <div class="chanel-info-title">
            GPU Temperature <img src="@/assets/graph-arrow.svg" alt="arrow" />
          </div>
          <div class="chanel-info-value-wrapper">
            <div class="graph-wrapper">
              <img src="@/assets/gpu.svg" alt="" />
              <div class="time">8:20pm</div>
            </div>
            135°F
          </div>
        </div>
      </div>
      <div class="chanel-info-row">
        <div class="chanel-info-row-item">
          <div class="chanel-info-title-wrapper">
            <div class="chanel-info-title">Location</div>
            <div class="chanel-info-title">8:23pm</div>
          </div>
          <div class="chanel-info-value chanel-info-value__location">
            Germany, Frankfurt am Main
          </div>
        </div>
      </div>
    </div>
    <NetworkSettings />
  </div>
</template>

<script>
import NetworkSettings from '@/components/main/settings/NetworkSettings.vue'
export default {
  name: 'SettingsView',
  components: {
    NetworkSettings,
  },
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
  height: 100%;
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
      img {
        transition: all 0.3s ease;
      }

      &:hover {
        border: 1px solid rgba(20, 18, 31, 1);
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
              align-items: center;
              justify-content: center;
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
  .settings-wrapper .chanel-info-wrapper .chanel-info-row_graph {
    flex-wrap: wrap;
  }
  .settings-wrapper .chanel-wrapper .chanel-main .chanel-id {
    font-size: rem(14px);
  }
}
</style>
