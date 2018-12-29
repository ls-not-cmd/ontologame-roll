<template>
    <div id="common-header">
        <md-toolbar class="header-toolbar-inner" md-elevation="1">
            <h3 class="md-title" style="flex: 1">
                <div style="cursor: pointer; float: left" id="nav-logo-id" @click="toGamePage">
                    <img src="../assets/longLogo.png" style="height: 36px;"/>
                </div>
            </h3>
            <md-button class="md-icon-button" @click="showGuide"><img src="../assets/info.png"/></md-button>
            <md-button class="md-icon-button" @click="showAnnouncement"><img src="../assets/announcement.png"/></md-button>
            <md-button class="md-icon-button" :target="'_blank'" :href="'https://t.me/Wontology_official'"><img src="../assets/telegram.png"/></md-button>
            <md-button id="button-to-page-invest" @click="showBanker">{{$t('Nav.Button.Invest')}}</md-button>
            <md-button id="button-how-to-play" @click="showDescription">{{$t('Nav.Button.Introduction')}}</md-button>

            <md-menu class="lang-switch" md-size="medium" md-align-trigger>
                <md-button md-menu-trigger>
                    <img v-if="'zh' === lang" src="../assets/flags/zh.png"/>
                    <img v-else src="../assets/flags/en.png"/>
                    {{$t(`Nav.Lang['${localLang()}']`)}}
                </md-button>

                <md-menu-content class="lang-menu-content">
                    <md-menu-item @click="langChanged('zh')"><img src="../assets/flags/zh.png"/><span>{{$t("Nav.Lang.zh")}}</span></md-menu-item>
                    <md-menu-item @click="langChanged('en')"><img src="../assets/flags/en.png"/><span>{{$t("Nav.Lang.en")}}</span></md-menu-item>
                </md-menu-content>
            </md-menu>
        </md-toolbar>

        <game-description v-model="showDesc" />
        <game-announcement v-model="showAnn"/>



    </div>
</template>

<script>
  import {gNamespace} from "../js/namespace";
  import GameDescription from "./gameDescription";
  import LocalStore from '../js/localStorage'
  import GameAnnouncement from "./gameAnnouncement";

  function startIntro(scope, startStep = 1){
    let introInfo = scope.$t('StepByStep')

    let elList = [
      // 'On Wontology you can play the roll game or invest some ONG to become a banker. Let us see how operations of banker first.',
      "#nav-logo-id",

      // 'Click "BANKER" button will lead you to banker page.',
      '#button-to-page-invest',

      // 'Click "INVEST IN" button to invest. Min amount of investment is 1000 ONG.',
      '#button-invest-in',

      // 'Click "WITHDRAW" button to withdraw your profit.',
      '#button-withdraw-income',

      // 'Click "EXIT INVESTMENT" button to withdraw all your profit and principal. After this operation you will be no longer a banker.',
      '#button-banker-exit',

      // 'Now let us see how to play the game.',
      '#button-banker-exit',

      // 'Drag the slider to set your "number".',
      '#game-roll-slider',

      // 'Input how much ONG you want to bet.',
      '#roll-bet-amount-id',

      // 'Click "BET" button to start game.',
      '#button-do-bet',

      // 'If the random number calculated by contract is under your "number", you win!',
      '#button-do-bet',

      // 'Click "HOW TO PLAY" to get more rule details of Wontology.'
      '#button-how-to-play',
    ]

    let introSteps = []
    for(let i=0; i<introInfo.length; i++) {
      let step = {
        intro: introInfo[i]
      }

      if(elList[i]) {
        step.element = document.querySelector(elList[i])
      }
      introSteps.push(step)
    }

    let stepCount = startStep
    scope.$intro().setOptions({
      steps: introSteps,
      showStepNumbers: false,
      hideNext: true,
      hidePrev: true
    }).goToStepNumber(startStep).start()
      .onbeforechange(_=>{
        stepCount += 1

        if(3 === stepCount) {
          scope.$nextTick(_=>{
            scope.$intro().exit(true)
            scope.showBanker()
            scope.$nextTick(_=>{
              startIntro(scope, stepCount)
            })
          })
        } else if(7 === stepCount) {
          scope.$nextTick(_=>{
            scope.$intro().exit(true)
            scope.toGamePage()
            scope.$nextTick(_=>{
              startIntro(scope, stepCount)
            })
          })
        }
      })
  }

  export default {
    components: {
      GameAnnouncement,
      GameDescription},
    name: "nav-header",
    data() {
      return {
        allNamespace: gNamespace,
        showDesc: {val:false},
        showAnn: {val:false},
        lang: window.$I18n.locale
      }
    },
    mounted() {
      if(LocalStore.ShowStepByStep()) {
        this.$nextTick(_=>{
          startIntro(this)
          LocalStore.SetStepByStepShown()
        })
      }
    },
    methods: {
      showGuide() {
        startIntro(this)
      },
      showAnnouncement() {
        this.showAnn.val = true
      },
      showDescription() {
        this.showDesc.val = true
      },
      toGamePage() {
        this.$router.push({name: gNamespace.GAMES.ROLL.name})
      },
      showBanker() {
        this.$router.push({name: gNamespace.BANKER.name})
      },
      langChanged(lang) {
        this.lang = lang
        window.$I18n.locale = lang
        LocalStore.SetLang(lang)
      },
      localLang() {
        return window.$I18n.locale
      },
    }
  }
</script>

<style scoped>
    #common-header {
        width: 100%;
        min-width: 1200px;
        background-color: #383a47;
    }

    #common-header > .header-toolbar {
        background-color: rgba(40, 40, 80, 0.2);
    }

    .header-toolbar-inner {
        width: 1200px;
        margin: 0 auto;
        background: transparent;
        box-shadow: none;
    }
</style>
<style>
    .lang-menu-content img,
    .lang-switch img {
        width: 20px;
        margin-top: -2px;
        margin-right: 4px;
    }


    .lang-menu-content .md-list-item-content img {
        width: 24px;
        padding-right: 0;
    }

    .lang-menu-content .md-list-item-content span {
        display: inline-block;
        width: 100px;
    }

    .lang-menu-content .md-list-item-content {
        margin-left: 12px;
    }

    .lang-menu-content,
    .lang-menu-content .md-list-item-button,
    .lang-menu-content .md-list-item-content {
        flex: none;
    }

    .md-icon-button {
        width: 32px !important;
        margin: 0 !important;
    }
    .md-icon-button > div {
        padding: 0 !important;
    }
    .md-icon-button .md-button-content img {
        width: 28px !important;
        height: 28px !important;
    }
</style>