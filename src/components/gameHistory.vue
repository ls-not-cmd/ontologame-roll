<template>
    <div class="game-history clear-after">
        <md-card class="game-history-title">
            <md-card-content>
                <span class="md-title">{{$t('History.Title.History')}}</span>
            </md-card-content>
        </md-card>

        <div class="history-header history-row">
            <md-content v-for="(header, idx) in headers" class="history-cell"
                        :key="idx"
                        :style="getColumnWidth(idx)">
                <md-content class="md-body-1">{{header}}</md-content>
            </md-content>
        </div>

        <div class="history-body">
            <a v-for="(row, idx) in rows"
               class="history-row bet-result-row"
               :class="row.isWin ? 'win':'lose'"
               :key="idx">
                <md-content
                        class="history-cell"
                        :class="idx === (row.columns.length - 1) ? 'payout':''"
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
  import {HistoryColumnType} from "../js/const";

  export default {
    name: "game-history",
    props: [ "rows", "modulo"],
    data() {
      return {
        columnsWidth: [
          "16.6666%", "16.6666%", "16.6666%", "16.6666%", "16.6666%", "16.6666%"
        ],
        columnType: HistoryColumnType
      }
    },
    computed: {
      headers() {
        return [
          this.$t('History.Title.Time'),
          this.$t('History.Title.Player'),
          this.$t('History.Title.RollUnder'),
          this.$t('History.Title.BetAmount'),
          this.$t('History.Title.Result'),
          this.$t('History.Title.Rewards'),
        ]
      }
    },
    methods: {
      getColumnWidth(idx) {
        return "width:" + this.columnsWidth[idx]
      }
    }
  }
</script>

<style scoped>
    .game-history {
        width: 100%;
        float: left;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .game-history > div {
        width: 100%;
    }

    .game-history-title {
        padding: 10px 16px;
        padding-bottom: 0;
        background: #1e1d26 !important;
        box-shadow: none;
    }

    .game-history-title > .md-card-content {
        padding: 0;
        border-bottom: 1px solid gray;
    }

    .game-history-title > .md-card-content span {
        display: inline-block;
        padding-bottom: 4px;
        border-bottom: 2px solid #ffffff;
        font-weight: 600;
    }

    .history-header {
        padding: 5px 20px 0 20px;
        height: 60px;
        line-height: 60px;
        background: #1e1d26;
    }

    .history-cell {
        text-align: center;
    }

    .history-header .history-cell > .md-content {
        background: transparent;
    }

    .history-body {
        padding-bottom: 20px;
        max-height: 500px;
        overflow-y: scroll;
    }
    .bet-result-row {
        display: block;
        height: 46px;
        line-height: 46px;
        padding: 0 20px;
        border-bottom: 1px solid rgba(0,0,0,0.4);
        background-color: #4c2d2e;
    }

    .bet-result-row:nth-child(even) {
        opacity: 0.8;
        /*background: rgba(0, 0, 0, 0.8);*/
        transition: opacity 0.2s;
    }

    .bet-result-row:nth-child(odd) {
        opacity: 0.8;
        /*background: rgba(0, 0, 0, 0.4);*/
        transition: opacity 0.2s;
    }

    .bet-result-row:hover{
        opacity: 1;
        transition: opacity 0.2s;
    }

    .bet-result-row:hover .col-adress {
        text-decoration: underline;
    }

    .history-cell {
        display: inline-block;
        padding-left: 10px;
        background: transparent;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }

    .bet-result-row.lose {
        color: #ffffff;
    }
    .bet-result-row.win {
        background-color: #334e47;
        font-weight: 600;
    }
    .bet-result-row.win .history-cell.payout{
        color: greenyellow;
    }
</style>