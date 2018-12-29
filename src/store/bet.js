import GameState from "../js/common/gameState"

export default {
  namespaced: true,
  state: {
    Roll: GameState.PLAYER_IDLE,
    BetToQuery: []
  },
  mutations: {
    ClearQueryingCommit(state, result) {
      state.BetToQuery = []
    },
    AddQueryingCommit(state, result) {
      state.BetToQuery.push(result)
    },
    RemoveQueryingCommit(state, result) {
      let newList = []
      state.BetToQuery.forEach(commitInfo => {
        if(commitInfo.commit === result) {
          return
        }
        newList.push(commitInfo)
      })

      state.BetToQuery = newList
    },
    ChangeCoinFlipState(state, result) {
      state.CoinFlip = result
    },

    ChangeOneDiceState(state, result) {
      state.OneDice = result
    },

    ChangeDiceTwoState(state, result) {
      state.TwoDice = result
    },

    ChangeRollState(state, result) {
      state.Roll = result
    },
  }
}