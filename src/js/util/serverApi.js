import Axios from "axios"
import Errors from "../common/errors"
import Is from "is_js"

let baseBetUrl = "https://ontologame.com/api/v1/bets"
let baseBankerUrl = "https://ontologame.com/api/v1/banker"

let BetInfo = function (info) {
  if(!Is.object(info)) {
    info = {}
  }

  this.bettor = info.bettor || ""
  this.rollUnder = info.rollUnder || 0
  this.bet = info.bet || 0
  this.roll = info.roll || 0
  this.payout = info.payout || 0
}

async function doGetRequest(url) {
  let ret = await Axios.get(url)
    .catch(err=>{
      console.log(err)
      return {
        data: Errors.New(Errors.Codes.NETWORK_ERROR)
      }
    })

  return new Promise(resolve => {
    resolve(ret.data)
  })
}

async function doPostRequest(url, data) {
  let ret = await Axios.post(url, data)
    .catch(err=>{
      console.log(err)
      return {
        data: Errors.New(Errors.Codes.NETWORK_ERROR)
      }
    })

  return new Promise(resolve => {
    resolve(ret.data)
  })
}

async function SaveBetInfo(betInfo) {
  // return await doPostRequest(`${baseBetUrl}/savebetinfo`, betInfo)
  return
}

async function SaveWinInfo(betInfo) {
  // return await doPostRequest(`${baseBetUrl}/savehugewin`, betInfo)
  return
}

async function GetTop10() {
  return await doGetRequest(`${baseBetUrl}/gethugewinstopbynum/10`)
}

async function GetLast50() {
  return await doGetRequest(`${baseBetUrl}/getbetsbypage/50/0`)
}

async function SaveInvest(account, amount) {
  // return await doPostRequest(`${baseBankerUrl}/savebankerinvest`, {
  //   "banker": account,
  //   "ongAmount": amount
  // })
  return
}

async function GetInvestHistory(account) {
  return await doGetRequest(`${baseBankerUrl}/getbankerinvestbypage/${account}/50/1`)
}

async function SaveWithdraw(account, amount) {
  // return await doPostRequest(`${baseBankerUrl}/savebankerwithdraw`, {
  //   "banker": account,
  //   "ongAmount": amount
  // })
  return
}

async function GetWithdrawHistory(account) {
  return await doGetRequest(`${baseBankerUrl}/getbankerwithdrawbypage/${account}/50/1`)
}

export default {
  SaveBetInfo,
  SaveWinInfo,
  GetTop10,
  GetLast50,

  SaveInvest,
  GetInvestHistory,
  SaveWithdraw,
  GetWithdrawHistory,

  BetInfo,
}