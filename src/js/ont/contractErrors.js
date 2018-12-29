let ContractErrorCode = {
  NO_ERROR: 0,
  USER_CANCELED: 10001,
  UNKNOWN: 10002,
  INVEST: {
    TRANSFER_ERROR: 102,
  },

  WITHDRAW: {
    TRANSFER_DIVIDEND_ERROR: 202,
    TRANSFER_EARNING_ERROR: 302,
  },

  BET: {
    ROUND_END: 603,
    POOR_POOL: 604,
    TRANSFER_ERROR: 605,
  },
}

export {
  ContractErrorCode
}