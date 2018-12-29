const USER_LANG_KEY = "USER_LANG_KEY"
function SetLang(lang) {
  window.localStorage.setItem(USER_LANG_KEY, lang)
}

function GetLang(defaultLang) {
  let localLang = window.localStorage.getItem(USER_LANG_KEY)

  return localLang || defaultLang
}

const STEP_BY_STEP_SHOWN = 'STEP_BY_STEP_SHOWN'
function ShowStepByStep() {
  return window.localStorage.getItem(STEP_BY_STEP_SHOWN) ? false : true
}

function SetStepByStepShown() {
  window.localStorage.setItem(STEP_BY_STEP_SHOWN, 'shown')
}


export default {
  SetLang,
  GetLang,

  SetStepByStepShown,
  ShowStepByStep,
}
