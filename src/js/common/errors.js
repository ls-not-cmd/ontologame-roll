'use strict'

let errorCodeBase = 0
function buildCode() {
  errorCodeBase += 1
  return errorCodeBase
}

let CommonError = function (code, msg) {
  this.code = code
  this.msg = msg

  this.error = function () {
    console.error(this.code, " : ", this.msg)
  }

  this.log = function () {
    console.log(this.code, " : ", this.msg)
  }

  this.clone = function () {
    return new CommonError(this.code, this.msg)
  }
}

const ErrorCodes = {
  UNKNOWN: buildCode(),
  NO_COMPATIBLE_BROWSER: buildCode(),
  INVALID_PROVIDER: buildCode(),
  NOT_LOGIN: buildCode(),
  NOT_MAINNET: buildCode(),
  NETWORK_ERROR: buildCode(),
  INVALID_COINBASE: buildCode(),
  PLAYER_REJECT: buildCode(),
  TRANSACTION_FAILED: buildCode(),
  SIG_ERROR: buildCode(),
  BALANCE_ERROR: buildCode(),
  INVALID_TOKEN_NUM: buildCode(),
  WITHDRAW_ID_ERROR: buildCode(),
  WITHDRAW_ERROR: buildCode(),
}

function makeValidCode(code) {
  return Object.values(ErrorCodes).includes(code) ? code : ErrorCodes.UNKNOWN
}

function NewError(code, msg) {
  code = makeValidCode(code)
  return new CommonError(code, msg)
}

function IsError(obj) {
  return obj instanceof CommonError
}

export default {
  Codes: ErrorCodes,
  New: NewError,
  IsError: IsError
}
