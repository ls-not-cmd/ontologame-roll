
function NumberFilter($input, e) {

    if(190 === e.which) {
      let oldVal = $input.val()
      if(!oldVal.includes('.')) {
        return
      } else {
        e.preventDefault()
      }

      return
    }

    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.which, [46, 8, 9, 27, 13, 110]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.which === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.which >= 35 && e.which <= 40)) {
      // let it happen, don't do anything
      return
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || e.altKey || (e.which < 48 || e.which > 57)) && (e.which < 96 || e.which > 105)) {
      e.preventDefault()
    }
}

function trimLeftChar (s, c) {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp(
    "^[" + c + "]+", "g"
  ), "");
}

function TrimForNumber(numberStr) {
  numberStr = numberStr.trim()
  let retNum = trimLeftChar(numberStr, '0')
  if('.' === retNum[0]){
    retNum = '0' + retNum
  }

  return retNum
}

export default {
  NumberFilter,
  TrimForNumber,
}