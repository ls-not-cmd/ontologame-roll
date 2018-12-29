import Decimal from "decimal.js"

/***
 *
 * @param num
 * @param dp
 * @returns {string}
 * @constructor
 */
function ToFixedFloor(num, dp = 2) {
  return new Decimal(num).toFixed(dp, Decimal.ROUND_FLOOR)
}

/***
 *
 * @param x
 * @param y
 * @returns {number}
 * @constructor
 */
function Add(x, y) {
  return Decimal.add(x, y).toNumber()
}

/***
 *
 * @param x
 * @param y
 * @returns {number}
 * @constructor
 */
function Sub(x, y) {
  return (new Decimal(x)).minus(y).toNumber()
}

/***
 *
 * @param num
 * @param dp
 * @returns {string}
 * @constructor
 */
function ToFixed(num, dp = 2) {
  return (new Decimal(num)).toFixed(dp)
}

/***
 *
 * @param x
 * @param y
 * @returns {boolean}
 * @constructor
 */
function LessThanOrEqualTo(x, y) {
  return (new Decimal(x)).lessThanOrEqualTo(y)
}

/***
 *
 * @param x
 * @param y
 * @returns {boolean}
 * @constructor
 */
function LessThan(x, y) {
  return (new Decimal(x)).lessThan(y)
}
/***
 *
 * @param x
 * @param y
 * @returns {boolean}
 * @constructor
 */
function GreaterThan(x, y) {
  return (new Decimal(x)).greaterThan(y)
}

/***
 *
 * @param n
 * @returns {string}
 * @constructor
 */
function ToHex(n) {
  return (new Decimal(n)).toHexadecimal()
}

export default {
  ToFixed,
  ToFixedFloor,
  ToHex,
  GreaterThan,
  LessThan,
  LessThanOrEqualTo,
  Add,
  Sub,
}