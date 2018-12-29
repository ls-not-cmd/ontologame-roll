import Vue from 'vue'
import vuex from 'vuex'
import {gNamespace} from "../js/namespace";

Vue.use(vuex)

import misc from './misc'
import bet from './bet'
import roll from './page/roll'
import provider from './provider'

let modules = {}

modules[gNamespace.GLOBAL.MISC] = misc
modules[gNamespace.GLOBAL.BET] = bet
modules[gNamespace.PROVIDER] = provider
modules[gNamespace.GAMES.ROLL.name] = roll

export default new vuex.Store({
  modules: modules
})