<template>
    <div class="bet-rewards">
        <md-card class="bet-rewards-title">
            <md-card-content>
                <span class="md-title">{{$t('History.Title.LastOneHours')}}</span>
            </md-card-content>
        </md-card>

        <div class="history-header rewards-body">
            <md-content v-for="(header, idx) in headers" class="history-body rewards-cell"
                        :key="idx"
                        :style="getColumnWidth(idx)">
                <md-content class="md-body-1">{{header}}</md-content>
            </md-content>
        </div>

        <div class="bet-rewards-body">
            <a v-for="(row, idx) in rows"
               class="rewards-body bet-result-row"
               :class="isWin(row) ? 'win':''"
               :key="idx">
                <md-content class="rewards-cell"
                            v-for="(col, idx) in row.columns"
                            :key="idx"
                            :style="getColumnWidth(idx)">
                    <span>{{col}}</span>
                </md-content>
            </a>
        </div>
    </div>
</template>

<script>
  export default {
    name: "bet-rewards",
    props: [ "rows"],
    data() {
      return {
        columnsWidth: [
          "15%", "25%", "30%", "30%"
        ],
      }
    },
    computed: {
      headers(){
        return [
          this.$t('History.Title.Rank'),
          this.$t('History.Title.Player'),
          this.$t('History.Title.Amount'),
          this.$t('History.Title.Rewards'),
        ]
      }
    },
    methods: {
      isWin(row) {

      },
      getColumnWidth(idx) {
        return "width:" + this.columnsWidth[idx]
      }
    }
  }
</script>

<style scoped>
    .bet-rewards {
        height: 431px;
        margin-right: 10px;
        background-color: #1e1d26;
        overflow: hidden;
    }

    .bet-rewards > div {
        width: 100%;
    }

    .bet-rewards-title {
        background: #1e1d26 !important;
        box-shadow: none;
        padding: 10px 16px;
    }

    .bet-rewards-title > .md-card-content {
        padding: 0;
        border-bottom: 1px solid gray;
    }

    .bet-rewards-title > .md-card-content span {
        display: inline-block;
        font-weight: 600;
        padding-bottom: 4px;
        border-bottom: 2px solid #ffffff;
    }

    .history-header {
        padding: 5px 20px 0 20px;
        height: 60px;
        line-height: 60px;
        background: #1e1d26;
        border-bottom: 1px solid rgba(0,0,0,0.4);
    }
    .history-header .history-body > .md-content {
        background: transparent;
    }

    .bet-rewards-body {
        padding-bottom: 20px;
        height: 328px;
        overflow-y: scroll;
    }
    .bet-result-row {
        display: block;
        height: 46px;
        line-height: 46px;
        padding: 0 20px;
        background: #1e1d26;
        opacity: 0.8;
        border-bottom: 1px solid rgba(0,0,0,0.4);
    }

    .bet-result-row:nth-child(-n+3) {
        background-color: #334e47;
        /*border-bottom: 1px solid rgba(0,0,0,0.4);*/
    }

    .bet-result-row:nth-child(-n+3) span {
        color: greenyellow;
        font-weight: 600;
    }

    .bet-result-row:nth-child(n+4) {
        background-color: #112e33;
    }

    .bet-result-row:hover{
        opacity: 1;
        transition: opacity 0.2s;
    }

    .history-body {
        display: inline-block;
        padding-left: 10px;
        background: transparent;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }

    .rewards-cell {
        text-align: center;
    }

    .rewards-cell {
        display: inline-block;
        padding-left: 10px;
        background: transparent;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }

    .bet-dice-outer,
    .result-dice-outer {
        display: inline-block;
        margin: 0 auto;
        margin-left: 6px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 6px;
        text-align: center;
        background-image: linear-gradient(to right top, #dddddd, #ffffff);
    }

    .bet-result-row.win .bet-dice-outer,
    .bet-result-row.win .result-dice-outer {
        background-image: linear-gradient(to right top, #b2d17e, #b2f17e);
    }

    .bet-dice-outer {
        width: 20px;
        height: 20px;
        line-height: 20px;
    }

    .history-bet-icon {
        margin-top: -2px;
        width: 12px;
    }

    .history-result-icon {
        margin-top: -2px;
        width: 20px;
    }

    .history-bet-icon.big,
    .history-result-icon.big {
        width: 26px;
    }

    .history-jackpot {
        text-align: center;
    }
</style>