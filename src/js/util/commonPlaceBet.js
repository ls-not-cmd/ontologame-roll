import GameState from "..//common/gameState"
import {BetValues} from "..//const";
import Decimal from "../decimal"
/***
 *
 * @param current
 * @returns {string}
 * @constructor
 */
function AddAmount(current, userChance, token) {
  let currentVal = parseFloat(current)
  if(isNaN(currentVal)) {
    return Decimal.ToFixedFloor(BetValues[token].DefaultBet)
  }

  let maxBet = parseFloat(GetMaxBet(userChance, token))
  currentVal = Decimal.Add(currentVal, BetValues[token].MinBet)
  if(Decimal.GreaterThan(currentVal, maxBet)) {
    currentVal = maxBet
  }

  return Decimal.ToFixedFloor(currentVal)
}

/***
 *
 * @param current
 * @returns {string}
 * @constructor
 */
function ReduceAmount(current, token) {
  let currentVal = parseFloat(current)
  if(isNaN(currentVal)) {
    return  Decimal.ToFixedFloor(BetValues[token].DefaultBet)
  }

  currentVal = Decimal.Sub(currentVal, BetValues[token].MinBet)

  console.log(currentVal)
  console.log(Decimal.LessThan(currentVal, BetValues[token].MinBet))
  if(Decimal.LessThan(currentVal, BetValues[token].MinBet)) {
    currentVal = BetValues[token].MinBet
  }
  return Decimal.ToFixedFloor(currentVal)
}

/***
 *
 * @param currentState
 * @returns {boolean}
 * @constructor
 */
function ShowPlayAgain(currentState) {
  return (currentState === GameState.TRANSACTION_FAILED)
}

/***
 *
 * @returns {*}
 * @constructor
 */
function InfoToShow(scope, currentState, betInfo) {
  let infoMap = {}
  infoMap[GameState.WAITING_PLAYER_PAY] = scope.$t('Roll.Info.WaitingPlayerPay')
  infoMap[GameState.PLAYER_REJECT] = scope.$t('Roll.Info.PlayerReject')
  infoMap[GameState.TRANSACTION_FAILED] = scope.$t('Roll.Info.BetTransferFailed')
  infoMap[GameState.POOR_POOL] = scope.$t('Roll.Info.PoorPool')
  infoMap[GameState.ROUND_ENDED] = scope.$t('Roll.Info.RoundEnded')
  infoMap[GameState.PLAYER_WIN] = scope.$t('Roll.Info.PlayerWin', {result: betInfo.result, rollUnder: betInfo.rollUnder, condition: betInfo.condition, winAmount: betInfo.winAmount})
  infoMap[GameState.PLAYER_LOSE] = scope.$t('Roll.Info.PlayerLose', {result: betInfo.result, rollUnder: betInfo.rollUnder, condition: betInfo.condition, winAmount: betInfo.winAmount})

  return infoMap[currentState]
}

function betOdds(betAmount, userChance) {
  return (betAmount * 98) / (userChance - 1)
}

/***
 *
 * @param betAmount
 * @param userChance
 * @returns {number}
 */
function getWillWinAmount(betAmount, userChance) {
  let betAmountVal = parseFloat(betAmount)
  if(isNaN(betAmountVal)) {
    return 0
  }

  return betOdds(betAmount, userChance)
}

/***
 *
 * @param userNum
 * @param token
 * @returns {number}
 * @constructor
 */
function GetMaxBet(userNum, token) {

  let userChance = userNum - 1
  let newAmount = (BetValues[token].MaxProfit * userChance) / (98 - userChance)
  newAmount = Math.floor(newAmount * 1000) / 1000
  console.log(BetValues[token].MaxProfit)
  return newAmount
}

/***
 *
 * @returns {string}
 */
function willWin(scope, betAmount, userChance, token) {
  if(userChance <= 1) {
    return "0"
  }

  if(userChance >= 100) {
    return "0"
  }

  let willWin = getWillWinAmount(betAmount, userChance)

  let profit = Decimal.Sub(willWin, parseFloat(betAmount))

  if(Decimal.GreaterThan(profit, BetValues[token].MaxProfit)) {
    let maxBet = GetMaxBet(userChance, token)
    if(Decimal.GreaterThan(BetValues[token].MinBet, maxBet)) {
      return "0.000"
    }
    betAmount = Decimal.ToFixedFloor(maxBet)
    willWin = getWillWinAmount(betAmount, userChance)
    scope.$nextTick(_=> {
      scope.betAmount = betAmount
    })
  }


  return Decimal.ToFixedFloor(willWin, 3)
}

export default {
  AddAmount,
  ReduceAmount,
  ShowPlayAgain,
  InfoToShow,
  willWin,
  GetMaxBet,
}