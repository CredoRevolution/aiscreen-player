<template>
  <div class="player-settings">
    <div class="player-settings__time">
      <playerCustomInput
        :placeholderText="'10:09am'"
        :defaultErrorText="'10:09am is required'"
        :inputName="'time'"
        :info="true"
        v-model="playerData.wakeUpTime"
        @getTime="getTime"
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

    <playerCustomInput
      :placeholderText="'Germany, Frankfurt am Main'"
      :defaultErrorText="'10:09am is required'"
      :inputName="'place'"
      :time="true"
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
  </div>
</template>

<script>
import playerCustomInput from '@/components/form/playerInputs/playerCustomInput.vue'
import tagsSearchSelect from '@/components/form/playerInputs/tagsSearchSelect.vue'
export default {
  name: 'Player',
  components: {
    playerCustomInput,
    tagsSearchSelect,
  },
  data() {
    return {
      playerData: {
        wakeUpTime: '10:08am',
        activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        tags: [
          {
            name: 'tag2',
            code: '2',
          },
          {
            name: 'tag3',
            code: '3',
          },
          {
            name: 'tag4',
            code: '4',
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
  methods: {
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
    getTime(time) {
      this.playerData.wakeUpTime = time
    },
    sendPlayerData(playerData) {
      console.log('Player data sent:', playerData)
      this.$emit('sendPlayerData', playerData)
    },
  },
  mounted() {
    this.sendPlayerData(this.playerData)
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
        &--active {
          background-color: #0071e2;
          color: #f5f5f8;
        }
      }
    }
  }
}
</style>
