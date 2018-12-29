import Is from 'is_js'
import Errors from "../common/errors"
import {ONG_MUL} from "../const";
import Decimal from 'decimal.js'
import {ContractErrorCode} from "./contractErrors";

const contractHash = "3ea96606811260613d01127b340d4d8e0bd03340"
// const contractHash = "bf7046da36c4e1d99de8c946be152b197104e40c"

const contractMethods = {
  bet: 'bet',
  bankerInvest: 'bankerInvest',
  bankerWithdraw: 'bankerWithdraw',
  bankerExit: 'bankerExit',

  getBankerDividend: 'getBankerDividend',
  getBankerEarning: 'getBankerEarning',
  getBankerInvestment: 'getBankerInvestment',
  getRunVaultShare: 'getRunVaultShare',

  getCurrentRound: 'getCurrentRound',
  getBankersInvestment: 'getBankersInvestment',
  getRealTimeRunningVault: 'getRealTimeRunningVault',
  getBankersList: 'getBankersList',
}

let OntProvider = null
let OntAsset = null
let Contract = null
let Utils = null

let client = Errors.New(Errors.Codes.NO_COMPATIBLE_BROWSER, "not in chrome")
if(Is.chrome()) {
  client = require("ontology-dapi").client
  client.registerClient({})

  OntProvider = client.api.provider
  OntAsset = client.api.asset
  Contract = client.api.smartContract
  Utils = client.api.utils
}

function CheckContractResultError (contractRet) {
  if('CANCELED' === contractRet) {
    return ContractErrorCode.USER_CANCELED
  }

  if(!Is.array(contractRet.result)) {
    return ContractErrorCode.UNKNOWN
  }

  let errorCode = ContractErrorCode.NO_ERROR
  contractRet.result.forEach(r => {
    let keyWord = HexToString(r[0])
    if('Error' === keyWord) {
      errorCode = HexToInt(r[1])
    }
  })

  return errorCode
}

function contractStrToHex(ongAmountInHex) {
  let reversedHex = ""
  for(let i=ongAmountInHex.length; i>0; i-=2) {
    reversedHex += ongAmountInHex[i-2] + ongAmountInHex[i-1]
  }

  return "0x" + reversedHex
}

async function getAccountHex() {
  let account = await OntAsset.getAccount()
    .catch(_=> {
      return null
    })

  if(null === account) {
    return null
  }
  return Utils.addressToHex(account)
}

function HexToString(hexString) {
  let str = ""
  for(let i=0; i<hexString.length; i+=2) {
    str += String.fromCharCode(parseInt(hexString[i] + hexString[i + 1], 16))
  }

  return str
}

function HexToInt(ongAmountInHex) {
  ongAmountInHex = contractStrToHex(ongAmountInHex)

  return parseInt(ongAmountInHex)
}

function HexToFloatOng(ongVal) {
  ongVal = HexToInt(ongVal)
  Decimal.set({ precision: 9 })
  return Decimal.div(ongVal, ONG_MUL).toString()
}

async function Bet(scope, betAmount, number, token = "ong") {
  if(!scope.$store.state.provider.Ready) {
    return new Promise(resolve=>{
      resolve(Errors.New(Errors.Codes.INVALID_PROVIDER))
    })
  }

  let accountHex = await getAccountHex()

  if(null === accountHex) {
    return Errors.New(Errors.Codes.NOT_LOGIN)
  }

  let valNum = parseFloat(betAmount)
  betAmount = Math.floor(valNum * ONG_MUL)

  return Contract.invoke(
    {
      scriptHash:contractHash,
      operation: contractMethods.bet,
      args: [
        {type:'ByteArray', value: accountHex},
        {type:'Integer', value: betAmount},
        {type:'Integer', value: number},
      ],
      gasPrice: 500,
      gasLimit: 100000000,
    })
}

async function BankInvest(amount) {
  let accountHex = await getAccountHex()

  if(null === accountHex) {
    return Errors.New(Errors.Codes.NOT_LOGIN)
  }

  let valNum = parseFloat(amount)
  amount = Math.floor(valNum * ONG_MUL)

  return Contract.invoke(
    {
      scriptHash:contractHash,
      operation: contractMethods.bankerInvest,
      args: [
        {type:'ByteArray', value: accountHex},
        {type:'Integer', value: amount},
      ],
      gasPrice: 500,
      gasLimit: 100000000,
    })
}

async function BankerWithdraw() {
  let accountHex = await getAccountHex()

  if(null === accountHex) {
    return Errors.New(Errors.Codes.NOT_LOGIN)
  }

  return Contract.invoke(
    {
      scriptHash:contractHash,
      operation: contractMethods.bankerWithdraw,
      args: [
        {type:'ByteArray', value: accountHex},
      ],
      gasPrice: 500,
      gasLimit: 100000000,
    })
}

async function BankerExit() {
  let accountHex = await getAccountHex()

  if(null === accountHex) {
    return Errors.New(Errors.Codes.NOT_LOGIN)
  }

  return Contract.invoke(
    {
      scriptHash: contractHash,
      operation: contractMethods.bankerExit,
      args: [
        {type:'ByteArray', value: accountHex},
      ],
      gasPrice: 500,
      gasLimit: 100000000,
    })
}

async function GetCurrentRound() {
  let round = await Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getCurrentRound,
    args: []
  }).catch(e=>{
    console.log(e)
    return null
  })

  if(null !== round) {
    round = contractStrToHex(round)
    round = parseInt(round, 16)
  }

  return round
}

async function GetRunningBalance(round) {
  round = round || await GetCurrentRound()
    .catch(e=>{
      return null
    })

  if(null === round) {
    return
  }

  let runningBalance = await Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getRealTimeRunningVault,
    args: [
      {type:'Integer', value: round},
    ]
  }).catch(e=>{
    console.log(e)
    return null
  })

  if("" === runningBalance) {
    return '0'
  }

  if(null !== runningBalance) {
    runningBalance = HexToFloatOng(runningBalance)
  }

  return runningBalance
}


async function GetBankersInvestment(round) {
  round = round || await GetCurrentRound()
    .catch(e=>{
      return null
    })

  if(null === round) {
    return
  }

  let bankerInvest = await Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getBankersInvestment,
    args: [
      {type:'Integer', value: round},
    ]
  }).catch(e=>{
    console.log(e)
    return null
  })

  if(null !== bankerInvest) {
    bankerInvest = HexToFloatOng(bankerInvest)
  }

  return bankerInvest
}

async function GetBankerList(round) {
  round = round || await GetCurrentRound()
    .catch(e=>{
      return null
    })

  if(null === round) {
    return
  }

  let bankerList = await Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getBankersList,
    args: [
      {type:'Integer', value: round},
      {type:'Boolean', value: false},
    ],
    gasPrice: 500,
    gasLimit: 100000000,
  }).catch(e=>{
    console.log(e)
    return null
  })

  return bankerList
}

async function GetBankerDividend() {
  let accountHex = await getAccountHex()

  return Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getBankerDividend,
    args: [
      {type:'ByteArray', value: accountHex},
    ]
  })
}

async function GetBankerEarning() {
  let accountHex = await getAccountHex()
  
  return Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getBankerEarning,
    args: [
      {type:'ByteArray', value: accountHex},
    ]
  })
}

async function GetPrincipal() {
  let accountHex = await getAccountHex()

  return Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getRunVaultShare,
    args: [
      {type:'ByteArray', value: accountHex},
    ]
  })
}

async function GetCurrentBankerInvestAmount(round) {
  round = round || await GetCurrentRound()
  if(null === round) {
    return
  }

  let accountHex = await getAccountHex()

  return Contract.invokeRead({
    scriptHash: contractHash,
    operation: contractMethods.getBankerInvestment,
    args: [
      {type:'Integer', value: round},
      {type:'ByteArray', value: accountHex},
    ]
  })
}

export default {
  HexToInt,
  HexToString,
  HexToFloatOng,
  CheckContractResultError,

  Bet,

  OntAsset,
  BankInvest,
  BankerWithdraw,
  BankerExit,

  GetCurrentRound,
  GetBankerList,
  GetBankersInvestment,
  GetRunningBalance,
  GetBankerDividend,
  GetBankerEarning,
  GetCurrentBankerInvestAmount,
  GetPrincipal,
}