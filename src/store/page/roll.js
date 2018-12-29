import Moment from 'moment'

export default {
  namespaced: true,
  state: {
    History: [],
    Rank: [],
    CurrentToken: 'ong'
  },
  mutations: {
    setCurrentToken(state, token) {
      state.CurrentToken = token
    },

    setHistory(state, result) {
      let rows = []

      result.forEach(bet=>{
        let columns = []
        let time = Moment.unix(bet.blockTime).format('YYYY-MM-DD HH:mm:ss').toString()
        columns.push(time)
        columns.push(bet.bettor)
        columns.push(bet.rollUnder)
        columns.push(bet.bet + ' ONG')
        columns.push(bet.roll)
        let isWin = (bet.roll < bet.rollUnder)
        if(isWin) {
          columns.push(bet.payout + ' ONG')
        } else {
          columns.push("0")
        }

        rows.push({isWin:isWin, columns: columns})
      })
      state.History = rows
    },

    setRank(state, result) {
      let rows = []

      for(let idx=0; idx<result.length; idx++) {
        let columns = []
        columns.push(idx + 1)
        columns.push(result[idx].bettor)
        columns.push(result[idx].bet + ' ONG')
        columns.push(result[idx].payout + ' ONG')

        rows.push({isWin:true, columns: columns})
      }
      state.Rank = rows
    },
  }
}