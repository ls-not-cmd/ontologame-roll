<template>
    <div class="game-info-panel">
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <div class="md-title">{{$t('Roll.Title.RollUnder')}}</div>
                <div class="md-headline">{{chance}}</div>
            </div>
            <div class="md-layout-item">
                <div class="md-title">{{$t('Roll.Title.Odds')}}</div>
                <div class="md-headline">{{payTimes}}×</div>
            </div>
            <div class="md-layout-item">
                <div class="md-title">{{$t('Roll.Title.WinningChance')}}</div>
                <div class="md-headline">{{chance - 1}}%</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "game-info-panel",
    props: ["chance", "payTimes", "willWin", "fee", "jackPotFee", "jackpotTotal", "showJackpotCondition"]
  }
</script>

<style scoped>
    .md-layout-item {
        text-align: center;
    }
    .game-panel-description-item {
        padding-bottom: 20px;
    }

    h1.game-panel-strong {
        color: #AAD372;
    }

    .jackpot-condition {
        color: #FF7C0A;
        font-weight: 200;
        padding: 0;
    }

    .jackpot-info {
        color: #AAD372;
        font-weight: 200;
        padding: 0;
    }
</style>