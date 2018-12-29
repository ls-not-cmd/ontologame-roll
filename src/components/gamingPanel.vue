<template>
    <div class="gaming-panel">
        <md-content>
            <div class="md-title" v-text="this.infoToShow"></div>
            <md-button class="md-raised md-primary"
                       @click="this.playAgain"
                       v-show="this.showPlayAgain">{{$t('Roll.Button.PlayAgain')}}</md-button>
        </md-content>
    </div>
</template>

<script>
  export default {
    name: "gaming-panel",
    props: ["infoToShow", "playAgain", "showPlayAgain"]
  }
</script>

<style scoped>
    .gaming-panel {
        position: absolute;
        left: 10px;
        top: 0;
        width: 700px;
        height: 430px;
        background: rgba(0,0,0,0.4);
        box-shadow: none;
        border-radius: 12px;
        z-index: 10000;
    }

    .gaming-panel > .md-content {
        width: 100%;
        height: 600px;
        padding-top: 200px;
        text-align: center;
        background: transparent;
    }

    .gaming-panel > .md-content > .md-title {
        width: 100%;
        padding-bottom: 20px;
    }

    .gaming-panel > .md-content > .md-button {
        width: 120px;
        height: 40px;
        line-height: 40px;
    }

    .gaming-panel > .md-content > .md-button:hover {
        width: 160px;
    }
</style>