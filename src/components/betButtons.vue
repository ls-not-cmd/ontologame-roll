<template>
    <div class="bet-buttons clear-after">
        <div class="button-set-value">
            <md-button @click="setMin">{{$t('Roll.Button.Min')}}</md-button>
        </div>

        <div class="button-set-value">
            <md-button @click="setMax">{{$t('Roll.Button.Max')}}</md-button>
        </div>

        <div class="button-bet" :class="autoBet ? 'disabled':''">
            <md-button id="button-do-bet" @click="bet" :disabled="autoBet">{{$t('Roll.Button.Bet')}}</md-button>
        </div>

        <div class="auto-bet" style="">
            <span :class="this.autoBet ? 'auto-bet-on':'auto-bet-off'">{{autoBetText}}</span>
            <md-switch class="md-primary" v-model="autoBet">{{nextBetTimeout}}</md-switch>
        </div>


    </div>
</template>

<script>
  const autoBettingInterval = 60

  export default {
    name: "bet-buttons",
    props: ["setMin", "setMax", "bet", "token", "stopAutoBet"],
    data() {
      return {
        autoBet: false,
        autoBettingTimer: null,
        autoBetChecker: autoBettingInterval,
        nextBetTimeout: '',
      }
    },
    computed: {
      autoBetText() {
        let state =  this.autoBet ? 'on' : 'off'
        return this.$t('Roll.Title.AutoBet', {state: state})
      }
    },
    watch: {
      stopAutoBet() {
        if(this.stopAutoBet) {
          this.autoBet = !this.stopAutoBet
        }
      },
      autoBet() {
        this.$emit('autoBetStatusChanged')
        this.autoBet ? this.startAutoBetting() : this.stopAutoBetting()
      }
    },
    methods: {
      async autoBetting() {
        if(!this.autoBet) {
          this.autoBetChecker = autoBettingInterval
          this.nextBetTimeout = ''
          this.autoBettingTimer = setTimeout(async _=>{
            await this.autoBetting()
          }, 50)
          return
        }

        if(0 === this.autoBetChecker) {
          this.nextBetTimeout = this.$t('Roll.Title.AutoBetFire')
          await this.bet()
          this.autoBetChecker = autoBettingInterval
          this.autoBettingTimer = setTimeout(async _=>{
            await this.autoBetting()
          }, 50)
          return
        }

        this.autoBetChecker -= 1
        this.nextBetTimeout = `${((this.autoBetChecker * 50) / 1000).toFixed(2)} s`

        this.autoBettingTimer = setTimeout(async _=>{
          await this.autoBetting()
        }, 50)
      },

      async startAutoBetting() {
        clearTimeout(this.autoBettingTimer)
        await this.bet()
        this.autoBetChecker = autoBettingInterval
        this.nextBetTimeout = ''
        this.autoBetting()
      },

      async stopAutoBetting() {
        clearTimeout(this.autoBettingTimer)
        this.autoBetChecker = autoBettingInterval
        this.nextBetTimeout = ''
      }
    }
  }
</script>

<style scoped>
    .bet-buttons {
        width: 100%;
        margin: 0 auto;
        height: 60px;
        border-radius: 4px;
    }

    .bet-buttons > div {
        float: left;
    }

    .bet-buttons .button-set-value {
        background-color: transparent;
        width: 60px;
        margin-right: 10px;
    }

    .bet-buttons .button-bet {
        float: right;
        width: 110px;
        margin-right: 10px;
        transition: margin-right 0.2s;
    }

    .bet-buttons .button-bet .md-button {
        background-color: #448aff;
    }
    .bet-buttons .button-bet .md-button:hover {
        width: 90px;
    }

    .bet-buttons .button-bet.disabled .md-button {
        background-color: #616161 !important;
    }

    .bet-buttons .md-button {
        margin-top: 12px;
        width: 60px;
        min-width: 60px;
        background-color: #2c2e3a;
    }

    .bet-buttons .auto-bet {
        float: right;
        text-align: center;
        transition: all 0.2s;
    }

    .auto-bet > span {
        display: inline-block;
        vertical-align: top;
        padding-top: 20px;
        width: 90px;
        text-align: left;
        transition: all 0.2s;
    }

    .auto-bet > span.auto-bet-on {
        color: #548af7;
        font-weight: 600;
    }

    .auto-bet > span.auto-bet-off {
        color: #dddddd;
    }

    .auto-bet > .md-switch {
        padding-top: 4px;
    }
</style>