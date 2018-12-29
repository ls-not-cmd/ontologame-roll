<template>
    <div class="clear-after" style="position: relative;">
        <div class="game-panel game-playground">
            <game-info-panel
                    :class="ShowPlaceBet ? '':'playing'"
                    :chance="userChance"
                    :pay-times="PayTimes"
                    :will-win="willWin"/>

            <md-card class="game-panel-playground" :class="ShowPlaceBet ? '':'playing'">
                <md-card-content class="roll-slider" id="game-roll-slider" >
                    <vue-slider
                            v-show="showSlider"
                            ref="betSlider"
                            v-model="userChance"
                            v-bind="sliderProps">

                        <template slot="label" slot-scope="{ label, active }">
                            <span :class="['custom-label', { active }]" v-if="label % 20 === 0 || label === 2 || label === 96">
                                {{ label }}
                            </span>
                        </template>
                    </vue-slider>
                </md-card-content>

                <div class="game-main-ground">
                    <div class="game-will-win md-layout md-gutter">
                        <div class="md-layout-item">
                            <div class="md-body-2">{{$t('Roll.Info.Payout', {willWin: willWin})}}</div>
                        </div>
                    </div>

                    <md-card-content>
                        <md-field>
                            <md-button @click="reduceAmount" class="md-icon-button">
                                <md-icon>remove</md-icon>
                            </md-button>
                            <md-input
                                    class="game-panel-play-amount"
                                    :id="BetAmountInputId"
                                    v-model="betAmount"/>
                            <md-button @click="addAmount" class="md-icon-button">
                                <md-icon>add</md-icon>
                            </md-button>
                        </md-field>
                    </md-card-content>

                    <md-card-content class="game-place-bet-row">
                        <bet-buttons
                                :stop-auto-bet="stopAutoBet"
                                :bet="placeBet"
                                :set-min="setMinBet"
                                :set-max="setMaxBet"/>
                    </md-card-content>
                </div>

            </md-card>
            <transition name="gaming-panel-show-ani">
                <gaming-panel v-if="!ShowPlaceBet"
                              :info-to-show="this.InfoToShow"
                              :play-again="this.playAgain"
                              :show-play-again="this.ShowPlayAgain"/>

            </transition>
        </div>

        <bet-rewards :rows="Rank"/>

        <div class="global-game-info md-subheading clear-after">
            <div class="running-info">
                <span v-html="roundInfo"></span>
                <span v-html="balanceInfo"></span>
            </div>
        </div>

        <game-history :rows="History"/>
    </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import {gNamespace} from "../../js/namespace";
  import GameState from "../../js/common/gameState"
  import {BetValues} from "../../js/const";
  import CommonPlaceBet from "../../js/util/commonPlaceBet"
  import GamingPanel from "../../components/gamingPanel";
  import GameInfoPanel from "../../components/gameInfoPanel";
  import GameHistory from "../../components/gameHistory";
  import BetRewards from "../../components/betRewards";
  import BetButtons from "../../components/betButtons";
  import ContractHelper from "../../js/ont/contract";
  import InputHelper from "../../js/util/inputHelper"
  import ServerApi from "../../js/util/serverApi"
  import {ContractErrorCode} from "../../js/ont/contractErrors";

  let getGlobalInfoQuerying = false

  function sliderProps() {
    return {
      width: '100%',
      show: true,
      min: 2,
      max: 96,
      startAnimation: false,
      piecewiseLabel: true,
      tooltip: false,
      autoPlay: false,
      bgStyle: {
        backgroundColor: "#ed585e",
        height: "20px",
        boxShadow: '0 0 10px #cc2222',
      },
      processStyle: {
        backgroundColor: "#7ff674",
        height: "20px",
      },
      sliderStyle: {
        marginTop:"-6px",
        backgroundColor: "#ed585e",
        height: "40px",
        width: "40px",
      }
    }
  }

  export default {
    components: {
      BetButtons,
      BetRewards,
      GameHistory,
      GameInfoPanel,
      GamingPanel,
      VueSlider
    },
    name: "roll",
    data() {
      return {
        stopAutoBet: false,
        ShowPlaceBet: true,
        Balance: 0,
        BetAmountInputId: 'roll-bet-amount-id',
        CurrentToken: 'ong',
        betAmount: "1",
        userChance: 51,
        sliderProps: sliderProps(),
        showSlider: false,
        CurrentGameState: GameState.PLAYER_IDLE,
        lastBetInfo: {},
        currentRound: 0,
        runningBalance: 0,
      }
    },
    watch: {
      CurrentToken() {
        this.betAmount = "10"
        this.$store.commit(gNamespace.GAMES.ROLL.name + "/setCurrentToken", this.CurrentToken)
      },
      betAmount() {
        this.stopAutoBet = true
        this.$nextTick(_=> {
          this.stopAutoBet = false
        })
      },
      userChance() {
        this.stopAutoBet = true
        this.$nextTick(_=> {
          this.stopAutoBet = false
        })
      }
    },
    mounted() {
      this.showSlider = true
      this.getGlobalInfo()

      if(!getGlobalInfoQuerying) {
        getGlobalInfoQuerying = true
        setInterval(async _=> {
          await this.getGlobalInfo()
        }, 60 * 1000)
      }

      setTimeout(_=>{
        this.$refs.betSlider.refresh()
      }, 0)

      this.$nextTick(_=> {
        let $betAmountInput = $(`#${this.BetAmountInputId}`)
        $betAmountInput
          .off("keydown")
          .on("keydown", e=>{
            InputHelper.NumberFilter($betAmountInput, e, true)
          })
      })
    },
    methods: {
      setMaxBet() {
        this.betAmount = CommonPlaceBet.GetMaxBet(this.userChance, this.CurrentToken).toFixed(2)
      },
      setMinBet() {
        this.betAmount = BetValues[this.CurrentToken].MinBet
      },
      reduceAmount() {
        this.betAmount = CommonPlaceBet.ReduceAmount(this.betAmount, this.CurrentToken)
      },
      addAmount() {
        this.betAmount = CommonPlaceBet.AddAmount(this.betAmount, this.userChance, this.CurrentToken)
      },

      async getGlobalInfo() {
        this.currentRound = await ContractHelper.GetCurrentRound()
        this.runningBalance = await ContractHelper.GetRunningBalance(this.currentRound)
      },

      async placeBet() {
        if(!this.Ready) {
          return
        }
        this.ShowPlaceBet = false
        this.CurrentGameState = GameState.WAITING_PLAYER_PAY

        let betResult = await ContractHelper.Bet(this, this.betAmount, this.userChance)
          .catch(err=>{
            console.log(err)
            return err
          })

        let errCode = ContractHelper.CheckContractResultError(betResult)

        if(ContractErrorCode.NO_ERROR !== errCode) {
          switch (errCode) {
            case ContractErrorCode.BET.ROUND_END:
              this.CurrentGameState = GameState.ROUND_ENDED
              break

            case ContractErrorCode.BET.POOR_POOL:
              this.CurrentGameState = GameState.POOR_POOL
              break

            case ContractErrorCode.BET.TRANSFER_ERROR:
              this.CurrentGameState = GameState.TRANSACTION_FAILED
              break

            default:
              this.playAgain()
          }

        } else {
          let result = betResult.result[betResult.result.length - 1]
          let keyWord = ContractHelper.HexToString(result[0])
          if('bet' !== keyWord) {
            this.CurrentGameState = GameState.TRANSACTION_FAILED
            return
          }

          if("string" === typeof betResult) {
            this.CurrentGameState = GameState.TRANSACTION_FAILED
            return
          }

          let account = await ContractHelper.OntAsset.getAccount()
          let betInfo = new ServerApi.BetInfo({
            bettor: account,
            rollUnder: this.userChance,
            bet: this.betAmount,
            roll: 0,
            payout: 0,
          })

          let contractRoll = parseInt(betResult.result[0][4], 16)
          betInfo.roll = contractRoll

          let winAmount = ContractHelper.HexToFloatOng(betResult.result[0][6])

          let condition = ''
          if(contractRoll < betInfo.rollUnder) {
            condition = '<'
          } else if(contractRoll >  betInfo.rollUnder) {
            condition = '>'
          } else {
            condition = '='
          }

          this.lastBetInfo = {
            result: contractRoll,
            rollUnder: betInfo.rollUnder,
            condition: condition,
            winAmount: winAmount,
          }

          setTimeout(_=> {
            this.playAgain()
          }, 800)

          if('0' === winAmount) {
            this.CurrentGameState = GameState.PLAYER_LOSE
          } else {
            betInfo.roll = contractRoll
            betInfo.payout = winAmount
            this.CurrentGameState = GameState.PLAYER_WIN
          }

          await this.getGlobalInfo()
        }
      },

      playAgain() {
        this.ShowPlaceBet = true
      },
    },
    computed: {
      roundInfo() {
        return this.$t('Banker.Info.CurrentRound', {round: this.currentRound})
      },
      balanceInfo() {
        return this.$t('Banker.Info.GamePollBalance', {balance: this.runningBalance})
      },
      History() {
        return this.$store.state[gNamespace.GAMES.ROLL.name].History
      },
      Rank() {
        return this.$store.state[gNamespace.GAMES.ROLL.name].Rank
      },
      Ready() {
        return this.$store.state[gNamespace.PROVIDER].Ready
      },
      InfoToShow() {
        return CommonPlaceBet.InfoToShow(this, this.CurrentGameState, this.lastBetInfo)
      },
      willWin() {
        return CommonPlaceBet.willWin(this, this.betAmount, this.userChance, this.CurrentToken)
      },
      PayTimes() {
        let willWin = parseFloat(this.willWin)
        let currentBet = parseFloat(this.betAmount)
        return (willWin / currentBet).toFixed(2)
      },
      ShowPlayAgain() {
        return CommonPlaceBet.ShowPlayAgain(this.CurrentGameState)
      },
    }
  }
</script>


<style scoped>
    .game-title {
        width: 100%;
        text-align: center;
    }
    .game-panel {
        position: relative;
        padding: 10px;
        padding-right: 20px;
        float: left;
        margin-bottom: 10px;
    }

    .roll-slider {
        padding-top: 60px;
    }

    .game-main-ground {
        width: 100%;
        background-color: rgba(0,0,0,0.4);
    }

    .game-token-selector {
        padding: 10px 50px;
    }

    .game-token-selector .md-checked {
        color: #548af7;
    }
</style>


<style>
    .global-game-info {
        padding: 20px;
        margin: 20px auto;
        width: 1180px;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .global-game-info > div {
        height: 30px;
        line-height: 30px;
    }

    .global-game-info > div > span {
        padding-right: 20px;
    }

    .global-game-info > div > span > span {
        display: inline-block;
        padding: 0 6px;
        text-align: center;
        font-weight: 600;
        color: #ed585e !important;
    }
</style>


<style scoped>
    .game-will-win {
        width: 90%;
        margin: 0 auto;
        line-height: 60px;
        height: 60px;
        border-radius: 30px;
    }

    .game-will-win .md-body-2 {
        margin: 0 auto;
        padding: 0;
        height: 60px;
        line-height: 60px;
        font-size: 20px !important;
        text-align: center;
    }
</style>

<style scoped>
    .custom-label {
        position: absolute;
        bottom: 100%;
        left: 0;
        transform: translate(-50%, -12px);
        margin-left: 3px;
    }
    .custom-label::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 5px);
        width: 1px;
        height: 5px;
        background-color: #fff;
    }
    .custom-label.active::after {
        color: #AAD372;
    }
    .custom-label.active {
        color: #AAD372;
    }
    .custom-label.active::after {
        background-color: #AAD372;
        width: 2px;
    }
</style>