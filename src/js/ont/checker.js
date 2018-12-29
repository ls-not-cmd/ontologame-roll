import Is from "is_js"
import Errors from "../common/errors"

let OntProvider = null
let OntAsset = null
let OntNetwork = null

let client = Errors.New(Errors.Codes.NO_COMPATIBLE_BROWSER, "not in chrome")
if(Is.chrome()) {
  client = require("ontology-dapi").client
  client.registerClient({})

  OntProvider = client.api.provider
  OntAsset = client.api.asset
  OntNetwork = client.api.network
}

const OntNetworkType = {
  main: 'MAIN',
  test: 'TEST',
  priv: 'PRIVATE',
}

const OntErrors = {
  NO_PROVIDER:"NO_PROVIDER",
  NO_ACCOUNT:"NO_ACCOUNT",
  GET_NETWORK_ERR:"GET_NETWORK_ERR",
}



async function ProviderCheck() {
  if(Errors.IsError(client)) {
    return new Promise(resolve => {
      resolve(client)
    })
  }

  let providerOk = true
  let provider = await OntProvider.getProvider()
    .catch(err => {
      console.log(err)
      return err
    })

  if("string" === typeof provider) {
    switch (provider) {
      case OntErrors.NO_PROVIDER:
        providerOk = Errors.New(Errors.Codes.INVALID_PROVIDER, "no ont provider")
        break

      default:
        providerOk = Errors.New(Errors.Codes.UNKNOWN, "unknown error")
        break
    }
  }

  return new Promise(resolve => {
    resolve(providerOk)
  })
}

async function LoginCheck() {
  if(Errors.IsError(client)) {
    return new Promise(resolve => {
      resolve(client)
    })
  }

  let accountOk = {ok: true, account: null}
  let account = await OntAsset.getAccount()
    .catch(err => {
      return err
    })

  switch (account) {
    case OntErrors.NO_ACCOUNT:
      accountOk = Errors.New(Errors.Codes.NOT_LOGIN, "no ont provider")
      break

    default:
      accountOk.account = account
      break
  }

  if(!Errors.IsError(accountOk)) {
    let publickKey = await OntAsset.getPublicKey()
      .catch(err => {
        return err
      })

    accountOk.pubKey = publickKey
  }

  return new Promise(resolve=>{
    resolve(accountOk)
  })
}

async function MainNetCheck() {
  if(Errors.IsError(client)) {
    return new Promise(resolve => {
      resolve(client)
    })
  }

  let networkOk = true
  let network = await OntNetwork.getNetwork()
    .catch(_ => {
      return  OntErrors.GET_NETWORK_ERR
    })

  if("string" === typeof network) {
    switch (network) {
      case OntErrors.GET_NETWORK_ERR:
        networkOk = Errors.New(Errors.Codes.NOT_MAINNET, "can't get network")
        break

      default:
        networkOk = Errors.New(Errors.Codes.UNKNOWN, "unknown error")
        break
    }
  } else {
    if(OntNetworkType.main !== network.type) {
      networkOk = Errors.New(Errors.Codes.NOT_MAINNET, "not in main network")
    }
  }

  return new Promise(resolve=>{
    resolve(networkOk)
  })
}

async function FullCheck() {
  let providerOk = await ProviderCheck()
  if(Errors.IsError(providerOk)) {
    return new Promise(resolve => {
      resolve(providerOk)
    })
  }

  let loginOk = await LoginCheck()
  if(Errors.IsError(loginOk)) {
    return new Promise(resolve => {
      resolve(loginOk)
    })
  }

  let mainNetOk = await MainNetCheck()
  if(Errors.IsError(mainNetOk)) {
    return new Promise(resolve => {
      resolve(mainNetOk)
    })
  }

  return new Promise(resolve => {
    resolve(loginOk)
  })
}

export default {
  ProviderCheck,
  MainNetCheck,
  LoginCheck,
  FullCheck,
}