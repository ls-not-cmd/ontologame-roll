<template>
    <div class="banker-page clear-after">
        <div class="global-banker-info md-subheading clear-after">
            <div class="running-info">
                <span v-html="roundInfo"></span>
                <span v-html="balanceInfo"></span>
            </div>
            <div class="bankers-info">
                <span v-html="bankersInfo"></span>
            </div>
        </div>
        <div class="main-panel clear-after">
            <div class="banker-income">
                <md-card>
                    <md-card-content>
                        <div class="title md-title">{{$t('Banker.Title.CurrentIncome')}}</div>
                    </md-card-content>

                    <md-card-content class="amount">
                        <div class="md-headline">
                            <span class="title">{{$t('Banker.Title.DividendIncome')}}</span>
                            <span class="value">{{dividend}} ONG</span>
                        </div>
                        <div class="md-headline">
                            <span class="title">{{$t('Banker.Title.EarningIncome')}}</span>
                            <span class="value">{{earning}} ONG</span>
                        </div>
                        <div class="md-headline">
                            <span class="title">{{$t('Banker.Title.Principal')}}</span>
                            <span class="value">{{principal}} ONG</span>
                        </div>
                        <div class="md-headline">
                            <span class="title">{{$t('Banker.Title.TotalAmount')}}</span>
                            <span class="value">{{totalAmount}} ONG</span>
                        </div>
                    </md-card-content>

                    <md-card-content class="buttons">
                        <md-button id="button-withdraw-income" class="md-primary" @click="bankerWithdraw">{{$t('Banker.Button.WithdrawIncome')}}</md-button>
                        <md-button id="button-banker-exit" class="md-primary" @click="bankerExit">{{$t('Banker.Button.WithdrawAndExit')}}</md-button>
                    </md-card-content>
                </md-card>
            </div>

            <div class="banker-investment">
                <md-card>
                    <md-card-content>
                        <div class="title md-title">{{$t('Banker.Title.CurrentInvest')}}</div>
                    </md-card-content>

                    <md-card-content class="amount total">
                        <div class="md-display-2">{{this.currentInvest}} ONG</div>
                    </md-card-content>

                    <md-card-content class="buttons">
                        <md-button id="button-invest-in" class="md-primary" @click="showInvest = true">{{$t('Banker.Button.InvestIn')}}</md-button>
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <div class="history-panel">
            <div class="banker-history income-history">
                <div class="history-header md-title">{{$t('History.Title.RecentWithdraw')}}</div>
                <div class="row history-header clear-after">
                    <div class="col col-time">{{$t('History.Title.WithdrawType')}}</div>
                    <div class="col col-time">{{$t('History.Title.Time')}}</div>
                    <div class="col col-value">{{$t('History.Title.Amount')}}</div>
                </div>

                <div class="row-data history-list" v-for="(row, idx) in withdrawHistory" :key="idx">
                    <div class="col col-value">{{GetWithdrawType(row.funcName)}}</div>
                    <div class="col col-time">{{TimeToString(row.blockTime)}}</div>
                    <div class="col col-value">{{row.ongAmount}}</div>
                </div>
            </div>

            <div class="banker-history invest-history">
                <div class="history-header md-title">{{$t('History.Title.RecentInvest')}}</div>
                <div class="row history-header clear-after">
                    <div class="col col-time">{{$t('History.Title.Time')}}</div>
                    <div class="col col-value">{{$t('History.Title.Amount')}}</div>
                </div>

                <div class="row-data history-list" v-for="(row, idx) in investHistory" :key="idx">
                    <div class="col col-time">{{TimeToString(row.blockTime)}}</div>
                    <div class="col col-value">{{row.ongAmount}}</div>
                </div>
            </div>
        </div>

        <md-dialog class="invest-confirm-dialog" :md-active.sync="showInvest">
            <md-dialog-title>{{$t('Banker.Title.InvestAmount')}}</md-dialog-title>
            <md-field :class="1000 > parseInt(investAmount) ? 'md-invalid':''">
                <md-input v-model="investAmount" :disabled="investDisabled" :type="'number'"/>
                <span class="md-suffix">ONG</span>
                <span class="md-error">{{bankerInvestErr}}</span>
            </md-field>
            <md-dialog-actions>
                <md-button
                        :disabled="1000 > parseInt(investAmount) || investDisabled"
                        :class="1000 > parseInt(investAmount) ? 'md-invalid':''"
                        @click="bankerInvest">{{$t('Banker.Button.Ok')}}</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog class="withdraw-msg-dialog" :md-active.sync="showInfo">
            <md-dialog-title>{{infoStr}}</md-dialog-title>
        </md-dialog>
    </div>
</template>

<script>
  import ContractHelper from "../../js/ont/contract";
  import {ONG_MUL} from "../../js/const";
  import ServerApi from "../../js/util/serverApi";
  import Errors from "../../js/common/errors"
  import Decimal from "decimal.js"
  import {ContractErrorCode} from "../../js/ont/contractErrors";
  import Moment from 'moment';

  let historyQuerying = false

  export default {
    name: "banker",
    data() {
      return {
        account: null,
        investHistory: [],
        withdrawHistory: [],
        showInvest: false,

        showInfo: false,
        infoStr: '',

        investAmount: "1000",
        investDisabled: false,

        currentInvest: '...',
        dividend: '...',
        earning: '...',
        principal: '...',
        totalAmount: '...',

        currentRound: '...',
        runningBalance: '...',
        bankerList: [],
        totalBankerInvest: '...',
      }
    },
    computed: {
      roundInfo() {
        return this.$t('Banker.Info.CurrentRound', {round: this.currentRound})
      },
      balanceInfo() {
        return this.$t('Banker.Info.GamePollBalance', {balance: this.runningBalance})
      },
      bankersInfo() {
        return this.$t('Banker.Info.AllInvestInfo', {bankerCount: this.bankerList.length, investAmount: this.totalBankerInvest})
      },
      bankerInvestErr() {
        return this.$t('Banker.Info.InvestError')
      }
    },

    mounted() {
      this.$nextTick(async _=> {
        this.account = await ContractHelper.OntAsset.getAccount()
          .catch(e=>{
            console.log(e)
            return null
          })

        if(null !== this.account) {
          this.updateBankerStatus()
          this.queryHistory()
          this.StartHistoryLoopQuery()
        }
      })
    },

    methods: {
      GetWithdrawType(funcName) {
        let withDrawName = ''
        switch (funcName) {
          case 'bankerWithdrawEarning':
            withDrawName = this.$t('Banker.Title.WithdrawEarning')
            break

          case 'bankerWithdrawDividend':
            withDrawName = this.$t('Banker.Title.WithdrawDividend')
            break

          default:
            withDrawName = this.$t('Banker.Title.WithdrawExit')
            break
        }

        return withDrawName
      },

      StartHistoryLoopQuery() {
        if(historyQuerying) {
          return
        }
        historyQuerying = true

        let querying = false
        setInterval(async _=> {
          if(querying) {
            return
          }
          querying = true
          await this.queryHistory()
          querying = false
        }, 1000)
      },
      TimeToString(timestamp) {
        return Moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss').toString()
      },
      hexToFloatOng(ongVal) {
        ongVal = ContractHelper.HexToInt(ongVal)
        Decimal.set({ precision: 9, toExpPos: 40 })
        return Decimal.div(ongVal, ONG_MUL).toString()
      },

      async getGlobalInfo() {
        this.currentRound = await ContractHelper.GetCurrentRound()

        ContractHelper.GetRunningBalance(this.currentRound)
          .then(balance=>{
            this.runningBalance = balance
          })
          .catch(_=>{
            this.runningBalance = '0'
          })

        ContractHelper.GetBankerList(this.currentRound)
          .then(bankerList=> {
            this.bankerList = bankerList
          })
          .catch(_=>{
            this.bankerList = []
          })

        ContractHelper.GetBankersInvestment(this.currentRound)
          .then(totalInvest=>{
            this.totalBankerInvest = totalInvest
          })
          .catch(_=>{
            this.totalBankerInvest = '0'
          })

        ContractHelper.GetCurrentBankerInvestAmount(this.currentRound)
          .then(bankerInvest=>{
            if(!bankerInvest) {
              this.currentInvest = 0
              return
            }
            this.currentInvest = this.hexToFloatOng(bankerInvest)
          })
          .catch(_=>{
            this.currentInvest = 0
        })

      },

      async updateBankerInfo() {
        const defVal = '0'
        let dividend = defVal
        let earning = defVal
        let principal = defVal

        await Promise.all([
          ContractHelper.GetBankerDividend().catch(_=>{return defVal}),
          ContractHelper.GetBankerEarning().catch(_=>{return defVal}),
          ContractHelper.GetPrincipal().catch(_=>{return defVal}),
        ]).then(values => {
          dividend = values[0]
          earning = values[1]
          principal = values[2]
        })

        if(defVal !== dividend) {
          this.dividend = this.hexToFloatOng(dividend)
        } else {
          this.dividend = defVal
        }

        if(defVal !== earning) {
          this.earning = this.hexToFloatOng(earning)
        } else {
          this.earning = defVal
        }

        if(defVal !== principal) {
          this.principal = this.hexToFloatOng(principal)
        } else {
          this.principal = defVal
        }

        let total = Decimal.add(this.principal, this.earning)
        this.totalAmount = Decimal.add(total, this.dividend).toString()
      },

      async queryHistory() {
        if(null !== this.account) {
          let investHistory = await ServerApi.GetInvestHistory(this.account)
          let withDrawHistory = await ServerApi.GetWithdrawHistory(this.account)

          if(!Errors.IsError(investHistory)) {
            if(0 === investHistory.Error) {
              this.investHistory = investHistory.Result.Result
            }
          }

          if(!Errors.IsError(withDrawHistory)) {
            if(0 === withDrawHistory.Error) {
              let withDrawList = withDrawHistory.Result.Result

              let newList = []
              let filter = {}
              withDrawList.forEach(w=>{
                if(!filter[w.txHash]) {
                  filter[w.txHash] = []
                }

                if('bankerExit' === w.funcName) {
                  filter[w.txHash] = [w]
                } else {
                  let bankerExited = false
                  for(let i=0; i<filter[w.txHash].length; i++) {
                    if('bankerExit' === filter[w.txHash][i].funcName) {
                      bankerExited = true
                      break
                    }
                  }

                  if(!bankerExited) {
                    filter[w.txHash].push(w)
                  }
                }
              })

              Object.keys(filter).forEach(key=>{
                newList = newList.concat(filter[key])
              })

              this.withdrawHistory = newList

            }
          }

        }
      },

      showInfoDialog(info, autoClose = false) {
        this.infoStr = info
        this.showInfo = true

        if(autoClose) {
          setTimeout(_=> {
            this.showInfo = false
          }, 1000)
        }
      },

      checkContractError(contractRet, handleInfo = true) {
        let errCode = ContractHelper.CheckContractResultError(contractRet)

        if(ContractErrorCode.NO_ERROR !== errCode) {
          if(ContractErrorCode.USER_CANCELED === errCode) {
            if(handleInfo) {
              this.showInfo = false
            }
            return true
          }

          if(handleInfo) {
            this.showInfoDialog(this.$t(`Contract.Info[${errCode}]`))
          }
          return true
        }

        return false
      },

      async updateBankerStatus() {
        this.updateBankerInfo()
        this.getGlobalInfo()
      },

      async bankerInvest() {
        this.infoStr = this.$t('Banker.Info.WithdrawInfo')
        this.investDisabled = true
        let investOng = parseInt(this.investAmount)
        if(isNaN(investOng) || 0 >= investOng) {
          this.showInfoDialog(this.$t('Banker.Info.InvestAmountInvalid'))
          return
        }

        let ret = await ContractHelper.BankInvest(investOng)
          .catch(e=>{
            return e
          })

        this.investDisabled = false
        this.showInvest = false
        this.investAmount = '1000'

        if(this.checkContractError(ret)) {
          return
        }

        let investAmount = '0'
        ret.result.forEach(r=> {
          let keyWord = ContractHelper.HexToString(r[0])
          if('bankerInvest' === keyWord) {
            investAmount = this.hexToFloatOng(r[3])
          }
        })

        if('0' !== investAmount) {
          setTimeout(async _=>{
            this.updateBankerStatus()
          }, 10)

          this.showInfoDialog(this.$t('Banker.Info.InvestSuccess', {investAmount: investAmount}), true)
        } else {
          this.showInfoDialog(this.$t('Banker.Info.InvestFailed'))
        }
      },

      async bankerWithdraw() {
        this.showInfoDialog(this.$t('Banker.Info.WithdrawInfo'))
        let ret = await ContractHelper.BankerWithdraw()
          .catch(e=>{
            return e
          })

        if(this.checkContractError(ret)) {
          return
        }

        let withdrawAmount = 0

        ret.result.forEach(r=> {
          let keyWord = ContractHelper.HexToString(r[0])
          if('bankerWithdrawDividend' === keyWord) {
            withdrawAmount += ContractHelper.HexToInt(r[3])
          }

          if('bankerWithdrawEarning' === keyWord) {
            withdrawAmount += ContractHelper.HexToInt(r[3])
          }
        })

        if(0 === withdrawAmount) {
          this.showInfoDialog(this.$t('Banker.Info.WithdrawFailed'))
        } else {
          Decimal.set({ precision: 9, toExpPos: 40 })
          withdrawAmount = Decimal.div(withdrawAmount, ONG_MUL).toString()

          setTimeout(async _=>{
            this.updateBankerStatus()
          }, 10)

          this.showInfoDialog(this.$t('Banker.Info.WithdrawSuccess', {withdrawAmount: withdrawAmount}), true)
        }
      },

      async bankerExit() {
        this.showInfoDialog(this.$t('Banker.Info.WithdrawInfo'))
        let ret = await ContractHelper.BankerExit()
          .catch(e=>{
            return e
          })

        if(this.checkContractError(ret)) {
          return
        }

        let exitWithdraw = '0'
        ret.result.forEach(r=> {
          let keyWord = ContractHelper.HexToString(r[0])
          if('bankerExit' === keyWord) {
            exitWithdraw = this.hexToFloatOng(r[3])
          }
        })

        if('0' !== exitWithdraw) {
          setTimeout(async _=>{
            this.updateBankerStatus()
          }, 10)

          this.showInfoDialog(this.$t('Banker.Info.ExitSuccess', {all: exitWithdraw}))
        } else {
          this.showInfoDialog(this.$t('Banker.Info.ExitFailed'))
        }
      },
    }
  }
</script>

<style scoped>
    .main-panel > .banker-income {
        float: left;
        width: 49%;
    }
    .main-panel > .banker-investment {
        float: right;
        width: 49%;
    }

    .banker-history {
        float: left;
        width: 100%;
    }

    .banker-history {
        background-color: rgba(0,0,0,0.4);
        padding: 20px 0;
        margin-top: 20px;
    }

    .banker-history > .history-header {
        margin-bottom: 20px;
        text-align: center;
    }

    .banker-history > .row {
        width: 100%;
    }

    .banker-history > .row-data {
        width: 100%;
        height: 46px;
        line-height: 46px;
    }

    .banker-history > .row > div,
    .banker-history > .row-data > div {
        float: left;
        width: 50%;
        text-align: center;
    }

    .banker-history > .row-data:nth-child(even) {
        opacity: 0.8;
        background: rgba(0, 0, 0, 0.8);
        transition: opacity 0.2s;
    }

    .banker-history > .row-data:nth-child(odd) {
        opacity: 0.8;
        background: rgba(0, 0, 0, 0.4);
        transition: opacity 0.2s;
    }
    .banker-history.income-history > .row > div,
    .banker-history.income-history > .row-data > div.col {
        width: 33.3333%;
    }
</style>

<style>
    .global-banker-info {
        padding: 20px;
        margin-bottom: 20px;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .global-banker-info > div {
        height: 30px;
        line-height: 30px;
    }

    .global-banker-info > div > span {
        padding-right: 20px;
    }

    .global-banker-info > div > span > span {
        display: inline-block;
        padding: 0 6px;
        text-align: center;
        font-weight: 600;
        color: #ed585e !important;
    }
</style>

<style scoped>
    .main-panel > div > .md-card {
        padding-top: 20px;
        min-height: 280px;
        box-shadow: none !important;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .main-panel > div .title {
        text-align: center;
    }

    .main-panel > div .amount.total {
        text-align: center;
    }

    .main-panel > div .amount {
        height: 100px;
        padding: 0;
        color: #ed585e !important;
    }

    .main-panel > div .amount > div {
        line-height: 28px;
        font-size: 18px;
    }

    .main-panel > div .amount.total > div {
        line-height: 100px;
        font-size: 36px;
        color: #ed585e !important;
    }

    .main-panel > div .amount > div span {
        display: inline-block;
        width: 48%;
    }

    .main-panel > div .amount > div span.title {
        text-align: right;
        padding-right: 10px;
    }

    .main-panel > div .buttons {
        text-align: center;
    }

    .main-panel > div .buttons > .md-button {
        font-size: 16px;
    }
</style>

<style scoped>
    .income-history {
        float: left;
        width: 49%
    }

    .income-history .col {
        width: 30%;
    }

    .invest-history {
        float: right;
        width: 49%
    }
</style>

<style scoped>
    .withdraw-msg-dialog .md-dialog-title {

    }

    .invest-confirm-dialog .md-dialog-title {
        margin: 0 !important;
        text-align: center;
    }

    .invest-confirm-dialog .md-field {
        width: 70% !important;
        margin: 0 auto;
    }

    .invest-confirm-dialog .md-field input {
        text-align: center;
    }
</style>