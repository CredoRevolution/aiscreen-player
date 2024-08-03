<template>
  <div class="player-settings">
    <div class="player-settings__time">
      <CustomInput
        :placeholderText="'Auto wake up time'"
        :defaultErrorText="'10:09am is required'"
        :inputName="'time'"
        :info="true"
        :timePicker="true"
        :defaultNameTime="{ hh: '12', mm: '09', a: 'am' }"
        :formField="'wakeUpTime'"
        v-model="playerData.wakeUpTime"
        @getData="getData"
      />
      <ul class="player-settings__days-list">
        <li
          class="player-settings__days-item"
          v-for="day in [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ]"
          :key="day"
          @click="toggleActiveDay(day)"
          :class="{
            'player-settings__days-item--active':
              playerData.activeDays.includes(day),
          }"
        >
          {{ day }}
        </li>
      </ul>
    </div>

    <playerCustomInputLocationTime
      :placeholderText="'Location'"
      :defaultName="'Germany, Frankfurt am Mainnn'"
      :defaultNameTime="{ hh: '03', mm: '05', a: 'am' }"
      :formField="'location'"
      :placeholderTextTime="'8:23pm'"
      :defaultErrorText="'8:23pm is required'"
      :inputName="'place'"
      :time="true"
      @getLocation="getLocation"
      @getData="getData"
    />
    <tagsSearchSelect
      :optionsCount="tags"
      :tagsActive="playerData.tags"
      :search="true"
      :taggable="true"
      :multiple="true"
      :defaultText="'Select tags'"
      @updateActiveTags="updateActiveTags"
    />
    <button @click="transfer" class="player-settings__transfer">
      Transfer to another space
      <img src="@/assets/img/arrow-transfer.svg" alt="arrow" />
    </button>
  </div>
</template>

<script>
import CustomInput from '@/components/form/CustomInput.vue'
import playerCustomInputLocationTime from '@/components/form/playerInputs/playerCustomInputLocationTime.vue'
import tagsSearchSelect from '@/components/form/tagsSearchSelect.vue'
import VueTimepicker from 'vue2-timepicker'

// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  name: 'Player',
  components: {
    CustomInput,
    tagsSearchSelect,
    playerCustomInputLocationTime,
  },
  data() {
    return {
      playerData: {
        wakeUpTime: '10:08am',
        activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        location: 'Germany, Frankfurt am Main',
        locationTime: '8:23pm',
        tags: [
          {
            name: 'tag2',
            code: 'tag2',
          },
          {
            name: 'tag3',
            code: 'tag3',
          },
          {
            name: 'tag4',
            code: 'tag4',
          },
        ],
      },
    }
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    tagsActive: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formattedDays() {
      return this.formatDays(this.playerData.activeDays)
    },
  },
  watch: {
    playerData: {
      handler() {
        this.sendPlayerData()
      },
      deep: true,
    },
  },
  methods: {
    transfer() {
      // Transfer logic here
    },
    formatDays(days) {
      const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]

      function getDayIndex(day) {
        return weekDays.indexOf(day)
      }

      days.sort((a, b) => getDayIndex(a) - getDayIndex(b))

      let result = []
      let tempRange = []

      for (let i = 0; i < days.length; i++) {
        tempRange.push(days[i])

        if (
          i === days.length - 1 ||
          getDayIndex(days[i + 1]) !== getDayIndex(days[i]) + 1
        ) {
          if (tempRange.length > 1) {
            result.push(tempRange[0] + '-' + tempRange[tempRange.length - 1])
          } else {
            result.push(tempRange[0])
          }
          tempRange = []
        }
      }

      return result.join(', ')
    },
    updateActiveTags(tags) {
      this.playerData.tags = tags
    },
    toggleActiveDay(day) {
      if (!this.playerData.activeDays.includes(day)) {
        this.playerData.activeDays.push(day)
      } else {
        const index = this.playerData.activeDays.indexOf(day)
        this.playerData.activeDays.splice(index, 1)
      }
    },
    getData(something, field, name) {
      this.playerData[field] = name
    },
    getLocation(location, time) {
      this.playerData.location = location
      this.playerData.locationTime = time.hh + ':' + time.mm + `${time.a}`
    },
    sendPlayerData() {
      const playerDataWithFormattedDays = {
        ...this.playerData,
        formattedDays: this.formattedDays,
      }
      console.log('Player data sent:', playerDataWithFormattedDays)
      this.$emit('sendPlayerData', playerDataWithFormattedDays)
    },
  },
  mounted() {
    this.sendPlayerData()
  },
}
</script>

<style lang="scss" scoped>
@function rem($px) {
  @return ($px / 16px) + rem;
}
.player-settings {
  display: flex;
  flex-direction: column;
  gap: rem(17px);
  button {
    all: unset;
  }

  .player-settings__transfer {
    font-size: rem(19px);
    line-height: rem(23px);
    color: #0071e2;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: rem(13px);
    flex-direction: row;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      transition: all 0.2s ease;
      opacity: 0.7;
    }
  }
}
.player-settings__time {
  display: flex;
  flex-direction: column;
  gap: rem(8px);
  .player-settings__days-list {
    list-style: none;
    display: flex;
    gap: rem(13px);
    flex-direction: row;
    align-items: center;
    .player-settings__days-item {
      cursor: pointer;
      color: #14121f;
      transition: all 0.2s ease;
      padding: 0 rem(8px);
      border-radius: rem(45px);
      background-color: #f5f5f8;
      font-size: rem(11px);
      line-height: rem(20px);
      font-weight: 400;
      font-family: 'Poppins', sans-serif;

      &--active {
        background-color: #0071e2;
        color: #f5f5f8;
        font-family: 'Poppins', sans-serif;
      }
    }
  }
}
</style>
