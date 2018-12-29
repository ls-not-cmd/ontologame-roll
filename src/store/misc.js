import BN from 'bn.js'
import {ONG_MUL} from "../js/const";

const ongMul = new BN(ONG_MUL + '')
export default {
  namespaced: true,
  state: {
    OntBalance: 0,
    OngBalance: 0,
  },
  mutations: {
    updateOntBalance(state, balance) {
      state.OntBalance = balance
    },

    updateOngBalance(state, balance) {
      state.OngBalance = (balance / ONG_MUL).toFixed(9)
    },
  }
}