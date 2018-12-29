export default {
  namespaced: true,
  state: {
    NotReadyReason: null,
    Ready: false,
    Instance: null,
    Contract: null,
    VueInstance: null,
    Account: null,
    PubKey: null,
  },
  mutations: {
    loadProvider(state, user) {
      if(state.Ready) {
        return
      }
      state.Ready = true
      state.NotReadyReason = null

      state.Account = user.account
      state.PubKey = user.pubKey
    },
    loadStatic(state, vueInstance) {
      state.VueInstance =  vueInstance
    },
    switchProviderToNotReady(state, reason) {
      state.Ready = false
      state.NotReadyReason = reason
    },
    setAccountsetAccount(state, account) {
      state.Account = account
    }
  }
}