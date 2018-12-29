<template>
  <div id="app">
    <div v-if="!providerReady" id="game-top-info">
      <div class="md-body-2" v-html="getErrorText()"></div>
    </div>
    <nav-header/>
    <div class="page-container" id="game-page">
      <router-view/>
    </div>
    <nav-footer/>
  </div>
</template>

<script>
import NavHeader from "./components/navHeader"
import NavFooter from "./components/navFooter"
import {gNamespace} from "./js/namespace";
import ProviderChecker from "./js/ont/checker"
import Errors from "./js/common/errors"
import ServerApi from "./js/util/serverApi"

export default {
  components: {NavHeader, NavFooter},
  name: 'App',
  data() {
    return {
      providerReady: true,
      notReadyReason: null,
      coinbase: null,
      history: []
    }
  },
  watch: {
    coinbase(_, old) {
      if(null === this.coinbase) {
        window.location.reload()
      } else {
        if(null === old) {

        } else {
          window.location.reload()
        }
      }
    }
  },
  methods: {
    getErrorText() {
      let reason = ""
      if(null === this.notReadyReason) {
        return reason
      }

      switch (this.notReadyReason.code) {
        case Errors.Codes.NO_COMPATIBLE_BROWSER:
          reason = this.$t('Wallet.Info.InstallBrowser')
          break

        case Errors.Codes.NO_PROVIDER:
        case Errors.Codes.INVALID_PROVIDER:
        case Errors.Codes.INVALID_COINBASE:
          reason = this.$t('Wallet.Info.InstallExtension')
          break

        case Errors.Codes.NOT_LOGIN:
          reason = this.$t('Wallet.Info.NeedLogin')
          break

        case Errors.Codes.NOT_MAINNET:
          reason = this.$t('Wallet.Info.NeedMainNet')
          break

        default:
          reason = this.$t('Wallet.Info.LoadGameFailed')
          break

      }

      return reason
    },

    async HistoryQuery() {
      let result = await ServerApi.GetLast50()
      if(Errors.IsError(result)) {
        console.log(result)
      } else {
        if(0 === result.Error) {
          this.$store.commit(`${gNamespace.GAMES.ROLL.name}/setHistory`, result.Result.Result)
        }
      }
    },

    startHistoryQuery() {
      let querying = false

      setInterval(async _=>{
        if(querying) {
          return
        }
        querying = true
        await this.HistoryQuery()
        querying  = false
      }, 1000)
    },

    async QueryTop10() {
      let result = await ServerApi.GetTop10()
      if(Errors.IsError(result)) {
        console.log(result)
      } else {
        if(0 === result.Error) {
          this.$store.commit(`${gNamespace.GAMES.ROLL.name}/setRank`, result.Result.Result)
        }
      }
    },

    startTop10Query() {
      let querying = false

      setInterval(async _=>{
        if(querying) {
          return
        }
        querying = true
        await this.QueryTop10()
        querying  = false
      }, 5000)
    },

    async CheckProvider(postError = true) {
      let loginOk = await ProviderChecker.FullCheck()
      if(Errors.IsError(loginOk)) {
        if(postError) {
          this.notReadyReason = loginOk
          this.providerReady = false
          this.$store.commit(gNamespace.PROVIDER + "/switchProviderToNotReady", loginOk)
        }
      } else {
        this.coinbase = loginOk.account
        this.providerReady = true
        this.$store.commit(gNamespace.PROVIDER + "/loadProvider", loginOk)
      }
    },

    startLoopProviderCheck() {
      let querying = false
      let reTry = null
      const reTryTimes = 3
      setInterval(async _=> {
        if(querying) {
          return
        }

        querying = true
        if(null !== reTry) {
          if(reTry < reTryTimes) {
            reTry += 1
          } else {
            reTry = 0
          }
        } else {
          reTry = 0
        }

        await this.CheckProvider(reTry >= reTryTimes)
        querying = false


      }, 500)
    }
  },
  mounted() {
    this.QueryTop10()
    this.HistoryQuery()
    this.CheckProvider()

    this.startLoopProviderCheck()
    this.startHistoryQuery()
    this.startTop10Query()
  },
}
</script>

<style>
  #app {
    position: relative;
    margin: 0 auto;
    background: transparent !important;
  }

  #app > div {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  #game-page {
    position: relative;
    width: 100%;
    margin-bottom: 40px !important;
  }
  .page-container > div {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
  }

  #app > div#game-top-info {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;

    background-color: #e8bf6a;
    color: #2b2b2b;
    text-align: center;
  }

  #app > div#game-top-info .md-body-2 {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    height: 48px;
    line-height: 48px;
  }
</style>

<style>
  html {
    height: 100%;
    min-height: 100%;
    margin: 0 auto;
    background: #323140 !important;
  }

  body {
    width: 100%;
    min-width: 1200px;
    margin: 0 auto;
    color: #ffffff;
  }

  .clear-after::after {
    width: 0;
    height: 0;
    content: ' ';
    visibility: hidden;
    display: block;
    clear: both;
  }

  .game-title {
    text-align: center;
    padding-bottom: 20px;
    color: #ffffff !important;
  }

  .game-panel-history,
  .game-panel-description,
  .game-panel-playground {
    background: transparent !important;
    box-shadow: none !important;
  }

  .game-playground {
    width: 60%;
  }

  .game-info {
    width: 100%;
    text-align: center;
  }

  .game-rewards {
    width: 40%;
    float: left;
  }

  .game-info-panel.playing,
  .game-panel-playground.playing {
    filter: blur(6px) !important;
    -webkit-filter: blur(6px) !important;
  }

  .game-panel-play-amount {
    text-align: center !important;
  }

  .gaming-panel-show-ani-enter-active, .gaming-panel-show-ani-leave-active {
    transition: opacity 0.2s;
  }

  .gaming-panel-show-ani-enter, .gaming-panel-show-ani-leave-to {
    opacity: 0;
  }


  .game-place-bet-row {
    text-align: center;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .place-bet-button {
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background: #448aff;
  }

  .place-bet-button:hover {
    width: 160px;
  }

  .md-toolbar,
  .md-content {
    background: transparent !important;
  }
</style>

<style>
    body div.introjs-tooltiptext {
        color: #333333 !important;
    }

    body div.introjs-helperLayer {
        background-color: rgba(255, 255, 255, 0.05);
    }
</style>
